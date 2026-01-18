import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    description: 'Le token JWT à utiliser pour les prochaines requêtes (Bearer Token)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoyLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2NTcyODkzMDQsImV4cCI6MTY1NzI5MjkwNH0.TOKEN_SIGNATURE',
  })
  access_token: string;
}
