import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ResponseInterface } from 'src/utils/response.interface';
import { TransformError } from 'src/utils/error-exception';
import { Transform } from 'src/utils/transform';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductStatusEnum } from './interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto): Promise<ResponseInterface> {
    try {
      // createProductValidator
      await this.createProductValidator(createProductDto);

      // create product template
      const createProduct = this.repository.create({
        ...createProductDto,
        status: ProductStatusEnum.INACTIVE,
      });

      // save product
      const product = await this.repository.save(createProduct);

      return new Transform(
        product,
        `${product.name} success created.`,
        '',
      ).transform();
    } catch (error) {
      new TransformError(error).transformError();
    }
  }

  async findAll(): Promise<ResponseInterface> {
    try {
      // find products
      const products = await this.repository.find({
        relations: ['product_category'],
        join: {
          alias: 'products',
          leftJoin: {
            product_category: 'products.product_category',
          },
        },
      });

      // validate products length
      if (!products.length) {
        throw new NotFoundException('no products are found.');
      }

      return new Transform(products, 'success find products', '').transform();
    } catch (error) {
      new TransformError(error).transformError();
    }
  }

  async findOne(uuid: string): Promise<ResponseInterface> {
    try {
      // find product
      const product = await this.repository.findOne({
        where: { uuid },
        relations: ['product_category'],
      });

      // validate product
      if (!product) {
        throw new NotFoundException('product not found.');
      }

      return new Transform(product, 'success find product', '').transform();
    } catch (error) {
      new TransformError(error).transformError();
    }
  }

  async update(
    uuid: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ResponseInterface> {
    try {
      // updateProductValidator
      await this.updateProductValidator(uuid, updateProductDto);

      // find product
      const product = await this.repository.findOne({ where: { uuid } });

      // validate product
      if (!product) {
        throw new NotFoundException('product not found.');
      }

      // update product
      const updateProduct = await this.repository.save({
        uuid,
        name: updateProductDto.name,
        price: updateProductDto.price,
        updated_at: Date.now(),
      });

      return new Transform(
        updateProduct,
        `${updateProduct.name} success updated.`,
        '',
      ).transform();
    } catch (error) {
      new TransformError(error).transformError();
    }
  }

  async activate(uuid: string): Promise<ResponseInterface> {
    try {
      // find product
      const product = await this.repository.findOne({
        where: { uuid },
      });
      // validate product
      if (!product) {
        throw new NotFoundException('product not found.');
      }

      // update product
      const updateProduct = await this.repository.save({
        ...product,
        status: ProductStatusEnum.ACTIVE,
      });
      return new Transform(
        updateProduct,
        `${updateProduct.name} success activated`,
        '',
      ).transform();
    } catch (error) {
      new TransformError(error).transformError();
    }
  }

  async deactivate(uuid: string): Promise<ResponseInterface> {
    try {
      // find product
      const product = await this.repository.findOne({
        where: { uuid },
      });
      // validate product
      if (!product) {
        throw new NotFoundException('product not found.');
      }

      // update product
      const updateProduct = await this.repository.save({
        ...product,
        status: ProductStatusEnum.INACTIVE,
      });
      return new Transform(
        updateProduct,
        `${updateProduct.name} success deactivated`,
        '',
      ).transform();
    } catch (error) {
      new TransformError(error).transformError();
    }
  }

  private async createProductValidator(
    createProductDto: CreateProductDto,
  ): Promise<void> {
    const products = await this.repository.find({
      where: [
        {
          name: createProductDto.name,
          product_category_uuid: createProductDto.product_category_uuid,
        },
      ],
    });
    if (products.length) {
      products.forEach((product) => {
        if (product.name === createProductDto.name) {
          throw new ConflictException('name already existed.');
        }
      });
    }
  }

  private async updateProductValidator(
    uuid: string,
    updateProductDto: UpdateProductDto,
  ): Promise<void> {
    const products = await this.repository.find({
      where: [
        {
          name: updateProductDto.name,
          product_category_uuid: updateProductDto.product_category_uuid,
        },
      ],
    });
    if (products.length) {
      products.forEach((product) => {
        if (product.name === updateProductDto.name && product.name !== uuid) {
          throw new ConflictException('name already existed.');
        }
      });
    }
  }
}
