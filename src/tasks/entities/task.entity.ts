import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { TaskStatus } from './task-status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'ID unique' })
  id: number;

  @Column()
  @ApiProperty({ example: 'Faire les courses', description: 'Titre de la tâche' })
  title: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'Acheter du lait', description: 'Détails' })
  description: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
  @ApiProperty({ enum: TaskStatus, description: 'Statut de la tâche' })
  status: TaskStatus;

  @CreateDateColumn()
  @ApiProperty({ example: '2024-01-15T12:00:00Z', description: 'Date de création' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ example: '2024-01-15T12:30:00Z', description: 'Dernière modification' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.tasks, { eager: false })
  @ApiProperty({ type: () => User, description: 'L\'utilisateur assigné à la tâche' })
  user: User;
}