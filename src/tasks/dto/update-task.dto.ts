import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { TaskStatus } from '../entities/task-status.enum';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({ enum: TaskStatus, description: 'Nouveau statut de la tâche', required: false })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiProperty({ description: 'Réassigner la tâche à un autre ID (Admin seulement)', required: false })
  @IsOptional()
  targetUserId?: number;
}