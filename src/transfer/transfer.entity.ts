import { Driver } from 'src/driver/driver.entity';
import { Vehicle } from 'src/vechicle/vehicle.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Transfer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Driver)
  // @JoinColumn({ name: 'fromDriverId' })
  fromDriver: Driver;

  @ManyToOne(() => Driver)
  // @JoinColumn({ name: 'toDriverId' })
  toDriver: Driver;

  @ManyToOne(() => Vehicle)
  // @JoinColumn({ name: 'vehicleId' })
  vehicle: Vehicle;

  @CreateDateColumn()
  transferDate: Date;
}
