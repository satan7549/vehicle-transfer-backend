// driver.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Driver } from 'src/driver/driver.entity';
import { CreateDriverDto, FindDriverDto } from 'src/validation/driver.dto';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,
  ) {}

  async findAll(query: FindDriverDto): Promise<Driver[]> {
    const { search, name, phoneNumber } = query;

    const qb = this.driverRepository.createQueryBuilder('driver');

    if (name) {
      qb.andWhere('driver.name = :name', { name: name.toUpperCase() });
    }

    if (phoneNumber) {
      qb.andWhere('driver.phoneNumber = :phoneNumber', {
        phoneNumber: phoneNumber,
      });
    }

    if (search) {
      console.log(search, 'search');

      qb.andWhere(
        '(driver.name ILIKE :search OR driver.phoneNumber ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    return await qb.getMany();
  }

  async findOne(id: number): Promise<Driver | null> {
    const driver = await this.driverRepository.findOneBy({ id });

    if (!driver) {
      throw new NotFoundException(`Driver with id ${id} not found`);
    }
    return driver;
  }

  async create(driverData: CreateDriverDto): Promise<Driver> {
    const existDriver = await this.driverRepository.findOneBy({
      name: driverData.name,
      phoneNumber: driverData.phoneNumber,
    });

    if (existDriver) {
      throw new ConflictException(
        `Driver with this name ${driverData.name} and number ${driverData.phoneNumber} already exists`,
      );
    }

    const driver = this.driverRepository.create(driverData);
    return await this.driverRepository.save(driver);
  }
}
