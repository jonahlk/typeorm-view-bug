import Entities               from './src/database/entities';
import {CustomNamingStrategy} from './src/database/custom-naming-strategy';


module.exports = {

  type: 'postgres',
  host: process.env.DATABASE_HOST!,
  port: Number(process.env.DATABASE_PORT)!,
  username: process.env.DATABASE_USERNAME!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  entities: Entities,
  namingStrategy: new CustomNamingStrategy(),
  migrations: [
    'src/app/**/*.entity.ts',
  ],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  synchronize: false,
};