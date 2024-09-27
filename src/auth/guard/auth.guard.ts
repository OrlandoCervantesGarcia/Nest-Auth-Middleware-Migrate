import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from '../constants/jwt.constant';
import { ROLES_KEY, Roles } from '../decorators/roles.decorator';
import { SetMetadata } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  //constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);
    
    if (!token) {
      throw new UnauthorizedException();
    }

    //console.log('etyurewt')

    try {

      const payload = await this.jwtService.verifyAsync(token, { secret: process.env?.ACCESS_TOKEN_SECRET/*jwtConstants.secret*/ });
      request['user'] = payload;

      const userActivited: any =
        await this.userRepository.findOneBy({
          email:payload.email,
      });
      
      if(!userActivited.isActivated)throw new UnauthorizedException({user:'incativited'});

    } catch {

      throw new UnauthorizedException();

    }

    return true;

  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

}
