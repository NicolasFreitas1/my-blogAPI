import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, MinLength } from 'class-validator';
import { CreateUserDto } from 'src/user/dto';

export class LoginDto extends PartialType(CreateUserDto) {
  /**
   * Id do usuário
   * @example 1
   */
  id: number;
  /**
   *  Nome do usuário
   *  @example admin
   */
  name: string;
  /**
   * Login do usuário.
   * @example admin
   */
  @IsNotEmpty()
  @MinLength(5)
  login: string;

  /**
   * Senha do usuário.
   * @example Admin12345
   */
  @IsNotEmpty()
  password: string;
}
