import { IsEmpty, IsNotEmpty, Length, NotContains } from 'class-validator';
import { ProductCategoryInterface } from '../interfaces/product-category.interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductCategoryDto implements ProductCategoryInterface {
  @IsNotEmpty()
  @NotContains(':')
  @NotContains(';')
  @Length(3, 30)
  @ApiProperty({
    name: 'name',
    type: String,
    required: true,
    example: 'Testing',
  })
  name: string;

  @IsEmpty()
  uuid?: string;

  @IsEmpty()
  created_at: number | Date;

  @IsEmpty()
  updated_at?: number | Date;
}
