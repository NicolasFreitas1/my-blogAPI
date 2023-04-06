import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.hashPassword(createUserDto.password);
    const createdUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
    return { ...createdUser, password: undefined };
  }
  private hashPassword(password: string): Promise<string> {
    const PASSWORD_ROUNDS = 10;
    return hash(password, PASSWORD_ROUNDS);
  }

  findAll() {
    return `This action returns all user`;
  }

  findByLogin(login: string) {
    return this.prisma.user.findUniqueOrThrow({ where: { login } });
  }
}
