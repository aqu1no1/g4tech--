import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Nota } from 'src/notas/entities/nota.entity';

@Entity('alunos')
export class Aluno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  ra: string;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  curso: string;

  @Column({ type: 'date' })
  dataNascimento: Date;

  @OneToMany(() => Nota, (nota) => nota.aluno)
  notas: Nota[];
}
