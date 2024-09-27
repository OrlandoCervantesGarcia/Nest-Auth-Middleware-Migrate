import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { simpleFunc, simpleFunc2 } from '../middleware';

@Module({
  imports: [ TypeOrmModule.forFeature([UserEntity]) ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})

export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) { consumer.apply(simpleFunc2).forRoutes('users'); }
}
