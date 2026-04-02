'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  GraduationCap, Eye, EyeOff, User, Phone, Lock, Mail, ArrowRight, 
  Check, X, MessageCircle, Fingerprint, Shield, Zap
} from 'lucide-react'

export default function AuthPage() {
  const router = useRouter()
  const [isSignup, setIsSignup] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<'form' | 'otp'>('form')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    if (isSignup) {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match')
        setLoading(false)
        return
      }
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setStep('otp')
    setLoading(false)
  }

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const digits = value.replace(/\D/g, '').slice(0, 6)
      const newOtp = [...otp]
      digits.split('').forEach((digit, i) => {
        if (index + i < 6) {
          newOtp[index + i] = digit
        }
      })
      setOtp(newOtp)
    } else {
      const newOtp = [...otp]
      newOtp[index] = value.replace(/\D/g, '')
      setOtp(newOtp)
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleOTPVerify = async () => {
    const otpValue = otp.join('')
    if (otpValue.length !== 6) {
      alert('Please enter a valid 6-digit OTP')
      return
    }
    
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    router.push('/dashboard')
  }

  const handleResendOTP = () => {
    alert('OTP resent to your phone')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-700 to-primary-900 p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">PSsathee.ai</span>
          </div>
        </div>

        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-white leading-tight">
            India's First<br />
            AI-Powered Career<br />
            Operating System
          </h1>
          
          <div className="space-y-4">
            {[
              { icon: Shield, text: '64 Career Paths with Real Data' },
              { icon: Zap, text: 'AI-Powered Skills Gap Analysis' },
              { icon: Check, text: 'Daily Missions with XP & Streaks' },
              { icon: MessageCircle, text: 'WhatsApp Bot Integration' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-white/90">
                <item.icon className="w-5 h-5 text-amber-400" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-white/60 text-sm">
          © 2024 PSsathee.ai — ₹1999 = Career Insurance
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-700 to-primary-900 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">PSsathee.ai</span>
          </div>

          {step === 'form' ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900">
                  {isSignup ? 'Create Account' : 'Welcome Back'}
                </h2>
                <p className="text-slate-500 mt-2">
                  {isSignup 
                    ? 'Start your career journey today' 
                    : 'Login to continue your career journey'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
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
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="input-field pl-10"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    We'll send you an OTP for verification
                  </p>
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
                      minLength={6}
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

                {isSignup && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                        className="input-field pl-10"
                        placeholder="••••••••"
                        required={isSignup}
                      />
                    </div>
                  </div>
                )}

                {!isSignup && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-slate-300" />
                      <span className="text-sm text-slate-600">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-primary-700 hover:underline">Forgot password?</a>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-primary w-full py-3"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      {isSignup ? 'Create Account' : 'Login'}
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  )}
                </button>
              </form>

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
                  <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </button>
                  <a 
                    href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20login%20to%20PSsathee.ai"
                    className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 text-green-600" />
                    WhatsApp
                  </a>
                </div>
              </div>

              <p className="text-center text-slate-600 mt-8">
                {isSignup ? 'Already have an account?' : "Don't have an account?"}
                <button
                  onClick={() => setIsSignup(!isSignup)}
                  className="ml-1 text-primary-700 font-semibold hover:underline"
                >
                  {isSignup ? 'Login' : 'Sign Up'}
                </button>
              </p>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Fingerprint className="w-8 h-8 text-primary-700" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">Verify OTP</h2>
                <p className="text-slate-500 mt-2">
                  Enter the 6-digit code sent to<br />
                  <span className="font-semibold text-slate-700">{formData.phone || '+91 98765 43210'}</span>
                </p>
              </div>

              <div className="flex justify-center gap-2 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={6}
                    value={digit}
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    className="w-12 h-14 text-center text-2xl font-bold border-2 border-slate-200 rounded-xl focus:border-primary-500 focus:outline-none"
                  />
                ))}
              </div>

              <button 
                onClick={handleOTPVerify}
                disabled={loading || otp.join('').length !== 6}
                className="btn-primary w-full py-3"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>

              <div className="text-center mt-6">
                <p className="text-slate-500 text-sm">
                  Didn't receive the code?{' '}
                  <button onClick={handleResendOTP} className="text-primary-700 font-semibold hover:underline">
                    Resend OTP
                  </button>
                </p>
              </div>

              <button 
                onClick={() => setStep('form')}
                className="mt-4 text-slate-500 text-sm hover:text-slate-700"
              >
                ← Change phone number
              </button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}
