// transfer.service.ts
import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common'; // Removed Body import
import { InjectRepository } from '@nestjs/typeorm';
import { Transfer } from './transfer.entity';
import { Repository } from 'typeorm';
import { Driver } from 'src/driver/driver.entity';
import { Vehicle } from 'src/vechicle/vehicle.entity';
import { CreateTransferDto, FindTransferDto } from 'src/validation/transfer.dto';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(Transfer)
    private readonly transferRepository: Repository<Transfer>,
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}



  async create(transferData: CreateTransferDto):Promise<Transfer> { 
    const {toDriverId, vehicleNumber } = transferData; 

    const vehicle = await this.vehicleRepository.findOne({where: { vehicleNumber },
      relations: ['currentDriver']})
  
    if(vehicle.currentDriver?.id===toDriverId){
      throw new NotAcceptableException('Current driver and new driver can not be same ');
    }

   
    const fromDriver = vehicle.currentDriver!==null ? vehicle.currentDriver : null;
  
    const toDriver = await this.driverRepository.findOneBy({ id: toDriverId });

    if ( !toDriver || !vehicle) {
      throw new NotFoundException('Invalid transfer data: One of the entities does not exist');
    }

    const transfer = this.transferRepository.create({
      fromDriver,
      toDriver,
      vehicle,
    });

    // Update the currentDriver of the vehicle
    vehicle.currentDriver = toDriver;

    // Save the updated vehicle entity
    await this.vehicleRepository.save(vehicle);

    return await this.transferRepository.save(transfer);
    
  }


  async findAll(query:FindTransferDto): Promise<Transfer[]> {
    const { search,vechileNumber}  = query

    const qb = this.transferRepository.createQueryBuilder('transfer')
    .leftJoinAndSelect('transfer.fromDriver', 'fromDriver')
    .leftJoinAndSelect('transfer.toDriver', 'toDriver')
    .leftJoinAndSelect('transfer.vehicle', 'vehicle');
  
    return await qb.getMany();
  
  }
  
  async findOne(id:number):Promise<Transfer | null > {
    const transfer = await this.transferRepository.findOneBy({ id });
  
    if (!transfer) {
      throw new NotFoundException(`Transfer with id ${id} not found`);
    }
    return transfer
  }


}