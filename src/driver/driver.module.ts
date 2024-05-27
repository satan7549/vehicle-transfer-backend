import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver.entity';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';

@Module({
  imports: [TypeOrmModule.forFeature([Driver])],
  controllers: [DriverController],
  providers: [DriverService],
  exports: [TypeOrmModule],
})
export class DriverModule {}
