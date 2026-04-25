-- 0003_profiles_optional_fields.sql
-- Minimal-signup model: only nickname/email/password collected at account creation.
-- name + phone are now nullable on profiles; collected later via onboarding or
-- when an action that requires them (e.g., race registration) is performed.

alter table public.profiles
  alter column name drop not null,
  alter column phone drop not null;
