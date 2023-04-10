import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
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
