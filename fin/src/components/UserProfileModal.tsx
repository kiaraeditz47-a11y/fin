import React from 'react';
import { 
  User, 
  X, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Globe2, 
  LogOut, 
  Repeat, 
  CheckCircle2, 
  Stethoscope,
  Download
} from 'lucide-react';
import { Language, UserRole } from '../types';
import { translations } from '../translations';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: UserRole;
  onSwitchRole: (newRole: UserRole) => void;
  language: Language;
  onLanguageToggle: () => void;
  onLogout: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  userRole,
  onSwitchRole,
  language,
  onLanguageToggle,
  onLogout
}) => {
  const t = translations[language];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-gray-200 space-y-5">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-base">User Profile</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-teal-100 text-[#087F8C] flex items-center justify-center font-bold text-2xl mx-auto shadow-xs">
            {userRole === 'patient' ? 'D' : <Stethoscope className="w-8 h-8 text-[#087F8C]" />}
          </div>
          <div>
            <h4 className="font-extrabold text-gray-900 text-lg">
              {userRole === 'patient' ? 'Devi S.' : 'Sister Anitha'}
            </h4>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-[#075E67] border border-teal-200 mt-1">
              {userRole === 'patient' ? 'Registered Citizen / Patient' : 'Village Health Nurse (VHN)'}
            </span>
          </div>
        </div>

        {/* Info list */}
        <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">ABHA Health ID:</span>
            <span className="font-mono font-medium text-gray-800">
              {userRole === 'patient' ? '91-4820-1940-2210' : 'VHN-TNG-90482'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Location:</span>
            <span className="font-medium text-gray-800">Kottaram, Kanyakumari</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Primary Facility:</span>
            <span className="font-medium text-gray-800">Kanyakumari Govt PHC</span>
          </div>
          <div className="flex justify-between text-emerald-800 font-semibold">
            <span>Status:</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Ayushman Verified</span>
            </span>
          </div>
        </div>

        {/* Switch Role Button */}
        <div className="pt-1 space-y-2">
          <button
            onClick={() => {
              onSwitchRole(userRole === 'patient' ? 'health_worker' : 'patient');
              onClose();
            }}
            className="w-full py-2.5 px-4 bg-teal-50 hover:bg-teal-100/70 text-[#075E67] border border-teal-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
          >
            <Repeat className="w-4 h-4" />
            <span>
              Switch to {userRole === 'patient' ? 'Health Worker View' : 'Patient View'}
            </span>
          </button>

          <button
            onClick={onLanguageToggle}
            className="w-full py-2.5 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Globe2 className="w-4 h-4 text-[#087F8C]" />
            <span>Language: {language === 'en' ? 'Switch to தமிழ்' : 'Switch to English'}</span>
          </button>

          <a
            href="/arogyaconnect-prototype.zip"
            download="arogyaconnect-prototype.zip"
            className="w-full py-2.5 px-4 bg-teal-50 hover:bg-teal-100 text-[#075E67] border border-teal-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4 text-[#087F8C]" />
            <span>Download Prototype ZIP</span>
          </a>

          <button
            onClick={onLogout}
            className="w-full py-2.5 px-4 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
