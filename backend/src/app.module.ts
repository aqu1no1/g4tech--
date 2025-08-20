import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from './alunos/entities/aluno.entity';
import { Nota } from './notas/entities/nota.entity';
import { AlunosModule } from './alunos/alunos.module';
import { NotasModule } from './notas/notas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'verzide7878',
      database: 'crubG4tech_db',
      entities: [Aluno, Nota],
      synchronize: true,
    }),
    AlunosModule,
    NotasModule,
  ],
})
export class AppModule {}
