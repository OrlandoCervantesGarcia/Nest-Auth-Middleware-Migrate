import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { DataSourceOptions } from 'typeorm/data-source';

import InitSeeder from '../seeds/init.seeder';

//ConfigModule.forRoot({ envFilePath: '.env' });

ConfigModule.forRoot({ isGlobal: true });
const options = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(String(process.env.POSTGRES_PORT), 10) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [__dirname + '/../../src/**/*.entity.ts'],
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/../migrations/**/*.ts'],
  seeds: [InitSeeder],
  synchronize: true,
  logging: true,
  ssl: process.env?.MODE === 'PROD' && { rejectUnauthorized: false }
};

export const source = new DataSource(options as DataSourceOptions & SeederOptions);