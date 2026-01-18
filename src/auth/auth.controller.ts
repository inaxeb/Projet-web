import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthDto } from './dto/auth.dto';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login-response.dto';
import { User } from '../users/entities/user.entity';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({ type: AuthDto })
  @ApiOperation({ summary: 'Se connecter (Obtenir un Token JWT)' })
  @ApiResponse({
    status: 201,
    description: 'Connexion réussie.',
    type: LoginResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Identifiants incorrects.' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ApiOperation({ summary: "S'inscrire (Créer un nouveau compte)" })
  @ApiResponse({
    status: 201,
    description: 'Utilisateur créé avec succès.',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Données invalides (mot de passe trop court, etc.).' })
  @ApiResponse({ status: 409, description: "Nom d'utilisateur déjà pris." })
  async register(@Body() authDto: AuthDto) {
    return this.authService.register(authDto);
  }
}