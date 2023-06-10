import { IsEmpty, IsNotEmpty, Length, NotContains } from 'class-validator';
import { UserInterface } from '../interfaces/user-interface';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements UserInterface {
  @IsNotEmpty()
  @Length(6, 15)
  @NotContains(':')
  @NotContains(';')
  @ApiProperty({
    name: 'username',
    type: String,
    required: true,
    example: 'admin',
  })
  username: string;

  @IsNotEmpty()
  @Length(6, 15)
  @NotContains(':')
  @NotContains(';')
  @ApiProperty({
    name: 'password',
    type: String,
    required: true,
    example: 'password',
  })
  password: string;

  @IsEmpty()
  uuid?: string;
  @IsEmpty()
  created_at: number | Date;
  @IsEmpty()
  updated_at?: number | Date;
}
