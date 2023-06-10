import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const dataSourceOption: DataSourceOptions = {
  type: 'postgres',
  host: process.env.HOST,
  database: `${process.env.DATABASE}-${process.env.NODE_ENV}`,
  port: +process.env.PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  entities: [
    'dist/src/user/**/*.entity.js',
    'dist/src/product-category/**/*.entity.js',
    'dist/src/product/**/*.entity.js',
  ],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: process.env.NODE_ENV === 'development' ? true : false,
  // logging: process.env.NODE_ENV === 'development' ? true : false,
};
const dataSource = new DataSource(dataSourceOption);
export default dataSource;
