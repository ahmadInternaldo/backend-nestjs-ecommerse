import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ResponseInterface } from '../utils/response.interface';
import { TransformError } from '../utils/error-exception';
import { Transform } from '../utils/transform';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<ResponseInterface> {
    try {
      // createUserValidator
      await this.createUserValidator(createUserDto);

      // hash password
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

      // create user template
      const createUser = this.repository.create({
        username: createUserDto.username,
        password: createUserDto.password,
      });

      // save database
      const user = await this.repository.save(createUser);

      // return saved user
      return new Transform(
        user,
        `${user.username} success created`,
        '',
      ).transform();
    } catch (error) {
      new TransformError(error).transformError();
    }
  }

  async findAll(): Promise<ResponseInterface> {
    try {
      // find users
      const users = await this.repository.find({
        select: ['uuid', 'username', 'created_at', 'updated_at'],
      });

      // validate user length
      if (!users.length) {
        throw new NotFoundException('no users are found.');
      }

      // return find users
      return new Transform(users, 'success find users', '').transform();
    } catch (error) {
      new TransformError(error).transformError();
    }
  }

  async findOne(uuid: string): Promise<ResponseInterface> {
    try {
      // find user
      const user = await this.repository.findOne({
        where: { uuid },
      });

      // validate user
      if (!user) {
        throw new NotFoundException('user not found');
      }

      return new Transform(user, 'success find user', '').transform();
    } catch (error) {
      new TransformError(error).transformError();
    }
  }

  async update(
    uuid: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseInterface> {
    try {
      // updateUserValidator
      await this.updateUserValidator(uuid, updateUserDto);

      // hash password if needed
      const updateUserPassword = await this.repository.findOne({
        where: { uuid },
      });

      // validate find updateUserPassword
      if (!updateUserPassword) {
        throw new NotFoundException('user not found.');
      }
      if (updateUserPassword.password !== updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      // update user to database
      const updateUser = await this.repository.save({
        uuid,
        username: updateUserDto.username,
        password: updateUserDto.password,
        updated_at: Date.now(),
      });

      return new Transform(
        updateUser,
        `${updateUser.username} success updated`,
        '',
      ).transform();
    } catch (error) {
      new TransformError(error).transformError();
    }
  }

  async remove(uuid: string): Promise<ResponseInterface> {
    try {
      // find user
      const user = await this.repository.findOne({
        where: { uuid },
      });

      // validate user
      if (!user) {
        throw new NotFoundException('user not found');
      }

      await this.repository.delete(uuid);

      return new Transform(
        user,
        `${user.username} success deleted`,
        '',
      ).transform();
    } catch (error) {
      new TransformError(error).transformError();
    }
  }

  private async createUserValidator(
    createUserDto: CreateUserDto,
  ): Promise<void> {
    const users = await this.repository.find({
      where: [{ username: createUserDto.username }],
    });

    if (users.length) {
      users.forEach((user) => {
        if (user.username === createUserDto.username) {
          throw new ConflictException('username already existed.');
        }
      });
    }
  }

  private async updateUserValidator(
    uuid: string,
    updateUserDto: UpdateUserDto,
  ): Promise<void> {
    const users = await this.repository.find({
      where: [{ username: updateUserDto.username }],
    });

    if (users.length) {
      users.forEach((user) => {
        if (user.username === updateUserDto.username && user.uuid !== uuid) {
          throw new ConflictException('username already existed.');
        }
      });
    }
  }
}
