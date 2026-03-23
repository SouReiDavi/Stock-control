// supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

// COLOQUE AQUI SUAS CREDENCIAIS DO SUPABASE
// Você encontra essas informações em: https://supabase.com/dashboard/project/[SEU_PROJETO]/settings/api
const SUPABASE_URL = 'https://SEU_PROJETO.supabase.co'  // Substitua pela sua URL
const SUPABASE_ANON_KEY = 'SUA_CHAVE_ANONIMA_AQUI'      // Substitua pela sua chave

// Criar cliente Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Teste de conexão
console.log('Supabase URL:', SUPABASE_URL)
console.log('Supabase Key:', SUPABASE_ANON_KEY ? 'Chave carregada ✓' : 'Chave não carregada ✗')
