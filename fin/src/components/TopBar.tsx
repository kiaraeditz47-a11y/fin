import React from 'react';
import { 
  Menu, 
  MapPin, 
  Bell, 
  ShieldAlert, 
  ChevronDown, 
  User, 
  Stethoscope,
  Globe2
} from 'lucide-react';
import { Language, UserRole } from '../types';
import { translations } from '../translations';
import { NavTab } from './Sidebar';

interface TopBarProps {
  currentTab: NavTab;
  language: Language;
  onLanguageToggle: () => void;
  userRole: UserRole;
  onRoleSwitch: (role: UserRole) => void;
  selectedLocation: string;
  onLocationChange: (loc: string) => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount: number;
  onOpenEmergency: () => void;
  onOpenProfile: () => void;
  onOpenMobileMenu: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentTab,
  language,
  onLanguageToggle,
  userRole,
  onRoleSwitch,
  selectedLocation,
  onLocationChange,
  onOpenNotifications,
  unreadNotificationsCount,
  onOpenEmergency,
  onOpenProfile,
  onOpenMobileMenu
}) => {
  const t = translations[language];

  const getPageTitle = (tab: NavTab): string => {
    switch (tab) {
      case 'home':
        return userRole === 'patient' 
          ? (language === 'ta' ? 'நோயாளி முகப்பு' : 'Patient Home') 
          : (language === 'ta' ? 'சுகாதார பணியாளர் கட்டுப்பாட்டகம்' : 'Health Worker Dashboard');
      case 'find_healthcare':
        return t.findHealthcareTitle;
      case 'appointments':
        return t.navAppointments;
      case 'ai_triage':
        return t.aiTriageTitle;
      case 'teleconsultation':
        return t.teleconsultTitle;
      case 'referrals':
        return t.referralTrackingTitle;
      case 'medicines_diagnostics':
        return t.navMedicinesDiagnostics;
      case 'patient_records':
        return t.recordsTitle;
      case 'high_risk_followup':
        return t.highRiskTitle;
      default:
        return 'ArogyaConnect';
    }
  };

  const locations = [
    'Kanyakumari District',
    'Agastheeswaram Taluk',
    'Nagercoil Sub-District',
    'Suchindram Block',
    'Kottaram Sub-Centre Area'
  ];

  return (
    <header className="sticky top-0 z-20 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
      {/* Left: Mobile hamburger + Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 focus:outline-none"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
            {getPageTitle(currentTab)}
          </h1>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            <span>Kanyakumari Public Health Network</span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Location Selector */}
        <div className="relative hidden md:block">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 bg-gray-50 text-xs font-medium text-gray-700 hover:border-gray-300">
            <MapPin className="w-3.5 h-3.5 text-[#087F8C]" />
            <select
              value={selectedLocation}
              onChange={(e) => onLocationChange(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer pr-2 font-medium"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Emergency Button */}
        <button
          onClick={onOpenEmergency}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-xs font-bold shadow-xs transition-colors"
          title="Emergency Help 108"
        >
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">
            {language === 'ta' ? 'அவசர உதவி 108' : 'Emergency Help'}
          </span>
          <span className="sm:hidden font-extrabold">108</span>
        </button>

        {/* Language quick toggle */}
        <button
          onClick={onLanguageToggle}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-gray-200 hover:border-[#087F8C] bg-white text-xs font-semibold text-gray-700 hover:text-[#087F8C] transition-colors"
          title="Switch Language"
        >
          <Globe2 className="w-3.5 h-3.5 text-[#087F8C]" />
          <span className="text-[11px]">{language === 'en' ? 'தமிழ்' : 'EN'}</span>
        </button>

        {/* Notifications Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-xl border border-gray-200 hover:border-gray-300 bg-white text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* User Profile Pill */}
        <button
          onClick={onOpenProfile}
          className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-xl border border-gray-200 hover:border-teal-300 bg-white hover:bg-teal-50/40 transition-colors"
        >
          <div className="w-7 h-7 rounded-lg bg-teal-100 text-[#087F8C] flex items-center justify-center font-bold text-xs shrink-0">
            {userRole === 'patient' ? 'D' : <Stethoscope className="w-4 h-4 text-[#087F8C]" />}
          </div>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-bold text-gray-800 leading-tight">
              {userRole === 'patient' ? 'Devi S.' : 'Sister Anitha'}
            </div>
            <div className="text-[10px] text-gray-500 leading-tight">
              {userRole === 'patient' ? 'Patient • 32y' : 'VHN • Kanyakumari PHC'}
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
        </button>
      </div>
    </header>
  );
};
