import { IsDateString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @MinLength(6)
  @IsNotEmpty()
  passwordHash: string;

  @IsDateString()
  birthdate: string;
}
