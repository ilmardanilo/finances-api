import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UsersRepository } from './users.repository';
import { HashService } from '../security/hash/hash.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PrismaService, HashService],
})
export class UsersModule {}
