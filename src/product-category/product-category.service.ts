import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ResponseInterface } from 'src/utils/response.interface';
import { TransformError } from 'src/utils/error-exception';
import { Transform } from 'src/utils/transform';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from './entities/product-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private repository: Repository<ProductCategory>,
  ) {}
  async create(
    createProductCategoryDto: CreateProductCategoryDto,
  ): Promise<ResponseInterface> {
    try {
      // createProductCategoryValidator
      await this.createProductCategoryValidator(createProductCategoryDto);

      // create product category template
      const createProductCategory = this.repository.create({
        name: createProductCategoryDto.name,
      });

      // save to database
      const productCategory = await this.repository.save(createProductCategory);

      return new Transform(
        productCategory,
        `${productCategory.name} success created`,
        '',
      ).transform();
    } catch (error) {
      new TransformError(error).transformError();
    }
  }

  async findAll(): Promise<ResponseInterface> {
    try {
      // find product categories
      const productCategories = await this.repository.find();

      // validate product categories length
      if (!productCategories.length) {
        throw new NotFoundException('no product categories are found.');
      }

      return new Transform(
        productCategories,
        'success find product categories',
        '',
      ).transform();
    } catch (error) {
      new TransformError(error).transformError();
    }
  }

  async findOne(uuid: string): Promise<ResponseInterface> {
    try {
      // find product category
      const productCategory = await this.repository.findOne({
        where: { uuid },
        relations: ['products'],
        join: {
          alias: 'product_categories',
          leftJoin: {
            products: 'product_categories.products',
          },
        },
      });

      // validate product category
      if (!productCategory) {
        throw new NotFoundException('product category not found.');
      }

      return new Transform(
        productCategory,
        'success find product category',
        '',
      ).transform();
    } catch (error) {
      new TransformError(error).transformError();
    }
  }

  async update(
    uuid: string,
    updateProductCategoryDto: UpdateProductCategoryDto,
  ): Promise<ResponseInterface> {
    try {
      // updateProductCategoryValidator
      await this.updateProductCategoryValidator(uuid, updateProductCategoryDto);

      // find product category
      const productCategory = await this.repository.findOne({
        where: { uuid },
      });

      // validate product category
      if (!productCategory) {
        throw new NotFoundException('product category not found.');
      }
      // update product category
      const updateProductCategory = await this.repository.save({
        uuid,
        name: updateProductCategoryDto.name,
        updated_at: Date.now(),
      });
      return new Transform(
        updateProductCategory,
        `${updateProductCategory.name} success updated`,
        '',
      ).transform();
    } catch (error) {
      new TransformError(error).transformError();
    }
  }

  async remove(uuid: string): Promise<ResponseInterface> {
    try {
      // find product category
      const productCategory = await this.repository.findOne({
        where: { uuid },
        loadRelationIds: {
          relations: ['products'],
        },
      });

      // validate product category
      if (!productCategory) {
        throw new NotFoundException('product category not found.');
      }

      // validate products in product category
      if (productCategory.products.length) {
        throw new BadRequestException(
          'this product category already has product.',
        );
      }
      await this.repository.delete(uuid);

      return new Transform(
        productCategory,
        `${productCategory.name} success deleted`,
        '',
      ).transform();
    } catch (error) {
      new TransformError(error).transformError();
    }
  }

  private async createProductCategoryValidator(
    createProductCategoryDto: CreateProductCategoryDto,
  ): Promise<void> {
    const productCategories = await this.repository.find({
      where: [{ name: createProductCategoryDto.name }],
    });
    if (productCategories.length) {
      productCategories.forEach((productCategory) => {
        if (productCategory.name === createProductCategoryDto.name) {
          throw new ConflictException('name already existed.');
        }
      });
    }
  }

  private async updateProductCategoryValidator(
    uuid: string,
    updateProductCategoryDto: UpdateProductCategoryDto,
  ): Promise<void> {
    const productCategories = await this.repository.find({
      where: [{ name: updateProductCategoryDto.name }],
    });
    if (productCategories.length) {
      productCategories.forEach((productCategory) => {
        if (
          productCategory.name === updateProductCategoryDto.name &&
          productCategory.uuid !== uuid
        ) {
          throw new ConflictException('name already existed.');
        }
      });
    }
  }
}
