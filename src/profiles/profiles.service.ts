import {
  HttpException,
  Injectable,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async create(
    createProfileDto: CreateProfileDto,
  ): Promise<ProfileEntity> {
    const profileData =
      await this.profileRepository.create(
        createProfileDto,
      );
    return this.profileRepository.save(
      profileData,
    );
  }

  async findAll(): Promise<ProfileEntity[]> {
    return await this.profileRepository.find();
  }

  async findOne(
    id: number,
  ): Promise<ProfileEntity> {
    const profileData =
      await this.profileRepository.findOneBy({
        id,
      });
    if (!profileData) {
      throw new HttpException(
        'Profile Not Found',
        404,
      );
    }
    return profileData;
  }

  async update(
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileEntity> {
    const existingProfile = await this.findOne(
      id,
    );
    const profileData =
      this.profileRepository.merge(
        existingProfile,
        updateProfileDto,
      );
    return await this.profileRepository.save(
      profileData,
    );
  }

  async remove(
    id: number,
  ): Promise<ProfileEntity> {
    const existingProfile = await this.findOne(
      id,
    );
    return await this.profileRepository.remove(
      existingProfile,
    );
  }
}
