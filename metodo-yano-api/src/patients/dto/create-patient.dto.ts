import { IsDateString, IsEmail, IsInt, IsMongoId, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @MaxLength(255)
  name!: string;

  @IsOptional() @IsString() profession?: string;
  @IsOptional() @IsString() cpf?: string;
  @IsOptional() @IsString() rg?: string;
  @IsOptional() @IsDateString() birthDate?: string;
  @IsOptional() @IsString() cep?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() addressNumber?: string;
  @IsOptional() @IsString() addressComplement?: string;
  @IsOptional() @IsString() neighborhood?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() state?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() phone1?: string;
  @IsOptional() @IsString() phone2?: string;
  @IsOptional() @IsString() mobile1?: string;
  @IsOptional() @IsString() mobile2?: string;
  @IsOptional() @IsString() observation?: string;
  @IsOptional() @IsString() anamnesis?: string;
  @IsOptional() @IsString() scapularWaist?: string;
  @IsOptional() @IsString() pelvicWaist?: string;
  @IsOptional() @IsMongoId() referralId?: string;
  @IsOptional() @IsString() status?: string;
  @IsOptional() @IsInt() @Min(0) packageSessions?: number;
  @IsOptional() @IsDateString() registrationDate?: string;
}
