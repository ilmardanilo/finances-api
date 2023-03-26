import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
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
        'Já existe um usuário com esse email',
      );
    }

    const passwordHash = await this.hashService.generateHash(senha);

    return this.usersRepository.create({
      ...createUserDto,
      senha: passwordHash,
    });
  }

  async findAll() {
    return this.usersRepository.findAll();
  }

  async findOne(id: number) {
    return this.usersRepository.findOne({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ id });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne({ id });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.usersRepository.remove(id);
  }
}
