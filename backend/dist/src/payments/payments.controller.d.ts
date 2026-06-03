import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/payment.dto';
export declare class PaymentsController {
    private paymentsService;
    constructor(paymentsService: PaymentsService);
    create(orderId: number, dto: CreatePaymentDto): Promise<{
        message: string;
        payment: {
            id: number;
            status: import(".prisma/client").$Enums.PaymentStatus;
            orderId: number;
            method: import(".prisma/client").$Enums.PaymentMethod;
            amount: number;
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
        method: import(".prisma/client").$Enums.PaymentMethod;
        amount: number;
        paidAt: Date | null;
    }>;
}
