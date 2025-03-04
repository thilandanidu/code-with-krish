import { Type } from 'class-transformer';
import { IsArray, IsInt, isInt, IsString, ValidateNested } from 'class-validator';

export class createDispatcherDto {
//   @IsInt()
//   productId: number;
  @IsInt()
  vehicle_number: number;
  @IsString()
  city: String;
}

