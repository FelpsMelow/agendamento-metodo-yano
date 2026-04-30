import { IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { AppointmentStatus } from '../schemas/appointment.schema';
export class CreateAppointmentDto { @IsMongoId() patientId: string; @IsMongoId() professionalId: string; @IsDateString() startAt: string; @IsDateString() endAt: string; @IsDateString() date: string; @IsString() @IsNotEmpty() startTime: string; @IsString() @IsNotEmpty() endTime: string; @IsOptional() @Type(() => Number) @Min(1) durationMinutes?: number; @IsOptional() @IsEnum(AppointmentStatus) status?: AppointmentStatus; @IsOptional() @IsString() notes?: string; @IsOptional() @IsString() internalNotes?: string; @IsOptional() @IsString() source?: string; }
