import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mhmusnhafudsoaajdnna.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1obXVzbmhhZnVkc29hYWpkbm5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyMDQzMDUsImV4cCI6MjA4Nzc4MDMwNX0.MLxrpR-8tqZN_-igHeGQaZFD5J4pZlTmShf2gkxCSjE';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function check() {
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Success! Data length:", data.length);
    if(data.length > 0) {
      console.log("Sample:", data[0]);
    }
  }
}

check();
