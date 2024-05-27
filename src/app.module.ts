import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { DriverModule } from './driver/driver.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), DriverModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
