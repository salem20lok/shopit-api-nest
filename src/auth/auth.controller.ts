import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignupDto } from './dto/auth-signup.dto';
import { ObjectId, Promise } from 'mongoose';
import { User } from '../user/schemas/user.schema';
import { AuthSigninDto } from './dto/auth-signin.dto';
import { ForgetPasswordUserDto } from './dto/ForgetPassword-User.Dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { GetUser } from './get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

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

  @Post('forgetPassword')
  forgetPassword(@Body() forgetPassword: ForgetPasswordUserDto): Promise<void> {
    return this.AuthService.forgetPassword(forgetPassword);
  }

  @Post('changePassword')
  @UseGuards(AuthGuard())
  changePassword(
    @Body() changePassword: ChangePasswordDto,
    @GetUser() id: ObjectId,
  ): Promise<void> {
    return this.AuthService.changePassword(id, changePassword);
  }
}
