
import { Driver } from 'src/driver/driver.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vehicleNumber: string;

  @Column()
  vehicleType: string;

  @Column()
  pucCertificate: string;

  @Column()
  insuranceCertificate: string;

  @OneToOne(() => Driver, { nullable: true })
  @JoinColumn({ name: 'currentDriverId' })
  currentDriver: Driver | null;
  
}
