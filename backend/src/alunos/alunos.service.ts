import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aluno } from './entities/aluno.entity';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';

@Injectable()
export class AlunosService {
  constructor(
    @InjectRepository(Aluno)
    private alunosRepository: Repository<Aluno>,
  ) {}

  async create(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    const aluno = this.alunosRepository.create(createAlunoDto);
    return this.alunosRepository.save(aluno);
  }

  async findAll(): Promise<Aluno[]> {
    return this.alunosRepository.find({ relations: ['notas'] });
  }

  async findOne(id: number): Promise<Aluno> {
    const aluno = await this.alunosRepository.findOne({
      where: { id },
      relations: ['notas'],
    });

    if (!aluno) throw new Error(`Aluno com id ${id} não encontrado`);
    return aluno;
  }

  async update(id: number, updateAlunoDto: UpdateAlunoDto): Promise<Aluno> {
    await this.alunosRepository.update(id, updateAlunoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.alunosRepository.delete(id);
  }
}
