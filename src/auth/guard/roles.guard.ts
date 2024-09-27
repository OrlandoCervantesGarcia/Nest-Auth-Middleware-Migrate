import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../profiles/entities/profile.entity';
import { ROLES_KEY, Roles } from '../decorators/roles.decorator';
import { ActiveUser } from '../../common/decorators/active-user.decorator';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants/jwt.constant';
import { Role } from '../../common/enums/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) {}

  matchRoles(roles: string[], userRole: string) {
    return roles.some((role) => role === userRole);
  }

  canActivate(context: ExecutionContext): boolean {

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [ context.getHandler(), context.getClass() ]);
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return this.matchRoles(requiredRoles, user.role);
  }

}
