import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

interface WhatsAppMessage {
  from: string
  to: string
  messageId: string
  text?: {
    body: string
  }
  type: string
}

const WELCOME_MESSAGE = `👋 Namaste! Welcome to PSsathee.ai!

I'm your career AI assistant. I help Indian students (14-24 years) find their perfect career path.

🎯 *What I can do:*
• Calculate your Career Match % for 64 careers
• Show real competition data
• Give daily AI-powered missions
• Track your progress

Let's start! What class are you in?

1️⃣ Class 8-10
2️⃣ Class 11-12
3️⃣ College/Graduate
4️⃣ Working Professional`

const CLASS_RESPONSES = {
  '1': `Great! You're in Class 8-10. 🎒

At this stage, you have time to explore and plan. Let's understand your interests:

What excites you the most?

🔬 Science & Research
💻 Technology & Computers
📚 Government Jobs
💰 Business & Finance
🏥 Medicine
🎨 Creative Work
⚖️ Law & Justice

Just reply with the number or name!`,
  '2': `Perfect! You're in Class 11-12. 🎯

This is a crucial time for career planning. Your stream choices matter!

What's your current stream (or planned stream)?

1️⃣ Science (PCM)
2️⃣ Science (PCB)
3️⃣ Commerce
4️⃣ Arts/Humanities
5️⃣ Not decided yet

Reply with your choice!`,
  '3': `Awesome! College or Graduate. 🎓

Now it's time to either confirm or pivot your career path.

What field are you studying (or interested in)?

1️⃣ Engineering/Technology
2️⃣ Medical/Healthcare
3️⃣ Commerce/Finance/CA
4️⃣ Arts/Humanities
5️⃣ Law
6️⃣ Still exploring

Let me know!`,
  '4': `Welcome! Working Professional. 💼

Looking to upskill or switch careers? I've got you.

What's your current situation?

1️⃣ In a job, want to upskill with AI
2️⃣ Want to prepare for government exams
3️⃣ Considering MBA
4️⃣ Thinking of entrepreneurship
5️⃣ Want a complete career change

Share your number!`
}

const CAREER_PREFERENCES = {
  'Science & Research': ['isro-scientist', 'drdo-scientist', 'data-scientist', 'software-engineer'],
  'Technology & Computers': ['software-engineer', 'data-scientist', 'cloud-engineer', 'cybersecurity-analyst'],
  'Government Jobs': ['ias-officer', 'ips-officer', 'bank-po', 'ssc-cgl', 'railway-je'],
  'Business & Finance': ['investment-banker', 'chartered-accountant', 'entrepreneur', 'business-owner'],
  'Medicine': ['govt-mbbs-doctor', 'private-doctor', 'staff-nurse', 'dentist'],
  'Creative Work': ['ui-ux-designer', 'fashion-designer', 'content-creator', 'journalist'],
  'Law & Justice': ['civil-judge', 'advocate', 'company-secretary']
}

const SAMPLE_CAREERS = {
  'ias-officer': {
    name: 'IAS Officer',
    match: 67,
    competition: '1:5,556',
    salary: '₹56K-2.5L',
    aiRisk: 35,
    fact: 'Only 180 IAS officers selected every year from 10 lakh aspirants!'
  },
  'software-engineer': {
    name: 'Software Engineer',
    match: 89,
    competition: 'High demand',
    salary: '₹4-60L',
    aiRisk: 78,
    fact: 'AI will impact 78% of software jobs by 2030. But AI-proficient engineers will earn 3x more!'
  },
  'chartered-accountant': {
    name: 'Chartered Accountant',
    match: 45,
    competition: 'Very tough',
    salary: '₹6L-1Cr',
    aiRisk: 85,
    fact: 'Big 4 accounting firms cut 30% of junior roles due to AI automation!'
  }
}

