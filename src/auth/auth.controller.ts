import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignupDto } from './dto/auth-signup.dto';
import { Promise } from 'mongoose';
import { User } from '../user/schemas/user.schema';
import { AuthSigninDto } from './dto/auth-signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('signup')
  signUp(@Body() auth: AuthSignupDto): Promise<User> {
    return this.AuthService.singUp(auth);
  }

  @Post('signin')
  signIn(@Body() auth: AuthSigninDto): Promise<{ accessToken: string }> {
    return this.AuthService.singIn(auth);
  }
}
