import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ example: 'john_doe', description: 'Nom d\'utilisateur' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'password123', description: 'Mot de passe (min 6 caractères)' })
  @IsString()
  @MinLength(6)
  password: string;
}
