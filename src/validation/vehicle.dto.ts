import { IsNotEmpty, IsUppercase, Matches } from "class-validator";

export class CreateVehicleDto {
  @Matches(/^[A-Z0-9]+$/, { message: 'Vehicle number should be alphanumeric with uppercase alphabetic characters' })
  vehicleNumber: string;

  @IsNotEmpty({message:'Vehicle type should not be empty'})
  @IsUppercase({message:'Vehicle Type Should be in uppercase'})
  vehicleType: string;
  
  pucCertificate: string;

  insuranceCertificate: string;
}

export class UpdateVehicleDto {
  vehicleType?: string;
  pucCertificate?: string;
  insuranceCertificate?: string;
}

export class FindVehicleDto {
  vehicleNumber?:string;
  vehicleType?: string;
  search?:string
}
