'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Home, 
  Search, 
  Target, 
  Trophy, 
  Settings, 
  Bell,
  Flame,
  ChevronRight,
  Play,
  Clock,
  Star,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Circle,
  MessageCircle,
  Award,
  BookOpen,
  Brain,
  Zap,
  ArrowRight,
  LogOut,
  Menu,
  X,
  GraduationCap
} from 'lucide-react'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
}

const currentUser = {
  name: 'Arjun Sharma',
  avatar: 'AS',
  targetCareer: 'IAS Officer',
  careerMatch: 67,
  streak: 23,
  xp: 2450,
  level: 12,
  completedMissions: 47,
  weeklyProgress: [true, true, true, true, false, false, false],
  todayMission: {
    id: 1,
    title: 'Draft a Public Interest Litigation (PIL)',
    description: 'You discovered a case of illegal sand mining in your district. As DM, you need to draft the first legal document to address this environmental crime.',
    duration: 30,
    xp: 50,
    skills: ['Legal Writing', 'Policy Drafting', 'Environmental Law'],
    difficulty: 'Medium'
  },
  skills: [
    { name: 'Policy Drafting', current: 80, target: 100 },
    { name: 'Current Affairs', current: 60, target: 90 },
    { name: 'Legal Writing', current: 30, target: 80 },
    { name: 'Negotiation', current: 20, target: 70 },
    { name: 'Public Speaking', current: 45, target: 85 },
    { name: 'Decision Making', current: 55, target: 90 },
  ],
  recentAchievements: [
    { name: 'First Week Streak', icon: '🔥', earned: true },
    { name: 'Policy Writer', icon: '✍️', earned: true },
    { name: 'Current Affairs Pro', icon: '📰', earned: true },
    { name: '30 Day Streak', icon: '🏆', earned: false },
  ],
  recommendedCareers: [
    { name: 'Software Engineer', match: 89, reason: 'High logical skills' },
    { name: 'Data Scientist', match: 91, reason: 'Strong analytical mind' },
    { name: 'IPS Officer', match: 62, reason: 'Leadership + discipline' },
  ]
}

