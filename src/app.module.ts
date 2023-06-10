import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CONFIG_FEATURES, CONFIG_ROOTS } from './utils/config';
import { UserModule } from './user/user.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ...CONFIG_ROOTS,
    ...CONFIG_FEATURES,
    UserModule,
    ProductCategoryModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
