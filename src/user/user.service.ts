import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
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

  findAllUsers() {
    return this.prisma.user.findMany();
  }
  findUserById(id: number) {
    return this.prisma.user.findUniqueOrThrow({ where: { id } });
  }

  findByLogin(login: string) {
    return this.prisma.user.findUniqueOrThrow({ where: { login } });
  }

  deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }

  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }
}
