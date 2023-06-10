import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseInterface } from './base.interface';

@Entity()
export default class Base extends BaseEntity implements BaseInterface {
  @PrimaryGeneratedColumn('uuid')
  uuid?: string;

  @Column('bigint', { name: 'created_at', nullable: false })
  created_at: number | Date;

  @Column('bigint', { name: 'updated_at', nullable: true })
  updated_at?: number | Date;

  @BeforeInsert()
  createTimestamps() {
    this.created_at = Date.now();
  }

  @AfterLoad()
  getTimeStamps() {
    this.created_at = new Date(+this.created_at + 25200000);
    if (this.updated_at) {
      this.updated_at = new Date(+this.updated_at + 25200000);
    }
  }
}
