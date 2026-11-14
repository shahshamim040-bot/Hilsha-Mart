import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uldelanmnhkmafeudfhg.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'Sb_publishable_ECmP7s5vdfhpx_g8RDQ0IA_hWXcQdjq'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
