import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Aluno } from 'src/alunos/entities/aluno.entity';

@Entity('notas')
export class Nota {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  disciplina: string;

  @Column('decimal', { precision: 5, scale: 2 })
  nota: number;

  @ManyToOne(() => Aluno, (aluno) => aluno.notas, { onDelete: 'CASCADE' })
  aluno: Aluno;
}
