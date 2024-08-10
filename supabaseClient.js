
// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = 'https://utvuupcdlkwseiplgfff.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0dnV1cGNkbGt3c2VpcGxnZmZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI2NzgyMzYsImV4cCI6MjAzODI1NDIzNn0.P2w2yBl-PDsME7z_qtUYto1G58aqTQJSZZB-cujh5q4'
// export const supabase = createClient(supabaseUrl, supabaseKey)

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey)