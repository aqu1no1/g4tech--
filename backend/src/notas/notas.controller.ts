import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { NotasService } from './notas.service';
import { CreateNotaDto } from './dto/create-nota.dto';

@Controller('notas')
export class NotasController {
  constructor(private readonly notasService: NotasService) {}

  @Post()
  async create(@Body() createNotaDto: CreateNotaDto) {
    return await this.notasService.create(createNotaDto);
  }

  @Get()
  async findAll() {
    return await this.notasService.findAll();
  }

  @Get('verificar')
  async verificarAluno(@Query('nome') nome: string, @Query('ra') ra: string) {
    const aluno = await this.notasService.findByNomeAndRa(nome, ra);
    return aluno ? { existe: true, id: aluno.id } : { existe: false };
  }

  @Get('aluno/notas')
  async findNotasByAluno(@Query('nome') nome: string, @Query('ra') ra: string) {
    return await this.notasService.findNotasByAluno(nome, ra);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.notasService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.notasService.remove(+id);
  }
}
