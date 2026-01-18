import { IsNotEmpty, IsString, IsOptional, IsInt, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../entities/task-status.enum';

export class CreateTaskDto {
  @ApiProperty({ description: 'Le titre de la tâche', example: 'Apprendre NestJS' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Une description optionnelle', example: 'Lire la documentation officielle', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: TaskStatus, description: 'Statut initial de la tâche', example: TaskStatus.PENDING, required: false })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiProperty({ description: 'ID de l\'utilisateur cible (Optionnel - Réservé aux Admins)', example: 2, required: false })
  @IsOptional()
  targetUserId?: number;
}

