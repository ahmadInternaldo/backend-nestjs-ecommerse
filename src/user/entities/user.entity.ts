import Base from '../../utils/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserInterface } from '../interfaces/user-interface';

@Entity('users')
export class User extends Base implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  uuid?: string;

  @Column('varchar', { name: 'username', nullable: false, unique: true })
  username: string;

  @Column('text', { name: 'password', nullable: false })
  password: string;

  @Column({ type: 'bigint', name: 'created_at', nullable: false })
  created_at: number | Date;

  @Column({ type: 'bigint', name: 'updated_at', nullable: true })
  updated_at?: number | Date;
}
