import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { IsJSON } from 'class-validator';
import { IContent } from '../interface/user';
import { ProfileEntity as Profile } from '../../profiles/entities/profile.entity';


@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column('jsonb', {
    nullable: false,
    default: {},
  })
  content: IContent;

  @OneToOne(() => Profile)
  @JoinColumn()
  Profile: Profile;
}
