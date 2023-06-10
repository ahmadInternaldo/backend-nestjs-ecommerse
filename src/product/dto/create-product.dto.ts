import { ProductCategoryInterface } from 'src/product-category/interfaces/product-category.interface';
import {
  ProductInterface,
  ProductStatusEnum,
} from '../interfaces/product.interface';
import { IsEmpty, IsNotEmpty, IsNumber, NotContains } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

export class CreateProductDto implements ProductInterface {
  @IsNotEmpty()
  @NotContains(':')
  @NotContains(';')
  @ApiProperty({
    name: 'name',
    type: String,
    required: true,
    example: 'test',
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    name: 'price',
    type: Number,
    required: true,
    example: 100000,
  })
  price: number;

  @IsNotEmpty()
  @ApiProperty({
    name: 'status',
    enum: ProductStatusEnum,
    required: true,
    example: ProductStatusEnum.INACTIVE,
  })
  status: ProductStatusEnum;

  @IsNotEmpty()
  @ApiProperty({
    name: 'product_category_uuid',
    type: String,
    required: true,
    example: uuidv4(),
  })
  product_category_uuid: string;

  @IsEmpty()
  product_category?: ProductCategoryInterface;

  @IsEmpty()
  uuid?: string;

  @IsEmpty()
  created_at: number | Date;

  @IsEmpty()
  updated_at?: number | Date;
}
