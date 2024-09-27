import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  Headers
} from '@nestjs/common';
import { UserService as UsersService } from '../../src/user/user.service';
import { RegisterDto } from './dto/register.dto';

import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { hash } from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { jwtConstants } from '../../src/auth/constants/jwt.constant';


@Injectable()
export class AuthService {

  constructor( private readonly usersService: UsersService, private readonly jwtService: JwtService ) {}

  async register({ userName, email, password }: RegisterDto) {

    const user = await this.usersService.findOneByEmail(email);

    const fullName = userName;

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const passTemp: string = Math.random().toString(36).substring(0, 7);
    const passHash: string = await bcryptjs.hash(password || passTemp, 10);
    await this.usersService.create( { userName:fullName, email, password: passHash} );
    return { userName:fullName, email , password:password || passTemp};
    
  }

  async login({ email, password }: LoginDto) {
    
    const user = await this.usersService.findByEmailWithPassword(email);
    if (!user) {
      throw new UnauthorizedException('email is wrong');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('password is wrong');
    }  

    
    await this.usersService.update( user.id, { isActivated:true } );
    const payload = { email: user.email, role: user.profile.role };
    const token = await this.jwtService.signAsync( payload );

    return { token, email, role: user.profile.role };
  }

  async profile({ email, role }: { email: string; role: string }) {
    return await this.usersService.findOneByEmail(email);
  }

  async refresh(headers: Headers) {

    const [type, token] = headers['authorization']?.split(' ') ?? [];
    const token_:string =  type === 'Bearer' ? token : undefined;

    const payload = await this.jwtService.verifyAsync(token_, { secret: process.env?.ACCESS_TOKEN_SECRET/*jwtConstants.secret*/ });

    const payload_ = { email: payload.email, role: payload.role };
    const tokenRefresh = await this.jwtService.signAsync( payload_ );

    return { refreshToken: tokenRefresh, email:payload_.email, role: payload_.role };
  }

  async logout(headers: Headers) {

    const [type, token] = headers['authorization']?.split(' ') ?? [];
    const token_:string =  type === 'Bearer' ? token : undefined;

    const payload = await this.jwtService.verifyAsync(token_, { secret: process.env?.ACCESS_TOKEN_SECRET/*jwtConstants.secret*/ });
    await this.usersService.logout(payload.email, { isActivated: false });
    
    const payload_ = { email: payload.email, role: payload.role };

    return { token: null, email: payload_.email, role: payload_.role };
    
  }
  
}