function generateCareerResponse(careers: typeof SAMPLE_CAREERS) {
  const lines = ['🎯 *Your Top Career Matches:*\n']
  
  Object.values(careers).forEach((career, i) => {
    lines.push(`${i + 1}. *${career.name}*`)
    lines.push(`   Match: ${career.match}% | Competition: ${career.competition}`)
    lines.push(`   Salary: ${career.salary} | AI Risk: ${career.aiRisk}%`)
    lines.push(`   💡 ${career.fact}\n`)
  })
  
  lines.push('\n━━━━━━━━━━━━━━━━━━━━')
  lines.push('\n💬 Reply with the NUMBER to get full details')
  lines.push('🔄 "restart" to start fresh')
  lines.push('📊 "progress" to see your stats')
  
  return lines.join('\n')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { messages } = body
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    for (const message of messages) {
      const whatsappMessage: WhatsAppMessage = message
      
      if (whatsappMessage.type !== 'text' || !whatsappMessage.text) {
        continue
      }

      const userMessage = whatsappMessage.text.body.trim().toLowerCase()
      const userPhone = whatsappMessage.from

      let response: string

      // Check for restart command
      if (userMessage === 'restart' || userMessage === 'start' || userMessage === 'hi' || userMessage === 'hello') {
        response = WELCOME_MESSAGE
      }
      // Check for class selection
      else if (['1', '2', '3', '4'].includes(userMessage)) {
        response = CLASS_RESPONSES[userMessage as keyof typeof CLASS_RESPONSES]
      }
      // Check for interest selection
      else if (userMessage.includes('science') || userMessage.includes('research')) {
        response = `Great choice! Science & Research! 🔬\n\nLet me show you some career matches:\n\n${generateCareerResponse(SAMPLE_CAREERS)}`
      }
      else if (userMessage.includes('technology') || userMessage.includes('computer') || userMessage.includes('tech')) {
        response = `Tech is the future! 💻\n\nLet me show you some career matches:\n\n${generateCareerResponse(SAMPLE_CAREERS)}`
      }
      else if (userMessage.includes('government') || userMessage.includes('govt')) {
        response = `Government jobs = Job security! 🏛️\n\nLet me show you some career matches:\n\n${generateCareerResponse(SAMPLE_CAREERS)}`
      }
      else if (userMessage.includes('business') || userMessage.includes('finance')) {
        response = `Business & Finance = Big money potential! 💰\n\nLet me show you some career matches:\n\n${generateCareerResponse(SAMPLE_CAREERS)}`
      }
      else if (userMessage.includes('medical') || userMessage.includes('medicine') || userMessage.includes('doctor')) {
        response = `Medicine = Noble profession! 🏥\n\nLet me show you some career matches:\n\n${generateCareerResponse(SAMPLE_CAREERS)}`
      }
      else if (userMessage.includes('creative') || userMessage.includes('design')) {
        response = `Creative work = Passion + Money! 🎨\n\nLet me show you some career matches:\n\n${generateCareerResponse(SAMPLE_CAREERS)}`
      }
      else if (userMessage.includes('law') || userMessage.includes('justice')) {
        response = `Law = Power & Justice! ⚖️\n\nLet me show you some career matches:\n\n${generateCareerResponse(SAMPLE_CAREERS)}`
      }
      // Check for progress command
      else if (userMessage === 'progress' || userMessage === 'stats') {
        response = `📊 *Your Progress at PSsathee.ai:*

🔥 Streak: 0 days (Start today!)
⭐ XP: 0
🎯 Missions Completed: 0
📈 Career Match: Not calculated yet

💡 Complete your first mission to start earning XP!`
      }
      // Check for career detail request
      else if (userMessage === '1') {
        const career = SAMPLE_CAREERS['ias-officer']
        response = `🏛️ *${career.name}*

📊 *Match:* ${career.match}%
💼 *Competition:* ${career.competition}
💰 *Salary:* ${career.salary}
🤖 *AI Risk:* ${career.aiRisk}%

📝 *Description:*
IAS officers are the administrative head of districts. They implement government policies, manage revenue, law & order, and development activities.

📚 *Required Skills:*
• Leadership & Decision Making
• Public Administration
• Communication Skills
• Law Knowledge
• Critical Thinking

🎯 *Entry Path:*
UPSC Civil Services Exam (Prelims → Mains → Interview)

💡 *Why choose this?*
High prestige, job security, and ability to create real impact on society.

━━━━━━━━━━━━━━━━━━━━
🔄 "restart" to explore more careers
📈 "upgrade" to unlock full access (₹1999/year)`
      }
      else if (userMessage === '2') {
        const career = SAMPLE_CAREERS['software-engineer']
        response = `💻 *${career.name}*

📊 *Match:* ${career.match}%
💼 *Demand:* ${career.competition}
💰 *Salary:* ${career.salary}
🤖 *AI Risk:* ${career.aiRisk}%

📝 *Description:*
Software engineers design, develop, and maintain software applications. They're in high demand across all industries.

📚 *Required Skills:*
• Programming (Python/Java/JavaScript)
• Data Structures & Algorithms
• System Design
• Problem Solving
• Git/Version Control

🎯 *Entry Path:*
B.Tech (CS/IT) or BCA + MCA from a good college

💡 *Why choose this?*
High salary potential, WFH options, and critical in the AI age (if you learn AI tools!)

━━━━━━━━━━━━━━━━━━━━
🔄 "restart" to explore more careers
📈 "upgrade" to unlock full access (₹1999/year)`
      }
      else if (userMessage === '3') {
        const career = SAMPLE_CAREERS['chartered-accountant']
        response = `📊 *${career.name}*

📊 *Match:* ${career.match}%
💼 *Competition:* ${career.competition}
💰 *Salary:* ${career.salary}
🤖 *AI Risk:* ${career.aiRisk}%

📝 *Description:*
CAs handle accounting, auditing, and taxation. They can work in firms, corporates, or practice independently.

📚 *Required Skills:*
• Accounting (IndAS/IFRS)
• Taxation (Direct/Indirect)
• Audit
• Financial Analysis
• Excel/Tally/SAP

🎯 *Entry Path:*
CA Foundation → Intermediate → Final (ICAI) + 3-year Articleship

⚠️ *Warning:* 85% AI risk! But CA + AI skills = Unstoppable. Learn tools like Claude AI for research and analysis!

━━━━━━━━━━━━━━━━━━━━
🔄 "restart" to explore more careers
📈 "upgrade" to unlock full access (₹1999/year)`
      }
      // Default response
      else {
        response = `I didn't understand that. Let me help you better!\n\nTry:\n• "start" - Begin assessment\n• "progress" - See your stats\n• "restart" - Start fresh\n\nOr reply with your interest:\n🔬 Science | 💻 Technology | 🏛️ Government | 💰 Finance | 🏥 Medicine`
      }

      // Store user message in Supabase (optional - for analytics)
      await getSupabase().from('whatsapp_messages').insert({
        phone: userPhone,
        message: whatsappMessage.text.body,
        direction: 'inbound',
        created_at: new Date().toISOString()
      })

      // Send response via 360Dialog API
      const responsePayload = {
        to: userPhone,
        type: 'text',
        text: {
          body: response
        }
      }

      const dialogResponse = await fetch(
        'https://waba.360dialog.io/v1/messages',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'D360-API-Key': process.env.WHATSAPP_API_KEY || ''
          },
          body: JSON.stringify(responsePayload)
        }
      )

      if (!dialogResponse.ok) {
        console.error('Failed to send WhatsApp message')
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('WhatsApp webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    service: 'PSsathee WhatsApp Bot',
    version: '1.0.0'
  })
}