export default function DashboardPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform lg:transform-none ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-700 to-primary-900 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">
                PS<span className="text-primary-700">sathee</span>.ai
              </span>
            </div>
          </div>

          {/* User Card */}
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center text-white font-bold">
                {currentUser.avatar}
              </div>
              <div>
                <p className="font-semibold text-slate-900">{currentUser.name}</p>
                <p className="text-sm text-slate-500">Level {currentUser.level}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {[
              { id: 'dashboard', icon: Home, label: 'Dashboard', active: true },
              { id: 'missions', icon: Target, label: 'Missions', active: false },
              { id: 'careers', icon: Search, label: 'Explore Careers', active: false },
              { id: 'achievements', icon: Trophy, label: 'Achievements', active: false },
              { id: 'settings', icon: Settings, label: 'Settings', active: false },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  item.active 
                    ? 'bg-primary-50 text-primary-700 font-medium' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* WhatsApp CTA */}
          <div className="p-4 border-t border-slate-100">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">WhatsApp Bot</span>
              </div>
              <p className="text-xs text-green-700 mb-3">Get daily missions on WhatsApp</p>
              <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Connect Now
              </button>
            </div>
          </div>

          {/* Logout */}
          <div className="p-4 border-t border-slate-100">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-md border border-slate-200"
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900">Welcome back, {currentUser.name.split(' ')[0]}!</h1>
              <p className="text-sm text-slate-500">Continue your journey to {currentUser.targetCareer}</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            </div>
          </div>
        </header>

        <div className="p-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Stats Row */}
            <motion.div variants={fadeInUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-5 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-5 h-5 text-amber-200" />
                  <span className="text-amber-200 text-sm font-medium">Streak</span>
                </div>
                <div className="text-3xl font-bold">{currentUser.streak} Days</div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-blue-200" />
                  <span className="text-blue-200 text-sm font-medium">Total XP</span>
                </div>
                <div className="text-3xl font-bold">{currentUser.xp.toLocaleString()}</div>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-5 h-5 text-emerald-200" />
                  <span className="text-emerald-200 text-sm font-medium">Missions</span>
                </div>
                <div className="text-3xl font-bold">{currentUser.completedMissions}</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-5 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-purple-200" />
                  <span className="text-purple-200 text-sm font-medium">Match</span>
                </div>
                <div className="text-3xl font-bold">{currentUser.careerMatch}%</div>
              </div>
            </motion.div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Today's Mission */}
                <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-primary-700 to-primary-900 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h2 className="text-white font-semibold">Today's Mission</h2>
                          <p className="text-primary-200 text-sm">30 min • {currentUser.todayMission.xp} XP</p>
                        </div>
                      </div>
                      <span className="badge bg-amber-500 text-white">Medium</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {currentUser.todayMission.title}
                    </h3>
                    <p className="text-slate-600 mb-4">
                      {currentUser.todayMission.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {currentUser.todayMission.skills.map((skill, i) => (
                        <span key={i} className="badge-blue">{skill}</span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <button className="btn-primary flex-1 flex items-center justify-center gap-2">
                        <Play className="w-5 h-5" />
                        Start Mission
                      </button>
                      <div className="flex items-center gap-2 text-slate-500">
                        <Clock className="w-5 h-5" />
                        <span>{currentUser.todayMission.duration} min</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Weekly Progress */}
                <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-slate-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-slate-900">This Week</h2>
                    <span className="text-sm text-slate-500">4/7 completed</span>
                  </div>
                  
                  <div className="flex justify-between">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                      <div key={i} className="text-center">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 ${
                          currentUser.weeklyProgress[i] 
                            ? 'bg-success text-white' 
                            : i === 4 
                              ? 'bg-primary-100 text-primary-700 ring-2 ring-primary-500' 
                              : 'bg-slate-100 text-slate-400'
                        }`}>
                          {currentUser.weeklyProgress[i] ? (
                            <CheckCircle2 className="w-6 h-6" />
                          ) : i === 4 ? (
                            <Circle className="w-6 h-6" />
                          ) : (
                            <span className="text-sm font-medium">{i + 1}</span>
                          )}
                        </div>
                        <span className="text-xs text-slate-500">{day}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Skills Gap */}
                <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-slate-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-slate-900">Your Skills Gap</h2>
                    <button className="text-sm text-primary-700 font-medium hover:underline">
                      View All
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {currentUser.skills.map((skill, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-slate-700">{skill.name}</span>
                            <span className="text-sm text-slate-500">{skill.current}%</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                skill.current >= 70 ? 'bg-success' :
                                skill.current >= 40 ? 'bg-primary-500' :
                                'bg-warning'
                              }`}
                              style={{ width: `${skill.current}%` }}
                            />
                          </div>
                        </div>
                        <div className="text-xs text-slate-400 w-16 text-right">
                          Target: {skill.target}%
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                {/* Career Progress */}
                <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-bold text-slate-900 mb-4">Your Target Career</h3>
                  
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center text-white text-2xl font-bold mb-3">
                      {currentUser.careerMatch}%
                    </div>
                    <h4 className="font-semibold text-slate-900">{currentUser.targetCareer}</h4>
                    <p className="text-sm text-slate-500">Career Match Score</p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Competition</span>
                      <span className="font-medium text-slate-700">1:5,556</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">AI Risk</span>
                      <span className="font-medium text-success">35%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Starting Salary</span>
                      <span className="font-medium text-slate-700">₹56,100</span>
                    </div>
                  </div>
                  
                  <button className="w-full btn-secondary text-sm">
                    View Full Profile
                  </button>
                </motion.div>

                {/* Recommended Careers */}
                <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-bold text-slate-900 mb-4">You Might Also Like</h3>
                  
                  <div className="space-y-4">
                    {currentUser.recommendedCareers.map((career, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-slate-800">{career.name}</p>
                          <p className="text-xs text-slate-500">{career.reason}</p>
                        </div>
                        <div className={`text-lg font-bold ${
                          career.match >= 85 ? 'text-success' : 'text-primary-700'
                        }`}>
                          {career.match}%
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button className="w-full mt-4 btn-ghost text-sm text-primary-700 flex items-center justify-center gap-1">
                    Explore More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>

                {/* Achievements */}
                <motion.div variants={fadeInUp} className="bg-white rounded-2xl border border-slate-200 p-6">
                  <h3 className="font-bold text-slate-900 mb-4">Achievements</h3>
                  
                  <div className="grid grid-cols-4 gap-3">
                    {currentUser.recentAchievements.map((achievement, i) => (
                      <div 
                        key={i}
                        className={`aspect-square rounded-xl flex flex-col items-center justify-center ${
                          achievement.earned 
                            ? 'bg-gradient-to-br from-amber-100 to-amber-200' 
                            : 'bg-slate-100 opacity-50'
                        }`}
                        title={achievement.name}
                      >
                        <span className="text-2xl">{achievement.icon}</span>
                        {achievement.earned && <CheckCircle2 className="w-4 h-4 text-amber-600 absolute bottom-1 right-1" />}
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-xs text-slate-500 mt-3 text-center">
                    3/4 achievements unlocked this month
                  </p>
                </motion.div>

                {/* Quick Links */}
                <motion.div variants={fadeInUp} className="bg-slate-50 rounded-2xl p-6">
                  <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
                  
                  <div className="space-y-2">
                    <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white hover:bg-slate-50 transition-colors text-left">
                      <BookOpen className="w-5 h-5 text-primary-700" />
                      <span className="text-slate-700 text-sm">Study Materials</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white hover:bg-slate-50 transition-colors text-left">
                      <Brain className="w-5 h-5 text-purple-600" />
                      <span className="text-slate-700 text-sm">AI Mentor Chat</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-white hover:bg-slate-50 transition-colors text-left">
                      <Award className="w-5 h-5 text-amber-600" />
                      <span className="text-slate-700 text-sm">Certificates</span>
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}
