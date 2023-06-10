import Base from '../../utils/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ProductCategoryInterface } from '../interfaces/product-category.interface';
import { Product } from 'src/product/entities/product.entity';
import { ProductInterface } from 'src/product/interfaces/product.interface';

@Entity('product_categories')
export class ProductCategory extends Base implements ProductCategoryInterface {
  @Column('varchar', { name: 'name', nullable: false, unique: true })
  name: string;

  @OneToMany(() => Product, (product) => product.product_category)
  products?: ProductInterface[];
}
