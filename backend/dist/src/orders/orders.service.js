"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrdersService = class OrdersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        let totalPrice = 0;
        const orderItems = [];
        for (const item of dto.items) {
            const menu = await this.prisma.menu.findUnique({ where: { id: item.menuId } });
            if (!menu)
                throw new common_1.NotFoundException(`Menu ID ${item.menuId} tidak ditemukan`);
            if (!menu.isAvailable)
                throw new common_1.BadRequestException(`Menu "${menu.name}" tidak tersedia`);
            if (menu.stock < item.quantity)
                throw new common_1.BadRequestException(`Stok "${menu.name}" tidak cukup`);
            const subtotal = menu.price * item.quantity;
            totalPrice += subtotal;
            orderItems.push({ menuId: item.menuId, quantity: item.quantity, price: menu.price, subtotal });
        }
        const order = await this.prisma.$transaction(async (tx) => {
            const newOrder = await tx.order.create({
                data: {
                    userId,
                    totalPrice,
                    orderItems: { create: orderItems },
                },
                include: { orderItems: { include: { menu: true } }, user: true },
            });
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
    findMyOrders(userId) {
        return this.prisma.order.findMany({
            where: { userId },
            include: { orderItems: { include: { menu: true } }, payment: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: { orderItems: { include: { menu: true } }, user: true, payment: true },
        });
        if (!order)
            throw new common_1.NotFoundException('Order tidak ditemukan');
        return order;
    }
    async updateStatus(id, dto) {
        await this.findOne(id);
        return this.prisma.order.update({
            where: { id },
            data: { status: dto.status },
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map