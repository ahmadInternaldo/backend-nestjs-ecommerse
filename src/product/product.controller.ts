import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ResponseInterface } from 'src/utils/response.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product API')
@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('product')
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ResponseInterface> {
    return this.productService.create(createProductDto);
  }

  @Get('products')
  async findAll(): Promise<ResponseInterface> {
    return this.productService.findAll();
  }

  @Get('product/:uuid')
  async findOne(@Param('uuid') uuid: string): Promise<ResponseInterface> {
    return this.productService.findOne(uuid);
  }

  @Patch('product/:uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ResponseInterface> {
    return this.productService.update(uuid, updateProductDto);
  }

  @Patch('product/:uuid/activate')
  async activate(@Param('uuid') uuid: string): Promise<ResponseInterface> {
    return this.productService.activate(uuid);
  }

  @Patch('product/:uuid/deactivate')
  async deactivate(@Param('uuid') uuid: string): Promise<ResponseInterface> {
    return this.productService.deactivate(uuid);
  }
}
