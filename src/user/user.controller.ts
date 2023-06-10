import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseInterface } from '../utils/response.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User API')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseInterface> {
    return this.userService.create(createUserDto);
  }

  @Get('users')
  async findAll(): Promise<ResponseInterface> {
    return this.userService.findAll();
  }

  @Get('user/:id')
  async findOne(@Param('uuid') uuid: string): Promise<ResponseInterface> {
    return this.userService.findOne(uuid);
  }

  @Patch('user/:uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseInterface> {
    return this.userService.update(uuid, updateUserDto);
  }

  @Delete('user:uuid')
  async remove(@Param('uuid') uuid: string): Promise<ResponseInterface> {
    return this.userService.remove(uuid);
  }
}
