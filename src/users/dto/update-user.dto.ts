import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  MinLength,
  MaxLength,
  IsString,
  IsOptional,
  Matches,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  /**
   * Nome do usuário
   * @example admin
   */
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  name: string;

  /**
   * Senha atual do usuário.
   */
  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,30}$/gm)
  password: string;

  /**
   * Nova senha a ser implementada.
   */
  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,30}$/gm)
  newPassword: string;
}
