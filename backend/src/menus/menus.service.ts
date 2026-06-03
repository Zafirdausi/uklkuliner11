import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto, UpdateMenuDto } from './dto/menu.dto';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.menu.findMany({
      include: { category: true },
      where: { isAvailable: true },
    });
  }

  findAllAdmin() {
    return this.prisma.menu.findMany({ include: { category: true } });
  }

  async findOne(id: number) {
    const menu = await this.prisma.menu.findUnique({ where: { id }, include: { category: true } });
    if (!menu) throw new NotFoundException('Menu tidak ditemukan');
    return menu;
  }

  // == PERBAIKAN FUNGSI CREATE ==
  async create(dto: CreateMenuDto) {
    try {
      // 1. Pisahkan categoryId dari data menu lainnya
      const { categoryId, ...menuData } = dto;

      // 2. Simpan ke database dengan memetakan relasi connect secara benar
      return await this.prisma.menu.create({
        data: {
          ...menuData,
          price: Number(menuData.price), // Antisipasi jika frontend mengirim string angka
          stock: menuData.stock ? Number(menuData.stock) : 0,
          category: {
            connect: { id: Number(categoryId) }, // Menghubungkan id kategori ke tabel Category
          },
        },
        include: { category: true },
      });
    } catch (error: any) {
      console.error('Prisma Create Menu Error:', error);
      throw new InternalServerErrorException(error.message || 'Gagal menambahkan menu ke database');
    }
  }

  // == PERBAIKAN FUNGSI UPDATE ==
  async update(id: number, dto: UpdateMenuDto) {
    await this.findOne(id); // Pastikan menu ada
    
    try {
      const { categoryId, ...menuData } = dto;

      return await this.prisma.menu.update({
        where: { id: Number(id) },
        data: {
          ...menuData,
          ...(menuData.price && { price: Number(menuData.price) }),
          ...(menuData.stock && { stock: Number(menuData.stock) }),
          ...(categoryId && {
            category: {
              connect: { id: Number(categoryId) },
            },
          }),
        },
        include: { category: true },
      });
    } catch (error: any) {
      console.error('Prisma Update Menu Error:', error);
      throw new InternalServerErrorException(error.message || 'Gagal memperbarui menu');
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.menu.delete({ where: { id: Number(id) } });
  }
}