import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
export declare class CategoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        menus: {
            name: string;
            description: string | null;
            id: number;
            createdAt: Date;
            categoryId: number;
            price: number;
            image: string | null;
            stock: number;
            isAvailable: boolean;
        }[];
    } & {
        name: string;
        description: string | null;
        id: number;
        createdAt: Date;
    })[]>;
    findOne(id: number): Promise<{
        menus: {
            name: string;
            description: string | null;
            id: number;
            createdAt: Date;
            categoryId: number;
            price: number;
            image: string | null;
            stock: number;
            isAvailable: boolean;
        }[];
    } & {
        name: string;
        description: string | null;
        id: number;
        createdAt: Date;
    }>;
    create(dto: CreateCategoryDto): import(".prisma/client").Prisma.Prisma__CategoryClient<{
        name: string;
        description: string | null;
        id: number;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, dto: UpdateCategoryDto): Promise<{
        name: string;
        description: string | null;
        id: number;
        createdAt: Date;
    }>;
    remove(id: number): Promise<{
        name: string;
        description: string | null;
        id: number;
        createdAt: Date;
    }>;
}
