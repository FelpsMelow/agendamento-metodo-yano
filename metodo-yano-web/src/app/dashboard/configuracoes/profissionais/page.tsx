'use client';
import { useEffect, useState } from 'react';
import { ProfessionalForm } from '@/components/professionals/ProfessionalForm';
import { ProfessionalTable } from '@/components/professionals/ProfessionalTable';
import { usersClient } from '@/services/users.client';
import { User } from '@/types/user.types';
import styles from './page.module.scss';

export default function ProfissionaisPage() {
  const [items, setItems] = useState<User[]>([]);
  const [editing, setEditing] = useState<User | null>(null);

  const load = async () => { const response = await usersClient.list(); setItems(response.items); };
  useEffect(() => { load(); }, []);

  return <div className={styles.page}><h1>Profissionais e Usuários</h1>
    <ProfessionalForm
      key={editing?._id ?? 'new'}
      initialValues={editing ?? undefined}
      requirePassword={!editing}
      onCancel={() => setEditing(null)}
      onSubmit={async (values) => { if (editing) { await usersClient.update(editing._id, values); } else { await usersClient.create(values); } setEditing(null); await load(); }}
    />
    <ProfessionalTable data={items} onEdit={setEditing} onDelete={async (id) => { if (confirm('Confirma exclusão deste usuário?')) { await usersClient.remove(id); await load(); } }} />
  </div>;
}
