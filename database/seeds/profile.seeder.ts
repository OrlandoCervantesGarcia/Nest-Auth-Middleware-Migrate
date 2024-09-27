import { ProfileEntity as Profile } from '../../src/profiles/entities/profile.entity';
import { UserEntity as User } from '../../src/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class ProfileSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {

    
  }
}
