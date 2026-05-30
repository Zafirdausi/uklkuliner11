import { Controller, Get, Post, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/payment.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post(':orderId')
  @ApiOperation({ summary: 'Create a payment for an order' })
  @ApiCreatedResponse({ description: 'Payment created successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid payment data.' })
  @ApiUnauthorizedResponse({ description: 'Authentication required.' })
  create(@Param('orderId', ParseIntPipe) orderId: number, @Body() dto: CreatePaymentDto) {
    return this.paymentsService.create(orderId, dto);
  }

  @Get(':orderId')
  @ApiOperation({ summary: 'Get payment details for an order' })
  @ApiOkResponse({ description: 'Payment details returned successfully.' })
  @ApiNotFoundResponse({ description: 'Payment not found for given order.' })
  findByOrder(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.paymentsService.findByOrder(orderId);
  }
}
