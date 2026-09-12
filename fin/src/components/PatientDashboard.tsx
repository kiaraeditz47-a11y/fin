import React from 'react';
import {
  MapPin,
  ShieldAlert,
  PhoneCall,
  Calendar,
  Sparkles,
  Video,
  Clock,
  ChevronRight,
  GitFork,
  AlertCircle,
  CheckCircle2,
  Building2,
  ArrowRight,
  Ticket
} from 'lucide-react';
import { Language, Appointment, Referral, FollowUpItem } from '../types';
import { translations } from '../translations';
import { NavTab } from './Sidebar';

interface PatientDashboardProps {
  language: Language;
  onNavigate: (tab: NavTab) => void;
  onOpenEmergency: () => void;
  onOpenBookAppointment: () => void;
  todayAppointment?: Appointment;
  activeReferral?: Referral;
  overdueFollowup?: FollowUpItem;
  onViewAppointmentDetails: (apt: Appointment) => void;
  onViewReferralDetails: (ref: Referral) => void;
  onViewFollowupDetails: (fol: FollowUpItem) => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({
  language,
  onNavigate,
  onOpenEmergency,
  onOpenBookAppointment,
  todayAppointment,
  activeReferral,
  overdueFollowup,
  onViewAppointmentDetails,
  onViewReferralDetails,
  onViewFollowupDetails
}) => {
  const t = translations[language];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header Greeting & Location */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172026] tracking-tight">
            {t.greetingDevi}
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-[#64748B] mt-1">
            <MapPin className="w-3.5 h-3.5 text-[#087F8C]" />
            <span>Kanyakumari District, Tamil Nadu</span>
            <span>•</span>
            <span className="text-emerald-700 font-medium">ABHA Linked: 91-4820-1940-2210</span>
          </div>
        </div>
      </div>

      {/* Main Emergency Card */}
      <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-3xl p-6 sm:p-7 text-white shadow-md relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute right-32 -top-12 w-32 h-32 rounded-full bg-white/5 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{language === 'ta' ? '24/7 அவசர மருத்துவ சேவை' : '24/7 Emergency Medical Response'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              {t.emergencyHelpTitle}
            </h3>
            <p className="text-rose-100 text-xs sm:text-sm leading-relaxed">
              {t.emergencyHelpDesc}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenEmergency}
              className="px-5 py-3 bg-white hover:bg-rose-50 text-rose-700 text-xs sm:text-sm font-bold rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>{t.emergencyHelpBtn}</span>
            </button>
            <button
              onClick={onOpenEmergency}
              className="px-5 py-3 bg-rose-700/80 hover:bg-rose-800 text-white text-xs sm:text-sm font-semibold rounded-2xl border border-white/20 transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t.callEmergencyBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions (4 Large Cards) */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
          {t.quickActions}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Find Healthcare */}
          <button
            onClick={() => onNavigate('find_healthcare')}
            className="text-left p-5 rounded-2xl bg-white border border-gray-200 hover:border-[#087F8C] hover:shadow-md transition-all group flex flex-col justify-between h-40"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#087F8C] group-hover:bg-[#087F8C] group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-base group-hover:text-[#087F8C] transition-colors flex items-center justify-between">
                <span>{t.navFindHealthcare}</span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#087F8C] group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {t.findFacilitiesDesc}
              </p>
            </div>
          </button>

          {/* 2. Book Appointment */}
          <button
            onClick={onOpenBookAppointment}
            className="text-left p-5 rounded-2xl bg-white border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all group flex flex-col justify-between h-40"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-base group-hover:text-blue-600 transition-colors flex items-center justify-between">
                <span>{language === 'ta' ? 'நியமனம் பதிவு' : 'Book Appointment'}</span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {t.bookAppointmentDesc}
              </p>
            </div>
          </button>

          {/* 3. AI Triage */}
          <button
            onClick={() => onNavigate('ai_triage')}
            className="text-left p-5 rounded-2xl bg-white border border-gray-200 hover:border-amber-500 hover:shadow-md transition-all group flex flex-col justify-between h-40"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-base group-hover:text-amber-600 transition-colors flex items-center justify-between">
                <span>{t.navAITriage}</span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {t.aiTriageDesc}
              </p>
            </div>
          </button>

