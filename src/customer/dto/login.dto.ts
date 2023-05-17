
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import {PartialType} from '@nestjs/mapped-types'

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(12)
  password: string;
}

export class RegisterDto extends PartialType(LoginDto)  {
  @IsNotEmpty()
  name: string;

/*   @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(12)
  password: string; */
}
