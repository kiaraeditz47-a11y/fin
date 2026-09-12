import React from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  Clock, 
  Users, 
  Pill, 
  FlaskConical, 
  CheckCircle2, 
  ShieldAlert, 
  Calendar,
  Bed,
  ArrowUpRight
} from 'lucide-react';
import { Facility, Language } from '../types';
import { translations } from '../translations';

interface FacilityDetailsModalProps {
  facility: Facility | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onBookAppointment: (facility: Facility) => void;
}

export const FacilityDetailsModal: React.FC<FacilityDetailsModalProps> = ({
  facility,
  isOpen,
  onClose,
  language,
  onBookAppointment
}) => {
  const t = translations[language];

  if (!isOpen || !facility) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-200 my-8"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#087F8C] to-[#075E67] text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-1.5 max-w-lg">
            <div className="inline-flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/20 text-white">
                {facility.type}
              </span>
              <span className="text-xs text-teal-100 font-medium">
                {facility.distanceKm} km away • {facility.openStatus}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {language === 'ta' ? facility.nameTa : facility.name}
            </h2>
            <p className="text-xs text-teal-50 flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{facility.address}</span>
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Current Live Queue Card (Specified in Prompt #6) */}
          <div className="bg-[#E8F7F5] border border-teal-200 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#087F8C]" />
                <h4 className="font-bold text-gray-900 text-sm">{t.currentQueue}</h4>
              </div>
              <span className="text-[11px] font-semibold text-teal-800 bg-white px-2.5 py-0.5 rounded-full border border-teal-200">
                Live OPD Tracker
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white p-3 rounded-xl border border-teal-100 shadow-xs">
                <div className="text-[10px] uppercase font-bold text-gray-500">Token</div>
                <div className="text-lg font-black text-[#087F8C] mt-0.5">{facility.currentQueue.token}</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-teal-100 shadow-xs">
                <div className="text-[10px] uppercase font-bold text-gray-500">{t.nowServing}</div>
                <div className="text-lg font-black text-gray-800 mt-0.5">{facility.currentQueue.nowServing}</div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-teal-100 shadow-xs">
                <div className="text-[10px] uppercase font-bold text-gray-500">{t.estWaitLabel}</div>
                <div className="text-sm font-bold text-gray-800 mt-1">{facility.currentQueue.estimatedWaitMins} mins</div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-teal-900 font-medium">
                {language === 'ta' ? 'டோக்கன் பெற உங்கள் இடத்தை பதிவு செய்யவும்' : 'Reserve your priority slot in today’s queue'}
              </span>
              <button
                onClick={() => {
                  onClose();
                  onBookAppointment(facility);
                }}
                className="px-4 py-2 bg-[#087F8C] hover:bg-[#075E67] text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{t.bookAppointment}</span>
              </button>
            </div>
          </div>

          {/* Key Facility Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#087F8C]" />
                <span>Operating Hours</span>
              </div>
              <div className="font-bold text-gray-800 mt-1">{facility.openingHours}</div>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                <Phone className="w-3.5 h-3.5 text-[#087F8C]" />
                <span>Contact Desk</span>
              </div>
              <div className="font-bold text-gray-800 mt-1">{facility.phone}</div>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                <Bed className="w-3.5 h-3.5 text-[#087F8C]" />
                <span>Bed Capacity</span>
              </div>
              <div className="font-bold text-gray-800 mt-1">{facility.bedCapacity || 8} Inpatient Beds</div>
            </div>
          </div>

          {/* Services Available */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Available Clinical Services
            </h4>
            <div className="flex flex-wrap gap-2">
              {facility.services.map((svc, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{svc}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Pharmacy Status */}
          <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/70 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-teal-100 text-[#087F8C] flex items-center justify-center shrink-0">
                <Pill className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-gray-900 text-xs sm:text-sm">Public Health Dispensary / Pharmacy</div>
                <div className="text-[11px] text-gray-500">Government TNMSC free drug supply</div>
              </div>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
              facility.pharmacyStatus === 'Well-Stocked'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}>
              {facility.pharmacyStatus}
            </span>
          </div>

          {/* Diagnostics Availability */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5 text-[#087F8C]" />
              <span>Laboratory & Diagnostic Tests Available</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {facility.diagnosticsAvailability.map((diag, idx) => (
                <div 
                  key={idx}
                  className="p-2.5 rounded-lg border border-gray-100 bg-white flex items-center justify-between"
                >
                  <span className="font-medium text-gray-800">{diag}</span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800 bg-white border border-gray-200 rounded-xl"
          >
            {t.close}
          </button>

          <button
            onClick={() => {
              onClose();
              onBookAppointment(facility);
            }}
            className="px-5 py-2.5 bg-[#087F8C] hover:bg-[#075E67] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2"
          >
            <span>{t.bookAppointment}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
