import { ProductCategoryInterface } from 'src/product-category/interfaces/product-category.interface';
import { BaseInterface } from 'src/utils/base.interface';

export interface ProductInterface extends BaseInterface {
  name: string;
  price: number;
  status: ProductStatusEnum;
  product_category_uuid: string;
  product_category?: ProductCategoryInterface;
}

export enum ProductStatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
