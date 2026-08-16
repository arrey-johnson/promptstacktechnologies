-- Epic 8: Academy applications (separate from business_leads)
-- Apply after business lead migrations.

create extension if not exists "pgcrypto";

do $$ begin
  create type public.academy_application_status as enum (
    'SUBMITTED',
    'UNDER_REVIEW',
    'ADMITTED',
    'NOT_ADMITTED',
    'PAYMENT_PENDING',
    'ENROLLED',
    'ONBOARDED'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists public.academy_applications (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status public.academy_application_status not null default 'SUBMITTED',

  full_name text not null,
  email text not null,
  phone text not null,
  city text not null,

  program_slug text not null,
  current_occupation_education text not null,
  experience_level text not null,
  motivation text not null,
  desired_outcome text not null,

  cohort text null,
  referral_source text null,

  utm_source text null,
  utm_medium text null,
  utm_campaign text null,
  utm_content text null,
  utm_term text null,
  landing_page text null,

  privacy_acknowledged_at timestamptz not null,
  assigned_to text null,
  reviewed_at timestamptz null,
  notification_sent_at timestamptz null,

  constraint academy_applications_submission_id_key unique (submission_id),
  constraint academy_applications_program_slug_check check (
    program_slug in (
      'software-engineering',
      'artificial-intelligence',
      'cybersecurity'
    )
  ),
  constraint academy_applications_experience_level_check check (
    experience_level in (
      'complete-beginner',
      'some-basic-experience',
      'built-practiced-before',
      'studying-or-working-in-field'
    )
  )
);

create index if not exists academy_applications_created_at_idx
  on public.academy_applications (created_at desc);

create index if not exists academy_applications_status_idx
  on public.academy_applications (status);

create index if not exists academy_applications_program_slug_idx
  on public.academy_applications (program_slug);

create index if not exists academy_applications_email_idx
  on public.academy_applications (email);

create table if not exists public.academy_application_status_history (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null
    references public.academy_applications (id) on delete cascade,
  previous_status public.academy_application_status null,
  new_status public.academy_application_status not null,
  changed_at timestamptz not null default now(),
  changed_by text null,
  note text null
);

create index if not exists academy_application_status_history_app_id_idx
  on public.academy_application_status_history (application_id, changed_at desc);

create or replace function public.set_academy_applications_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists academy_applications_set_updated_at
  on public.academy_applications;
create trigger academy_applications_set_updated_at
  before update on public.academy_applications
  for each row
  execute function public.set_academy_applications_updated_at();

alter table public.academy_applications enable row level security;
alter table public.academy_application_status_history enable row level security;

-- No public policies: access only via service role / trusted server.

comment on table public.academy_applications is
  'Transactional Promptstack Academy applications. Separate from business_leads.';
comment on table public.academy_application_status_history is
  'Audit trail for academy_applications.status changes.';
comment on column public.academy_applications.submission_id is
  'Client-generated UUID for a single form attempt. Unique. Not a secret.';
comment on column public.academy_applications.notification_sent_at is
  'Set when internal admissions notification succeeds. Not the system of record.';

create or replace function public.create_academy_application_with_history(
  p_submission_id uuid,
  p_full_name text,
  p_email text,
  p_phone text,
  p_city text,
  p_program_slug text,
  p_current_occupation_education text,
  p_experience_level text,
  p_motivation text,
  p_desired_outcome text,
  p_cohort text,
  p_referral_source text,
  p_utm_source text,
  p_utm_medium text,
  p_utm_campaign text,
  p_utm_content text,
  p_utm_term text,
  p_landing_page text,
  p_privacy_acknowledged_at timestamptz
)
returns table (
  id uuid,
  status public.academy_application_status,
  created_at timestamptz,
  notification_sent_at timestamptz,
  already_existed boolean
)
language plpgsql
as $$
declare
  v_id uuid;
  v_status public.academy_application_status;
  v_created_at timestamptz;
  v_notification_sent_at timestamptz;
begin
  select
    a.id,
    a.status,
    a.created_at,
    a.notification_sent_at
  into
    v_id,
    v_status,
    v_created_at,
    v_notification_sent_at
  from public.academy_applications a
  where a.submission_id = p_submission_id;

  if found then
    return query
    select v_id, v_status, v_created_at, v_notification_sent_at, true;
    return;
  end if;

  begin
    insert into public.academy_applications (
      submission_id,
      status,
      full_name,
      email,
      phone,
      city,
      program_slug,
      current_occupation_education,
      experience_level,
      motivation,
      desired_outcome,
      cohort,
      referral_source,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      landing_page,
      privacy_acknowledged_at
    ) values (
      p_submission_id,
      'SUBMITTED',
      p_full_name,
      p_email,
      p_phone,
      p_city,
      p_program_slug,
      p_current_occupation_education,
      p_experience_level,
      p_motivation,
      p_desired_outcome,
      p_cohort,
      p_referral_source,
      p_utm_source,
      p_utm_medium,
      p_utm_campaign,
      p_utm_content,
      p_utm_term,
      p_landing_page,
      p_privacy_acknowledged_at
    )
    returning
      academy_applications.id,
      academy_applications.status,
      academy_applications.created_at,
      academy_applications.notification_sent_at
    into
      v_id,
      v_status,
      v_created_at,
      v_notification_sent_at;

    insert into public.academy_application_status_history (
      application_id,
      previous_status,
      new_status,
      note
    ) values (
      v_id,
      null,
      'SUBMITTED',
      'Initial application submission'
    );

    return query
    select v_id, v_status, v_created_at, v_notification_sent_at, false;
  exception
    when unique_violation then
      select
        a.id,
        a.status,
        a.created_at,
        a.notification_sent_at
      into
        v_id,
        v_status,
        v_created_at,
        v_notification_sent_at
      from public.academy_applications a
      where a.submission_id = p_submission_id;

      return query
      select v_id, v_status, v_created_at, v_notification_sent_at, true;
  end;
end;
$$;

revoke all on function public.create_academy_application_with_history(
  uuid, text, text, text, text, text, text, text, text, text, text, text,
  text, text, text, text, text, text, timestamptz
) from public;

create or replace function public.claim_academy_application_notification(
  p_application_id uuid
)
returns boolean
language plpgsql
as $$
declare
  updated_count integer;
begin
  update public.academy_applications
  set notification_sent_at = now()
  where id = p_application_id
    and notification_sent_at is null;

  get diagnostics updated_count = row_count;
  return updated_count = 1;
end;
$$;

revoke all on function public.claim_academy_application_notification(uuid)
  from public;
