-- This migration ensures the auth schema is properly set up
-- and fixes the profiles table to work with Supabase Auth

-- First, let's make sure we have the auth schema extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop the existing profiles table if it exists
DROP TABLE IF EXISTS profiles CASCADE;

-- Create the profiles table with proper Supabase Auth integration
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT,
  picture TEXT,
  user_type TEXT, -- expectant, provider, advocate
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
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT profiles_user_id_key UNIQUE (user_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to read/update only their own profile
CREATE POLICY "Users can view their own profile" 
  ON profiles FOR SELECT 
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE 
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own profile" 
  ON profiles FOR INSERT 
  WITH CHECK (user_id = auth.uid());

-- Create trigger function to handle profile creation on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger to create profile when a new user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
