import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CONFIG_FEATURES } from 'src/utils/config';

@Module({
  imports: [...CONFIG_FEATURES],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
