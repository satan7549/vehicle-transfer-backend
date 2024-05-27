import { IsNotEmpty } from "class-validator";

// transfer.dto.ts
export class CreateTransferDto {
  @IsNotEmpty()
  toDriverId: number;
  @IsNotEmpty()
  vehicleNumber: string;
}

export class UpdateTransferDto {
  fromDriverId?: number;
  toDriverId?: number;
  vehicleNumber?: string;
}


export class FindTransferDto {
  vechileNumber?:string;
  
  search?:string
}
