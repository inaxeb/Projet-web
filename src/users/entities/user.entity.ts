import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from './role.enum';
import { Task } from '../../tasks/entities/task.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'ID unique' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ example: 'john_doe', description: 'Nom d\'utilisateur unique' })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  @ApiProperty({ enum: UserRole, description: 'Rôle de l\'utilisateur' })
  role: UserRole;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
