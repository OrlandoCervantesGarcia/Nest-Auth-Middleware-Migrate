import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { IsJSON } from 'class-validator';
import { IContent } from '../interface/profile';

import { UserEntity as User } from '../../user/entities/user.entity';


export enum UserRole {
  EDITOR = 'editor',
  ADMIN = 'admin',
  GHOST = 'ghost'
}

@Entity()
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GHOST,
  })
  role: UserRole;

  @Column('jsonb', {
    nullable: false,
    default: {},
  })
  modules: IContent;

  @OneToMany(
    () => User,
    (user) => user.profile,
  )
  user: User;
}
