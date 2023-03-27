import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const { nome } = createCategoryDto;

    const category = await this.categoriesRepository.findOne({ nome });

    if (category) {
      throw new UnprocessableEntityException(
        'Já existe uma categoria com esse nome',
      );
    }

    return this.categoriesRepository.create(createCategoryDto);
  }

  async findAll(): Promise<CategoryEntity[]> {
    return this.categoriesRepository.findAll();
  }

  async findOne(id: number): Promise<CategoryEntity> {
    const category = await this.categoriesRepository.findOne({ id });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    const category = await this.categoriesRepository.findOne({ id });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    await this.categoriesRepository.update(id, updateCategoryDto);
  }

  async remove(id: number): Promise<void> {
    const category = await this.categoriesRepository.findOne({ id });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    await this.categoriesRepository.remove(id);
  }
}
