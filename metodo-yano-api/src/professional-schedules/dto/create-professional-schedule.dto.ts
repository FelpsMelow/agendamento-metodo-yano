import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsMongoId, IsOptional, IsString, Matches, Max, Min } from 'class-validator';

export class CreateProfessionalScheduleDto {
  @IsMongoId({ message: 'Profissional é obrigatório.' })
  professionalId: string;

  @Type(() => Number)
  @IsInt({ message: 'Dia da semana é obrigatório.' })
  @Min(0)
  @Max(6)
  weekday: number;

  @IsString({ message: 'Hora inicial é obrigatória.' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Hora inicial inválida.' })
  startTime: string;

  @IsString({ message: 'Hora final é obrigatória.' })
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Hora final inválida.' })
  endTime: string;

  @Type(() => Number)
  @IsInt({ message: 'Duração do slot inválida.' })
  @Min(1, { message: 'Duração do slot deve ser maior que zero.' })
  slotDurationMinutes: number;

  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Intervalo inicial inválido.' })
  breakStartTime?: string;

  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Intervalo final inválido.' })
  breakEndTime?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isActive?: boolean;
}
