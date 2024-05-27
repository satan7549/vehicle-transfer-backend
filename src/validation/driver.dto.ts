import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';

//driver.dto.ts
export class CreateDriverDto {
  @IsString()
  @IsNotEmpty({ message: 'Driver name should not be empty' })
  @Matches(/^[A-Z][a-zA-Z]*( [A-Z][a-zA-Z]*)*$/, {
    message: 'Driver name should start with a capital letter Example:Jon Doe',
  })
  name: string;

  //   @Length(10)
  @IsPhoneNumber(null)
  @IsNotEmpty({ message: 'Phone number should not be empty' })
  phoneNumber: string;

  @IsOptional()
  @IsString()
  profilePhoto: string;
}

export class UpdateDriverDto {
  name?: string;
  phoneNumber?: string;
  profilePhoto?: string;
}

export class FindDriverDto {
  name?: string;
  phoneNumber?: string;
  search?: string;
}
