import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables')
    }
    
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  }
  return supabaseInstance
}

export const supabase = {
  get client() { return getSupabase() }
}

export type Career = {
  id: string
  name: string
  sector: 'Government' | 'Private'
  category: string
  education: string
  age_limit: string
  selection_process: string
  conducting_body: string
  salary_range: string
  job_description: string
  key_skills: string[]
  work_location: string
  job_nature: string
  growth_prospects: string
  perks_benefits: string
  ai_risk_percentage: number
  competition_ratio: string
  exam_id: string | null
  exam_name: string | null
}

export type Mission = {
  id: string
  career_id: string
  title: string
  description: string
  duration_minutes: number
  xp_reward: number
  skills_trained: string[]
  difficulty: 'Easy' | 'Medium' | 'Hard'
}

export type UserProgress = {
  user_id: string
  career_id: string
  match_percentage: number
  skills_gap: Record<string, number>
  current_streak: number
  total_xp: number
  completed_missions: number
  level: number
}

export type CompletedMission = {
  id: string
  user_id: string
  mission_id: string
  completed_at: string
  ai_feedback: string
  proof_url: string | null
}
