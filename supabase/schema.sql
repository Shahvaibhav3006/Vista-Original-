-- Supabase PostgreSQL Schema for VISTA / QuestTrail
-- Run this ONCE in your Supabase SQL Editor.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===================== CONTENT TABLES =====================

-- PROFILES
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Explorer',
  avatar TEXT DEFAULT '🧭',
  bio TEXT,
  home_city TEXT,
  xp INTEGER DEFAULT 0,
  green_xp INTEGER DEFAULT 0,
  current_level TEXT DEFAULT 'Explorer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Auto-create profile on auth.users insert
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, avatar)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'name', 'Explorer'), '🧭')
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- CITIES
CREATE TABLE IF NOT EXISTS cities (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  state TEXT,
  country TEXT DEFAULT 'India',
  blurb TEXT,
  theme_color TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- PLACES
CREATE TABLE IF NOT EXISTS places (
  id TEXT PRIMARY KEY,
  city_id TEXT REFERENCES cities(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT,
  story TEXT,
  why_visit TEXT,
  duration TEXT,
  xp_reward INTEGER DEFAULT 10,
  unlock_time TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  address TEXT,
  moods TEXT[],
  map_x NUMERIC,
  map_y NUMERIC,
  active BOOLEAN DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_places_city ON places(city_id);

-- QUESTS
CREATE TABLE IF NOT EXISTS quests (
  id TEXT PRIMARY KEY,
  city_id TEXT REFERENCES cities(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT,
  description TEXT,
  difficulty TEXT,
  xp_reward INTEGER DEFAULT 50,
  badge_reward TEXT,
  stamp_reward TEXT,
  estimated_time TEXT,
  active BOOLEAN DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_quests_city ON quests(city_id);

-- QUEST STEPS
CREATE TABLE IF NOT EXISTS quest_steps (
  id TEXT PRIMARY KEY,
  quest_id TEXT REFERENCES quests(id) ON DELETE CASCADE,
  place_id TEXT REFERENCES places(id) ON DELETE SET NULL,
  step_order INTEGER NOT NULL,
  title TEXT NOT NULL,
  hint TEXT,
  description TEXT,
  location_name TEXT,
  latitude DECIMAL,
  longitude DECIMAL,
  clue TEXT,
  story TEXT,
  challenge_type TEXT, -- trivia, photo, observation, riddle
  challenge_question TEXT,
  challenge_options TEXT[],
  correct_answer TEXT, -- kept server-side only
  challenge_explanation TEXT,
  xp_reward INTEGER DEFAULT 25
);

CREATE INDEX IF NOT EXISTS idx_quest_steps_quest ON quest_steps(quest_id);

-- HIDDEN GEMS
CREATE TABLE IF NOT EXISTS hidden_gems (
  id TEXT PRIMARY KEY,
  city_id TEXT REFERENCES cities(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  clues TEXT[] DEFAULT '{}',
  xp_reward INTEGER DEFAULT 100,
  active BOOLEAN DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_hidden_gems_city ON hidden_gems(city_id);

-- PARTNER MERCHANTS
CREATE TABLE IF NOT EXISTS partner_merchants (
  id TEXT PRIMARY KEY,
  city_id TEXT REFERENCES cities(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT,
  location TEXT,
  experience TEXT,
  reward TEXT,
  code TEXT,
  active BOOLEAN DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_partners_city ON partner_merchants(city_id);

-- FESTIVALS
CREATE TABLE IF NOT EXISTS festivals (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  city_id TEXT REFERENCES cities(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  emoji TEXT,
  note TEXT,
  start_date DATE,
  end_date DATE,
  active BOOLEAN DEFAULT true
);

CREATE INDEX IF NOT EXISTS idx_festivals_city ON festivals(city_id);

-- ===================== USER PROGRESS TABLES =====================

-- USER QUEST PROGRESS
CREATE TABLE IF NOT EXISTS user_quest_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  quest_id TEXT REFERENCES quests(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'in_progress',
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, quest_id)
);

-- USER QUEST STEPS
CREATE TABLE IF NOT EXISTS user_quest_steps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  step_id TEXT REFERENCES quest_steps(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, step_id)
);

-- VISITED PLACES
CREATE TABLE IF NOT EXISTS visited_places (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  place_id TEXT REFERENCES places(id) ON DELETE CASCADE,
  visited_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, place_id)
);

-- USER BADGES
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id TEXT NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, badge_id)
);

-- USER STAMPS
CREATE TABLE IF NOT EXISTS user_stamps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  stamp_id TEXT NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, stamp_id)
);

-- SAVED PLACES
CREATE TABLE IF NOT EXISTS saved_places (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  place_id TEXT REFERENCES places(id) ON DELETE CASCADE,
  saved_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, place_id)
);

-- USER PHOTOS
CREATE TABLE IF NOT EXISTS user_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  place_id TEXT REFERENCES places(id) ON DELETE SET NULL,
  quest_step_id TEXT REFERENCES quest_steps(id) ON DELETE SET NULL,
  storage_path TEXT NOT NULL,
  public_url TEXT,
  caption TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_photos_user ON user_photos(user_id);

-- USER TRAIL
CREATE TABLE IF NOT EXISTS user_trail (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  place_id TEXT REFERENCES places(id) ON DELETE SET NULL,
  city_id TEXT REFERENCES cities(id) ON DELETE SET NULL,
  xp_earned INTEGER DEFAULT 0,
  travel_mode TEXT,
  visited_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_trail_user ON user_trail(user_id);

-- HIDDEN GEM PROGRESS
CREATE TABLE IF NOT EXISTS hidden_gem_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  hidden_gem_id TEXT NOT NULL,
  clues_revealed INTEGER DEFAULT 0,
  discovered BOOLEAN DEFAULT false,
  discovered_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, hidden_gem_id)
);

-- TEAMS
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  join_code TEXT UNIQUE NOT NULL,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- TEAM MEMBERS
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(team_id, user_id)
);

