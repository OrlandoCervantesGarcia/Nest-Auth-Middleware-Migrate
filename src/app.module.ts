import { ConfigModule,ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entities/user.entity';
import { ProfileEntity } from './profiles/entities/profile.entity';
import { ProfilesModule } from './profiles/profiles.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import helmet from 'helmet';
import { SimpleLoggerMiddleware } from './middleware';
import { AuthModule } from './auth/auth.module';
import  {jwtConstants} from './auth/constants/jwt.constant'
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guard/roles.guard';

var cors = require('cors');

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      password: process.env.POSTGRES_PASSWORD,
      username: process.env.POSTGRES_USER,
      database: process.env.POSTGRES_DATABASE,
      entities: [UserEntity, ProfileEntity],
      synchronize: true,
      logging: true,
      ssl: process.env?.MODE === 'PROD' && {
        rejectUnauthorized: false,
      },
    }),
    UserModule,
    ProfilesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService/* ,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }, */
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        SimpleLoggerMiddleware,
        cors(),
        helmet(),
      )
      .forRoutes('*');
  }
}
