import { Avatar } from '../user.interface';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  name: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  avatar: Avatar;
  role: string[];
  createdAt: Date;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
}
