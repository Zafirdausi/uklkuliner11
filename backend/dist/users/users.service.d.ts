import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from '../auth/dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
export declare class UsersService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        message: string;
        token: string;
        user: {
            id: number;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: number;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
    getProfile(id: number): Promise<{
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        id: number;
    }>;
    findAll(): Promise<{
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        id: number;
    }[]>;
    findOne(id: number): Promise<{
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        id: number;
    }>;
}
