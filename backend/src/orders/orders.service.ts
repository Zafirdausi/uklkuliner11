import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateOrderDto) {
    // Validate menus and calculate total
    let totalPrice = 0;
    const orderItems = [];

    for (const item of dto.items) {
      const menu = await this.prisma.menu.findUnique({ where: { id: item.menuId } });
      if (!menu) throw new NotFoundException(`Menu ID ${item.menuId} tidak ditemukan`);
      if (!menu.isAvailable) throw new BadRequestException(`Menu "${menu.name}" tidak tersedia`);
      if (menu.stock < item.quantity) throw new BadRequestException(`Stok "${menu.name}" tidak cukup`);

      const subtotal = menu.price * item.quantity;
      totalPrice += subtotal;
      orderItems.push({ menuId: item.menuId, quantity: item.quantity, price: menu.price, subtotal });
    }

    // Create order with transaction
    const order = await this.prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId,
          totalPrice,
          orderItems: { create: orderItems },
        },
        include: { orderItems: { include: { menu: true } }, user: true },
      });

      // Decrease stock
      for (const item of dto.items) {
        await tx.menu.update({
          where: { id: item.menuId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return newOrder;
    });

    return order;
  }

  findAll() {
    return this.prisma.order.findMany({
      include: { orderItems: { include: { menu: true } }, user: true, payment: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findMyOrders(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { orderItems: { include: { menu: true } }, payment: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { orderItems: { include: { menu: true } }, user: true, payment: true },
    });
    if (!order) throw new NotFoundException('Order tidak ditemukan');
    return order;
  }

  async updateStatus(id: number, dto: UpdateOrderStatusDto) {
    await this.findOne(id);
    return this.prisma.order.update({
      where: { id },
      data: { status: dto.status as any },
    });
  }
}
