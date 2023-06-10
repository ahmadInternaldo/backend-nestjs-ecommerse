import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CONFIG_FEATURES } from '../utils/config';

@Module({
  imports: [...CONFIG_FEATURES],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
