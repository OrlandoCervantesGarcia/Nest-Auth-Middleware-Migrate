import { Module } from '@nestjs/common';
import { ProfileService } from './profiles.service';
import { ProfileController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileEntity]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfilesModule {}