          {/* 4. Teleconsultation */}
          <button
            onClick={() => onNavigate('teleconsultation')}
            className="text-left p-5 rounded-2xl bg-white border border-gray-200 hover:border-emerald-500 hover:shadow-md transition-all group flex flex-col justify-between h-40"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-base group-hover:text-emerald-600 transition-colors flex items-center justify-between">
                <span>{t.navTeleconsultation}</span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {t.teleconsultDesc}
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Grid: Upcoming Appointment & Referral Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Upcoming Appointment Card (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="font-bold text-gray-900 text-base">
                  {t.todaysAppointment}
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E8F7F5] text-[#075E67] border border-teal-200">
                09 Sep 2026
              </span>
            </div>

            {todayAppointment ? (
              <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="text-xs text-gray-500 font-medium">{t.facilityLabel}</div>
                    <div className="font-bold text-gray-900 text-sm">
                      {todayAppointment.facilityName}
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <div className="text-xs text-gray-500 font-medium">{t.doctorLabel}</div>
                    <div className="font-semibold text-gray-800 text-sm">
                      {todayAppointment.doctorName}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200 grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-white rounded-xl border border-gray-100">
                    <div className="text-[10px] text-gray-500 font-semibold uppercase">{t.timeLabel}</div>
                    <div className="font-bold text-[#172026] text-sm mt-0.5">{todayAppointment.time}</div>
                  </div>
                  <div className="p-2 bg-teal-50 rounded-xl border border-teal-100">
                    <div className="text-[10px] text-teal-700 font-semibold uppercase">{t.tokenLabel}</div>
                    <div className="font-extrabold text-[#087F8C] text-base mt-0.5">{todayAppointment.token}</div>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-gray-100">
                    <div className="text-[10px] text-gray-500 font-semibold uppercase">{t.estWaitLabel}</div>
                    <div className="font-bold text-gray-800 text-sm mt-0.5">~{todayAppointment.estimatedWaitMins} min</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500 text-xs">
                No appointment scheduled for today.
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {todayAppointment?.queueStatus || '5 patients ahead in OPD Queue'}
            </span>
            {todayAppointment && (
              <button
                onClick={() => onViewAppointmentDetails(todayAppointment)}
                className="px-4 py-2 bg-[#087F8C] hover:bg-[#075E67] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>{t.viewAppointment}</span>
              </button>
            )}
          </div>
        </div>

        {/* Right: Active Referral Status (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitFork className="w-4 h-4 text-[#087F8C]" />
                <h3 className="font-bold text-gray-900 text-base">
                  {t.activeReferral}
                </h3>
              </div>
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                REF-2026-00482
              </span>
            </div>

            {/* Referral Progress Ladder */}
            <div className="space-y-2">
              <div className="text-xs font-medium text-gray-500">
                {t.referralPathway}
              </div>

              {/* Graphical Step Indicator */}
              <div className="p-3.5 bg-teal-50/60 rounded-2xl border border-teal-100 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-medium text-gray-700">PHC</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-medium text-gray-700">Rural Hosp.</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                    <span className="font-bold text-amber-900">District Hosp.</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-teal-100 text-xs">
                  <span className="text-gray-500">{t.referralStatusLabel}: </span>
                  <span className="font-bold text-[#075E67]">
                    Rural Hospital — Awaiting consultation
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[11px] text-gray-500">Obstetric high-risk OPD</span>
            {activeReferral && (
              <button
                onClick={() => onViewReferralDetails(activeReferral)}
                className="px-4 py-2 border border-gray-300 hover:border-[#087F8C] text-[#075E67] hover:bg-teal-50 text-xs font-bold rounded-xl transition-colors flex items-center gap-1"
              >
                <span>{t.trackReferral}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Follow-up Due Card (Maternal Health Overdue) */}
      {overdueFollowup && (
        <div className="bg-amber-50/80 border border-amber-200 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 border border-amber-200">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-gray-900 text-base">
                  {t.followUpDue}
                </h4>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-rose-100 text-rose-700 border border-rose-200">
                  {t.overdue}
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                <strong>{t.maternalFollowUp}</strong> • {overdueFollowup.condition}
              </p>
              <div className="text-xs text-gray-500 mt-0.5">
                Due: <span className="font-semibold text-gray-800">03 Sep 2026</span> • Assigned: {overdueFollowup.vhnAssigned}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onViewFollowupDetails(overdueFollowup)}
              className="w-full sm:w-auto px-4 py-2 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
            >
              {t.viewFollowUp}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
