# Plano de Implementação — Método Yano

## Escopo
Este repositório foi estruturado em dois projetos:
- `metodo-yano-web` (Next.js App Router + TS + SCSS Modules)
- `metodo-yano-api` (NestJS + TS + MongoDB/Mongoose)

## Entregáveis por módulo
1. Auth: `/auth/login`, `/auth/logout`, `/auth/me`, JWT e guarda global.
2. Dashboard: total de pacientes e atendimentos do dia.
3. Pacientes: CRUD, busca, soft delete, export Excel.
4. Indicações: CRUD com unicidade por clínica.
5. Agenda: FullCalendar, filtros, conflito de horário.
6. Profissionais/Horários: gestão de agenda-base.
7. Relatórios: pacientes, indicações, consolidado, aniversariantes.
8. Migração: importação MySQL com `legacyId` e mapas.

## Regras técnicas obrigatórias
- Sem Tailwind e sem CSS inline.
- Componentes visuais com `ComponentName.tsx`, `ComponentName.module.scss`, `index.ts`.
- DTOs com `class-validator`.
- Soft delete com `deletedAt`.
- Filtro por `clinicId` em todas consultas de domínio.
- Auditoria de ações críticas.

## Sequência sugerida
- Fase 1: fundação (config, auth, layout)
- Fase 2: dashboard
- Fase 3: pacientes
- Fase 4: indicações
- Fase 5: profissionais/horários
- Fase 6: agenda
- Fase 7: relatórios
- Fase 8: migração

## Checklist manual (resumo)
- Login válido/inválido/inativo
- CRUD pacientes + busca + soft delete
- CRUD indicações
- Agenda semanal/dia/mês + conflito
- Relatórios e exportações
- Migração com contagem batendo com legado
