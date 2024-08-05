
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fjpbfhusbxlebnnrecse.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqcGJmaHVzYnhsZWJubnJlY3NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE0NzEyMDUsImV4cCI6MjAzNzA0NzIwNX0.F8RSZKpfBQLqCgu-jItAb_uED5TqaYlISaNaCM88UMs'
export const supabase = createClient(supabaseUrl, supabaseKey)