-- QR REWARD CODES
CREATE TABLE IF NOT EXISTS qr_reward_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  merchant_id TEXT NOT NULL,
  code_hash TEXT UNIQUE NOT NULL,
  reward_name TEXT NOT NULL,
  xp_reward INTEGER DEFAULT 50,
  valid_from TIMESTAMP WITH TIME ZONE,
  valid_until TIMESTAMP WITH TIME ZONE,
  max_redemptions INTEGER,
  per_user_limit INTEGER DEFAULT 1,
  active BOOLEAN DEFAULT true
);

-- QR REDEMPTIONS
CREATE TABLE IF NOT EXISTS qr_redemptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  qr_code_id UUID REFERENCES qr_reward_codes(id) ON DELETE CASCADE,
  redeemed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, qr_code_id)
);

-- XP TRANSACTIONS (LEDGER)
CREATE TABLE IF NOT EXISTS xp_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  reward_type TEXT NOT NULL, -- PLACE_VISIT, QUEST_STEP, QUEST_COMPLETE, PHOTO_CHALLENGE, HIDDEN_GEM, QR_REWARD, GREEN_TRAVEL
  reference_id TEXT, -- place_id, quest_id, qr_code_id, etc.
  idempotency_key TEXT UNIQUE, -- prevent duplicate rewards
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_xp_user ON xp_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_xp_idempotency ON xp_transactions(idempotency_key);

-- ===================== ROW LEVEL SECURITY =====================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_quest_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_quest_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE visited_places ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stamps ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_places ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_trail ENABLE ROW LEVEL SECURITY;
ALTER TABLE hidden_gem_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE xp_transactions ENABLE ROW LEVEL SECURITY;

-- Public content: anyone can read
-- (cities, places, quests, quest_steps, hidden_gems, festivals, partner_merchants are PUBLIC read)
-- No RLS needed on public content tables — or enable with permissive SELECT

-- Profiles: public read, self-write
CREATE POLICY "profiles_select" ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_insert" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update" ON profiles FOR UPDATE USING (auth.uid() = id);

-- User-specific tables: self-read only (writes via service role)
CREATE POLICY "uqp_select" ON user_quest_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "uqs_select" ON user_quest_steps FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "vp_select" ON visited_places FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "ub_select" ON user_badges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "us_select" ON user_stamps FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "sp_select" ON saved_places FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "sp_insert" ON saved_places FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "sp_delete" ON saved_places FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "up_select" ON user_photos FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "ut_select" ON user_trail FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "hgp_select" ON hidden_gem_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "qr_select" ON qr_redemptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "xt_select" ON xp_transactions FOR SELECT USING (auth.uid() = user_id);

-- Teams: members can read their team
CREATE POLICY "teams_select" ON teams FOR SELECT USING (
  EXISTS (SELECT 1 FROM team_members WHERE team_members.team_id = teams.id AND team_members.user_id = auth.uid())
);
CREATE POLICY "tm_select" ON team_members FOR SELECT USING (
  EXISTS (SELECT 1 FROM team_members tm WHERE tm.team_id = team_members.team_id AND tm.user_id = auth.uid())
);

-- NOTE: INSERT/UPDATE for game-state tables are done via service_role key (server-side only).
-- Users cannot directly modify xp, badges, stamps, visited_places, etc. from the frontend.
