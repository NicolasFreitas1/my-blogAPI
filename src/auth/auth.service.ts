import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login({ login, password }: LoginDto): Promise<AuthEntity> {
    const user = await this.userService.findByLogin(login);
    const passwordMatches = await compare(password, user.password);
    if (!passwordMatches) throw new Error('User or password wrong');

    return {
      id: user.id,
      name: user.name,
      login: user.login,
      token: await this.signUserToken(user.login),
    };
  }

  signUserToken(login: string): Promise<string> {
    return this.jwtService.signAsync(
      {
        login,
      },
      {
        expiresIn: '12h',
        secret: process.env.JWT_SECRET,
      },
    );
  }
}
