'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  Search, Filter, ChevronRight, ChevronLeft, Users, DollarSign, 
  AlertTriangle, Flame, GraduationCap, ArrowLeft, Bookmark, Share2, 
  TrendingUp, X, Lock, Unlock, ExternalLink
} from 'lucide-react'
import Link from 'next/link'

const careers = [
  // Government Jobs
  { id: 'ias-officer', name: 'IAS Officer', sector: 'Government', category: 'Civil Services', match: 67, competition: '1:5,556', salary: '₹56K-2.5L', aiRisk: 35, education: 'Any Graduate', exam: 'UPSC CSE' },
  { id: 'ips-officer', name: 'IPS Officer', sector: 'Government', category: 'Civil Services', match: 62, competition: '1:5,000', salary: '₹56K-2.25L', aiRisk: 25, education: 'Any Graduate', exam: 'UPSC CSE' },
  { id: 'sdm-tehsildar', name: 'SDM / Tehsildar', sector: 'Government', category: 'State Administration', match: 71, competition: '1:500', salary: '₹35K-1.2L', aiRisk: 30, education: 'Graduate', exam: 'State PCS' },
  { id: 'army-officer', name: 'Indian Army Officer', sector: 'Government', category: 'Defence', match: 55, competition: '1:500', salary: '₹56K-2.5L', aiRisk: 15, education: 'Graduate', exam: 'NDA/CDS' },
  { id: 'police-si', name: 'Sub-Inspector', sector: 'Government', category: 'Police', match: 65, competition: '1:200', salary: '₹35K-1.12L', aiRisk: 28, education: 'Graduate', exam: 'State Police SI' },
  { id: 'railway-je', name: 'Railway Junior Engineer', sector: 'Government', category: 'Railways', match: 68, competition: '1:170', salary: '₹35K-1.12L', aiRisk: 45, education: 'Diploma/B.Tech', exam: 'RRB JE' },
  { id: 'bank-po', name: 'Bank PO', sector: 'Government', category: 'Banking', match: 74, competition: '1:200', salary: '₹52K-85K', aiRisk: 55, education: 'Graduate', exam: 'IBPS/SBI PO' },
  { id: 'rbi-grade-b', name: 'RBI Grade B Officer', sector: 'Government', category: 'Banking', match: 48, competition: '1:600', salary: '₹77K-1.3L', aiRisk: 40, education: 'Graduate 60%', exam: 'RBI Grade B' },
  { id: 'govt-teacher', name: 'Government Teacher', sector: 'Government', category: 'Education', match: 69, competition: '1:100', salary: '₹35K-1.12L', aiRisk: 20, education: 'Graduate + B.Ed', exam: 'CTET/TET' },
  { id: 'mbbs-doctor', name: 'Government Doctor', sector: 'Government', category: 'Healthcare', match: 82, competition: '1:40', salary: '₹56K-2L', aiRisk: 42, education: 'MBBS', exam: 'NEET/SPC' },
  { id: 'isro-scientist', name: 'ISRO Scientist', sector: 'Government', category: 'Science', match: 42, competition: '1:100', salary: '₹56K-2L', aiRisk: 20, education: 'B.Tech/M.Sc', exam: 'ISRO ICRB' },
  { id: 'civil-judge', name: 'Civil Judge', sector: 'Government', category: 'Judiciary', match: 38, competition: '1:500', salary: '₹77K-2L', aiRisk: 15, education: 'LLB', exam: 'State PCS (J)' },
  { id: 'ssc-cgl', name: 'SSC CGL Officer', sector: 'Government', category: 'Central Services', match: 66, competition: '1:1,700', salary: '₹25K-1L', aiRisk: 35, education: 'Graduate', exam: 'SSC CGL' },
  
  // Private Jobs
  { id: 'software-engineer', name: 'Software Engineer', sector: 'Private', category: 'IT', match: 89, competition: 'High', salary: '₹4-60L', aiRisk: 78, education: 'B.Tech/BCA', exam: 'Campus/Off-campus' },
  { id: 'full-stack-dev', name: 'Full Stack Developer', sector: 'Private', category: 'IT', match: 85, competition: 'Moderate', salary: '₹3-40L', aiRisk: 75, education: 'B.Tech/Bootcamp', exam: 'Portfolio-based' },
  { id: 'data-scientist', name: 'Data Scientist', sector: 'Private', category: 'IT/Data', match: 91, competition: 'Moderate', salary: '₹8-80L', aiRisk: 65, education: 'B.Tech/M.Sc', exam: 'Technical Interview' },
  { id: 'cybersecurity', name: 'Cybersecurity Analyst', sector: 'Private', category: 'IT/Security', match: 78, competition: 'Low', salary: '₹5-50L', aiRisk: 30, education: 'B.Tech + Certs', exam: 'Practical Test' },
  { id: 'cloud-engineer', name: 'Cloud Engineer', sector: 'Private', category: 'IT/Cloud', match: 86, competition: 'Moderate', salary: '₹6-60L', aiRisk: 55, education: 'B.Tech + Cloud Certs', exam: 'Technical Interview' },
  { id: 'product-manager', name: 'Product Manager', sector: 'Private', category: 'Tech/Business', match: 72, competition: 'High', salary: '₹12-80L', aiRisk: 50, education: 'MBA/Engineering', exam: 'Case Study + Interview' },
  { id: 'chartered-accountant', name: 'Chartered Accountant', sector: 'Private', category: 'Finance', match: 45, competition: 'High', salary: '₹6L-1Cr', aiRisk: 85, education: 'CA (ICAI)', exam: 'CA Foundation→Final' },
  { id: 'investment-banker', name: 'Investment Banker', sector: 'Private', category: 'Finance', match: 35, competition: 'Very High', salary: '₹8L-1Cr', aiRisk: 60, education: 'MBA Finance/CA', exam: 'Aptitude + Interview' },
  { id: 'advocate', name: 'Advocate / Lawyer', sector: 'Private', category: 'Legal', match: 48, competition: 'Very High', salary: '₹15K-10L+/month', aiRisk: 72, education: 'LLB', exam: 'Bar Council Enrollment' },
  { id: 'pilot', name: 'Commercial Pilot', sector: 'Private', category: 'Aviation', match: 40, competition: 'High', salary: '₹1.5L-6L', aiRisk: 25, education: '12th PCM + CPL', exam: 'DGCA CPL' },
  { id: 'ui-ux-designer', name: 'UI/UX Designer', sector: 'Private', category: 'Creative/Tech', match: 82, competition: 'Moderate', salary: '₹2.5-25L', aiRisk: 58, education: 'B.Des/Bootcamp', exam: 'Portfolio + Assignment' },
  { id: 'content-creator', name: 'Content Creator', sector: 'Private', category: 'Creator Economy', match: 75, competition: 'Very High', salary: '₹0-5Cr', aiRisk: 50, education: 'No degree required', exam: 'Self-driven' },
  { id: 'private-doctor', name: 'Private Doctor', sector: 'Private', category: 'Healthcare', match: 88, competition: 'Moderate', salary: '₹60K-5L+', aiRisk: 38, education: 'MBBS/MD', exam: 'Degree-based' },
  { id: 'dentist', name: 'Dentist', sector: 'Private', category: 'Healthcare', match: 76, competition: 'Moderate', salary: '₹30K-2L', aiRisk: 45, education: 'BDS/MDS', exam: 'Degree-based' },
  { id: 'journalist', name: 'Journalist', sector: 'Private', category: 'Media', match: 52, competition: 'High', salary: '₹2.5-25L', aiRisk: 65, education: 'BJMC/MA Journalism', exam: 'Aptitude + Portfolio' },
  { id: 'marketing-manager', name: 'Marketing Manager', sector: 'Private', category: 'Business', match: 70, competition: 'Moderate', salary: '₹3-35L', aiRisk: 58, education: 'MBA Marketing', exam: 'Case Study + Interview' },
  { id: 'entrepreneur', name: 'Entrepreneur', sector: 'Private', category: 'Business', match: 40, competition: 'Everyone', salary: '₹0-Unlimited', aiRisk: 90, education: 'No formal requirement', exam: 'Market validation' },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
}

