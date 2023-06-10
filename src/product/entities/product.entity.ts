import Base from 'src/utils/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import {
  ProductInterface,
  ProductStatusEnum,
} from '../interfaces/product.interface';
import { ProductCategoryInterface } from 'src/product-category/interfaces/product-category.interface';
import { ProductCategory } from 'src/product-category/entities/product-category.entity';

@Entity('products')
export class Product extends Base implements ProductInterface {
  @Column('varchar', { name: 'name', nullable: false })
  name: string;

  @Column('float8', { name: 'price', nullable: false })
  price: number;

  @Column('enum', {
    name: 'status',
    nullable: false,
    enum: ProductStatusEnum,
    default: ProductStatusEnum.ACTIVE,
  })
  status: ProductStatusEnum;

  @Column('varchar', { name: 'product_category_uuid', nullable: false })
  product_category_uuid: string;

  @ManyToOne(
    () => ProductCategory,
    (productCategory) => productCategory.products,
    {
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'product_category_uuid' })
  product_category?: ProductCategoryInterface;
}
