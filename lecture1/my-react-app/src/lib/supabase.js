import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kmjvipbzsjkagyvgzvai.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttanZpcGJ6c2prYWd5dmd6dmFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNDAzMTgsImV4cCI6MjA4NDcxNjMxOH0.ZMRFZKMdx9G8DF6MB5-RdOMMqrIT4t8BQHIeornJoK4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
