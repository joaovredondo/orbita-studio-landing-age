import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('\n❌ Variáveis faltando no .env.local:');
  if (!url) console.error('   NEXT_PUBLIC_SUPABASE_URL');
  if (!key) console.error('   SUPABASE_SERVICE_ROLE_KEY');
  console.error('\nAdicione a service role key em .env.local e tente novamente.\n');
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const USERS = [
  {
    email:    'admin@orbitastudio.com.br',
    password: 'Admin@Orbita2026',
    name:     'João Victor (Admin)',
    role:     'admin',
  },
  {
    email:    'cliente@orbitastudio.com.br',
    password: 'Cliente@Orbita2026',
    name:     'Ana Costa',
    role:     'client',
  },
] as const;

async function seed() {
  console.log('\n🌱  Criando usuários de teste...\n');

  const results: typeof USERS[number][] = [];

  for (const user of USERS) {
    /* Check if already exists */
    const { data: existing } = await supabase.auth.admin.listUsers();
    const alreadyExists = existing?.users?.some((u) => u.email === user.email);

    if (alreadyExists) {
      console.log(`⚠️  Já existe: ${user.email} — pulando.\n`);
      results.push(user);
      continue;
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email:          user.email,
      password:       user.password,
      email_confirm:  true,
      user_metadata:  { name: user.name, role: user.role },
    });

    if (error || !data.user) {
      console.error(`❌ Erro ao criar ${user.email}: ${error?.message}\n`);
      continue;
    }

    /* Ensure profile has correct role (in case trigger raced) */
    await supabase
      .from('profiles')
      .upsert({ id: data.user.id, role: user.role, name: user.name });

    results.push(user);
    console.log(`✅ ${user.role === 'admin' ? 'ADMIN' : 'CLIENTE'} criado com sucesso!`);
  }

  console.log('\n┌─────────────────────────────────────────────────┐');
  console.log('│          CREDENCIAIS DE ACESSO                  │');
  console.log('├─────────────────────────────────────────────────┤');

  for (const u of results) {
    const tipo = u.role === 'admin' ? '👑 Admin ' : '👤 Cliente';
    console.log(`│  ${tipo}                                    │`);
    console.log(`│  E-mail : ${u.email.padEnd(36)} │`);
    console.log(`│  Senha  : ${u.password.padEnd(36)} │`);
    console.log(`│  Painel : ${(u.role === 'admin' ? '/admin' : '/dashboard').padEnd(36)} │`);
    console.log('├─────────────────────────────────────────────────┤');
  }

  console.log('└─────────────────────────────────────────────────┘\n');
}

seed().catch((err) => {
  console.error('\n❌ Erro inesperado:', err.message);
  process.exit(1);
});
