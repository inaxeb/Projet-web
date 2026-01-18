import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from './entities/role.enum';
import { User } from './entities/user.entity';

@ApiTags('Utilisateurs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(UserRole.ADMIN) // Seul l'Admin peut voir la liste des utilisateurs
  @ApiOperation({ summary: 'Lister tous les utilisateurs (Admin seulement)' })
  @ApiResponse({
    status: 200,
    description: 'Liste de tous les utilisateurs enregistrés.',
    type: [User],
  })
  @ApiResponse({ status: 401, description: 'Non authentifié.' })
  @ApiResponse({ status: 403, description: 'Interdit (Réservé aux admins).' })
  findAll() {
    return this.usersService.findAll();
  }
}
