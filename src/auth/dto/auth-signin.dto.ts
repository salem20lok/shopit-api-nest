import { IsNotEmpty } from 'class-validator';

export class AuthSigninDto {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
}
