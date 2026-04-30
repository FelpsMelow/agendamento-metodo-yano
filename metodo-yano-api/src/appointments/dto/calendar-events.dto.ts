import { IsDateString, IsMongoId, IsOptional } from 'class-validator';
export class CalendarEventsDto { @IsOptional() @IsMongoId() professionalId?: string; @IsDateString() start: string; @IsDateString() end: string; }
