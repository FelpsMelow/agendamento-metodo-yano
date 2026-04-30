'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authSchema, type AuthSchema } from '@/schemas/auth.schema';
import { login } from '@/services/auth.client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import styles from './page.module.scss';

export default function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (values: AuthSchema) => {
    setErrorMessage('');

    try {
      await login(values);
      router.push('/dashboard/inicio');
    } catch {
      setErrorMessage('Não foi possível entrar. Verifique e-mail, senha e status do usuário.');
    }
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Método Yano</h1>
        <p className={styles.subtitle}>Acesse o sistema administrativo clínico.</p>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input label="E-mail" type="email" {...register('email')} error={errors.email?.message} />
          <Input label="Senha" type="password" {...register('password')} error={errors.password?.message} />

          {errorMessage ? <p className={styles.error}>{errorMessage}</p> : null}

          <Button className={styles.button} type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </section>
    </main>
  );
}
