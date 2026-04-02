'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, Target, Zap, Award, TrendingUp, Users, BookOpen, MessageCircle,
  ChevronRight, Check, Star, ArrowRight, Play, Clock, Trophy, Flame,
  Sparkles, Brain, BarChart3, Globe, Lock, Unlock, Calendar, GraduationCap,
  Briefcase, DollarSign, AlertTriangle, X, Eye, EyeOff, Phone, Mail, User,
  ChevronDown, Menu, Home, Settings, LogOut, Bell, Plus, Minus, Zap as ZapIcon
} from 'lucide-react'

// Navigation Component
function Navigation({ onLoginClick, onAssessmentClick }: { onLoginClick: () => void, onAssessmentClick: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setScrolled(window.scrollY > 50)
    })
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-700 to-primary-900 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">
              PS<span className="text-primary-700">sathee</span>.ai
            </span>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="/careers" className="text-slate-600 hover:text-primary-700 font-medium transition-colors">Careers</a>
            <a href="#how-it-works" className="text-slate-600 hover:text-primary-700 font-medium transition-colors">How It Works</a>
            <a href="#pricing" className="text-slate-600 hover:text-primary-700 font-medium transition-colors">Pricing</a>
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={onLoginClick} className="btn-ghost hidden sm:block">Login</button>
            <button onClick={onAssessmentClick} className="btn-primary text-sm">
              Start Free
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100"
          >
            <div className="px-4 py-4 space-y-2">
              <a href="/careers" className="block py-2 text-slate-600">Careers</a>
              <a href="#how-it-works" className="block py-2 text-slate-600">How It Works</a>
              <a href="#pricing" className="block py-2 text-slate-600">Pricing</a>
              <button onClick={onLoginClick} className="w-full py-2 text-left text-slate-600">Login</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

