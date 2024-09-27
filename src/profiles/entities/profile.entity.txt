import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';
import { IsJSON } from 'class-validator';
import { IContent } from '../interface/profile';

@Entity()
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column('jsonb', { nullable: false, default: {} })
  content: IContent;  
}
