import { Injectable } from '@nestjs/common';
import { Comment } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    currentUser: UserEntity,
    postId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const createComment = await this.prisma.comment.create({
      data: {
        ...createCommentDto,
        postId: postId,
        userId: currentUser.id,
      },
    });
    return createComment;
  }

  findAll() {
    return this.prisma.comment.findMany();
  }

  findOne(id: number) {
    return this.prisma.post.findUniqueOrThrow({ where: { id } });
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
    currentUser,
  ): Promise<Comment> {
    await this.getUserId(id, currentUser);
    return this.prisma.comment.update({
      where: { id },
      data: updateCommentDto,
    });
  }

  async remove(id: number, currentUser) {
    await this.getUserId(id, currentUser);
    return this.prisma.comment.delete({ where: { id } });
  }

  async getUserId(id: number, currentUser: UserEntity) {
    const comment = await this.prisma.comment.findUniqueOrThrow({
      where: { id },
    });
    if (comment.userId != currentUser.id) {
      throw new Error('You cannot delete/edit post of another user');
    }
  }
}
