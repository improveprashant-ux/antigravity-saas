import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

interface UserProfile {
  education: string
  interests: string[]
  skills: string[]
  classLevel: string
  targetSalary?: string
}

function calculateMatchScore(profile: UserProfile, career: any): number {
  let score = 50 // Base score

  // Education matching
  const educationLevel = profile.classLevel
  if (educationLevel === 'Class 8-10') {
    if (career.education.includes('10th') || career.education.includes('No degree')) {
      score += 20
    }
  } else if (educationLevel === 'Class 11-12') {
    if (career.education.includes('10+2') || career.education.includes('12th')) {
      score += 20
    } else if (career.education.includes('Graduate')) {
      score += 5
    }
  } else if (educationLevel === 'College/Graduate') {
    if (career.education.includes('Graduate') || career.education.includes('B.') || career.education.includes('M.')) {
      score += 20
    }
  } else if (educationLevel === 'Working Professional') {
    score += 10
  }

  // Interest matching
  const interestKeywords = profile.interests.flatMap(i => i.toLowerCase().split(' '))
  const careerText = `${career.name} ${career.category} ${career.job_description}`.toLowerCase()
  
  let interestMatches = 0
  interestKeywords.forEach(keyword => {
    if (careerText.includes(keyword)) {
      interestMatches++
    }
  })
  
  if (interestKeywords.length > 0) {
    score += Math.min(20, (interestMatches / interestKeywords.length) * 20)
  }

  // Skills matching
  const skillKeywords = profile.skills.flatMap(s => s.toLowerCase().split(' '))
  const careerSkills = career.key_skills?.join(' ').toLowerCase() || ''
  
  let skillMatches = 0
  skillKeywords.forEach(keyword => {
    if (careerSkills.includes(keyword)) {
      skillMatches++
    }
  })
  
  if (skillKeywords.length > 0) {
    score += Math.min(15, (skillMatches / skillKeywords.length) * 15)
  }

  // Adjust for competition (lower competition = higher score boost)
  const competitionMap: Record<string, number> = {
    '1:5,556': 5,
    '1:20,000': 3,
    '1:12,500': 4,
    '1:500': 10,
    '1:200': 12,
    '1:100': 15,
    '1:250': 11,
    '1:370': 12,
    '1:600': 8,
    'High': -5,
    'Moderate': 5,
    'Low': 10,
    'Very High': -10,
    'Everyone': 5,
    'Varies': 0
  }
  
  score += competitionMap[career.competition_ratio] || 0

  // Adjust for AI risk (lower AI risk = higher score boost for safety seekers)
  if (career.ai_risk_percentage < 30) {
    score += 5
  } else if (career.ai_risk_percentage > 70) {
    score -= 5
  }

  // Cap score between 0 and 100
  return Math.min(100, Math.max(0, Math.round(score)))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const profile: UserProfile = body.profile

    if (!profile) {
      return NextResponse.json({ error: 'Profile is required' }, { status: 400 })
    }

    // Fetch all careers from Supabase
    const { data: careers, error } = await getSupabase()
      .from('careers')
      .select('*')

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Calculate match scores
    const matchedCareers = careers.map(career => ({
      ...career,
      match_percentage: calculateMatchScore(profile, career)
    }))

    // Sort by match percentage
    matchedCareers.sort((a, b) => b.match_percentage - a.match_percentage)

    // Return top matches
    const topMatches = matchedCareers.slice(0, 10)
    const totalMatches = matchedCareers.length

    return NextResponse.json({
      matches: topMatches,
      total: totalMatches,
      profile
    })
  } catch (error) {
    console.error('Match API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
