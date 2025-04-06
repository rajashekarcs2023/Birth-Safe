-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create profiles table with Auth0 integration
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth0_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  picture TEXT,
  user_type TEXT NOT NULL, -- expectant, provider, advocate
  pregnancy_stage TEXT, -- trying, early, confirmed, postpartum
  pregnancy_profile TEXT, -- first-time, subsequent
  previous_loss BOOLEAN DEFAULT false,
  knows_due_date TEXT, -- yes, estimate, unsure
  due_date DATE,
  gestational_age INTEGER,
  high_risk BOOLEAN DEFAULT false,
  risk_factors TEXT[], -- Array of risk factors
  tracking_preferences TEXT[], -- Array of tracking preferences
  preferred_language TEXT DEFAULT 'en',
  phone_number TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  healthcare_provider TEXT,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read/update only their own profile
CREATE POLICY "Users can view their own profile" 
  ON profiles FOR SELECT 
  USING (auth0_id = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE 
  USING (auth0_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Create medical_records table
CREATE TABLE medical_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) NOT NULL,
  record_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  provider TEXT,
  facility TEXT,
  file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read/write only their own records
CREATE POLICY "Users can view their own medical records" 
  ON medical_records FOR SELECT 
  USING (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

CREATE POLICY "Users can insert their own medical records" 
  ON medical_records FOR INSERT 
  WITH CHECK (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

CREATE POLICY "Users can update their own medical records" 
  ON medical_records FOR UPDATE 
  USING (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

CREATE POLICY "Users can delete their own medical records" 
  ON medical_records FOR DELETE 
  USING (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

-- Create symptoms table
CREATE TABLE symptoms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) NOT NULL,
  symptom_name TEXT NOT NULL,
  severity INTEGER NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration TEXT,
  is_recurring BOOLEAN DEFAULT false,
  risk_level TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE symptoms ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read/write only their own symptoms
CREATE POLICY "Users can view their own symptoms" 
  ON symptoms FOR SELECT 
  USING (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

CREATE POLICY "Users can insert their own symptoms" 
  ON symptoms FOR INSERT 
  WITH CHECK (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

CREATE POLICY "Users can update their own symptoms" 
  ON symptoms FOR UPDATE 
  USING (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

CREATE POLICY "Users can delete their own symptoms" 
  ON symptoms FOR DELETE 
  USING (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

-- Create medications table
CREATE TABLE medications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) NOT NULL,
  medication_name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  prescriber TEXT,
  reason TEXT,
  side_effects TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE medications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read/write only their own medications
CREATE POLICY "Users can view their own medications" 
  ON medications FOR SELECT 
  USING (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

CREATE POLICY "Users can insert their own medications" 
  ON medications FOR INSERT 
  WITH CHECK (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

CREATE POLICY "Users can update their own medications" 
  ON medications FOR UPDATE 
  USING (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

CREATE POLICY "Users can delete their own medications" 
  ON medications FOR DELETE 
  USING (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

-- Create consent_logs table
CREATE TABLE consent_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) NOT NULL,
  procedure_name TEXT NOT NULL,
  provider_name TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  consent_type TEXT NOT NULL,
  details TEXT,
  was_informed BOOLEAN NOT NULL,
  evidence_url TEXT,
  witness_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE consent_logs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read/write only their own consent logs
CREATE POLICY "Users can view their own consent logs" 
  ON consent_logs FOR SELECT 
  USING (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

CREATE POLICY "Users can insert their own consent logs" 
  ON consent_logs FOR INSERT 
  WITH CHECK (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

CREATE POLICY "Users can update their own consent logs" 
  ON consent_logs FOR UPDATE 
  USING (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

CREATE POLICY "Users can delete their own consent logs" 
  ON consent_logs FOR DELETE 
  USING (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

-- Create clinical_tasks table
CREATE TABLE clinical_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMP WITH TIME ZONE,
  importance TEXT NOT NULL,
  category TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE clinical_tasks ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read/write only their own clinical tasks
CREATE POLICY "Users can view their own clinical tasks" 
  ON clinical_tasks FOR SELECT 
  USING (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

CREATE POLICY "Users can insert their own clinical tasks" 
  ON clinical_tasks FOR INSERT 
  WITH CHECK (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

CREATE POLICY "Users can update their own clinical tasks" 
  ON clinical_tasks FOR UPDATE 
  USING (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

CREATE POLICY "Users can delete their own clinical tasks" 
  ON clinical_tasks FOR DELETE 
  USING (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

-- Create community_insights table
CREATE TABLE community_insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT false,
  facility TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE community_insights ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all users to view community insights
CREATE POLICY "All users can view community insights" 
  ON community_insights FOR SELECT 
  USING (true);

-- Create policy to allow users to insert their own community insights
CREATE POLICY "Users can insert their own community insights" 
  ON community_insights FOR INSERT 
  WITH CHECK (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

-- Create policy to allow users to update their own community insights
CREATE POLICY "Users can update their own community insights" 
  ON community_insights FOR UPDATE 
  USING (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

-- Create policy to allow users to delete their own community insights
CREATE POLICY "Users can delete their own community insights" 
  ON community_insights FOR DELETE 
  USING (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

-- Create community_replies table
CREATE TABLE community_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  insight_id UUID REFERENCES community_insights(id) NOT NULL,
  profile_id UUID REFERENCES profiles(id) NOT NULL,
  content TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE community_replies ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all users to view community replies
CREATE POLICY "All users can view community replies" 
  ON community_replies FOR SELECT 
  USING (true);

-- Create policy to allow users to insert their own community replies
CREATE POLICY "Users can insert their own community replies" 
  ON community_replies FOR INSERT 
  WITH CHECK (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

-- Create policy to allow users to update their own community replies
CREATE POLICY "Users can update their own community replies" 
  ON community_replies FOR UPDATE 
  USING (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

-- Create policy to allow users to delete their own community replies
CREATE POLICY "Users can delete their own community replies" 
  ON community_replies FOR DELETE 
  USING (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

-- Create wellbeing_assessments table
CREATE TABLE wellbeing_assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) NOT NULL,
  assessment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  physical_score INTEGER NOT NULL,
  emotional_score INTEGER NOT NULL,
  social_score INTEGER NOT NULL,
  sleep_quality INTEGER NOT NULL,
  stress_level INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE wellbeing_assessments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read/write only their own wellbeing assessments
CREATE POLICY "Users can view their own wellbeing assessments" 
  ON wellbeing_assessments FOR SELECT 
  USING (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

CREATE POLICY "Users can insert their own wellbeing assessments" 
  ON wellbeing_assessments FOR INSERT 
  WITH CHECK (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

CREATE POLICY "Users can update their own wellbeing assessments" 
  ON wellbeing_assessments FOR UPDATE 
  USING (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

CREATE POLICY "Users can delete their own wellbeing assessments" 
  ON wellbeing_assessments FOR DELETE 
  USING (profile_id IN (SELECT id FROM profiles WHERE auth0_id = current_setting('request.jwt.claims', true)::json->>'sub'));

-- Create grief_resources table
CREATE TABLE grief_resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  url TEXT,
  contact_info TEXT,
  is_verified BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE grief_resources ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all users to view grief resources
CREATE POLICY "All users can view grief resources" 
  ON grief_resources FOR SELECT 
  USING (true);

-- Create functions to handle JWT from Auth0
CREATE OR REPLACE FUNCTION auth.jwt() RETURNS jsonb
  LANGUAGE sql STABLE
  AS $$
    SELECT current_setting('request.jwt.claims', true)::jsonb
  $$;

-- Create a trigger to update the updated_at column
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the trigger to all tables
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON medical_records
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON symptoms
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON medications
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON consent_logs
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON clinical_tasks
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON community_insights
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON community_replies
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON wellbeing_assessments
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON grief_resources
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

