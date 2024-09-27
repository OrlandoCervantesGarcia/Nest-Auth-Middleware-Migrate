import { hash } from 'bcrypt';
import { setSeederFactory } from 'typeorm-extension';

import { UserEntity as User } from '../../src/user/entities/user.entity';
import { ProfileEntity as Profile } from '../../src/profiles/entities/profile.entity';



export default setSeederFactory(User, async (faker) => {
  
  const user = new User();
  const passText = faker.internet.password();
  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();
  user.fullName = `${passText} ${user.firstName} ${user.lastName}`;  
  user.userName = faker.internet.userName(user.firstName, user.lastName);
  user.email = faker.internet.email(user.firstName, user.lastName);
  user.password = await hash(passText, 10);
  user.phone = faker.phone.number();
  user.avatar = faker.image.avatar();
  //user.profile = null;
  user.isActivated = faker.datatype.boolean();

  return user;
});