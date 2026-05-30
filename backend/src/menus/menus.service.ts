import { Injectable, NotFoundException } from '@nestjs/common';
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

  create(dto: CreateMenuDto) {
    return this.prisma.menu.create({ data: dto, include: { category: true } });
  }

  async update(id: number, dto: UpdateMenuDto) {
    await this.findOne(id);
    return this.prisma.menu.update({ where: { id }, data: dto, include: { category: true } });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.menu.delete({ where: { id } });
  }
}
