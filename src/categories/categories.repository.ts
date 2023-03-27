import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryEntity } from './entities/category.entity';
import { TipoCategoria } from '@prisma/client';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    return this.prismaService.categoria.create({
      data: createCategoryDto,
    });
  }

  async findAll(): Promise<CategoryEntity[]> {
    return this.prismaService.categoria.findMany();
  }

  async findAllByType(typeCategory: TipoCategoria): Promise<CategoryEntity[]> {
    return this.prismaService.categoria.findMany({
      where: { tipo: typeCategory },
    });
  }

  async findOne(params: {
    id?: number;
    nome?: string;
  }): Promise<CategoryEntity> {
    return this.prismaService.categoria.findUnique({
      where: params,
    });
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    await this.prismaService.categoria.update({
      where: { id },
      data: { ...updateCategoryDto, updatedAt: new Date() },
    });
  }

  async remove(id: number): Promise<void> {
    await this.prismaService.categoria.delete({
      where: { id },
    });
  }
}
