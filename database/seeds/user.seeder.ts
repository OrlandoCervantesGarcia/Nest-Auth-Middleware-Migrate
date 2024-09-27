import { hash } from 'bcrypt';
import { UserEntity as User } from '../../src/user/entities/user.entity';
import { ProfileEntity as Profile } from '../../src/profiles/entities/profile.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { setSeederFactory } from 'typeorm-extension';


export default class UserSeeder implements Seeder {

  public async run( dataSource: DataSource, factoryManager: SeederFactoryManager ): Promise<any> {
    const repository = dataSource.getRepository(User);
    const repositoryProfile = dataSource.getRepository(Profile);

    const profileFactory = await factoryManager.get(Profile);
    const resultProfile:Profile[] = await profileFactory.saveMany(3);

    const data = {
      userName: 'admin',
      password: await hash('admin', 10),
      isActivated: true,
    };

    const user = await repository.findOneBy({ userName: data.userName });
    if (!user) {
      await repository.insert([data]);
    }

    // ---------------------------------------------------
    const userFactory = await factoryManager.get(User);
    
    await userFactory.save();

    const resultUser:User[] = await userFactory.saveMany(40);

    await Promise.all(resultUser.map( async (j: User) => await repository.update({ id:j.id }, { profile: resultProfile[Math.floor(Math.random() * resultProfile.length)] })) );
  }
  
}