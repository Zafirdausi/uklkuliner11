import { IsEnum,IsEmail, IsNotEmpty, IsString, MinLength,IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class RegisterDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'john@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;
  @ApiProperty({ example: 'admin', enum: Role })
  @IsOptional()
  @IsEnum(Role)
  role: Role;
}

export class LoginDto {
  @ApiProperty({ example: 'john@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  password: string;
}
