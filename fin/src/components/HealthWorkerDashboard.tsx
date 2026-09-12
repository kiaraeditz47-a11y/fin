import React, { useState } from 'react';
import { 
  Users, 
  AlertTriangle, 
  GitFork, 
  Pill, 
  PhoneCall, 
  Calendar, 
  ArrowUpRight, 
  CheckCircle2, 
  Plus, 
  FileText, 
  Clock, 
  MapPin, 
  ShieldAlert, 
  Search,
  Check,
  Send,
  X,
  Stethoscope
} from 'lucide-react';
import { FollowUpItem, HealthWorkerStats, Language } from '../types';
import { translations } from '../translations';
import { NavTab } from './Sidebar';

interface HealthWorkerDashboardProps {
  stats: HealthWorkerStats;
  followups: FollowUpItem[];
  language: Language;
  onNavigate: (tab: NavTab) => void;
  onSelectFollowup: (item: FollowUpItem) => void;
}

export const HealthWorkerDashboard: React.FC<HealthWorkerDashboardProps> = ({
  stats,
  followups,
  language,
  onNavigate,
  onSelectFollowup
}) => {
  const t = translations[language];

  // Local state for actions
  const [followupList, setFollowupList] = useState<FollowUpItem[]>(followups);
  const [activeModal, setActiveModal] = useState<'register' | 'logVisit' | 'referral' | null>(null);
  const [selectedPatientForLog, setSelectedPatientForLog] = useState<FollowUpItem | null>(null);
  const [visitNotes, setVisitNotes] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Patient Register form
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientAge, setNewPatientAge] = useState('');
  const [newPatientCondition, setNewPatientCondition] = useState('Antenatal Care');
  const [newPatientAddress, setNewPatientAddress] = useState('Kottaram, Kanyakumari');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCallPatient = (item: FollowUpItem) => {
    showToast(`Calling ${item.patientName} (${item.phone || '+91 94431 88902'})...`);
  };

  const handleEscalateReferral = (item: FollowUpItem) => {
    showToast(`Urgent referral triggered for ${item.patientName} to Dr. Priya (Kanyakumari PHC).`);
  };

  const handleLogVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPatientForLog) {
      setFollowupList((prev) => 
        prev.map((f) => f.id === selectedPatientForLog.id ? { ...f, status: 'Completed' } : f)
      );
      showToast(`Home visit logged for ${selectedPatientForLog.patientName}. VHN register updated.`);
    }
    setActiveModal(null);
    setVisitNotes('');
  };

  const handleRegisterPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientName) return;

    const newId = `fol-${Date.now()}`;
    const newItem: FollowUpItem = {
      id: newId,
      patientId: `pat-${Date.now()}`,
      patientName: newPatientName,
      age: parseInt(newPatientAge) || 28,
      condition: newPatientCondition,
      dueDate: '15 Sep 2026',
      status: 'Due Soon',
      vhnAssigned: 'Sister Anitha (Kottaram SC)',
      facility: 'Kottaram Health Sub-Centre',
      priority: 'medium',
      phone: '+91 98420 11920'
    };

    setFollowupList([newItem, ...followupList]);
    showToast(`New patient ${newPatientName} registered with provisional ABHA queue.`);
    setActiveModal(null);
    setNewPatientName('');
    setNewPatientAge('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-teal-800 text-white text-xs font-bold shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-teal-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Profile Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-13 h-13 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
            A
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#172026] tracking-tight">
                Sister Anitha, VHN
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-50 text-[#075E67] border border-teal-200">
                Village Health Nurse
              </span>
            </div>
            <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#087F8C]" />
              <span>Kottaram Health Sub-Centre • Agastheeswaram Block • Kanyakumari</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start">
          <button
            onClick={() => setActiveModal('register')}
            className="px-4 py-2 bg-[#087F8C] hover:bg-[#075E67] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>{t.registerPatient}</span>
          </button>
        </div>
      </div>

      {/* Stats Row (4 Cards strictly required by Section 14!) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Patients in Area */}
        <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-gray-500 font-medium">{t.patientsInArea}</span>
            <div className="text-2xl sm:text-3xl font-black text-gray-900">{stats.patientsInArea}</div>
            <span className="text-[11px] text-emerald-700 font-semibold">100% census surveyed</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#087F8C] flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* 2. High-Risk Follow-ups Due */}
        <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-gray-500 font-medium">{t.highRiskFollowupsDue}</span>
            <div className="text-2xl sm:text-3xl font-black text-rose-600">{stats.highRiskFollowupsDue}</div>
            <span className="text-[11px] text-rose-700 font-semibold">4 overdue home visits</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        {/* 3. Active Referrals */}
        <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-gray-500 font-medium">{t.activeReferrals}</span>
            <div className="text-2xl sm:text-3xl font-black text-teal-800">{stats.activeReferrals}</div>
            <span className="text-[11px] text-[#075E67] font-semibold">Tracked at PHC & RH</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#087F8C] flex items-center justify-center">
            <GitFork className="w-6 h-6" />
          </div>
        </div>

        {/* 4. Medicines Low Stock */}
        <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-gray-500 font-medium">{t.medicinesLowStock}</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-600">{stats.medicinesLowStock}</div>
            <span className="text-[11px] text-amber-700 font-semibold">Sub-Centre stock alert</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Pill className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Actions Row (Section 14 Prompt Requirement) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setActiveModal('register')}
          className="p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#087F8C] hover:bg-teal-50/30 text-left transition-all shadow-xs flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-[#087F8C] flex items-center justify-center shrink-0">
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-gray-900 text-xs sm:text-sm">{t.registerPatient}</div>
            <p className="text-[11px] text-gray-500">Add pregnant mother or NCD patient</p>
          </div>
        </button>

        <button
          onClick={() => {
            setSelectedPatientForLog(followupList[0]);
            setActiveModal('logVisit');
          }}
          className="p-4 rounded-2xl bg-white border border-gray-200 hover:border-blue-500 hover:bg-blue-50/30 text-left transition-all shadow-xs flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-gray-900 text-xs sm:text-sm">{t.logHomeVisit}</div>
            <p className="text-[11px] text-gray-500">Record vitals & antenatal checkup</p>
          </div>
        </button>

        <button
          onClick={() => setActiveModal('referral')}
          className="p-4 rounded-2xl bg-white border border-gray-200 hover:border-rose-500 hover:bg-rose-50/30 text-left transition-all shadow-xs flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-gray-900 text-xs sm:text-sm">{t.issueUrgentReferral}</div>
            <p className="text-[11px] text-gray-500">Fast-track to PHC or District Hosp.</p>
          </div>
        </button>
      </div>

      {/* Main High-Risk Follow-up Queue Table / Cards (Prompt Section 14 requirement) */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-gray-900 text-base sm:text-lg">
              {t.highRiskFollowupQueue}
            </h3>
            <p className="text-xs text-gray-500">
              Assigned maternal, neonatal, and chronic disease cases requiring field verification
            </p>
          </div>
          <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 self-start sm:self-auto">
            Prioritized by clinical severity
          </span>
        </div>

        <div className="space-y-3">
          {followupList.map((item) => {
            const isOverdue = item.status === 'Overdue';
            const isCompleted = item.status === 'Completed';

            return (
              <div
                key={item.id}
                className={`rounded-2xl border p-4 sm:p-5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isCompleted
                    ? 'bg-gray-50 border-gray-200 opacity-70'
                    : isOverdue
                      ? 'bg-rose-50/40 border-rose-200 hover:border-rose-300'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Patient Info */}
                <div className="space-y-1 max-w-lg">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-gray-900 text-base">
                      {item.patientName}
                    </h4>
                    <span className="text-xs text-gray-500 font-medium">
                      ({item.age}y)
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      isCompleted
                        ? 'bg-emerald-100 text-emerald-800'
                        : isOverdue
                          ? 'bg-rose-100 text-rose-800 border border-rose-200 animate-pulse'
                          : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-700 font-semibold">
                    {item.condition}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-500">
                    <span>Due: <strong>{item.dueDate}</strong></span>
                    <span>•</span>
                    <span>Assigned: {item.vhnAssigned}</span>
                    <span>•</span>
                    <span>Center: {item.facility}</span>
                  </div>
                </div>

                {/* Worker Actions */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {!isCompleted && (
                    <>
                      <button
                        onClick={() => handleCallPatient(item)}
                        className="px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-2xs"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-teal-600" />
                        <span>{t.callAction}</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedPatientForLog(item);
                          setActiveModal('logVisit');
                        }}
                        className="px-3 py-1.5 bg-[#087F8C] hover:bg-[#075E67] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{t.logVisitAction}</span>
                      </button>

                      <button
                        onClick={() => handleEscalateReferral(item)}
                        className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                        <span>{t.escalateAction}</span>
                      </button>
                    </>
                  )}

                  {isCompleted && (
                    <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Visit Verified</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sub-Centre Medicine Stock Alert Section (Prompt Section 14 requirement) */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Pill className="w-4 h-4 text-amber-600" />
              <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                {t.subCentreStockAlert}
              </h3>
            </div>
            <p className="text-xs text-gray-500">
              Kottaram Sub-Centre dispensary inventory requiring replenishment from Kanyakumari PHC warehouse
            </p>
          </div>

          <button
            onClick={() => showToast('Stock replenishment indent sent to Kanyakumari PHC Medical Officer.')}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{t.requestStockFromPHC}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900 text-xs">Iron & Folic Acid Tablets</span>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                Low Stock
              </span>
            </div>
            <div className="text-lg font-black text-amber-900">42 tablets left</div>
            <p className="text-[11px] text-gray-500">Threshold: 200 tablets minimum</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900 text-xs">Paracetamol Paediatric Syrup</span>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                Low Stock
              </span>
            </div>
            <div className="text-lg font-black text-amber-900">3 bottles left</div>
            <p className="text-[11px] text-gray-500">Threshold: 15 bottles minimum</p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900 text-xs">Oral Rehydration Salts (ORS)</span>
              <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded">
                Out of Stock
              </span>
            </div>
            <div className="text-lg font-black text-rose-700">0 packets remaining</div>
            <p className="text-[11px] text-rose-600 font-semibold">Immediate re-order required</p>
          </div>
        </div>
      </div>

      {/* Log Home Visit Modal */}
      {activeModal === 'logVisit' && selectedPatientForLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-[#087F8C]" />
                <h3 className="font-bold text-gray-900 text-sm">Log Home Visit Clinical Entry</h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="text-xs bg-gray-50 p-3 rounded-xl border border-gray-200 space-y-1">
              <div>Patient: <strong>{selectedPatientForLog.patientName} ({selectedPatientForLog.age}y)</strong></div>
              <div>Clinical Program: <strong>{selectedPatientForLog.condition}</strong></div>
            </div>

            <form onSubmit={handleLogVisitSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-gray-700 font-semibold block mb-1">Systolic/Diastolic BP</label>
                  <input type="text" defaultValue="142/90" className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50" />
                </div>
                <div>
                  <label className="text-gray-700 font-semibold block mb-1">Pulse Rate (bpm)</label>
                  <input type="text" defaultValue="78" className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50" />
                </div>
              </div>

              <div>
                <label className="text-gray-700 font-semibold block mb-1">Clinical Field Notes & Guidance Given</label>
                <textarea
                  rows={3}
                  value={visitNotes}
                  onChange={(e) => setVisitNotes(e.target.value)}
                  placeholder="e.g. Checked foetal movements, verified salt restriction compliance, distributed 14 IFA tablets..."
                  className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#087F8C] hover:bg-[#075E67] text-white font-bold rounded-xl shadow-xs"
                >
                  Save & Mark Visited
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Register New Patient Modal */}
      {activeModal === 'register' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm">Register New Resident / Patient</h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRegisterPatient} className="space-y-3 text-xs">
              <div>
                <label className="text-gray-700 font-semibold block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  placeholder="e.g. Meenakshi S."
                  className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-gray-700 font-semibold block mb-1">Age</label>
                  <input
                    type="number"
                    value={newPatientAge}
                    onChange={(e) => setNewPatientAge(e.target.value)}
                    placeholder="26"
                    className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-semibold block mb-1">Category / Condition</label>
                  <select
                    value={newPatientCondition}
                    onChange={(e) => setNewPatientCondition(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50"
                  >
                    <option>Antenatal Care (ANC)</option>
                    <option>Postnatal Care (PNC)</option>
                    <option>Hypertension / Diabetes</option>
                    <option>Immunization Under-5</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-gray-700 font-semibold block mb-1">Residential Address / Ward</label>
                <input
                  type="text"
                  value={newPatientAddress}
                  onChange={(e) => setNewPatientAddress(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#087F8C] hover:bg-[#075E67] text-white font-bold rounded-xl shadow-xs"
                >
                  Register in Sub-Centre Roster
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Urgent Referral Fast-Track Modal */}
      {activeModal === 'referral' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-sm">Issue Urgent Escalation Slip</h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-gray-700 font-semibold block mb-1">Select Patient</label>
                <select className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50">
                  {followupList.map((f) => (
                    <option key={f.id}>{f.patientName} — {f.condition}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-gray-700 font-semibold block mb-1">Destination Facility</label>
                <select className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50">
                  <option>Kanyakumari Government PHC (Dr. Priya)</option>
                  <option>Agastheeswaram Rural Hospital (Specialist OPD)</option>
                  <option>Kanyakumari District HQ Hospital Nagercoil (Emergency)</option>
                </select>
              </div>

              <div>
                <label className="text-gray-700 font-semibold block mb-1">Reason for Fast-Track Escalation</label>
                <textarea
                  rows={2}
                  defaultValue="Blood pressure persistently elevated above 140/90 mmHg with headache symptoms."
                  className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl"
                >
                  {t.cancel}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    showToast('Urgent referral dispatched with priority OPD token generation.');
                    setActiveModal(null);
                  }}
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-xs"
                >
                  Dispatch Urgent Referral
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
