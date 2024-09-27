import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { IsJSON } from 'class-validator';
import { IContent } from '../interface/profile';

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  GHOST = 'ghost',
}

// create-user-dto
export class CreateProfileDto {
  @IsNotEmpty()
  role: UserRole;

  @IsJSON()
  modules: IContent;
}
