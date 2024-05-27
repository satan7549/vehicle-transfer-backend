import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'satan',
//   database: 'Vehicle_Transfer',
//   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//   synchronize: true,
// };

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: 'postgresql://vechile_transfer_owner:FLEZthuj4xT8@ep-bold-bird-a1pks0qm.ap-southeast-1.aws.neon.tech/vechile_transfer?sslmode=require',
  synchronize: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};
