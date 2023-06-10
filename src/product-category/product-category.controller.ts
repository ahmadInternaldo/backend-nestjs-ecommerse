import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ResponseInterface } from 'src/utils/response.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product Category API')
@Controller()
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post('product-category')
  async create(
    @Body()
    createProductCategoryDto: CreateProductCategoryDto,
  ): Promise<ResponseInterface> {
    return this.productCategoryService.create(createProductCategoryDto);
  }

  @Get('product-categories')
  async findAll(): Promise<ResponseInterface> {
    return this.productCategoryService.findAll();
  }

  @Get('product-category/:id')
  async findOne(@Param('uuid') uuid: string): Promise<ResponseInterface> {
    return this.productCategoryService.findOne(uuid);
  }

  @Patch('product-category/:uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateProductCategoryDto: UpdateProductCategoryDto,
  ): Promise<ResponseInterface> {
    return this.productCategoryService.update(uuid, updateProductCategoryDto);
  }

  @Delete('product-category/:uuid')
  async remove(@Param('uuid') uuid: string): Promise<ResponseInterface> {
    return this.productCategoryService.remove(uuid);
  }
}
