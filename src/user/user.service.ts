import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/Update-User.Dto';
import { CreateUserDto } from './dto/Create-User.Dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAllUser(): Promise<User[]> {
    return await this.userModel.find();
  }

  async getUserByID(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async updateUser(updateUserDto: UpdateUserDto, id: string): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto);
    return user;
  }

  async deleteUserByID(id: string): Promise<void> {
    await this.userModel.findByIdAndRemove(id);
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
