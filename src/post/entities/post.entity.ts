import { Post } from '@prisma/client';

export class PostEntity implements Post {
  /**
   * Id da postagem
   */
  id: number;
  /**
   *  Id do usuário
   */
  userId: number;
  /**
   * Titulo da postagem
   */
  title: string;
  /**
   * Conteúdo da postagem
   */
  content: string;

  /**
   * Data de postagem
   */
  createdAt: Date;
  /**
   * Data de atualização da
   */
  updatedAt: Date;

  constructor(partial: Partial<PostEntity>) {
    Object.assign(this, partial);
  }
}
