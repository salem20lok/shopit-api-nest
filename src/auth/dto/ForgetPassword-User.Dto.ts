import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgetPasswordUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class JwtPayloadForgetPassword {
  email: string;
}
