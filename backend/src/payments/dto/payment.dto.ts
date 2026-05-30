import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ example: 'CASH', enum: ['CASH', 'TRANSFER'] })
  @IsEnum(['CASH', 'TRANSFER'])
  method: string;
}
