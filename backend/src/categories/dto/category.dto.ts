import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Makanan Utama' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Kategori untuk makanan utama', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateCategoryDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
