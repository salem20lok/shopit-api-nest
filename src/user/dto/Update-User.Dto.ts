import { Avatar } from '../user.interface';

export class UpdateUserDto {
  name: string;
  email: string;
  password: string;
  avatar: Avatar;
  role: string[];
  createdAt: Date;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
}
