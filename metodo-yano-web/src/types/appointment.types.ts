export type AppointmentStatus = 'scheduled'|'confirmed'|'completed'|'cancelled'|'no_show';
export interface Appointment { _id?: string; patientId: string; professionalId: string; startAt: string; endAt: string; date: string; startTime: string; endTime: string; durationMinutes?: number; status: AppointmentStatus; notes?: string; }
export interface AppointmentEvent { id: string; title: string; start: string; end: string; extendedProps: { patientId: string; patientName: string; professionalId: string; status: AppointmentStatus; phone?: string; notes?: string; }; }
