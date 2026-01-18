import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Task } from './entities/task.entity';

@ApiTags('Tâches')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une tâche' })
  @ApiResponse({
    status: 201,
    description: 'La tâche a été créée avec succès.',
    type: Task,
  })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  @ApiResponse({ status: 401, description: 'Non authentifié.' })
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    return this.tasksService.create(createTaskDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les tâches visibles' })
  @ApiResponse({
    status: 200,
    description: 'Liste des tâches (filtrées selon le rôle).',
    type: [Task],
  })
  @ApiResponse({ status: 401, description: 'Non authentifié.' })
  findAll(@Request() req) {
    return this.tasksService.findAll(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une tâche par son ID' })
  @ApiResponse({
    status: 200,
    description: 'La tâche demandée.',
    type: Task,
  })
  @ApiResponse({ status: 403, description: 'Accès interdit (cette tâche ne vous appartient pas).' })
  @ApiResponse({ status: 404, description: 'Tâche non trouvée.' })
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.tasksService.findOne(id, req.user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une tâche' })
  @ApiResponse({
    status: 200,
    description: 'La tâche mise à jour.',
    type: Task,
  })
  @ApiResponse({ status: 403, description: 'Accès interdit.' })
  @ApiResponse({ status: 404, description: 'Tâche non trouvée.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req,
  ) {
    return this.tasksService.update(id, updateTaskDto, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une tâche' })
  @ApiResponse({
    status: 200,
    description: 'Tâche supprimée avec succès.',
  })
  @ApiResponse({ status: 403, description: 'Accès interdit.' })
  @ApiResponse({ status: 404, description: 'Tâche non trouvée.' })
  remove(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.tasksService.remove(id, req.user);
  }
}