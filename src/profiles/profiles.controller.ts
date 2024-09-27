import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfileService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profiles') //route group
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
  ) {}

  @Post()
  async create(
    @Body() createProfileDto: CreateProfileDto,
  ) {
    try {
      await this.profileService.create(
        createProfileDto,
      );

      return {
        success: true,
        message: 'Profile Created Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get()
  async findAll() {
    try {
      const data =
        await this.profileService.findAll();
      return {
        success: true,
        data,
        message: 'Profile Fetched Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data =
        await this.profileService.findOne(+id);
      return {
        success: true,
        data,
        message: 'Profile Fetched Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    try {
      await this.profileService.update(
        +id,
        updateProfileDto,
      );
      return {
        success: true,
        message: 'Profile Updated Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.profileService.remove(+id);
      return {
        success: true,
        message: 'Profile Deleted Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
