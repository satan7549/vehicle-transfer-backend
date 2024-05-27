// transfer.controller.ts
import { Controller, Get, Post, Body, ValidationPipe, UsePipes, Query, Param } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { CreateTransferDto, FindTransferDto } from 'src/validation/transfer.dto';
import { Transfer } from './transfer.entity';

@Controller('transfers')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}


@Get('/')
async getAll(@Query() query:FindTransferDto): Promise<Transfer[]> {
  return await this.transferService.findAll(query);
}

@Get('/:id')
async getById(@Param('id') id:number):Promise<Transfer | null >{
  return await this.transferService.findOne(id)
}

@Post('/create')
@UsePipes(ValidationPipe)
async create(@Body() transferData: CreateTransferDto):Promise<Transfer> {
  return await this.transferService.create(transferData);
}


}
