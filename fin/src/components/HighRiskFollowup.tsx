import React, { useState } from 'react';
import { 
  AlertCircle, 
  HeartPulse, 
  CheckCircle2, 
  Clock, 
  User, 
  Calendar, 
  PhoneCall, 
  Video, 
  FileText, 
  TrendingUp, 
  ShieldAlert, 
  ArrowRight, 
  MapPin,
  Check
} from 'lucide-react';
import { FollowUpItem, Language } from '../types';
import { translations } from '../translations';
import { NavTab } from './Sidebar';

interface HighRiskFollowupProps {
  followup: FollowUpItem;
  language: Language;
  onNavigate: (tab: NavTab) => void;
  onOpenEmergency: () => void;
}

export const HighRiskFollowup: React.FC<HighRiskFollowupProps> = ({
  followup,
  language,
  onNavigate,
  onOpenEmergency
}) => {
  const t = translations[language];

  // Clinical checklist state
  const [checklist, setChecklist] = useState([
    { id: 1, label: 'Blood pressure checked (Sphygmomanometer calibration)', done: true },
    { id: 2, label: 'Urine protein dipstick test performed', done: true },
    { id: 3, label: 'Salt restriction & nutritional advice counseling given', done: true },
    { id: 4, label: 'Referral compliance to Rural Hospital confirmed', done: false }
  ]);

  const [isCompleted, setIsCompleted] = useState(false);
  const [actionSuccessToast, setActionSuccessToast] = useState<string | null>(null);

  const toggleChecklist = (id: number) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const showToast = (msg: string) => {
    setActionSuccessToast(msg);
    setTimeout(() => setActionSuccessToast(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Toast */}
      {actionSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-teal-800 text-white text-xs font-bold shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-teal-200" />
          <span>{actionSuccessToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172026] tracking-tight">
            {t.highRiskTitle}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {language === 'ta'
              ? 'அதி-ஆபத்து கர்ப்பம் & தொடர் மருத்துவ கண்காணிப்பு வழிகாட்டுதல்'
              : 'Dedicated maternal and chronic care clinical follow-up protocol and care plan'}
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-200 self-start">
          High-Risk Antenatal Case (Gestational HTN)
        </span>
      </div>

      {/* Patient Header Card (Prompt Section 15 Requirement) */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-100 text-[#087F8C] flex items-center justify-center font-bold text-xl shrink-0">
              D
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-gray-900 text-lg sm:text-xl">
                  {followup.patientName}
                </h3>
                <span className="text-xs font-semibold text-gray-500">
                  ({followup.age} years, Female)
                </span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                  {isCompleted ? 'Follow-up Closed' : 'Overdue'}
                </span>
              </div>
              <p className="text-xs font-bold text-[#075E67]">
                Gestational Hypertension (Week 28 of Pregnancy)
              </p>
              <div className="text-xs text-gray-500 flex flex-wrap items-center gap-3 mt-1">
                <span>VHN Assigned: <strong>{followup.vhnAssigned}</strong></span>
                <span>•</span>
                <span>Sub-Centre: {followup.facility}</span>
                <span>•</span>
                <span className="text-rose-700 font-semibold">Next Due: 03 Sep 2026 (Overdue)</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => showToast('Calling patient Devi S. on registered mobile...')}
              className="px-4 py-2 bg-[#087F8C] hover:bg-[#075E67] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Patient</span>
            </button>
          </div>
        </div>
      </div>

      {/* Vital Trends Section (Prompt Section 15 Requirement) */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#087F8C]" />
            <h4 className="font-bold text-gray-900 text-base">
              {t.vitalTrends}
            </h4>
          </div>
          <span className="text-xs text-gray-400">Past 30 Days Progression</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* BP Progression */}
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-900">Blood Pressure</span>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                Elevated
              </span>
            </div>
            <div className="text-2xl font-black text-rose-900">144 / 92 <span className="text-xs font-normal text-rose-700">mmHg</span></div>
            <div className="text-xs text-rose-800">
              Progression: 138/88 (20 Aug) → <strong>144/92 (05 Sep)</strong>
            </div>
          </div>

          {/* Weight Tracking */}
          <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#075E67]">Weight Tracking</span>
              <span className="text-[10px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded">
                Antenatal Gain
              </span>
            </div>
            <div className="text-2xl font-black text-teal-900">61.2 <span className="text-xs font-normal text-teal-700">kg</span></div>
            <div className="text-xs text-[#075E67]">
              Progression: 58.0 kg (July) → <strong>61.2 kg (Sep)</strong>
            </div>
          </div>

          {/* Foetal Heart Rate */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900">Foetal Heart Rate</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                Normal Rhythm
              </span>
            </div>
            <div className="text-2xl font-black text-emerald-900">142 <span className="text-xs font-normal text-emerald-700">bpm</span></div>
            <div className="text-xs text-emerald-800">
              Good variability recorded on Doppler check
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Checklist (Prompt Section 15 Requirement) */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-gray-900 text-base">
            {t.clinicalChecklist}
          </h4>
          <span className="text-xs font-semibold text-gray-500">
            {checklist.filter((c) => c.done).length} of {checklist.length} completed
          </span>
        </div>

        <div className="space-y-2.5">
          {checklist.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleChecklist(item.id)}
              className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                item.done
                  ? 'bg-teal-50/50 border-teal-200 text-teal-950 font-medium'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                  item.done ? 'bg-[#087F8C] border-[#087F8C] text-white' : 'border-gray-300 bg-white'
                }`}>
                  {item.done && <Check className="w-3.5 h-3.5" />}
                </div>
                <span className="text-xs sm:text-sm">{item.label}</span>
              </div>
              <span className="text-[11px] font-bold text-gray-400">
                {item.done ? 'Done' : 'Pending'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Care Plan / Next Actions (Prompt Section 15 Requirement) */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-4">
        <h4 className="font-bold text-gray-900 text-base">
          Care Plan Protocol & Next Actions
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Action 1: Schedule home visit */}
          <button
            onClick={() => showToast('Home visit scheduled for tomorrow morning by VHN Anitha.')}
            className="p-4 rounded-2xl border border-gray-200 hover:border-[#087F8C] hover:bg-teal-50/30 text-left transition-all space-y-2 group"
          >
            <Calendar className="w-5 h-5 text-[#087F8C]" />
            <div className="font-bold text-gray-900 text-xs sm:text-sm">Schedule In-Person Home Visit</div>
            <p className="text-[11px] text-gray-500">Confirm VHN Anitha field dispatch</p>
          </button>

          {/* Action 2: Issue transport voucher / call 108 */}
          <button
            onClick={onOpenEmergency}
            className="p-4 rounded-2xl border border-rose-200 hover:border-rose-400 hover:bg-rose-50/30 text-left transition-all space-y-2 group"
          >
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <div className="font-bold text-rose-950 text-xs sm:text-sm">Dispatch 108 / Transport</div>
            <p className="text-[11px] text-rose-700">Govt emergency ambulance pickup</p>
          </button>

          {/* Action 3: Teleconsult with Obstetrician */}
          <button
            onClick={() => onNavigate('teleconsultation')}
            className="p-4 rounded-2xl border border-teal-200 hover:border-teal-400 hover:bg-teal-50/30 text-left transition-all space-y-2 group"
          >
            <Video className="w-5 h-5 text-teal-600" />
            <div className="font-bold text-teal-950 text-xs sm:text-sm">Teleconsult Obstetrician</div>
            <p className="text-[11px] text-teal-700">Connect with Dr. Meenakshi (DH)</p>
          </button>

          {/* Action 4: Mark follow-up completed */}
          <button
            onClick={() => {
              setIsCompleted(true);
              showToast('High-risk follow-up closed and logged into Tamil Nadu Health records.');
            }}
            className="p-4 rounded-2xl border border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50/30 text-left transition-all space-y-2 group"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <div className="font-bold text-emerald-950 text-xs sm:text-sm">Mark Follow-up Done</div>
            <p className="text-[11px] text-emerald-700">Archive into completed roster</p>
          </button>
        </div>
      </div>
    </div>
  );
};
