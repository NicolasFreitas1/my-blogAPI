import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreatePostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto, currentUser): Promise<Post> {
    const createdPost = await this.prisma.post.create({
      data: {
        ...createPostDto,
        userId: currentUser.id,
      },
    });
    return createdPost;
  }

  findAllPosts() {
    return this.prisma.post.findMany();
  }
  findPostById(id: number) {
    return this.prisma.post.findUniqueOrThrow({ where: { id } });
  }
  findAllUserPosts(currentUser) {
    return this.prisma.post.findMany({ where: { userId: currentUser.id } });
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
    currentUser,
  ): Promise<Post> {
    await this.getUserId(id, currentUser);
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async remove(id: number, currentUser) {
    await this.getUserId(id, currentUser);
    return this.prisma.post.delete({ where: { id } });
  }

  async getUserId(id: number, currentUser: UserEntity) {
    const post = await this.prisma.post.findUniqueOrThrow({ where: { id } });
    const userId = post.userId;

    if (userId != currentUser.id) {
      throw new Error('You cannot delete/edit post of another user');
    }
  }
}
