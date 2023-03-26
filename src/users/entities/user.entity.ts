import { Usuario } from '@prisma/client';

export class UserEntity implements Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  admin: boolean;
  createdAt: Date;
  updatedAt: Date;
}
