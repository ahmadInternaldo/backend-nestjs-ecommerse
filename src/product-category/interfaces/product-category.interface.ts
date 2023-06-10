import { ProductInterface } from 'src/product/interfaces/product.interface';
import { BaseInterface } from '../../utils/base.interface';

export interface ProductCategoryInterface extends BaseInterface {
  name: string;
  products?: ProductInterface[];
}
