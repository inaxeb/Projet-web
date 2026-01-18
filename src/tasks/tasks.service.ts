import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { UserRole } from '../users/entities/role.enum';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}


  async create(createTaskDto: CreateTaskDto, user: any) {
    let targetId = user.userId;

    // Si l'utilisateur est ADMIN et qu'il spécifie un ID cible, on utilise cet ID
    if (user.role === UserRole.ADMIN && createTaskDto.targetUserId) {
      targetId = createTaskDto.targetUserId;
    }

    // On crée la tâche en l'associant à l'ID déterminé
    const { targetUserId, ...taskData } = createTaskDto; // On retire targetUserId des données de la tâche
    const task = this.tasksRepository.create({
      ...taskData,
      user: { id: targetId } as User,
    });
    
    const savedTask = await this.tasksRepository.save(task);
    const { user: owner, ...result } = savedTask;
    return result;
  }

  async findAll(user: any) {
    if (user.role === UserRole.ADMIN) {
      return this.tasksRepository.find({ order: { id: 'DESC' }, relations: ['user'] });
    }
    // Si User, seulement les siennes
    return this.tasksRepository.find({
      where: { user: { id: user.userId } },
      order: { id: 'DESC' },
      relations: ['user'],
    });
  }

  async findOne(id: number, user: any) {
    const task = await this.tasksRepository.findOne({ where: { id }, relations: ['user'] });
    if (!task) throw new NotFoundException(`Task #${id} not found`);

    if (user.role !== UserRole.ADMIN && task.user?.id !== user.userId) {
      throw new ForbiddenException('You do not have permission to access this task');
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, user: any) {
    const task = await this.findOne(id, user); // Vérifie l'existence et les droits

    const { targetUserId, ...updateData } = updateTaskDto;

    // Gestion de la réassignation (Admin seulement)
    if (targetUserId && user.role === UserRole.ADMIN) {
      task.user = { id: targetUserId } as User;
    }

    this.tasksRepository.merge(task, updateData);
    return this.tasksRepository.save(task);
  }

  async remove(id: number, user: any) {
    const task = await this.findOne(id, user); // Vérifie l'existence et les droits
    return this.tasksRepository.remove(task);
  }
}
