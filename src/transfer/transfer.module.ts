import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transfer } from './transfer.entity';
import { DriverModule } from 'src/driver/driver.module';
import { VehicleModule } from 'src/vechicle/vehicle.module';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transfer]),
  DriverModule, 
  VehicleModule,
],
  controllers: [TransferController],
  providers: [TransferService],
})
export class TransferModule {}
