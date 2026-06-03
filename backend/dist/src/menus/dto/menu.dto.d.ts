export declare class CreateMenuDto {
    categoryId: number;
    name: string;
    description?: string;
    price: number;
    image?: string;
    stock: number;
}
export declare class UpdateMenuDto {
    categoryId?: number;
    name?: string;
    description?: string;
    price?: number;
    image?: string;
    stock?: number;
    isAvailable?: boolean;
}
