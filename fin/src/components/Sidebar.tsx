import React from 'react';
import {
  Activity,
  Home,
  MapPin,
  Calendar,
  Sparkles,
  Video,
  Pill,
  FileText,
  AlertOctagon,
  HelpCircle,
  User,
  LogOut,
  Globe2,
  X,
  Stethoscope,
  GitFork
} from 'lucide-react';
import { Language, UserRole } from '../types';
import { translations } from '../translations';

export type NavTab = 
  | 'home'
  | 'find_healthcare'
  | 'appointments'
  | 'ai_triage'
  | 'teleconsultation'
  | 'referrals'
  | 'medicines_diagnostics'
  | 'patient_records'
  | 'high_risk_followup';

interface SidebarProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  language: Language;
  onLanguageToggle: () => void;
  userRole: UserRole;
  onRoleSwitch: (role: UserRole) => void;
  onOpenHelp: () => void;
  onOpenProfile: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  overdueFollowupCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  language,
  onLanguageToggle,
  userRole,
  onRoleSwitch,
  onOpenHelp,
  onOpenProfile,
  isMobileOpen,
  onCloseMobile,
  overdueFollowupCount = 2
}) => {
  const t = translations[language];

  const navItems = [
    {
      id: 'home' as NavTab,
      label: t.navHome,
      icon: Home
    },
    {
      id: 'find_healthcare' as NavTab,
      label: t.navFindHealthcare,
      icon: MapPin
    },
    {
      id: 'appointments' as NavTab,
      label: t.navAppointments,
      icon: Calendar,
      badge: '1'
    },
    {
      id: 'ai_triage' as NavTab,
      label: t.navAITriage,
      icon: Sparkles,
      sparkle: true
    },
    {
      id: 'teleconsultation' as NavTab,
      label: t.navTeleconsultation,
      icon: Video,
      dot: true
    },
    {
      id: 'referrals' as NavTab,
      label: t.navReferrals,
      icon: GitFork
    },
    {
      id: 'medicines_diagnostics' as NavTab,
      label: t.navMedicinesDiagnostics,
      icon: Pill
    },
    {
      id: 'patient_records' as NavTab,
      label: t.navPatientRecords,
      icon: FileText
    },
    {
      id: 'high_risk_followup' as NavTab,
      label: t.navHighRiskFollowup,
      icon: AlertOctagon,
      alertBadge: overdueFollowupCount > 0 ? String(overdueFollowupCount) : undefined
    }
  ];

  const handleItemClick = (tab: NavTab) => {
    onTabChange(tab);
    onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 w-64 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#087F8C] to-[#075E67] text-white flex items-center justify-center shadow-sm">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-gray-900 text-lg tracking-tight">
              Arogya<span className="text-[#087F8C]">Connect</span>
            </span>
            <span className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
              {language === 'ta' ? 'கன்னியாகுமரி' : 'Kanyakumari District'}
            </span>
          </div>
        </div>
        {/* Mobile Close Button */}
        <button 
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Role Badge Indicator */}
      <div className="px-5 py-2.5 bg-gray-50/80 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {userRole === 'patient' ? (
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          ) : (
            <Stethoscope className="w-3.5 h-3.5 text-blue-600" />
          )}
          <span className="text-xs font-semibold text-gray-700">
            {userRole === 'patient' 
              ? (language === 'ta' ? 'நோயாளர்: தேவி S.' : 'Patient: Devi S.') 
              : (language === 'ta' ? 'சுகாதார பணியாளர் (VHN)' : 'Health Worker (VHN)')}
          </span>
        </div>
        <button
          onClick={() => onRoleSwitch(userRole === 'patient' ? 'health_worker' : 'patient')}
          className="text-[10px] text-[#087F8C] hover:underline font-semibold"
          title="Switch role"
        >
          {language === 'ta' ? 'மாற்று' : 'Switch'}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-[#E8F7F5] text-[#075E67] font-bold shadow-xs'
                  : 'text-[#64748B] hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-[#087F8C]' : 'text-gray-400 group-hover:text-gray-600'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {/* Badges / indicators */}
              <div className="flex items-center gap-1.5 shrink-0">
                {item.alertBadge && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-200">
                    {item.alertBadge}
                  </span>
                )}
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-100 text-[#075E67]">
                    {item.badge}
                  </span>
                )}
                {item.dot && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                )}
                {item.sparkle && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-50 text-amber-700 font-semibold border border-amber-200">
                    AI
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Bottom Controls */}
      <div className="p-3 border-t border-gray-200 space-y-1 bg-gray-50/50 text-xs">
        {/* Language Switch */}
        <button
          onClick={onLanguageToggle}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-gray-700 hover:bg-white hover:shadow-xs transition-all"
        >
          <div className="flex items-center gap-2.5">
            <Globe2 className="w-4 h-4 text-[#087F8C]" />
            <span className="font-medium">
              {language === 'en' ? 'Language: English' : 'மொழி: தமிழ்'}
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#087F8C] px-2 py-0.5 rounded bg-teal-50 border border-teal-100">
            {language === 'en' ? 'தமிழ்' : 'English'}
          </span>
        </button>

        {/* Help & Support */}
        <button
          onClick={() => {
            onOpenHelp();
            onCloseMobile();
          }}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-gray-700 hover:bg-white hover:shadow-xs transition-all"
        >
          <HelpCircle className="w-4 h-4 text-gray-400" />
          <span className="font-medium">{t.navHelpSupport}</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => {
            onOpenProfile();
            onCloseMobile();
          }}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-gray-700 hover:bg-white hover:shadow-xs transition-all"
        >
          <User className="w-4 h-4 text-gray-400" />
          <span className="font-medium">{t.navProfile}</span>
        </button>

        {/* Switch / Sign Out */}
        <button
          onClick={() => onRoleSwitch(userRole === 'patient' ? 'health_worker' : 'patient')}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-all font-medium"
        >
          <LogOut className="w-4 h-4 text-rose-500" />
          <span>{t.navLogout}</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar: Persistent */}
      <aside className="hidden lg:block shrink-0 h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative z-50 w-64 max-w-[80vw] h-full shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
