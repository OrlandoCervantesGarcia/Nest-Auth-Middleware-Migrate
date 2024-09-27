import { setSeederFactory } from 'typeorm-extension';
import { ProfileEntity as Profile } from '../../src/profiles/entities/profile.entity';

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  GHOST = 'ghost',
}

export default setSeederFactory(Profile, (faker) => {
  const profile = new Profile();

  profile.role = faker.helpers.arrayElement([
    UserRole.ADMIN,
    UserRole.EDITOR,
    UserRole.GHOST,
  ]);

  profile.modules = faker.helpers.arrayElement(
    [
      { module: ['Products->product', 'Menu->categories'], detail: "master" },
      { module: ['Products->product', 'Menu->categories', 'Menu->manufacturer',], detail: "customer" },
      { module: ['Menu->categories', 'Menu->manufacturer',], detail: "customer" },
      { module: ['Products->product', 'Menu->orders','Menu->manufacturer',], detail: "customer" }
    ]
  );

  return profile;
});
