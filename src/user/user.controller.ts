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
import { Roles } from '../auth/authorization/roles.decorator';
import { RoleEnum } from '../auth/authorization/role.enum';
import { RolesGuard } from '../auth/authorization/roles.guard';
import { GetUser } from '../auth/get-user.decorator';
import { UpdatePasswordDto } from './dto/updatePassword.Dto';

@Controller('user')
@UseGuards(AuthGuard(), RolesGuard)
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  @Roles(RoleEnum.admin)
  getAllUser(): Promise<User[]> {
    return this.UserService.getAllUser();
  }

  @Get(':id')
  @Roles(RoleEnum.admin)
  getUserById(@Param('id') id: string): Promise<User> {
    return this.UserService.getUserByID(id);
  }

  @Post()
  @Roles(RoleEnum.admin)
  CreateUser(@Body() CreateUser: CreateUserDto): Promise<User> {
    return this.UserService.CreateUser(CreateUser);
  }

  @Put()
  updateUser(
    @GetUser() id: string,
    @Body() updateUser: UpdateUserDto,
  ): Promise<User> {
    return this.UserService.updateUser(updateUser, id);
  }

  @Delete(':id')
  @Roles(RoleEnum.admin)
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.UserService.deleteUserByID(id);
  }

  @Put('change-password')
  UpdatePassword(
    @GetUser() id: string,
    @Body() updatePassword: UpdatePasswordDto,
  ): Promise<void> {
    return this.UserService.UpdatePassword(id, updatePassword);
  }
}
