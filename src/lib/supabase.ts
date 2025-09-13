import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our form submissions
export interface FormSubmission {
  id?: string
  first_name: string
  last_name: string
  email: string
  phone: string
  zip_code: string
  date_of_birth: string
  annual_income: string
  health_status: string
  medications?: string
  dependents?: string
  monthly_budget: string
  coverage_type: string
  additional_info?: string
  status: 'new' | 'contacted' | 'quoted' | 'closed'
  source: string
  created_at?: string
  updated_at?: string
}

export interface Dependent {
  name: string
  relationship: string
  date_of_birth: string
}
