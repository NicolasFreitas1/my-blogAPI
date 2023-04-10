import { IsDate, IsString, MaxLength, MinLength } from 'class-validator';
import { DateTime } from 'luxon';
import { Transform } from 'class-transformer';

export class CreatePostDto {
  /**
   * Titulo da postagem
   * @example Meu blog!
   */
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  title: string;

  /**
   * Conteúdo da postagem
   * @example Conteúdo do meu blog!
   */

  @IsString()
  @MaxLength(200)
  content: string;

  /**
   * Data de criação da postagem
   * @example 10-04-2023
   */
  @IsDate()
  @Transform(({ value }) => DateTime.fromFormat(value, 'dd-MM-yyyy').toJSDate())
  createdAt: Date;
}
