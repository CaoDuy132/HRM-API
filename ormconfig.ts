import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
export const ormconfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: true,
  synchronize: false,
  entities: [__dirname + '/src/modules/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/src/config/database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
};
const ormConfig = new DataSource(ormconfig);
export default ormConfig;
