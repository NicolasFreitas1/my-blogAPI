import { IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
  /**
   * Conteúdo do comentário
   * @exemple Ótimas palavras!!! 👏👏👏
   */
  @IsString()
  @MaxLength(100)
  content: string;
}
