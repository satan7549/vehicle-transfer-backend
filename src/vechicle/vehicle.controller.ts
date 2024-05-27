//vehicle.controller.ts
import { Controller, Get, Post, Body, UsePipes, ValidationPipe, Query, Param } from '@nestjs/common';
import { VehicleService } from 'src/vechicle/vehicle.service';
import { CreateVehicleDto, FindVehicleDto } from 'src/validation/vehicle.dto';
import { Vehicle } from './vehicle.entity';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get('/')
  async getAll(@Query() query:FindVehicleDto): Promise<Vehicle[]> {
    return await this.vehicleService.findAll(query);
  }

  @Get('/:id')
  async getById(@Param('id') id:number){
    return await this.vehicleService.findOne(id)
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
 async create(@Body() createVehicleDto: CreateVehicleDto) {
    return await this.vehicleService.create(createVehicleDto);
  }

}

