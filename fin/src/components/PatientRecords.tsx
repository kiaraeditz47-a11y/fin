import React, { useState } from 'react';
import { 
  FileText, 
  HeartPulse, 
  Pill, 
  FlaskConical, 
  Calendar, 
  User, 
  Download, 
  MapPin, 
  ShieldCheck, 
  ChevronRight, 
  Eye, 
  Printer, 
  QrCode,
  X
} from 'lucide-react';
import { HealthRecord, Patient, Language } from '../types';
import { translations } from '../translations';

interface PatientRecordsProps {
  patient: Patient;
  records: HealthRecord[];
  language: Language;
}

export const PatientRecords: React.FC<PatientRecordsProps> = ({
  patient,
  records,
  language
}) => {
  const t = translations[language];

  const [activeFilter, setActiveFilter] = useState<'all' | 'vitals' | 'prescriptions' | 'labs'>('all');
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);

  const filteredRecords = records.filter((rec) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'vitals') return rec.type === 'vitals' || rec.vitals;
    if (activeFilter === 'prescriptions') return rec.type === 'prescription' || rec.prescriptions;
    if (activeFilter === 'labs') return rec.type === 'lab';
    return true;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172026] tracking-tight">
            {t.recordsTitle}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {language === 'ta'
              ? 'முழுமையான தொடர் மின்னணு சுகாதார பதிவுகள் (ABHA & TN-HEALTH)'
              : 'Complete longitudinal public health timeline linked with national ABHA credentials'}
          </p>
        </div>

        <button
          onClick={() => alert('Official Health Summary (PDF) generated and downloaded.')}
          className="px-4 py-2.5 bg-[#087F8C] hover:bg-[#075E67] text-white text-xs font-bold rounded-2xl shadow-xs transition-colors flex items-center gap-2 self-start"
        >
          <Download className="w-4 h-4" />
          <span>Download Health Summary</span>
        </button>
      </div>

      {/* Patient Header Card (Prompt Section 13 requirement) */}
      <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-teal-100 text-[#087F8C] flex items-center justify-center font-bold text-xl shrink-0">
            D
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-gray-900 text-lg sm:text-xl">
                {patient.name}
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-[#075E67] border border-teal-200">
                {patient.age} years, {patient.gender}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
              <span className="font-mono text-gray-700 font-medium">ABHA ID: {patient.abhaId}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#087F8C]" />
                {patient.address}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="text-right text-xs hidden sm:block">
            <div className="font-bold text-emerald-800 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ayushman Bharat Verified</span>
            </div>
            <div className="text-gray-400 text-[11px]">Last visit: 05 Sep 2026</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeFilter === 'all'
              ? 'bg-[#E8F7F5] text-[#075E67] border border-teal-200'
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          {t.allRecordsTab} ({records.length})
        </button>

        <button
          onClick={() => setActiveFilter('vitals')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeFilter === 'vitals'
              ? 'bg-[#E8F7F5] text-[#075E67] border border-teal-200'
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          {t.vitalsTab}
        </button>

        <button
          onClick={() => setActiveFilter('prescriptions')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeFilter === 'prescriptions'
              ? 'bg-[#E8F7F5] text-[#075E67] border border-teal-200'
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          {t.prescriptionsTab}
        </button>

        <button
          onClick={() => setActiveFilter('labs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeFilter === 'labs'
              ? 'bg-[#E8F7F5] text-[#075E67] border border-teal-200'
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          {t.labReportsTab}
        </button>
      </div>

      {/* Longitudinal Timeline of Records */}
      <div className="space-y-4">
        <div className="relative pl-6 sm:pl-8 border-l-2 border-teal-200 space-y-6">
          {filteredRecords.map((record) => (
            <div key={record.id} className="relative group">
              {/* Timeline Marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#087F8C] ring-4 ring-white shadow-xs" />

              {/* Record Card */}
              <div className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-6 shadow-xs hover:border-teal-300 transition-all space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-[#075E67] border border-teal-200">
                        {record.date}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        {record.type}
                      </span>
                    </div>
                    <h4 className="font-bold text-gray-900 text-base">
                      {record.title}
                    </h4>
                    <p className="text-xs text-gray-500">
                      Facility: <strong className="text-gray-700">{record.facility}</strong> • Attending: {record.doctor}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedRecord(record)}
                    className="px-3.5 py-1.5 bg-gray-50 hover:bg-teal-50 border border-gray-200 hover:border-teal-300 text-gray-700 hover:text-[#075E67] text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Record</span>
                  </button>
                </div>

                <p className="text-xs text-gray-600 bg-gray-50/70 p-3 rounded-2xl border border-gray-100">
                  {record.notes}
                </p>

                {/* Vitals Summary if present */}
                {record.vitals && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                    {record.vitals.bp && (
                      <div className="p-2.5 bg-rose-50/70 rounded-xl border border-rose-100">
                        <span className="text-[10px] text-rose-700 font-semibold uppercase">Blood Pressure</span>
                        <div className="font-bold text-rose-900 text-sm">{record.vitals.bp}</div>
                      </div>
                    )}
                    {record.vitals.pulse && (
                      <div className="p-2.5 bg-teal-50 rounded-xl border border-teal-100">
                        <span className="text-[10px] text-teal-700 font-semibold uppercase">Pulse Rate</span>
                        <div className="font-bold text-teal-900 text-sm">{record.vitals.pulse} bpm</div>
                      </div>
                    )}
                    {record.vitals.weight && (
                      <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="text-[10px] text-gray-500 font-semibold uppercase">Weight</span>
                        <div className="font-bold text-gray-800 text-sm">{record.vitals.weight} kg</div>
                      </div>
                    )}
                    {record.vitals.hb && (
                      <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="text-[10px] text-gray-500 font-semibold uppercase">Hemoglobin</span>
                        <div className="font-bold text-gray-800 text-sm">{record.vitals.hb} g/dL</div>
                      </div>
                    )}
                  </div>
                )}

                {/* Prescriptions if present */}
                {record.prescriptions && record.prescriptions.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                      Prescribed Medications:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {record.prescriptions.map((p, i) => (
                        <span key={i} className="px-2.5 py-1 bg-teal-50 border border-teal-200 rounded-lg text-xs font-medium text-teal-900">
                          {p.name} ({p.dosage} - {p.frequency})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Record Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#087F8C]">
                  {selectedRecord.date} • {selectedRecord.type}
                </span>
                <h3 className="text-base font-bold text-gray-900">{selectedRecord.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedRecord(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-2xl space-y-1">
                <div>Facility: <strong>{selectedRecord.facility}</strong></div>
                <div>Attending Doctor: <strong>{selectedRecord.doctor}</strong></div>
                <div>Patient: <strong>{patient.name} (ABHA: {patient.abhaId})</strong></div>
              </div>

              <div>
                <span className="font-bold text-gray-800 block mb-1">Clinical Observations & Findings:</span>
                <p className="text-gray-600 bg-teal-50/50 p-3 rounded-xl border border-teal-100 leading-relaxed">
                  {selectedRecord.notes}
                </p>
              </div>

              {selectedRecord.vitals && (
                <div>
                  <span className="font-bold text-gray-800 block mb-1">Vital Signs:</span>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(selectedRecord.vitals).map(([key, val]) => (
                      <div key={key} className="p-2 bg-gray-50 rounded-lg border border-gray-100">
                        <span className="text-gray-400 uppercase text-[10px] font-bold">{key}</span>
                        <div className="font-bold text-gray-900">{String(val)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-xs font-semibold"
              >
                {t.close}
              </button>

              <button
                onClick={() => {
                  alert('Record PDF sent to print spooler.');
                  setSelectedRecord(null);
                }}
                className="px-4 py-2 bg-[#087F8C] hover:bg-[#075E67] text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Record</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
