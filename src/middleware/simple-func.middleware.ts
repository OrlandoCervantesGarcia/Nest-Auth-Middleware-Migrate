import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';

export function simpleFunc(req: Request, res: Response, next: NextFunction) {
  // In here do some stuff :p
  console.log('Executing request after the funtion middleware...');
  //throw new BadRequestException('Goodby World');
  next();
}
