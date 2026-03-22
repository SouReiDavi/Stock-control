import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://SEU_PROJETO.supabase.co'
const supabaseAnonKey = 'SUA_CHAVE_ANONIMA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)