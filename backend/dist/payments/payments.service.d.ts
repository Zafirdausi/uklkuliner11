import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/payment.dto';
export declare class PaymentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(orderId: number, dto: CreatePaymentDto): Promise<{
        message: string;
        payment: {
            id: number;
            status: import(".prisma/client").$Enums.PaymentStatus;
            orderId: number;
            amount: number;
            method: import(".prisma/client").$Enums.PaymentMethod;
            paidAt: Date | null;
        };
    }>;
    findByOrder(orderId: number): Promise<{
        order: {
            id: number;
            createdAt: Date;
            status: import(".prisma/client").$Enums.OrderStatus;
            totalPrice: number;
            paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
            userId: number;
        };
    } & {
        id: number;
        status: import(".prisma/client").$Enums.PaymentStatus;
        orderId: number;
        amount: number;
        method: import(".prisma/client").$Enums.PaymentMethod;
        paidAt: Date | null;
    }>;
}
