import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { AuthSignupDto } from './dto/auth-signup.dto';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../user/schemas/user.schema';
import { AuthSigninDto } from './dto/auth-signin.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadInterface } from './jwt-payload.interface';
import { ForgetPasswordUserDto } from './dto/ForgetPassword-User.Dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    private JwtService: JwtService,
    private readonly mailerService: MailerService,
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

  async forgetPassword(forgetPassword: ForgetPasswordUserDto): Promise<void> {
    try {
      // search user
      const user = await this.UserModel.findOne({
        email: forgetPassword.email,
      });
      if (!user) {
        throw new NotFoundException(
          `this email : ${forgetPassword.email} not Exist`,
        );
      }

      const payload: JwtPayloadInterface = {
        email: user.email,
        _id: user._id,
      };
      const accessToken: string = await this.JwtService.sign(payload);

      const message = ` <h1> Bonjour madame/monsier :${user.name}</h1> <br/>
  <p>Vous avez recu un message pour changer votre mot de passe</p>
  <a href="http://localhost:3000/user/changePasword/?token=${accessToken}">Link_forget_password</a>`;

      this.mailerService
        .sendMail({
          to: 'salemlokmani99@gmail.com', // list of receivers
          from: 'salemlokmani99@gmail.com', // sender address
          subject: 'Testing Nest MailerModule ✔', // Subject line
          text: 'welcome', // plaintext body
          html: message, // HTML body content
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      throw new NotFoundException(
        `this email : ${forgetPassword.email} not Exist`,
      );
    }
  }

  async changePassword(
    id: ObjectId,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const salt = await bcrypt.genSalt();
    changePasswordDto.password = await bcrypt.hash(
      changePasswordDto.password,
      salt,
    );
    await this.UserModel.findByIdAndUpdate(id, {
      password: changePasswordDto.password,
    });
  }
}
