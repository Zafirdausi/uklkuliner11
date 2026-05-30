import { Controller, Get, Post, Patch, Param, Body, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiForbiddenResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { GetUser } from '../common/decorators/get-user.decorator';
import { Role } from '@prisma/client';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order for the authenticated user' })
  @ApiCreatedResponse({ description: 'Order created successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid order data.' })
  @ApiUnauthorizedResponse({ description: 'Authentication required.' })
  create(@GetUser('id') userId: number, @Body() dto: CreateOrderDto) {
    return this.ordersService.create(userId, dto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  @ApiOperation({ summary: 'Get all orders (admin only)' })
  @ApiOkResponse({ description: 'List of orders returned successfully.' })
  @ApiForbiddenResponse({ description: 'Admin role required.' })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('my-orders')
  @ApiOperation({ summary: 'Get orders for the authenticated user' })
  @ApiOkResponse({ description: 'Authenticated user orders returned successfully.' })
  findMyOrders(@GetUser('id') userId: number) {
    return this.ordersService.findMyOrders(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific order by ID' })
  @ApiOkResponse({ description: 'Order returned successfully.' })
  @ApiNotFoundResponse({ description: 'Order not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id/status')
  @ApiOperation({ summary: 'Update the status of an order (admin only)' })
  @ApiOkResponse({ description: 'Order status updated successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid status data.' })
  @ApiForbiddenResponse({ description: 'Admin role required.' })
  @ApiNotFoundResponse({ description: 'Order not found.' })
  updateStatus(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateOrderStatusDto) {
    return this.ordersService.updateStatus(id, dto);
  }
}
