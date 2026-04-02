# PSsathee.ai - India's Career Operating System

> AI-powered career guidance platform for Indian students (14-24 years). From fear to clarity in 30 minutes a day.

![PSsathee.ai](https://img.shields.io/badge/PSsathee-AI--Powered-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎯 What is PSsathee.ai?

PSsathee.ai is **India's First AI-Powered Career Operating System** - not just a career quiz, but a complete platform that:

1. **Diagnoses** your current position against 64 career paths
2. **Plans** a personalized 3-year roadmap with specific milestones
3. **Builds** daily practical projects using AI tools
4. **Proves** your skills with shareable certificates

### Emotional Architecture
- **Fear (2 min)** → Parent sees: "Your ₹5L coaching investment may be wasted. AI will replace 78% of software jobs by 2030."
- **Hope (5 min)** → Parent/Student sees: "Here's your exact 3-year plan with specific AI tools to become irreplaceable."
- **Action (20 min)** → Student completes a real career-specific project daily.
- **Proof (3 min)** → Student flexes a shareable certificate/project to WhatsApp group.

## ✨ Features

### Core Features
- 🚀 **64 Career Paths** with real competition data
- 📊 **AI-Powered Skills Gap Analysis**
- 🎯 **Career Match % Calculator**
- 📅 **Daily Mission System** (30-min practical projects)
- 🔥 **Streak & XP Gamification**
- 💬 **WhatsApp Bot Integration**
- 💳 **Razorpay Payment Integration**

### Tech Stack
- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Supabase
- **Database**: Supabase (PostgreSQL)
- **AI**: Anthropic Claude API
- **WhatsApp**: 360Dialog API
- **Payments**: Razorpay (UPI-first)
- **Hosting**: Vercel (frontend), Railway (webhooks)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free tier)
- 360Dialog account (for WhatsApp)
- Anthropic API key (for Claude)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/pssathee-ai.git
cd pssathee-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
# Edit .env.local with your API keys
```

4. **Set up Supabase Database**
```sql
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone TEXT UNIQUE,
  email TEXT UNIQUE,
  name TEXT,
  class_level TEXT,
  target_career TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- WhatsApp messages table
CREATE TABLE whatsapp_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone TEXT,
  message TEXT,
  direction TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User progress table
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  career_id TEXT,
  match_percentage INTEGER,
  skills_gap JSONB,
  current_streak INTEGER DEFAULT 0,
  total_xp INTEGER DEFAULT 0,
  completed_missions INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Completed missions table
CREATE TABLE completed_missions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  mission_id TEXT,
  completed_at TIMESTAMP DEFAULT NOW(),
  ai_feedback TEXT,
  proof_url TEXT
);
```

5. **Seed the database**
```bash
# Run the seed script to add all 64 careers
npm run db:seed
```

6. **Run the development server**
```bash
npm run dev
```

7. **Open [http://localhost:3000](http://localhost:3000)**

## 📁 Project Structure

```
pssathee-ai/
├── app/
│   ├── api/
│   │   └── webhooks/
│   │       └── whatsapp/
│   │           └── route.ts       # WhatsApp webhook handler
│   ├── careers/
│   │   └── page.tsx               # Career explorer page
│   ├── dashboard/
│   │   └── page.tsx               # User dashboard
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Landing page
├── lib/
│   ├── careers-data.ts            # All 64 careers data
│   └── supabase.ts                # Supabase client
├── public/
├── .env.example
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎨 Design System

### Color Palette
```
Primary Blue:     #1E40AF (Deep Trust Blue)
Secondary Blue:   #3B82F6 (Bright Blue)
Accent Blue:      #60A5FA (Sky Blue)
Light Blue:       #DBEAFE (Ice Blue)
Pure White:       #FFFFFF
Success Green:    #10B981
Warning Orange:   #F59E0B
Danger Red:       #EF4444
```

### Typography
- **Headings**: Inter (Google Fonts)
- **Body**: Inter
- **Numbers**: Space Grotesk

## 💰 Pricing

| Plan | Price | Features |
|------|-------|----------|
| Free | ₹0 | WhatsApp bot, 3 missions, Career preview |
| Student | ₹1999/year | Full access, 64 careers, AI Mentor |
| Family | ₹2999/year | Up to 3 students, Parent dashboard |

## 📊 Career Data

The platform includes comprehensive data for:

### Government Jobs (34)
- Civil Services (IAS, IPS, IFS, IRS)
- Defence (Army, Navy, Air Force)
- Police & Law Enforcement
- Railways
- Banking & Insurance
- Education
- Healthcare
- Science & Technology

### Private Sector (30)
- IT & Software
- Data Science & AI
- Finance & CA
- Legal
- Healthcare
- Media & Creative
- Business & Entrepreneurship

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ for Indian students by Prashant

*"₹1999 = Career Insurance"*
