import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Backend Supabase URL or Service Key is missing. Check your .env file.');
}

// Service role client bypasses RLS, so it must ONLY be used on the backend for secure operations.
export const supabase = createClient(supabaseUrl, supabaseServiceKey);
