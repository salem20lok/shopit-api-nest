import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthSignupDto } from './dto/auth-signup.dto';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../user/schemas/user.schema';
import { AuthSigninDto } from './dto/auth-signin.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadInterface } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    private JwtService: JwtService,
  ) {}

  async singUp(authCreateUser: AuthSignupDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    authCreateUser.password = await bcrypt.hash(authCreateUser.password, salt);
    const user = new this.UserModel(authCreateUser);
    try {
      return await user.save();
    } catch (err) {
      console.log(err);
      throw new ConflictException(
        `username : ${authCreateUser.name} already exist`,
      );
    }
  }

  async singIn(authSigninDto: AuthSigninDto): Promise<{ accessToken: string }> {
    const { email, password } = authSigninDto;
    const user = await this.UserModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayloadInterface = { email, _id: user._id };
      const accessToken: string = await this.JwtService.sign(payload);
      return { accessToken };
    } else throw new UnauthorizedException('please check your login correct');
  }
}
