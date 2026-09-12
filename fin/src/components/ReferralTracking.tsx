import React, { useState } from 'react';
import { 
  GitFork, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Building2, 
  User, 
  FileText, 
  Download, 
  Upload, 
  QrCode, 
  ShieldCheck,
  AlertCircle,
  X,
  ExternalLink
} from 'lucide-react';
import { Referral, Language } from '../types';
import { translations } from '../translations';

interface ReferralTrackingProps {
  referrals: Referral[];
  language: Language;
}

export const ReferralTracking: React.FC<ReferralTrackingProps> = ({
  referrals,
  language
}) => {
  const t = translations[language];

  const [selectedReferral, setSelectedReferral] = useState<Referral>(referrals[0]);
  const [showSlipModal, setShowSlipModal] = useState<boolean>(false);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [uploadSuccessToast, setUploadSuccessToast] = useState<string | null>(null);

  const handleUploadReport = (e: React.FormEvent) => {
    e.preventDefault();
    setShowUploadModal(false);
    setUploadSuccessToast('Ultrasound / Lab Report successfully attached to Referral Slip!');
    setTimeout(() => setUploadSuccessToast(null), 4000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Toast Notification */}
      {uploadSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-700 text-white text-xs font-bold shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          <span>{uploadSuccessToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172026] tracking-tight">
            {t.referralTrackingTitle}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {language === 'ta'
              ? 'துணை மையம் முதல் மாவட்ட தலைமை மருத்துவமனை வரையிலான பரிந்துரை கண்காணிப்பு'
              : 'Complete longitudinal referral breadcrumb across all 4 tiers of Tamil Nadu public health'}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-teal-50 text-[#075E67] border border-teal-200 text-xs font-bold self-start">
          <GitFork className="w-4 h-4 text-[#087F8C]" />
          <span>ABHA Integrated Pathway</span>
        </div>
      </div>

      {/* Main Referral Card */}
      {selectedReferral && (
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-8">
          {/* Card Top: Patient & Facility Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-teal-50 text-[#075E67] border border-teal-200">
                  {selectedReferral.referralId}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  {selectedReferral.statusText}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-2">
                {selectedReferral.patientName} — {selectedReferral.reason}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Priority: <strong className="text-gray-800">{selectedReferral.priority}</strong> • Category: {selectedReferral.category}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setShowSlipModal(true)}
                className="px-4 py-2.5 bg-[#087F8C] hover:bg-[#075E67] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>{t.viewReferralSlip}</span>
              </button>

              <button
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2.5 border border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold rounded-xl transition-colors flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Report</span>
              </button>
            </div>
          </div>

          {/* Referral Pathway Progression Ladder */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Public Healthcare Referral Pathway
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
              {selectedReferral.stages.map((stage, idx) => {
                const isCompleted = stage.status === 'completed';
                const isCurrent = stage.status === 'current';
                return (
                  <div
                    key={idx}
                    className={
                      isCurrent
                        ? 'p-4 rounded-2xl border-2 border-[#087F8C] bg-[#E8F7F5] space-y-2 relative shadow-xs'
                        : isCompleted
                        ? 'p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-2'
                        : 'p-4 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-2 opacity-80'
                    }
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={
                          isCurrent
                            ? 'text-[10px] font-bold uppercase tracking-wider text-[#075E67] bg-white px-2 py-0.5 rounded border border-teal-200'
                            : isCompleted
                            ? 'text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded'
                            : 'text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-200 px-2 py-0.5 rounded'
                        }
                      >
                        Tier {idx + 1}: {stage.stage}
                      </span>
                      {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      {isCurrent && <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />}
                      {!isCompleted && !isCurrent && <Clock className="w-4 h-4 text-gray-400" />}
                    </div>
                    <div className="font-bold text-gray-900 text-xs">{stage.facility}</div>
                    {stage.note && (
                      <p className={`text-[11px] ${isCurrent ? 'text-[#075E67] font-medium' : 'text-gray-600'}`}>
                        {stage.note}
                      </p>
                    )}
                    <div
                      className={
                        isCurrent
                          ? 'text-[10px] text-[#075E67] font-bold pt-1'
                          : isCompleted
                          ? 'text-[10px] text-emerald-800 font-semibold pt-1'
                          : 'text-[10px] text-gray-400 font-medium pt-1'
                      }
                    >
                      {stage.time}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline of Status Updates */}
          <div className="space-y-4 pt-2 border-t border-gray-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Audit Timeline of Referral Updates
            </h4>

            <div className="relative pl-6 border-l-2 border-teal-200 space-y-6">
              {selectedReferral.stages.map((stage, idx) => (
                <div key={idx} className="relative">
                  {/* Dot */}
                  <div className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 border-white ${
                    stage.status === 'completed' ? 'bg-[#087F8C]' : 'bg-gray-300'
                  }`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-900">{stage.stage} — {stage.facility}</span>
                      <span className="text-[11px] font-mono text-gray-500">{stage.time}</span>
                    </div>
                    {stage.note && <p className="text-xs text-gray-600 mt-0.5">{stage.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* View Referral Slip Modal (Strictly required in Section 11) */}
      {showSlipModal && selectedReferral && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 space-y-6 my-6">
            {/* Slip Header with Tamil Nadu Emblem Mockup */}
            <div className="flex items-start justify-between border-b pb-4 border-gray-200">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#087F8C]">
                  Government of Tamil Nadu • Department of Public Health
                </span>
                <h3 className="text-lg font-black text-gray-900">
                  OFFICIAL INTER-TIER REFERRAL SLIP
                </h3>
                <p className="text-xs text-gray-500">
                  Kanyakumari Health Unit District (HUD)
                </p>
              </div>
              <button 
                onClick={() => setShowSlipModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Slip Content Grid */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 text-xs space-y-2.5">
              <div className="flex justify-between border-b border-gray-200 pb-1.5">
                <span className="text-gray-500">Referral ID:</span>
                <span className="font-mono font-bold text-gray-900">{selectedReferral.referralId}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-1.5">
                <span className="text-gray-500">Patient Name:</span>
                <span className="font-bold text-gray-900">{selectedReferral.patientName}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-1.5">
                <span className="text-gray-500">ABHA Health ID:</span>
                <span className="font-mono text-gray-800">91-4820-1940-2210</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-1.5">
                <span className="text-gray-500">Referring Facility:</span>
                <span className="font-semibold text-gray-800">{selectedReferral.fromFacility} ({selectedReferral.referringDoctor})</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-1.5">
                <span className="text-gray-500">Destination Center:</span>
                <span className="font-bold text-[#087F8C]">{selectedReferral.toFacility}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-1.5">
                <span className="text-gray-500">Clinical Reason:</span>
                <span className="font-semibold text-rose-700">{selectedReferral.reason}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-1.5">
                <span className="text-gray-500">Clinical Vitals Noted:</span>
                <span className="font-medium text-gray-800">BP: 144/92 mmHg, Proteinuria trace, Foetal HR 142 bpm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Transport Requirement:</span>
                <span className="font-bold text-gray-800">Non-emergency Public Transit / 108 Standby</span>
              </div>
            </div>

            {/* QR Code & Digital Signature Stamp */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-xl border border-gray-200 shadow-xs">
                  <QrCode className="w-16 h-16 text-gray-800" />
                </div>
                <div className="text-[11px] text-gray-500">
                  <div>Digital Referral Token</div>
                  <div className="font-mono text-gray-800 font-bold">{selectedReferral.referralId}</div>
                  <div className="text-emerald-700 font-semibold mt-0.5">TN-HEALTH Verified</div>
                </div>
              </div>

              <div className="text-right">
                <div className="inline-flex items-center gap-1 text-xs text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Authorized Signature</span>
                </div>
                <div className="text-[11px] font-semibold text-gray-700 mt-1">Dr. Priya M., MBBS</div>
                <div className="text-[10px] text-gray-400">Medical Officer, Kanyakumari PHC</div>
              </div>
            </div>

            {/* Slip Action Buttons */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => setShowSlipModal(false)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-xl"
              >
                {t.close}
              </button>

              <button
                onClick={() => {
                  alert('Referral Slip PDF downloaded successfully to device storage.');
                  setShowSlipModal(false);
                }}
                className="px-5 py-2.5 bg-[#087F8C] hover:bg-[#075E67] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Official Slip (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Diagnostic Report Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Attach Lab / Radiology Report</h3>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadReport} className="space-y-4 text-xs">
              <div>
                <label className="text-gray-700 font-semibold block mb-1">Report Type</label>
                <select className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50">
                  <option>Ultrasound Obstetric Scan Report</option>
                  <option>Blood Pressure Monitoring Log</option>
                  <option>Urine Protein Analysis (Lab)</option>
                  <option>CBC & Hemoglobin Test</option>
                </select>
              </div>

              <div>
                <label className="text-gray-700 font-semibold block mb-1">File Attachment (PDF or Image)</label>
                <div className="p-6 border-2 border-dashed border-gray-200 rounded-2xl text-center bg-gray-50/50 hover:bg-teal-50/30 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <span className="font-semibold text-gray-700">Click to browse or drag & drop</span>
                  <p className="text-[10px] text-gray-400 mt-1">PDF, JPG, PNG up to 10MB</p>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#087F8C] hover:bg-[#075E67] text-white font-bold rounded-xl shadow-xs"
                >
                  Upload & Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