export default function CareersPage() {
  const router = useRouter()
  const [selectedSector, setSelectedSector] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'match' | 'risk' | 'name'>('match')
  const [selectedCareer, setSelectedCareer] = useState<typeof careers[0] | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [savedCareers, setSavedCareers] = useState<string[]>([])

  const sectors = ['All', 'Government', 'Private']
  const categories = ['All', 'Civil Services', 'Defence', 'Police', 'Railways', 'Banking', 'IT', 'Healthcare', 'Finance', 'Legal', 'Education', 'Science', 'Judiciary', 'Business', 'Media', 'Creator Economy']

  const filteredCareers = careers
    .filter(career => selectedSector === 'All' || career.sector === selectedSector)
    .filter(career => selectedCategory === 'All' || career.category === selectedCategory)
    .filter(career => career.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'match') return b.match - a.match
      if (sortBy === 'risk') return b.aiRisk - a.aiRisk
      return a.name.localeCompare(b.name)
    })

  const toggleSave = (id: string) => {
    setSavedCareers(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const shareCareer = (career: typeof careers[0]) => {
    if (navigator.share) {
      navigator.share({
        title: career.name,
        text: `${career.name} - ${career.match}% match | PSsathee.ai`,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(`${career.name} - ${career.match}% match | PSsathee.ai`)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-primary-700">
                <ArrowLeft className="w-5 h-5" />
                Back
              </Link>
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-700 to-primary-900 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-slate-900">PSsathee.ai</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => router.push('/auth')}
                className="btn-ghost text-sm"
              >
                Login
              </button>
              <button 
                onClick={() => router.push('/dashboard')}
                className="btn-primary text-sm"
              >
                Start Assessment
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Explore 64 Career Paths</h1>
          <p className="text-slate-600 mt-2">Real data, competition ratios, and AI risk scores for every career</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search careers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>

            {/* Sector Filter */}
            <div className="hidden lg:flex gap-2">
              {sectors.map((sector) => (
                <button
                  key={sector}
                  onClick={() => setSelectedSector(sector)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    selectedSector === sector
                      ? 'bg-primary-700 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {sector}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="input-field w-auto"
            >
              <option value="match">Sort by Match %</option>
              <option value="risk">Sort by AI Risk</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>

          {/* Mobile Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
                  {sectors.map((sector) => (
                    <button
                      key={sector}
                      onClick={() => setSelectedSector(sector)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm ${
                        selectedSector === sector
                          ? 'bg-primary-700 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {sector}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-primary-100 text-primary-700 ring-2 ring-primary-500'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-slate-600">
            <span className="font-semibold text-slate-900">{filteredCareers.length}</span> careers found
          </p>
          {savedCareers.length > 0 && (
            <p className="text-sm text-primary-700">
              {savedCareers.length} saved careers
            </p>
          )}
        </div>

        {/* Career Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          key={`${selectedSector}-${selectedCategory}-${searchQuery}`}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {filteredCareers.map((career) => (
            <motion.div
              key={career.id}
              variants={fadeInUp}
              className="card p-5 cursor-pointer group hover:border-primary-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <span className={`badge mb-1 ${
                    career.sector === 'Government' ? 'badge-blue' : 'badge-green'
                  }`}>
                    {career.sector}
                  </span>
                  <h3 className="font-bold text-slate-900 group-hover:text-primary-700 transition-colors">
                    {career.name}
                  </h3>
                </div>
                <div className={`text-xl font-bold ${
                  career.match >= 80 ? 'text-success' : career.match >= 60 ? 'text-primary-700' : 'text-warning'
                }`}>
                  {career.match}%
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-slate-500 text-xs">Competition</div>
                  <div className="font-medium text-slate-700">{career.competition}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-xs">Salary</div>
                  <div className="font-medium text-slate-700">{career.salary}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-xs">AI Risk</div>
                  <div className={`font-medium ${
                    career.aiRisk < 40 ? 'text-success' : career.aiRisk < 60 ? 'text-warning' : 'text-danger'
                  }`}>
                    {career.aiRisk}%
                  </div>
                </div>
                <div>
                  <div className="text-slate-500 text-xs">Education</div>
                  <div className="font-medium text-slate-700 text-xs truncate">{career.education}</div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setSelectedCareer(career)}
                  className="flex-1 btn-ghost text-primary-700 text-sm flex items-center justify-center gap-1"
                >
                  View Details
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleSave(career.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    savedCareers.includes(career.id)
                      ? 'bg-primary-100 text-primary-700'
                      : 'hover:bg-slate-100 text-slate-400'
                  }`}
                >
                  <Bookmark className={`w-5 h-5 ${savedCareers.includes(career.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredCareers.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No careers found</h3>
            <p className="text-slate-500">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      {/* Career Detail Modal */}
      <AnimatePresence>
        {selectedCareer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCareer(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-200 sticky top-0 bg-white z-10">
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`badge mb-2 ${
                      selectedCareer.sector === 'Government' ? 'badge-blue' : 'badge-green'
                    }`}>
                      {selectedCareer.sector} • {selectedCareer.category}
                    </span>
                    <h2 className="text-2xl font-bold text-slate-900">{selectedCareer.name}</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedCareer(null)} 
                    className="p-2 hover:bg-slate-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Match Score */}
                <div className="bg-slate-50 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-slate-800">Your Career Match</span>
                    <span className={`text-2xl font-bold ${
                      selectedCareer.match >= 80 ? 'text-success' : selectedCareer.match >= 60 ? 'text-primary-700' : 'text-warning'
                    }`}>
                      {selectedCareer.match}%
                    </span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        selectedCareer.match >= 80 ? 'bg-success' : selectedCareer.match >= 60 ? 'bg-primary-600' : 'bg-warning'
                      }`}
                      style={{ width: `${selectedCareer.match}%` }}
                    />
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                      <Users className="w-4 h-4" />
                      Competition
                    </div>
                    <div className="font-bold text-slate-900">{selectedCareer.competition}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                      <DollarSign className="w-4 h-4" />
                      Salary Range
                    </div>
                    <div className="font-bold text-slate-900">{selectedCareer.salary}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                      <AlertTriangle className="w-4 h-4" />
                      AI Risk Level
                    </div>
                    <div className={`font-bold ${
                      selectedCareer.aiRisk < 40 ? 'text-success' : selectedCareer.aiRisk < 60 ? 'text-warning' : 'text-danger'
                    }`}>
                      {selectedCareer.aiRisk}%
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                      <GraduationCap className="w-4 h-4" />
                      Required Education
                    </div>
                    <div className="font-bold text-slate-900 text-sm">{selectedCareer.education}</div>
                  </div>
                </div>

                {/* Entry Path */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary-700" />
                    Entry Path
                  </h4>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <span className="badge-blue mb-2">Exam Required</span>
                    <p className="font-medium text-slate-800">{selectedCareer.exam}</p>
                  </div>
                </div>

                {/* AI Impact */}
                <div className={`rounded-xl p-5 ${
                  selectedCareer.aiRisk < 40 ? 'bg-emerald-50 border border-emerald-200' :
                  selectedCareer.aiRisk < 60 ? 'bg-amber-50 border border-amber-200' :
                  'bg-red-50 border border-red-200'
                }`}>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Flame className={`w-5 h-5 ${
                      selectedCareer.aiRisk < 40 ? 'text-success' :
                      selectedCareer.aiRisk < 60 ? 'text-warning' : 'text-danger'
                    }`} />
                    AI Impact Assessment
                  </h4>
                  <p className="text-sm text-slate-700">
                    {selectedCareer.aiRisk < 40 ? (
                      <>This career has <strong>low AI risk</strong>. AI assists rather than replaces. Human judgment, creativity, and interpersonal skills remain essential.</>
                    ) : selectedCareer.aiRisk < 60 ? (
                      <>This career has <strong>moderate AI risk</strong>. AI will automate routine tasks, but professionals with AI tool proficiency will thrive.</>
                    ) : (
                      <>This career has <strong>high AI risk</strong>. Core tasks face automation. Focus on developing AI-proof skills like strategy, negotiation, and creative problem-solving.</>
                    )}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-slate-200">
                  <button 
                    onClick={() => toggleSave(selectedCareer.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border transition-colors ${
                      savedCareers.includes(selectedCareer.id)
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Bookmark className={`w-5 h-5 ${savedCareers.includes(selectedCareer.id) ? 'fill-current' : ''}`} />
                    {savedCareers.includes(selectedCareer.id) ? 'Saved' : 'Save'}
                  </button>
                  <button 
                    onClick={() => shareCareer(selectedCareer)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-slate-200 hover:bg-slate-50"
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                  <button 
                    onClick={() => router.push('/dashboard')}
                    className="btn-primary flex-1"
                  >
                    Set as Target
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
