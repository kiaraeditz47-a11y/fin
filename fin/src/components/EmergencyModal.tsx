import React from 'react';
import { PhoneCall, AlertTriangle, X, ShieldAlert, MapPin, Ambulance } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const [calledNumber, setCalledNumber] = React.useState<string | null>(null);
  const t = translations[language];

  if (!isOpen) return null;

  const handleSimulateCall = (number: string, serviceName: string) => {
    setCalledNumber(`${serviceName} (${number})`);
    setTimeout(() => {
      // simulate ongoing call
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-rose-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Urgent Header */}
        <div className="bg-rose-600 px-6 py-5 text-white flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {language === 'ta' ? 'அவசர மருத்துவ உதவி சேவை' : 'Emergency Medical Assistance'}
              </h2>
              <p className="text-rose-100 text-xs mt-0.5">
                {language === 'ta' ? '24 மணி நேர இலவச ஆம்புலன்ஸ் & மருத்துவ உதவி' : '24x7 Free Ambulance Dispatch & Medical Advisory'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {calledNumber && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-emerald-900 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span>
                  {language === 'ta' ? 'இணைக்கப்படுகிறது: ' : 'Connecting call to: '}
                  <strong>{calledNumber}</strong>
                </span>
              </div>
              <button 
                onClick={() => setCalledNumber(null)}
                className="text-xs text-rose-600 font-semibold hover:underline"
              >
                {language === 'ta' ? 'முடிக்க' : 'Disconnect'}
              </button>
            </div>
          )}

          {/* Primary 108 Ambulance Call */}
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Ambulance className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-900 text-lg">108 Ambulance</h3>
                  <span className="text-[11px] font-semibold uppercase tracking-wider bg-rose-200 text-rose-800 px-2 py-0.5 rounded-full">
                    {language === 'ta' ? 'இலவசம்' : 'Toll-Free'}
                  </span>
                </div>
                <p className="text-gray-600 text-xs">
                  {language === 'ta' ? 'கன்னியாகுமரி மாவட்ட அவசர சிகிச்சை பிரிவு' : 'Kanyakumari District Emergency Response'}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleSimulateCall('108', '108 Emergency Ambulance')}
              className="w-full sm:w-auto px-5 py-2.5 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors shrink-0"
            >
              <PhoneCall className="w-4 h-4" />
              {t.callEmergencyBtn}
            </button>
          </div>

          {/* Secondary Helpline 104 */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-900 text-base">104 Health Helpline</h3>
                  <span className="text-[11px] font-semibold uppercase tracking-wider bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">
                    {language === 'ta' ? 'மருத்துவ ஆலோசனை' : 'Medical Guidance'}
                  </span>
                </div>
                <p className="text-gray-600 text-xs">
                  {language === 'ta' ? 'தமிழ்நாடு அரசு 24 மணி நேர மருத்துவ தகவல் மையம்' : 'Govt of Tamil Nadu 24/7 Health Advisory Service'}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleSimulateCall('104', '104 Health Helpline')}
              className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors shrink-0"
            >
              <PhoneCall className="w-4 h-4" />
              {language === 'ta' ? '104 அழைக்க' : 'Call 104'}
            </button>
          </div>

          {/* Nearest Emergency Facilities */}
          <div className="border-t border-gray-100 pt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#087F8C]" />
              {language === 'ta' ? 'அருகிலுள்ள 24 மணி நேர அவசர சிகிச்சை மையங்கள்' : 'Nearest 24x7 Emergency Facilities'}
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-gray-50 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-800">Kanyakumari Government PHC (24 Hours)</div>
                  <div className="text-gray-500">Beach Road, Kanyakumari • 1.8 km</div>
                </div>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-1 rounded font-medium border border-emerald-200">
                  {language === 'ta' ? 'திறந்துள்ளது' : 'Open 24/7'}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-gray-50 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-800">Agastheeswaram Rural Hospital (Trauma Care)</div>
                  <div className="text-gray-500">Taluk HQ Road • 6.4 km</div>
                </div>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-1 rounded font-medium border border-emerald-200">
                  {language === 'ta' ? 'திறந்துள்ளது' : 'Open 24/7'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <p className="text-[11px] text-gray-500 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            {language === 'ta' ? 'நெஞ்சு வலி அல்லது மூச்சுத்திணறல் இருந்தால் தாமதிக்காமல் 108 ஐ அழைக்கவும்.' : 'For severe chest pain or breathing difficulty, call 108 immediately.'}
          </p>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-gray-600 hover:text-gray-800 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
