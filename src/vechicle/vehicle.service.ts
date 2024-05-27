import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from 'src/vechicle/vehicle.entity';
import { CreateVehicleDto, FindVehicleDto } from 'src/validation/vehicle.dto';
import { Repository } from 'typeorm';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async findAll(query:FindVehicleDto): Promise<Vehicle[]> {
    const { search,vehicleNumber,vehicleType}  = query

    const qb = this.vehicleRepository.createQueryBuilder('vehicle')
    .leftJoinAndSelect('vehicle.currentDriver', 'currentDriver')

    if (vehicleNumber) {
      qb.andWhere('vehicle.vehicleNumber = :vehicleNumber', { vehicleNumber: vehicleNumber.toUpperCase() });
    }

    if (vehicleType) {
      qb.andWhere('vehicle.vehicleType = :vehicleType', { vehicleType: vehicleType.toUpperCase() });
    }

    if (search) {
      qb.andWhere('(vehicle.vehicleNumber ILIKE :search OR vehicle.vehicleType ILIKE :search)', { search: `%${search}%` });
    }

    return await qb.getMany();

  }

  async findOne(id:number):Promise<Vehicle | null > {
    const vehicle = await this.vehicleRepository.findOneBy({ id });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle with id ${id} not found`);
    }
    return vehicle
  }

 async create(vechicleData: CreateVehicleDto):Promise<Vehicle> {

    const existVehicle = await this.vehicleRepository.findOneBy({ vehicleNumber: vechicleData.vehicleNumber });

    if (existVehicle) {
      throw new ConflictException(`Vehicle with number ${vechicleData.vehicleNumber} already exists`);
    }

    const vehicle = this.vehicleRepository.create(vechicleData);
    return await this.vehicleRepository.save(vehicle);
  }


}
