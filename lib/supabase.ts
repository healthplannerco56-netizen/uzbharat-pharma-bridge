import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getDrugs() {
  const { data, error } = await supabase
    .from('drugs')
    .select('*, manufacturer:manufacturers(*)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getRegistrationMilestones(drugId: string) {
  const { data, error } = await supabase
    .from('registration_milestones')
    .select('*')
    .eq('drug_id', drugId)
    .order('stage');
  if (error) throw error;
  return data;
}

export async function getTenders() {
  const { data, error } = await supabase
    .from('tenders')
    .select('*')
    .eq('status', 'active')
    .order('deadline');
  if (error) throw error;
  return data;
}

export async function getShipments() {
  const { data, error } = await supabase
    .from('shipments')
    .select('*, batch:batches(*, drug:drugs(*))')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

