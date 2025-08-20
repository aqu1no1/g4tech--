import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotasService } from './notas.service';
import { NotasController } from './notas.controller';
import { Nota } from './entities/nota.entity';
import { Aluno } from '../alunos/entities/aluno.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nota, Aluno])],
  controllers: [NotasController],
  providers: [NotasService],
})
export class NotasModule {}
