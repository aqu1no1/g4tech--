import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nota } from './entities/nota.entity';
import { CreateNotaDto } from './dto/create-nota.dto';
import { Aluno } from '../alunos/entities/aluno.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class NotasService {
  constructor(
    @InjectRepository(Nota)
    private notasRepository: Repository<Nota>,
    @InjectRepository(Aluno)
    private alunosRepository: Repository<Aluno>,
  ) {}

  async create(createNotaDto: CreateNotaDto): Promise<Nota> {
    const aluno = await this.alunosRepository.findOneBy({
      id: createNotaDto.alunoId,
    });
    if (!aluno) throw new Error('Aluno não encontrado');

    const nota = this.notasRepository.create({
      disciplina: createNotaDto.disciplina,
      nota: createNotaDto.nota,
      aluno: aluno,
    });

    return await this.notasRepository.save(nota);
  }

  async findAll(): Promise<Nota[]> {
    return await this.notasRepository.find({ relations: ['aluno'] });
  }

  async findOne(id: number): Promise<Nota> {
    const nota = await this.notasRepository.findOne({
      where: { id },
      relations: ['aluno'],
    });

    if (!nota) {
      throw new Error(`Nota com id ${id} não encontrada`);
    }

    return nota;
  }

  async findByNomeAndRa(nome: string, ra: string): Promise<Aluno | null> {
    try {
      return await this.alunosRepository.findOne({
        where: { nome, ra },
      });
    } catch (error) {
      console.error('Erro no findByNomeAndRa:', error);
      throw error;
    }
  }

  async findNotasByAluno(nome: string, ra: string): Promise<Nota[]> {
    return await this.notasRepository.find({
      where: { aluno: { nome, ra } },
      relations: ['aluno'],
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.notasRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Nota com id ${id} não encontrada`);
    }
    return { message: `Nota com id ${id} removida com sucesso` };
  }
}
