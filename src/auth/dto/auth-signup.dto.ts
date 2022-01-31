import { Avatar } from '../../user/user.interface';
import { IsNotEmpty } from 'class-validator';

export class AuthSignupDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;

  avatar: Avatar;
  role: string;
  createdAt: Date;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
}
