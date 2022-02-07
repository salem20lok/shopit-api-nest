import { Avatar } from '../../user/user.interface';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class AuthSignupDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is not a format',
  })
  password: string;

  @IsOptional()
  avatar: Avatar;

  @IsOptional()
  role: string;

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  resetPasswordToken: string;

  @IsOptional()
  resetPasswordExpire: Date;
}
