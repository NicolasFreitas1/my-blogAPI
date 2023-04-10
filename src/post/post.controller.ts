import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PostEntity } from './entities/post.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller('post')
@ApiTags('Post')
@ApiBearerAuth()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() currentUser: UserEntity,
  ): Promise<PostEntity> {
    const post = await this.postService.create(createPostDto, currentUser);
    return new PostEntity(post);
  }

  @Get()
  findAll() {
    return this.postService.findAllPosts();
  }

  @Get('posts')
  findOne(@CurrentUser() currentUser: UserEntity) {
    return this.postService.findAllUserPosts(currentUser);
  }
  @Get(':id')
  findUserById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findPostById(id);
  }

  @Patch(':id')
  update(
    @Body() updatePostDto: UpdatePostDto,
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return this.postService.update(id, updatePostDto, currentUser);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: UserEntity,
  ) {
    return this.postService.remove(id, currentUser);
  }
}
