import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { IsJSON } from 'class-validator';
import { IContent } from '../interface/user';
import { ProfileEntity as Profile } from '../../profiles/entities/profile.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'full_name',
    type: 'varchar',
    length: 100,
    nullable: true,
    default: null,
  })
  fullName: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 100,
    nullable: true,
    default: null,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 100,
    nullable: true,
    default: null,
  })
  lastName: string;

  @Column({
    name: 'user_name',
    type: 'varchar',
    length: 100,
    unique: true,
  })
  userName: string;

  @Column({
    type: 'varchar',
    length: 320,
    nullable: true,
    default: null,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    select: true,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    default: null,
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    default: null,
  })
  avatar: string;

  @Column({
    name: 'is_activated',
    type: 'boolean',
    default: true,
  })
  isActivated: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  deletedAt: Date;

  @ManyToOne(
    () => Profile,
    (profile) => profile.user,
    {
      onDelete: 'CASCADE',
      orphanedRowAction: 'soft-delete',
    },
  )
  @JoinColumn({
    name: 'profile_uuid',
    referencedColumnName: 'id',
  })
  profile: Profile;
}
