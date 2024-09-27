import { DataSource } from 'typeorm';
import { runSeeders, Seeder, SeederFactoryManager } from 'typeorm-extension';

import ProfileFactory from 'database/factories/profile.factory';
import userFactory from 'database/factories/user.factory';
import ProfileSeeder from './profile.seeder';
import UserSeeder from './user.seeder';

export default class InitSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [ProfileSeeder, UserSeeder, ],
      factories: [ProfileFactory, userFactory],
    });
  }
}
