import { Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entities/auth.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller()
@ApiTags('Login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  login(@Body() loginUserDto: LoginDto): Promise<AuthEntity> {
    return this.authService.login(loginUserDto);
  }

  @Get('validateToken')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  validateToken(): string {
    return 'OK';
  }
}