// Login Modal Component
function LoginModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [isSignup, setIsSignup] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login/signup
    console.log('Form submitted:', formData)
    onClose()
    // Redirect to dashboard
    window.location.href = '/dashboard'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl w-full max-w-md p-8"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {isSignup ? 'Create Account' : 'Welcome Back'}
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignup && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="input-field pl-10"
                      placeholder="Rahul Sharma"
                      required={isSignup}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {isSignup ? 'Phone Number' : 'Phone or Email'}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={isSignup ? 'tel' : 'text'}
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="input-field pl-10"
                    placeholder={isSignup ? '+91 98765 43210' : '+91 98765 43210'}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    className="input-field pl-10 pr-10"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {!isSignup && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-slate-300" />
                    <span className="text-sm text-slate-600">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-primary-700 hover:underline">Forgot password?</a>
                </div>
              )}

              <button type="submit" className="btn-primary w-full">
                {isSignup ? 'Create Account' : 'Login'}
              </button>

              {isSignup && (
                <p className="text-sm text-slate-500 text-center">
                  By signing up, you agree to our Terms and Privacy Policy
                </p>
              )}
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-600">
                {isSignup ? 'Already have an account?' : "Don't have an account?"}
                <button
                  onClick={() => setIsSignup(!isSignup)}
                  className="ml-1 text-primary-700 font-semibold hover:underline"
                >
                  {isSignup ? 'Login' : 'Sign Up'}
                </button>
              </p>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-500">or continue with</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center gap-2 py-2 border border-slate-200 rounded-lg hover:bg-slate-50">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  WhatsApp
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Assessment Modal Component
function AssessmentModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    classLevel: '',
    stream: '',
    interests: [] as string[],
    targetCareer: ''
  })

  const classLevels = ['Class 8-10', 'Class 11-12', 'College/Graduate', 'Working Professional']
  const streams = ['Science (PCM)', 'Science (PCB)', 'Commerce', 'Arts/Humanities', 'Not decided']
  const interests = ['Science & Research', 'Technology & Computers', 'Government Jobs', 'Business & Finance', 'Medicine', 'Creative Work', 'Law & Justice', 'Sports']

  const handleSubmit = () => {
    // Calculate match and redirect to results
    window.location.href = '/careers'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Career Assessment</h2>
                  <p className="text-slate-500">Step {step} of 4 • Takes only 2 minutes</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 flex gap-2">
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className={`flex-1 h-2 rounded-full transition-colors ${
                      i <= step ? 'bg-primary-600' : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="p-6">
              {step === 1 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">What class are you in?</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {classLevels.map(level => (
                      <button
                        key={level}
                        onClick={() => setFormData({...formData, classLevel: level})}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.classLevel === level
                            ? 'border-primary-600 bg-primary-50 text-primary-700'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">What's your stream?</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {streams.map(stream => (
                      <button
                        key={stream}
                        onClick={() => setFormData({...formData, stream: stream})}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          formData.stream === stream
                            ? 'border-primary-600 bg-primary-50 text-primary-700'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {stream}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">What interests you most? (Select all that apply)</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {interests.map(interest => (
                      <button
                        key={interest}
                        onClick={() => {
                          const newInterests = formData.interests.includes(interest)
                            ? formData.interests.filter(i => i !== interest)
                            : [...formData.interests, interest]
                          setFormData({...formData, interests: newInterests})
                        }}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          formData.interests.includes(interest)
                            ? 'border-primary-600 bg-primary-50 text-primary-700'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">What's your dream career?</h3>
                  <p className="text-slate-500 mb-4">Select one or skip to see all recommendations</p>
                  <div className="space-y-3">
                    {['IAS Officer', 'Software Engineer', 'Doctor', 'Chartered Accountant', 'Data Scientist', 'Pilot', 'Not sure yet'].map(career => (
                      <button
                        key={career}
                        onClick={() => setFormData({...formData, targetCareer: career})}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                          formData.targetCareer === career
                            ? 'border-primary-600 bg-primary-50 text-primary-700'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {career}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-200 flex justify-between">
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                className="btn-secondary"
                disabled={step === 1}
              >
                Back
              </button>
              {step < 4 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="btn-primary flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button onClick={handleSubmit} className="btn-primary flex items-center gap-2">
                  See My Results
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Pricing Modal Component
function PricingModal({ isOpen, onClose, plan = null }: { isOpen: boolean, onClose: () => void, plan?: string | null }) {
  const [selectedPlan, setSelectedPlan] = useState(plan || 'student')

  const handlePayment = () => {
    // Redirect to payment flow
    alert('Payment integration coming soon! For now, contact us at support@pssathee.ai')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Choose Your Plan</h2>
                <p className="text-slate-500">Start your career journey today</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Free Plan */}
                <div className={`p-6 rounded-2xl border-2 ${selectedPlan === 'free' ? 'border-primary-600 bg-primary-50' : 'border-slate-200'}`}>
                  <h3 className="text-xl font-bold text-slate-900">Free</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">₹0</span>
                    <span className="text-slate-500">/forever</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-center gap-2 text-slate-600">
                      <Check className="w-5 h-5 text-success" />
                      WhatsApp bot access
                    </li>
                    <li className="flex items-center gap-2 text-slate-600">
                      <Check className="w-5 h-5 text-success" />
                      3 career missions
                    </li>
                    <li className="flex items-center gap-2 text-slate-600">
                      <Check className="w-5 h-5 text-success" />
                      Career match preview
                    </li>
                    <li className="flex items-center gap-2 text-slate-400">
                      <Lock className="w-5 h-5" />
                      Full career database
                    </li>
                  </ul>
                  <button
                    onClick={() => setSelectedPlan('free')}
                    className={`w-full mt-6 ${selectedPlan === 'free' ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {selectedPlan === 'free' ? 'Current Plan' : 'Select Free'}
                  </button>
                </div>

                {/* Student Plan */}
                <div className={`p-6 rounded-2xl border-2 ${selectedPlan === 'student' ? 'border-primary-600 bg-primary-50' : 'border-slate-200'} relative`}>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary-700 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Student</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-primary-700">₹1,999</span>
                    <span className="text-slate-500">/year</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">That's just ₹5.5/day!</p>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-center gap-2 text-slate-600">
                      <Check className="w-5 h-5 text-success" />
                      Everything in Free
                    </li>
                    <li className="flex items-center gap-2 text-slate-600">
                      <Check className="w-5 h-5 text-success" />
                      All 64 careers
                    </li>
                    <li className="flex items-center gap-2 text-slate-600">
                      <Check className="w-5 h-5 text-success" />
                      Unlimited missions
                    </li>
                    <li className="flex items-center gap-2 text-slate-600">
                      <Check className="w-5 h-5 text-success" />
                      AI Mentor (Claude)
                    </li>
                    <li className="flex items-center gap-2 text-slate-600">
                      <Check className="w-5 h-5 text-success" />
                      Shareable certificates
                    </li>
                  </ul>
                  <button
                    onClick={() => setSelectedPlan('student')}
                    className={`w-full mt-6 ${selectedPlan === 'student' ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {selectedPlan === 'student' ? 'Current Plan' : 'Select Student'}
                  </button>
                </div>

                {/* Family Plan */}
                <div className={`p-6 rounded-2xl border-2 ${selectedPlan === 'family' ? 'border-primary-600 bg-primary-50' : 'border-slate-200'}`}>
                  <h3 className="text-xl font-bold text-slate-900">Family</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-slate-900">₹2,999</span>
                    <span className="text-slate-500">/year</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-2">Up to 3 students!</p>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-center gap-2 text-slate-600">
                      <Check className="w-5 h-5 text-success" />
                      Everything in Student
                    </li>
                    <li className="flex items-center gap-2 text-slate-600">
                      <Check className="w-5 h-5 text-success" />
                      Up to 3 students
                    </li>
                    <li className="flex items-center gap-2 text-slate-600">
                      <Check className="w-5 h-5 text-success" />
                      Parent dashboard
                    </li>
                    <li className="flex items-center gap-2 text-slate-600">
                      <Check className="w-5 h-5 text-success" />
                      Weekly progress reports
                    </li>
                    <li className="flex items-center gap-2 text-slate-600">
                      <Check className="w-5 h-5 text-success" />
                      Priority support
                    </li>
                  </ul>
                  <button
                    onClick={() => setSelectedPlan('family')}
                    className={`w-full mt-6 ${selectedPlan === 'family' ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {selectedPlan === 'family' ? 'Current Plan' : 'Select Family'}
                  </button>
                </div>
              </div>

              <div className="mt-8 p-4 bg-slate-50 rounded-xl">
                <h4 className="font-semibold text-slate-900 mb-2">💳 Payment Methods</h4>
                <p className="text-sm text-slate-600 mb-3">UPI, Credit/Debit Cards, Net Banking, Wallets</p>
                <button onClick={handlePayment} className="btn-primary">
                  Pay ₹{selectedPlan === 'student' ? '1999' : selectedPlan === 'family' ? '2999' : '0'}
                </button>
              </div>

              <p className="text-center text-sm text-slate-500 mt-4">
                7-day money-back guarantee • Cancel anytime
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

export default function HomePage() {
  const [loginOpen, setLoginOpen] = useState(false)
  const [assessmentOpen, setAssessmentOpen] = useState(false)
  const [pricingOpen, setPricingOpen] = useState(false)
  const [pricingPlan, setPricingPlan] = useState<string | null>(null)

  const openPricing = (plan?: string) => {
    setPricingPlan(plan || null)
    setPricingOpen(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation onLoginClick={() => setLoginOpen(true)} onAssessmentClick={() => setAssessmentOpen(true)} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-blue-50" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                India's First AI-Powered Career OS
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight"
            >
              Is Your Child's Career{' '}
              <span className="gradient-text">Future-Proof?</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Parents spend <span className="font-semibold text-slate-800">₹5-15L on coaching</span>. 
              <span className="font-semibold text-danger"> 70% of students pick wrong career</span>. 
              AI will replace <span className="font-semibold text-danger">78% of jobs by 2030</span>.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button onClick={() => setAssessmentOpen(true)} className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
                <Play className="w-5 h-5" />
                See Your Career Gap
              </button>
              <a href="https://wa.me/919876543210" target="_blank" className="btn-secondary text-lg px-8 py-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </motion.div>
            
            <motion.p 
              variants={fadeInUp}
              className="mt-6 text-sm text-slate-500"
            >
              Free to start • No credit card required • Results in 5 minutes
            </motion.p>
          </motion.div>
          
          {/* Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl shadow-primary-200/50 border border-slate-200 overflow-hidden">
              <div className="bg-slate-100 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-white rounded-lg px-4 py-1.5 text-sm text-slate-400 text-center">
                  your.dashboard.pssathee.ai
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="col-span-2 space-y-4">
                    <div className="bg-slate-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-800">Your Career Match: IAS Officer</h3>
                        <span className="badge-green">+12% this week</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-600">Overall Match</span>
                            <span className="font-semibold text-slate-800">67%</span>
                          </div>
                          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full" style={{ width: '67%' }} />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 pt-2">
                          <div className="text-center p-3 bg-white rounded-lg">
                            <div className="text-2xl font-bold text-primary-700">67%</div>
                            <div className="text-xs text-slate-500">Match</div>
                          </div>
                          <div className="text-center p-3 bg-white rounded-lg">
                            <div className="text-2xl font-bold text-warning">1:5556</div>
                            <div className="text-xs text-slate-500">Competition</div>
                          </div>
                          <div className="text-center p-3 bg-white rounded-lg">
                            <div className="text-2xl font-bold text-success">₹56K</div>
                            <div className="text-xs text-slate-500">Starting</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 rounded-xl p-4">
                      <h3 className="font-semibold text-slate-800 mb-4">Your Skill Gap</h3>
                      <div className="space-y-3">
                        {[
                          { name: 'Policy Drafting', progress: 80, color: 'bg-success' },
                          { name: 'Current Affairs', progress: 60, color: 'bg-primary-500' },
                          { name: 'Legal Writing', progress: 30, color: 'bg-warning' },
                          { name: 'Negotiation', progress: 20, color: 'bg-danger' },
                        ].map((skill, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">{skill.name}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div className={`h-full ${skill.color} rounded-full`} style={{ width: `${skill.progress}%` }} />
                              </div>
                              <span className="text-xs font-medium text-slate-600">{skill.progress}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-primary-700 to-primary-900 rounded-xl p-5 text-white">
                      <div className="flex items-center gap-2 mb-3">
                        <Flame className="w-5 h-5 text-amber-300" />
                        <span className="font-semibold">23 Day Streak</span>
                      </div>
                      <div className="text-3xl font-bold mb-1">2,450 XP</div>
                      <div className="text-primary-200 text-sm">Keep going!</div>
                    </div>
                    
                    <div className="bg-slate-50 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="w-5 h-5 text-primary-700" />
                        <span className="font-semibold text-slate-800">Today's Mission</span>
                      </div>
                      <div className="text-sm text-slate-600 mb-3">
                        Draft a Public Interest Litigation (PIL) for illegal sand mining case
                      </div>
                      <button onClick={() => setAssessmentOpen(true)} className="w-full btn-primary text-sm py-2">
                        Start Mission
                      </button>
                    </div>
                    
                    <div className="bg-slate-50 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-5 h-5 text-primary-700" />
                        <span className="font-semibold text-slate-800">This Week</span>
                      </div>
                      <div className="flex justify-between">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                          <div key={i} className="text-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                              i < 4 ? 'bg-success text-white' : i === 4 ? 'bg-primary-100 text-primary-700 ring-2 ring-primary-500' : 'bg-slate-200 text-slate-400'
                            }`}>
                              {i < 4 ? '✓' : ''}
                            </div>
                            <span className="text-xs text-slate-500 mt-1 block">{day}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { icon: Users, value: '3,00,000+', label: 'UPSC Aspirants/Year', color: 'text-red-400' },
              { icon: AlertTriangle, value: '78%', label: 'IT Jobs at AI Risk', color: 'text-amber-400' },
              { icon: DollarSign, value: '₹5-15L', label: 'Coaching Waste', color: 'text-green-400' },
              { icon: TrendingUp, value: '73%', label: 'Wrong Career Picks', color: 'text-blue-400' },
            ].map((stat, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1 font-display">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="text-primary-700 font-semibold text-sm uppercase tracking-wider">Simple Process</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              How PSsathee Works
            </h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              From career confusion to career clarity in 30 minutes a day
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { step: 1, icon: Target, title: 'Diagnose', description: 'We analyze your skills, interests, and current position against 64 career paths', color: 'bg-red-100 text-red-700', borderColor: 'border-red-200' },
              { step: 2, icon: Brain, title: 'Plan', description: 'AI generates a personalized 3-year roadmap with specific milestones', color: 'bg-amber-100 text-amber-700', borderColor: 'border-amber-200' },
              { step: 3, icon: Zap, title: 'Build', description: 'Complete daily 30-minute projects using AI tools to develop real skills', color: 'bg-primary-100 text-primary-700', borderColor: 'border-primary-200' },
              { step: 4, icon: Award, title: 'Prove', description: 'Build shareable proof of your skills with certificates and projects', color: 'bg-emerald-100 text-emerald-700', borderColor: 'border-emerald-200' },
            ].map((item) => (
              <motion.div 
                key={item.step}
                variants={fadeInUp}
                className={`relative bg-white rounded-2xl p-6 border-2 ${item.borderColor} hover:shadow-lg transition-all duration-300`}
              >
                <div className={`absolute -top-4 -left-4 w-8 h-8 ${item.color} rounded-full flex items-center justify-center text-sm font-bold`}>
                  {item.step}
                </div>
                <item.icon className={`w-10 h-10 ${item.color.replace('bg-', 'text-').replace('-100', '-600')} mb-4`} />
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Career Match Preview */}
      <section id="careers" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="text-primary-700 font-semibold text-sm uppercase tracking-wider">64 Career Paths</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              Find Your Perfect Career Match
            </h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              From IAS to Software Engineer, we cover every career with real competition data
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { name: 'IAS Officer', sector: 'Government', match: 67, competition: '1:5,556', salary: '₹56K-2.5L', aiRisk: 35, color: 'from-amber-500 to-amber-600' },
              { name: 'Software Engineer', sector: 'Private', match: 89, competition: 'High', salary: '₹4-60L', aiRisk: 78, color: 'from-blue-500 to-blue-600' },
              { name: 'Chartered Accountant', sector: 'Private', match: 45, competition: '1:25', salary: '₹6L-1Cr', aiRisk: 85, color: 'from-emerald-500 to-emerald-600' },
              { name: 'Doctor (NEET)', sector: 'Government', match: 82, competition: '1:40', salary: '₹60K-5L', aiRisk: 42, color: 'from-red-500 to-red-600' },
              { name: 'Data Scientist', sector: 'Private', match: 91, competition: 'Moderate', salary: '₹8-80L', aiRisk: 65, color: 'from-purple-500 to-purple-600' },
              { name: 'Bank PO', sector: 'Government', match: 74, competition: '1:200', salary: '₹52-85K', aiRisk: 55, color: 'from-indigo-500 to-indigo-600' },
            ].map((career, index) => (
              <motion.a
                key={index}
                href="/careers"
                variants={fadeInUp}
                className="card p-6 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className={`badge mb-2 ${career.sector === 'Government' ? 'badge-blue' : 'badge-green'}`}>
                      {career.sector}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-700 transition-colors">
                      {career.name}
                    </h3>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${career.color} flex items-center justify-center text-white font-bold`}>
                    {career.match}%
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Competition</span>
                    <span className="font-medium text-slate-700">{career.competition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Salary</span>
                    <span className="font-medium text-slate-700">{career.salary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">AI Risk</span>
                    <span className={`font-medium ${career.aiRisk < 50 ? 'text-success' : career.aiRisk < 70 ? 'text-warning' : 'text-danger'}`}>
                      {career.aiRisk}%
                    </span>
                  </div>
                </div>
                
                <button className="w-full mt-4 btn-ghost text-primary-700 flex items-center justify-center gap-1">
                  View Details
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.a>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <a href="/careers" className="btn-secondary text-lg px-8 py-4">
              Explore All 64 Careers
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Competition Intelligence */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="text-primary-300 font-semibold text-sm uppercase tracking-wider">Real Data</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
              Competition Intelligence
            </h2>
            <p className="text-slate-300 mt-4 max-w-2xl mx-auto">
              Know exactly what you're up against before you start preparing
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { exam: 'UPSC CSE', applicants: '10,00,000', seats: '1,000', rate: '0.01%', intensity: 5 },
              { exam: 'NEET', applicants: '23,33,000', seats: '58,583', rate: '2.5%', intensity: 5 },
              { exam: 'JEE Advanced', applicants: '2,50,000', seats: '18,160', rate: '7.2%', intensity: 5 },
              { exam: 'SSC CGL', applicants: '30,00,000', seats: '17,727', rate: '0.06%', intensity: 5 },
            ].map((exam, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10"
              >
                <h3 className="text-lg font-bold text-white mb-4">{exam.exam}</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-300 text-sm">Applicants</span>
                    <span className="text-white font-semibold">{exam.applicants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300 text-sm">Govt Seats</span>
                    <span className="text-white font-semibold">{exam.seats}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300 text-sm">Success Rate</span>
                    <span className="text-danger font-semibold">{exam.rate}</span>
                  </div>
                  
                  <div className="pt-2">
                    <span className="text-slate-400 text-xs">Competition Intensity</span>
                    <div className="flex gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Flame 
                          key={star} 
                          className={`w-4 h-4 ${star <= exam.intensity ? 'text-amber-400' : 'text-slate-600'}`} 
                          fill={star <= exam.intensity ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className="text-primary-700 font-semibold text-sm uppercase tracking-wider">Pricing</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              Career Insurance Starting at ₹1999/year
            </h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              Less than one month's tuition. More value than five years of confusion.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Free Tier */}
            <motion.div variants={fadeInUp} className="card p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Free</h3>
                <div className="text-4xl font-bold text-slate-900">₹0</div>
                <p className="text-slate-500 text-sm mt-1">Forever free</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">WhatsApp bot access</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">3 career missions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">Career match preview</span>
                </li>
                <li className="flex items-start gap-3 opacity-50">
                  <Lock className="w-5 h-5 text-slate-300 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-400 text-sm">Full career database</span>
                </li>
              </ul>
              
              <button onClick={() => openPricing('free')} className="w-full btn-secondary">Get Started</button>
            </motion.div>

            {/* Student Tier */}
            <motion.div variants={fadeInUp} className="card p-8 ring-2 ring-primary-500 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-primary-700 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Student</h3>
                <div className="text-4xl font-bold text-primary-700">₹1999</div>
                <p className="text-slate-500 text-sm">per year</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">Everything in Free</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">All 64 careers</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">Unlimited missions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">AI Mentor (Claude)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">Daily progress tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">Shareable certificates</span>
                </li>
              </ul>
              
              <button onClick={() => openPricing('student')} className="w-full btn-primary">Start 7-Day Free Trial</button>
              <p className="text-center text-xs text-slate-500 mt-3">No credit card required</p>
            </motion.div>

            {/* Family Tier */}
            <motion.div variants={fadeInUp} className="card p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Family</h3>
                <div className="text-4xl font-bold text-slate-900">₹2999</div>
                <p className="text-slate-500 text-sm">per year</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">Everything in Student</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">Up to 3 students</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">Parent dashboard</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">Weekly progress reports</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm">Priority support</span>
                </li>
              </ul>
              
              <button onClick={() => openPricing('family')} className="w-full btn-secondary">Get Family Plan</button>
            </motion.div>
          </motion.div>

          {/* ROI Calculator */}
          <motion.div 
            className="mt-16 max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Is ₹1999 Worth It?</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                  <span className="text-slate-600">Average coaching waste per student</span>
                  <span className="font-bold text-danger">₹5-15 Lakhs</span>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-slate-400 rotate-90" />
                </div>
                <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                  <span className="text-slate-600">Cost of wrong career decision</span>
                  <span className="font-bold text-danger">2-3 Years</span>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-6 h-6 text-slate-400 rotate-90" />
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl border-2 border-primary-200">
                  <span className="text-slate-800 font-semibold">PSsathee Student Plan</span>
                  <span className="font-bold text-primary-700">₹1999/year</span>
                </div>
              </div>
              
              <p className="text-center text-slate-600 mt-6 text-sm">
                <span className="font-semibold text-success">ROI:</span> ₹1999 prevents ₹5L+ coaching waste. 
                <span className="font-semibold"> That's 250x return.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-16 bg-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <MessageCircle className="w-16 h-16 text-white/80 mx-auto mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Start Your Career Assessment on WhatsApp
            </h2>
            <p className="text-primary-100 mb-8 max-w-xl mx-auto">
              Get your career match percentage in 5 minutes. No app download required.
            </p>
            <a href="https://wa.me/919876543210" target="_blank" className="bg-white text-primary-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary-50 transition-colors inline-flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">
                  PS<span className="text-primary-400">sathee</span>.ai
                </span>
              </div>
              <p className="text-slate-400 max-w-md">
                India's First AI-Powered Career Operating System. Helping students find their 
                perfect career path with real data, AI tools, and daily projects.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><a href="/careers" className="text-slate-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#how-it-works" className="text-slate-400 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">WhatsApp Bot</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © 2024 PSsathee.ai. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
      <AssessmentModal isOpen={assessmentOpen} onClose={() => setAssessmentOpen(false)} />
      <PricingModal isOpen={pricingOpen} onClose={() => setPricingOpen(false)} plan={pricingPlan} />
    </div>
  )
}
