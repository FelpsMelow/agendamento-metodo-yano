import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  name!: string;

  @IsOptional() @IsString() profession?: string;
  @IsOptional() @IsEmail() email?: string;
}
