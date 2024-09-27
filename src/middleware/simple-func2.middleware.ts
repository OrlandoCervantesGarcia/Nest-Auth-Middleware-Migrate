import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';


export function simpleFunc2(req: Request, res: Response, next: NextFunction) {
  // In here do some stuff :p
  console.log('2 - Executing request after the funtion middleware...');
  //throw new BadRequestException('Goodby World');
  next();
}


/*import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';

@Injectable()
export class simpleFunc2 implements NestMiddleware {
  use(res: Request, req: Response, next: NextFunction) {
    // do some tasks
    console.log('2 - Executing request!');
    if(true)
      throw new BadRequestException('Goodby World');
    else
      next();
  }
}*/
