import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { HashService } from '../security/hash/hash.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, senha } = createUserDto;

    const user = await this.usersRepository.findOne({ email });

    if (user) {
      throw new UnprocessableEntityException(
        'Já existe um usuário com esse email.',
      );
    }

    const passwordHash = await this.hashService.generateHash(senha);

    return this.usersRepository.create({
      ...createUserDto,
      senha: passwordHash,
    });
  }

  async findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
