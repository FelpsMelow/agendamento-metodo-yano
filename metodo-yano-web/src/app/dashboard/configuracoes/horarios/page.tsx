'use client';
import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { ProfessionalScheduleForm } from '@/components/schedules/ProfessionalScheduleForm';
import { ProfessionalScheduleTable } from '@/components/schedules/ProfessionalScheduleTable';
import { professionalSchedulesClient } from '@/services/professional-schedules.client';
import { usersClient } from '@/services/users.client';
import { ProfessionalScheduleFormValues } from '@/schemas/professional-schedule.schema';
import { ProfessionalSchedule } from '@/types/professional-schedule.types';
import { User } from '@/types/user.types';
import styles from './page.module.scss';

export default function HorariosPage() {
  const [items, setItems] = useState<ProfessionalSchedule[]>([]);
  const [professionals, setProfessionals] = useState<User[]>([]);
  const [editing, setEditing] = useState<ProfessionalSchedule | null>(null);

  const load = async () => {
    const [schedules, users] = await Promise.all([professionalSchedulesClient.list(), usersClient.list()]);
    setItems(schedules);
    setProfessionals(users.items.filter((u) => u.isProfessional && u.isActive));
  };

  useEffect(() => { load(); }, []);

  const submit = async (values: ProfessionalScheduleFormValues) => {
    if (editing) await professionalSchedulesClient.update(editing._id, values);
    else await professionalSchedulesClient.create(values);
    setEditing(null);
    await load();
  };

  return <div className={styles.page}>
    <PageHeader title='Horários de Atendimento' subtitle='Configure horários por profissional para uso na agenda.' />
    <ProfessionalScheduleForm professionals={professionals} initialValues={editing} onCancel={() => setEditing(null)} onSubmit={submit} />
    <ProfessionalScheduleTable data={items} onEdit={setEditing} onDelete={async (id) => { if (confirm('Confirma exclusão deste horário?')) { await professionalSchedulesClient.remove(id); await load(); } }} />
  </div>;
}
