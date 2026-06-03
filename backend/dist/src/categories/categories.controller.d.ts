import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
export declare class CategoriesController {
    private categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        menus: {
            id: number;
            name: string;
            createdAt: Date;
            description: string | null;
            categoryId: number;
            price: number;
            image: string | null;
            stock: number;
            isAvailable: boolean;
        }[];
    } & {
        id: number;
        name: string;
        createdAt: Date;
        description: string | null;
    })[]>;
    findOne(id: number): Promise<{
        menus: {
            id: number;
            name: string;
            createdAt: Date;
            description: string | null;
            categoryId: number;
            price: number;
            image: string | null;
            stock: number;
            isAvailable: boolean;
        }[];
    } & {
        id: number;
        name: string;
        createdAt: Date;
        description: string | null;
    }>;
    create(dto: CreateCategoryDto): import(".prisma/client").Prisma.Prisma__CategoryClient<{
        id: number;
        name: string;
        createdAt: Date;
        description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, dto: UpdateCategoryDto): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        description: string | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date;
        description: string | null;
    }>;
}
