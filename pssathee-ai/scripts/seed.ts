import { createClient } from '@supabase/supabase-js'
import { careersData } from '../lib/careers-data'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function seedCareers() {
  console.log('🌱 Starting database seed...')

  for (const career of careersData) {
    const { error } = await supabase
      .from('careers')
      .upsert({
        id: career.id,
        name: career.name,
        sector: career.sector,
        category: career.category,
        education: career.education,
        age_limit: career.age_limit,
        selection_process: career.selection_process,
        conducting_body: career.conducting_body,
        salary_range: career.salary_range,
        job_description: career.job_description,
        key_skills: career.key_skills,
        work_location: career.work_location,
        job_nature: career.job_nature,
        growth_prospects: career.growth_prospects,
        perks_benefits: career.perks_benefits,
        ai_risk_percentage: career.ai_risk_percentage,
        competition_ratio: career.competition_ratio,
        exam_id: career.exam_id,
        exam_name: career.exam_name,
      }, {
        onConflict: 'id'
      })

    if (error) {
      console.error(`❌ Error seeding ${career.name}:`, error)
    } else {
      console.log(`✅ Seeded: ${career.name}`)
    }
  }

  console.log('🌱 Database seeding complete!')
}

seedCareers().catch(console.error)
