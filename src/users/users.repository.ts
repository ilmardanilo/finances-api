import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.prismaService.usuario.create({
      data: createUserDto,
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.prismaService.usuario.findMany();
  }

  async findOne(params: { id?: number; email?: string }): Promise<UserEntity> {
    return this.prismaService.usuario.findUnique({
      where: params,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this.prismaService.usuario.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prismaService.usuario.delete({
      where: { id },
    });
  }
}
