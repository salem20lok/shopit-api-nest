import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/Update-User.Dto';
import { CreateUserDto } from './dto/Create-User.Dto';
import { UpdatePasswordDto } from './dto/updatePassword.Dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAllUser(): Promise<User[]> {
    const user: User[] = await this.userModel.find();
    return user;
  }

  async getUserByID(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) throw new NotFoundException(`user Id: ${id}  not exist `);
      return user;
    } catch (e) {
      throw new NotFoundException(`user Id: ${id}  not exist `);
    }
  }

  async updateUser(updateUserDto: UpdateUserDto, id: string): Promise<User> {
    const newUser = {
      name: updateUserDto.name,
      email: updateUserDto.email,
      avatar: updateUserDto.avatar,
      role: updateUserDto.role,
    };
    if (!updateUserDto.name) {
      delete newUser.name;
    }
    if (!updateUserDto.email) {
      delete newUser.email;
    }
    if (!updateUserDto.avatar) {
      delete newUser.avatar;
    }
    if (!updateUserDto.role) {
      delete newUser.role;
    }
    const user = await this.userModel.findByIdAndUpdate(id, newUser);
    return user;
  }

  async deleteUserByID(id: string): Promise<void> {
    await this.userModel.findByIdAndRemove(id);
  }

  async UpdatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<void> {
    try {
      const user = await this.userModel.findById(id);
      if (
        user &&
        (await bcrypt.compare(
          updatePasswordDto.confirmePassword,
          user.password,
        ))
      ) {
        const salt = await bcrypt.genSalt();
        const newPassword = await bcrypt.hash(updatePasswordDto.Password, salt);
        await this.userModel.findByIdAndUpdate(id, { password: newPassword });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async CreateUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    try {
      return await user.save();
    } catch (e) {
      throw new ConflictException(
        `username : ${createUserDto.name} already exist`,
      );
    }
  }
}
