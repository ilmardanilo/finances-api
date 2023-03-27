import { TipoCategoria } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  icone: string;

  @IsEnum(TipoCategoria)
  @IsNotEmpty()
  tipo: TipoCategoria;
}
