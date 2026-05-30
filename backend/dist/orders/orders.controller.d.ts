import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';
export declare class OrdersController {
    private ordersService;
    constructor(ordersService: OrdersService);
    create(userId: number, dto: CreateOrderDto): Promise<{
        user: {
            name: string;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
            id: number;
            createdAt: Date;
        };
        orderItems: ({
            menu: {
                name: string;
                description: string | null;
                id: number;
                createdAt: Date;
                categoryId: number;
                price: number;
                image: string | null;
                stock: number;
                isAvailable: boolean;
            };
        } & {
            id: number;
            price: number;
            menuId: number;
            quantity: number;
            subtotal: number;
            orderId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        userId: number;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        user: {
            name: string;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
            id: number;
            createdAt: Date;
        };
        payment: {
            id: number;
            status: import(".prisma/client").$Enums.PaymentStatus;
            orderId: number;
            amount: number;
            method: import(".prisma/client").$Enums.PaymentMethod;
            paidAt: Date | null;
        };
        orderItems: ({
            menu: {
                name: string;
                description: string | null;
                id: number;
                createdAt: Date;
                categoryId: number;
                price: number;
                image: string | null;
                stock: number;
                isAvailable: boolean;
            };
        } & {
            id: number;
            price: number;
            menuId: number;
            quantity: number;
            subtotal: number;
            orderId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        userId: number;
    })[]>;
    findMyOrders(userId: number): import(".prisma/client").Prisma.PrismaPromise<({
        payment: {
            id: number;
            status: import(".prisma/client").$Enums.PaymentStatus;
            orderId: number;
            amount: number;
            method: import(".prisma/client").$Enums.PaymentMethod;
            paidAt: Date | null;
        };
        orderItems: ({
            menu: {
                name: string;
                description: string | null;
                id: number;
                createdAt: Date;
                categoryId: number;
                price: number;
                image: string | null;
                stock: number;
                isAvailable: boolean;
            };
        } & {
            id: number;
            price: number;
            menuId: number;
            quantity: number;
            subtotal: number;
            orderId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        userId: number;
    })[]>;
    findOne(id: number): Promise<{
        user: {
            name: string;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
            id: number;
            createdAt: Date;
        };
        payment: {
            id: number;
            status: import(".prisma/client").$Enums.PaymentStatus;
            orderId: number;
            amount: number;
            method: import(".prisma/client").$Enums.PaymentMethod;
            paidAt: Date | null;
        };
        orderItems: ({
            menu: {
                name: string;
                description: string | null;
                id: number;
                createdAt: Date;
                categoryId: number;
                price: number;
                image: string | null;
                stock: number;
                isAvailable: boolean;
            };
        } & {
            id: number;
            price: number;
            menuId: number;
            quantity: number;
            subtotal: number;
            orderId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        userId: number;
    }>;
    updateStatus(id: number, dto: UpdateOrderStatusDto): Promise<{
        id: number;
        createdAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        totalPrice: number;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        userId: number;
    }>;
}
