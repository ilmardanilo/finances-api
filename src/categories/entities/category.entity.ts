import { Categoria, TipoCategoria } from '@prisma/client';

export class CategoryEntity implements Categoria {
  id: number;
  nome: string;
  icone: string;
  tipo: TipoCategoria;
  createdAt: Date;
  updatedAt: Date;
}
