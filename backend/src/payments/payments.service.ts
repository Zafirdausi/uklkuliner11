import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async create(orderId: number, dto: CreatePaymentDto) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId }, include: { payment: true } });
    if (!order) throw new NotFoundException('Order tidak ditemukan');
    if (order.paymentStatus === 'PAID') throw new BadRequestException('Order sudah dibayar');

    const payment = await this.prisma.$transaction(async (tx) => {
      const newPayment = await tx.payment.create({
        data: {
          orderId,
          amount: order.totalPrice,
          method: dto.method as any,
          status: 'PAID',
          paidAt: new Date(),
        },
      });

      await tx.order.update({
        where: { id: orderId },
        data: { paymentStatus: 'PAID', status: 'PROCESSING' },
      });

      return newPayment;
    });

    return { message: 'Pembayaran berhasil', payment };
  }

  async findByOrder(orderId: number) {
    const payment = await this.prisma.payment.findUnique({
      where: { orderId },
      include: { order: true },
    });
    if (!payment) throw new NotFoundException('Data pembayaran tidak ditemukan');
    return payment;
  }
}
