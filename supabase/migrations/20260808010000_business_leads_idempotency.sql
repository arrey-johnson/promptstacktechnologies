-- Epic 6A: submission idempotency, notification state, atomic lead+history create
-- Safe to apply after 20260807220000_business_leads.sql

alter table public.business_leads
  add column if not exists submission_id uuid;

alter table public.business_leads
  add column if not exists notification_sent_at timestamptz null;

-- Backfill any rows created before this migration (dev/preview only expected).
update public.business_leads
set submission_id = gen_random_uuid()
where submission_id is null;

alter table public.business_leads
  alter column submission_id set not null;

do $$ begin
  alter table public.business_leads
    add constraint business_leads_submission_id_key unique (submission_id);
exception
  when duplicate_object then null;
end $$;

create index if not exists business_leads_submission_id_idx
  on public.business_leads (submission_id);

comment on column public.business_leads.submission_id is
  'Client-generated UUID for a single form attempt. Unique. Not a secret.';
comment on column public.business_leads.notification_sent_at is
  'Set when internal lead notification email succeeds. Not the system of record for the lead.';

-- Atomic create: lead + initial status history in one transaction.
-- Concurrent duplicates on submission_id return the existing row (already_existed = true).
create or replace function public.create_business_lead_with_history(
  p_submission_id uuid,
  p_full_name text,
  p_work_email text,
  p_phone text,
  p_company text,
  p_help_area text,
  p_business_problem text,
  p_project_description text,
  p_timeline text,
  p_budget_range text,
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
  status public.business_lead_status,
  created_at timestamptz,
  notification_sent_at timestamptz,
  already_existed boolean
)
language plpgsql
as $$
declare
  v_id uuid;
  v_status public.business_lead_status;
  v_created_at timestamptz;
  v_notification_sent_at timestamptz;
begin
  select
    bl.id,
    bl.status,
    bl.created_at,
    bl.notification_sent_at
  into
    v_id,
    v_status,
    v_created_at,
    v_notification_sent_at
  from public.business_leads bl
  where bl.submission_id = p_submission_id;

  if found then
    return query
    select v_id, v_status, v_created_at, v_notification_sent_at, true;
    return;
  end if;

  begin
    insert into public.business_leads (
      submission_id,
      status,
      full_name,
      work_email,
      phone,
      company,
      help_area,
      business_problem,
      project_description,
      timeline,
      budget_range,
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
      'NEW',
      p_full_name,
      p_work_email,
      p_phone,
      p_company,
      p_help_area,
      p_business_problem,
      p_project_description,
      p_timeline,
      p_budget_range,
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
      business_leads.id,
      business_leads.status,
      business_leads.created_at,
      business_leads.notification_sent_at
    into
      v_id,
      v_status,
      v_created_at,
      v_notification_sent_at;

    insert into public.business_lead_status_history (
      lead_id,
      previous_status,
      new_status,
      note
    ) values (
      v_id,
      null,
      'NEW',
      'Initial submission'
    );

    return query
    select v_id, v_status, v_created_at, v_notification_sent_at, false;
  exception
    when unique_violation then
      select
        bl.id,
        bl.status,
        bl.created_at,
        bl.notification_sent_at
      into
        v_id,
        v_status,
        v_created_at,
        v_notification_sent_at
      from public.business_leads bl
      where bl.submission_id = p_submission_id;

      return query
      select v_id, v_status, v_created_at, v_notification_sent_at, true;
  end;
end;
$$;

revoke all on function public.create_business_lead_with_history(
  uuid, text, text, text, text, text, text, text, text, text, text,
  text, text, text, text, text, text, timestamptz
) from public;

-- Claim notification send once (returns true only for the first successful claimer).
create or replace function public.claim_business_lead_notification(
  p_lead_id uuid
)
returns boolean
language plpgsql
as $$
declare
  updated_count integer;
begin
  update public.business_leads
  set notification_sent_at = now()
  where id = p_lead_id
    and notification_sent_at is null;

  get diagnostics updated_count = row_count;
  return updated_count = 1;
end;
$$;

revoke all on function public.claim_business_lead_notification(uuid) from public;

comment on function public.create_business_lead_with_history is
  'Atomically inserts business_leads + initial NEW status history; idempotent on submission_id.';
comment on function public.claim_business_lead_notification is
  'Sets notification_sent_at once. Caller should only send email when this returns true, then clear on send failure.';
