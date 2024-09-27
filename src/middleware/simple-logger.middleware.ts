import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';

@Injectable()
export class SimpleLoggerMiddleware implements NestMiddleware {
  use(res: Request, req: Response, next: NextFunction) {
    // do some tasks
    console.log('Executing request!');
    if(false)
      throw new BadRequestException('Goodby World');
    else
      next();
  }
}