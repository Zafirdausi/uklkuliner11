import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';
export declare class MenusService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        category: {
            id: number;
            name: string;
            createdAt: Date;
            description: string | null;
        };
    } & {
        id: number;
        name: string;
        createdAt: Date;
        description: string | null;
        categoryId: number;
        price: number;
        image: string | null;
        stock: number;
        isAvailable: boolean;
    })[]>;
    findAllAdmin(): import(".prisma/client").Prisma.PrismaPromise<({
        category: {
            id: number;
            name: string;
            createdAt: Date;
            description: string | null;
        };
    } & {
        id: number;
        name: string;
        createdAt: Date;
        description: string | null;
        categoryId: number;
        price: number;
        image: string | null;
        stock: number;
        isAvailable: boolean;
    })[]>;
    findOne(id: number): Promise<{
        category: {
            id: number;
            name: string;
            createdAt: Date;
            description: string | null;
        };
    } & {
        id: number;
        name: string;
        createdAt: Date;
        description: string | null;
        categoryId: number;
        price: number;
        image: string | null;
        stock: number;
        isAvailable: boolean;
    }>;
    create(dto: CreateMenuDto): import(".prisma/client").Prisma.Prisma__MenuClient<{
        category: {
            id: number;
            name: string;
            createdAt: Date;
            description: string | null;
        };
    } & {
        id: number;
        name: string;
        createdAt: Date;
        description: string | null;
        categoryId: number;
        price: number;
        image: string | null;
        stock: number;
        isAvailable: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, dto: UpdateMenuDto): Promise<{
        category: {
            id: number;
            name: string;
            createdAt: Date;
            description: string | null;
        };
    } & {
        id: number;
        name: string;
        createdAt: Date;
        description: string | null;
        categoryId: number;
        price: number;
        image: string | null;
        stock: number;
        isAvailable: boolean;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        description: string | null;
        categoryId: number;
        price: number;
        image: string | null;
        stock: number;
        isAvailable: boolean;
    }>;
}
