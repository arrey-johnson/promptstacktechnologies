-- Epic 6: business lead capture (system of record)
-- Apply via Supabase SQL editor or CLI. Not public-readable.

create extension if not exists "pgcrypto";

do $$ begin
  create type public.business_lead_status as enum (
    'NEW',
    'REVIEWED',
    'QUALIFIED',
    'UNQUALIFIED',
    'DISCOVERY_SCHEDULED',
    'PROPOSAL',
    'WON',
    'LOST'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists public.business_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status public.business_lead_status not null default 'NEW',

  full_name text not null,
  work_email text not null,
  phone text not null,
  company text not null,

  help_area text not null,
  business_problem text not null,
  project_description text not null,
  timeline text not null,
  budget_range text null,
  referral_source text null,

  utm_source text null,
  utm_medium text null,
  utm_campaign text null,
  utm_content text null,
  utm_term text null,
  landing_page text null,

  privacy_acknowledged_at timestamptz not null,
  assigned_to text null,
  last_contacted_at timestamptz null,

  constraint business_leads_help_area_check check (
    help_area in (
      'software',
      'ai-automation',
      'digital-marketing',
      'website-digital-platform',
      'not-sure-yet'
    )
  ),
  constraint business_leads_timeline_check check (
    timeline in (
      'immediately',
      'within-1-month',
      '1-3-months',
      '3-plus-months',
      'exploring'
    )
  ),
  constraint business_leads_budget_range_check check (
    budget_range is null
    or budget_range in (
      'still-determining',
      'prefer-to-discuss',
      'other'
    )
  )
);

create index if not exists business_leads_created_at_idx
  on public.business_leads (created_at desc);

create index if not exists business_leads_status_idx
  on public.business_leads (status);

create index if not exists business_leads_work_email_idx
  on public.business_leads (work_email);

create table if not exists public.business_lead_status_history (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.business_leads (id) on delete cascade,
  previous_status public.business_lead_status null,
  new_status public.business_lead_status not null,
  changed_at timestamptz not null default now(),
  changed_by text null,
  note text null
);

create index if not exists business_lead_status_history_lead_id_idx
  on public.business_lead_status_history (lead_id, changed_at desc);

create or replace function public.set_business_leads_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists business_leads_set_updated_at on public.business_leads;
create trigger business_leads_set_updated_at
  before update on public.business_leads
  for each row
  execute function public.set_business_leads_updated_at();

alter table public.business_leads enable row level security;
alter table public.business_lead_status_history enable row level security;

-- No public policies: access only via service role / trusted server.

comment on table public.business_leads is
  'Transactional business project inquiries. System of record for Start a Project.';
comment on table public.business_lead_status_history is
  'Audit trail for business_leads.status changes.';
