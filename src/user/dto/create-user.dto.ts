import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsBoolean
} from 'class-validator';
import { IsJSON } from 'class-validator';
import { IContent } from '../interface/user';


// create-user-dto
export class CreateUserDto {
  @IsString()
  userName?: string;

  @IsString()
  password?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsBoolean()
  isActivated?: boolean;
}
