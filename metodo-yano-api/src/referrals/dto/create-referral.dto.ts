import { IsString, MaxLength } from 'class-validator';

export class CreateReferralDto {
  @IsString()
  @MaxLength(255)
  name!: string;
}
