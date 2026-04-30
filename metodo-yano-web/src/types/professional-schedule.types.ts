export type ProfessionalSchedule = {
  _id: string;
  professionalId: string | { _id: string; name: string };
  weekday: number;
  startTime: string;
  endTime: string;
  slotDurationMinutes: number;
  breakStartTime?: string;
  breakEndTime?: string;
  isActive: boolean;
};

export type ProfessionalSchedulePayload = Omit<ProfessionalSchedule, '_id' | 'professionalId'> & { professionalId: string };
