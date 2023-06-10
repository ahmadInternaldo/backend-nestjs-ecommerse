import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from 'db/data-source';
import { ProductCategory } from '../product-category/entities/product-category.entity';
import { User } from '../user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';

export const CONFIG_ROOTS = [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  TypeOrmModule.forRoot(dataSourceOption),
];

export const CONFIG_FEATURES = [
  TypeOrmModule.forFeature([User, ProductCategory, Product]),
  JwtModule.register({
    global: true,
    signOptions: {
      expiresIn: '7d',
    },
    secret: process.env.SECRET_KEY,
  }),
];
