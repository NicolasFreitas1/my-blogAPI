import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import {
  IsDate,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DateTime } from 'luxon';
import { Transform } from 'class-transformer';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  /**
   * Titulo da postagem
   * @example Meu blog!
   */
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  title: string;

  /**
   * Conteúdo da postagem
   * @example Conteúdo do meu blog!
   */
  @IsOptional()
  @IsString()
  @MaxLength(200)
  content: string;

  /**
   * Data de modificação da postagem
   * @example 10-04-2023
   */
  @IsDate()
  @Transform(({ value }) => DateTime.fromFormat(value, 'dd-MM-yyyy').toJSDate())
  updatedAt: Date;
}
