CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Lifetime purchases (server-only)
CREATE TABLE public.lifetime_purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  provider_transaction_id TEXT NOT NULL UNIQUE,
  provider_customer_id TEXT,
  product_id TEXT NOT NULL,
  price_id TEXT NOT NULL,
  environment TEXT NOT NULL DEFAULT 'sandbox',
  status TEXT NOT NULL DEFAULT 'completed',
  purchased_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_lifetime_purchases_email_env ON public.lifetime_purchases (lower(email), environment);
GRANT ALL ON public.lifetime_purchases TO service_role;
ALTER TABLE public.lifetime_purchases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role manages lifetime purchases" ON public.lifetime_purchases
  FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

-- Guides
CREATE TABLE public.generated_guides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  meta_title TEXT NOT NULL,
  description TEXT NOT NULL,
  answer TEXT NOT NULL,
  intro JSONB NOT NULL DEFAULT '[]'::jsonb,
  sections JSONB NOT NULL DEFAULT '[]'::jsonb,
  faqs JSONB NOT NULL DEFAULT '[]'::jsonb,
  related JSONB NOT NULL DEFAULT '[]'::jsonb,
  read_minutes INTEGER NOT NULL DEFAULT 6,
  medical_disclaimer BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'published',
  topic TEXT,
  model TEXT,
  published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT generated_guides_status_check CHECK (status IN ('published', 'unpublished'))
);
GRANT SELECT ON public.generated_guides TO anon;
GRANT SELECT ON public.generated_guides TO authenticated;
GRANT ALL ON public.generated_guides TO service_role;
ALTER TABLE public.generated_guides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published guides are publicly readable" ON public.generated_guides
  FOR SELECT TO anon, authenticated USING (status = 'published');
