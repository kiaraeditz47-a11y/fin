import React from 'react';
import { 
  Building2, 
  HeartHandshake, 
  Stethoscope, 
  UserCheck, 
  Shield, 
  Globe2, 
  CheckCircle2, 
  ArrowRight,
  Activity,
  Award
} from 'lucide-react';
import { Language, UserRole } from '../types';
import { translations } from '../translations';

interface LoginScreenProps {
  language: Language;
  onLanguageToggle: () => void;
  onLogin: (role: UserRole) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  language,
  onLanguageToggle,
  onLogin
}) => {
  const t = translations[language];

  return (
    <div className="min-h-screen bg-[#F7FAFA] flex flex-col justify-between">
      {/* Top Banner with TN Public Health identity */}
      <header className="w-full bg-white border-b border-gray-200 px-4 sm:px-8 py-2.5 flex items-center justify-between text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[#087F8C] flex items-center justify-center text-white font-bold text-[10px]">
            TN
          </div>
          <span className="font-semibold text-gray-800">
            {t.govtHeader}
          </span>
          <span className="hidden md:inline-block text-gray-300">•</span>
          <span className="hidden md:inline-block text-gray-500 font-medium">
            Kanyakumari District Health Society
          </span>
        </div>

        {/* Language switch */}
        <button
          onClick={onLanguageToggle}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-[#087F8C] text-xs font-semibold text-gray-700 hover:text-[#087F8C] transition-all bg-gray-50 hover:bg-[#E8F7F5]"
        >
          <Globe2 className="w-3.5 h-3.5 text-[#087F8C]" />
          <span>{language === 'en' ? 'தமிழ்' : 'English'}</span>
        </button>
      </header>

      {/* Main Dual-Column Welcome Hero */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: Brand Identity & Narrative */}
        <div className="lg:col-span-6 space-y-6">
          {/* Logo Badge */}
          <div className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#087F8C] to-[#075E67] text-white flex items-center justify-center shadow-md shadow-teal-900/10">
              <Activity className="w-7 h-7" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-gray-900">
                Arogya<span className="text-[#087F8C]">Connect</span>
              </span>
              <span className="block text-[11px] font-semibold text-[#075E67] uppercase tracking-wider">
                {t.district}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#172026] tracking-tight leading-tight">
              {t.tagline}
            </h1>
            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-xl">
              {t.subTagline}
            </p>
          </div>

          {/* 4-Tier Public Health Ladder Indicator */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#087F8C]" />
              {language === 'ta' ? 'இணைக்கப்பட்ட சுகாதார படிநிலைகள்' : 'Connected Public Healthcare Network'}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-[#E8F7F5] border border-teal-200">
                <div className="font-bold text-[#075E67]">Sub-Centre</div>
                <div className="text-[10px] text-teal-800 mt-0.5">Village Mandir</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#E8F7F5] border border-teal-200">
                <div className="font-bold text-[#075E67]">PHC</div>
                <div className="text-[10px] text-teal-800 mt-0.5">Primary Care</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#E8F7F5] border border-teal-200">
                <div className="font-bold text-[#075E67]">Rural Hospital</div>
                <div className="text-[10px] text-teal-800 mt-0.5">Secondary Care</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#E8F7F5] border border-teal-200">
                <div className="font-bold text-[#075E67]">District Hosp.</div>
                <div className="text-[10px] text-teal-800 mt-0.5">Tertiary Hub</div>
              </div>
            </div>
          </div>

          {/* Key Trust Signals */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center gap-2.5 text-xs text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Unified ABHA patient health record & live queue tracking</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Free government medicines & diagnostics catalog access</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-gray-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>End-to-end referral tracking with maternal proactive follow-up</span>
            </div>
          </div>
        </div>

        {/* Right Side: Large Login Card */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-6 sm:p-8 space-y-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F7F5] text-[#075E67] text-xs font-semibold">
                <Shield className="w-3.5 h-3.5 text-[#087F8C]" />
                <span>Kanyakumari Public Health Portal</span>
              </div>
              <h2 className="text-2xl font-bold text-[#172026]">
                {t.continueAs}
              </h2>
              <p className="text-sm text-[#64748B]">
                {t.loginPrompt}
              </p>
            </div>

            {/* Role Options */}
            <div className="space-y-4">
              {/* Patient Card */}
              <button
                type="button"
                onClick={() => onLogin('patient')}
                className="w-full text-left p-5 rounded-2xl border-2 border-gray-200 hover:border-[#087F8C] hover:bg-teal-50/40 transition-all group flex items-start justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-[#087F8C]"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 text-[#087F8C] group-hover:bg-[#087F8C] group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-xs">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 text-base group-hover:text-[#087F8C] transition-colors">
                        {t.patient}
                      </span>
                      <span className="text-[11px] font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
                        Devi S.
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {t.patientDesc}
                    </p>
                    <span className="inline-block text-[11px] font-medium text-[#087F8C] mt-2 group-hover:underline">
                      {language === 'ta' ? 'நோயாளராக தொடர கிளிக் செய்யவும் →' : 'Continue as Devi S. (Citizen) →'}
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#087F8C] group-hover:text-white flex items-center justify-center text-gray-400 shrink-0 transition-all mt-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>

              {/* Health Worker Card */}
              <button
                type="button"
                onClick={() => onLogin('health_worker')}
                className="w-full text-left p-5 rounded-2xl border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-50/40 transition-all group flex items-start justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-xs">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900 text-base group-hover:text-blue-700 transition-colors">
                        {t.healthWorker}
                      </span>
                      <span className="text-[11px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">
                        Sister Anitha R. (VHN)
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {t.healthWorkerDesc}
                    </p>
                    <span className="inline-block text-[11px] font-medium text-blue-700 mt-2 group-hover:underline">
                      {language === 'ta' ? 'பணியாளராக உள்நுழைய கிளிக் செய்யவும் →' : 'Access PHC Staff Portal →'}
                    </span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-gray-400 shrink-0 transition-all mt-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>

            {/* Language Selector in Login card */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500">
                {language === 'ta' ? 'மொழி தேர்வு / Language:' : 'Interface Language:'}
              </span>
              <div className="inline-flex rounded-lg border border-gray-200 p-0.5 bg-gray-50">
                <button
                  type="button"
                  onClick={() => language !== 'en' && onLanguageToggle()}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                    language === 'en' 
                      ? 'bg-white text-[#087F8C] shadow-xs' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => language !== 'ta' && onLanguageToggle()}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                    language === 'ta' 
                      ? 'bg-white text-[#087F8C] shadow-xs' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  தமிழ்
                </button>
              </div>
            </div>

            {/* Mock Notice */}
            <div className="text-[11px] text-gray-400 text-center bg-gray-50 p-2.5 rounded-xl border border-gray-100">
              Interactive Prototype • Self-contained mock data • Designed for Kanyakumari District
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200 px-4 sm:px-8 py-4 text-center text-xs text-gray-500">
        <p>© 2026 ArogyaConnect • Public Health & Family Welfare Department, Government of Tamil Nadu</p>
      </footer>
    </div>
  );
};
