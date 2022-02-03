import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/Create-User.Dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/Update-User.Dto';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  getAllUserById(@Param('id') id: string): Promise<User[]> {
    return this.UserService.getAllUser();
  }

  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.UserService.getUserByID(id);
  }

  @Post()
  CreateUser(@Body() CreateUser: CreateUserDto): Promise<User> {
    return this.UserService.CreateUser(CreateUser);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDto,
  ): Promise<User> {
    return this.UserService.updateUser(updateUser, id);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.UserService.deleteUserByID(id);
  }
}