CREATE INDEX generated_guides_status_published_at_idx ON public.generated_guides (status, published_at DESC);
CREATE TRIGGER generated_guides_set_updated_at BEFORE UPDATE ON public.generated_guides
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.guide_generation_runs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  finished_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'running',
  topic TEXT,
  slug TEXT,
  attempts INTEGER NOT NULL DEFAULT 0,
  error TEXT,
  CONSTRAINT guide_generation_runs_status_check CHECK (status IN ('running', 'published', 'skipped', 'failed', 'paused'))
);
GRANT ALL ON public.guide_generation_runs TO service_role;
ALTER TABLE public.guide_generation_runs ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.guide_job_state (
  id TEXT NOT NULL PRIMARY KEY,
  paused BOOLEAN NOT NULL DEFAULT false,
  pause_reason TEXT,
  paused_at TIMESTAMPTZ,
  lease_until TIMESTAMPTZ,
  last_run_at TIMESTAMPTZ,
  job_token TEXT NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT ALL ON public.guide_job_state TO service_role;
ALTER TABLE public.guide_job_state ENABLE ROW LEVEL SECURITY;
INSERT INTO public.guide_job_state (id) VALUES ('weekly-guide');

-- Profiles
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  caregiver_name text,
  caregiver_phone text,
  caregiver_notes text,
  backup_enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage their own profile" ON public.profiles
  FOR ALL TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE TRIGGER profiles_set_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Children
CREATE TABLE public.backup_children (
  id text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  age_group text,
  allergies text,
  sex text,
  date_of_birth text,
  approximate_age text,
  weight text,
  photo_data_url text,
  personality text,
  things_to_know text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.backup_children TO authenticated;
GRANT ALL ON public.backup_children TO service_role;
ALTER TABLE public.backup_children ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage their own children" ON public.backup_children
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER backup_children_set_updated_at BEFORE UPDATE ON public.backup_children
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX backup_children_user_idx ON public.backup_children(user_id);

-- Feedings
CREATE TABLE public.backup_feedings (
  id text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  child_id text NOT NULL,
  food_name text,
  amount text,
  times text,
  meals_per_day text,
  snacks text,
  foods_to_avoid text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.backup_feedings TO authenticated;
GRANT ALL ON public.backup_feedings TO service_role;
ALTER TABLE public.backup_feedings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage their own feedings" ON public.backup_feedings
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER backup_feedings_set_updated_at BEFORE UPDATE ON public.backup_feedings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX backup_feedings_user_idx ON public.backup_feedings(user_id);

-- Routines
CREATE TABLE public.backup_routines (
  id text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  child_id text NOT NULL,
  outdoor_time text,
  playtime text,
  sleep_routine text,
  diapering_routine text,
  soothing_instructions text,
  screen_time_notes text,
  other text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.backup_routines TO authenticated;
GRANT ALL ON public.backup_routines TO service_role;
ALTER TABLE public.backup_routines ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage their own routines" ON public.backup_routines
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER backup_routines_set_updated_at BEFORE UPDATE ON public.backup_routines
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX backup_routines_user_idx ON public.backup_routines(user_id);

-- Medications
CREATE TABLE public.backup_medications (
  id text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  child_id text NOT NULL,
  name text NOT NULL,
  dosage text,
  time text,
  frequency text,
  start_date text,
  end_date text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.backup_medications TO authenticated;
GRANT ALL ON public.backup_medications TO service_role;
ALTER TABLE public.backup_medications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage their own medications" ON public.backup_medications
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER backup_medications_set_updated_at BEFORE UPDATE ON public.backup_medications
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX backup_medications_user_idx ON public.backup_medications(user_id);

-- Emergency contacts
CREATE TABLE public.backup_emergency_contacts (
  id text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  child_id text NOT NULL,
  primary_name text,
  primary_phone text,
  secondary_name text,
  secondary_phone text,
  special_instructions text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.backup_emergency_contacts TO authenticated;
GRANT ALL ON public.backup_emergency_contacts TO service_role;
ALTER TABLE public.backup_emergency_contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage their own emergency contacts" ON public.backup_emergency_contacts
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER backup_emergency_contacts_set_updated_at BEFORE UPDATE ON public.backup_emergency_contacts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX backup_emergency_contacts_user_idx ON public.backup_emergency_contacts(user_id);

-- Pediatricians
CREATE TABLE public.backup_pediatricians (
  id text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  child_id text NOT NULL,
  doctor_name text,
  clinic_name text,
  phone text,
  address text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.backup_pediatricians TO authenticated;
GRANT ALL ON public.backup_pediatricians TO service_role;
ALTER TABLE public.backup_pediatricians ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage their own pediatricians" ON public.backup_pediatricians
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER backup_pediatricians_set_updated_at BEFORE UPDATE ON public.backup_pediatricians
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX backup_pediatricians_user_idx ON public.backup_pediatricians(user_id);

-- Reminders
CREATE TABLE public.backup_reminders (
  id text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  child_id text NOT NULL,
  type text NOT NULL DEFAULT 'custom',
  title text NOT NULL,
  time text NOT NULL,
  repeat text NOT NULL DEFAULT 'daily',
  start_date text,
  end_date text,
  enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.backup_reminders TO authenticated;
GRANT ALL ON public.backup_reminders TO service_role;
ALTER TABLE public.backup_reminders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage their own reminders" ON public.backup_reminders
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER backup_reminders_set_updated_at BEFORE UPDATE ON public.backup_reminders
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX backup_reminders_user_idx ON public.backup_reminders(user_id);

-- Shared cards
CREATE TABLE public.shared_cards (
  token TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  child_id TEXT NOT NULL,
  child_name TEXT NOT NULL DEFAULT 'Child',
  snapshot JSONB NOT NULL,
  revoked BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, child_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.shared_cards TO authenticated;
GRANT ALL ON public.shared_cards TO service_role;
ALTER TABLE public.shared_cards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners manage their shared cards" ON public.shared_cards
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER shared_cards_set_updated_at BEFORE UPDATE ON public.shared_cards
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();