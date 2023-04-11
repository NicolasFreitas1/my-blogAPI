import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/user/entities/user.entity';

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
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
