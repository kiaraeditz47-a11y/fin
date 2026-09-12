import React, { useState } from 'react';
import { 
  Sparkles, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  HeartPulse, 
  PhoneCall, 
  HelpCircle,
  Building2,
  Info
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { NavTab } from './Sidebar';

interface AITriageProps {
  language: Language;
  onNavigate: (tab: NavTab) => void;
  onOpenEmergency: () => void;
}

type TriageOutcome = 'urgent' | 'scheduled' | 'home';

export const AITriage: React.FC<AITriageProps> = ({
  language,
  onNavigate,
  onOpenEmergency
}) => {
  const t = translations[language];

  // Steps: 1: Symptom selection, 2: Severity & Onset, 3: Result
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [otherSymptomText, setOtherSymptomText] = useState('');
  const [severity, setSeverity] = useState<'Mild' | 'Moderate' | 'Severe'>('Moderate');
  const [onset, setOnset] = useState<'Today' | '1–3 days' | 'More than 3 days'>('1–3 days');
  const [showHomeGuidanceModal, setShowHomeGuidanceModal] = useState(false);

  const symptomList = [
    { id: 'fever', label: 'Fever', labelTa: 'காய்ச்சல்' },
    { id: 'cough', label: 'Cough', labelTa: 'இருமல்' },
    { id: 'headache', label: 'Headache', labelTa: 'தலைவலி' },
    { id: 'stomach_pain', label: 'Stomach pain', labelTa: 'வயிற்று வலி' },
    { id: 'vomiting', label: 'Vomiting', labelTa: 'வாந்தி' },
    { id: 'breathing_difficulty', label: 'Breathing difficulty', labelTa: 'மூச்சுத்திணறல்', urgent: true },
    { id: 'chest_pain', label: 'Chest pain', labelTa: 'நெஞ்சு வலி', urgent: true },
    { id: 'dizziness', label: 'Dizziness', labelTa: 'தலைச்சுற்றல்' },
    { id: 'pregnancy_concern', label: 'Pregnancy-related concern', labelTa: 'கர்ப்பகால அசௌகரியம்' },
    { id: 'other', label: 'Other', labelTa: 'மற்றவை' }
  ];

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Determine triage result based on symptoms & severity
  const getTriageOutcome = (): { outcome: TriageOutcome; explanation: string } => {
    const hasEmergencySymptom = 
      selectedSymptoms.includes('chest_pain') || 
      selectedSymptoms.includes('breathing_difficulty');

    if (hasEmergencySymptom || severity === 'Severe') {
      return {
        outcome: 'urgent',
        explanation: language === 'ta'
          ? 'உங்கள் அறிகுறிகளில் நெஞ்சு வலி, தீவிர மூச்சுத்திணறல் அல்லது அதிக தீவிரம் உள்ளதால் உடனடி அவசர மருத்துவ பரிசோதனை அவசியமாகும். தாமதிக்காமல் 108 அழைக்கவும் அல்லது அவசர சிகிச்சை மையத்தை அணுகவும்.'
          : 'Your reported symptoms indicate high clinical urgency (such as chest discomfort, breathing difficulty, or severe distress). You should seek immediate in-person emergency evaluation.'
      };
    }

    if (
      severity === 'Moderate' || 
      onset === 'More than 3 days' || 
      selectedSymptoms.includes('pregnancy_concern') ||
      selectedSymptoms.includes('stomach_pain') ||
      selectedSymptoms.length >= 2
    ) {
      return {
        outcome: 'scheduled',
        explanation: language === 'ta'
          ? 'உங்கள் அறிகுறிகளுக்கு ஆரம்ப சுகாதார நிலையம் (PHC) அல்லது அரசு மருத்துவமனையில் மருத்துவர் நேரடி பரிசோதனை செய்து சிகிச்சை பெற பரிந்துரைக்கப்படுகிறது.'
          : 'A direct in-person clinical assessment at your nearest Primary Health Centre (PHC) or Rural Hospital is recommended for proper diagnosis and prescribed medication.'
      };
    }

    return {
      outcome: 'home',
      explanation: language === 'ta'
        ? 'உங்கள் அறிகுறிகள் லேசான தீவிரத்தில் உள்ளன. போதுமான ஓய்வு, திரவ உணவுகள் மற்றும் வீட்டு பராமரிப்பு உகந்தது. அறிகுறிகள் 48 மணி நேரத்திற்கு மேல் நீடித்தால் மருத்துவரை அணுகவும்.'
        : 'Your symptoms appear mild and manageable with rest, adequate hydration, and home monitoring. If symptoms worsen or persist beyond 48 hours, please visit your local Sub-Centre or PHC.'
    };
  };

  const handleReset = () => {
    setSelectedSymptoms([]);
    setOtherSymptomText('');
    setSeverity('Moderate');
    setOnset('1–3 days');
    setCurrentStep(1);
  };

  const outcomeData = getTriageOutcome();

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-12">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#075E67] text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#087F8C]" />
          <span>Clinical Navigation Support</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172026] tracking-tight">
          {t.aiTriageTitle}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600">
          {t.aiTriageSubtitle}
        </p>

        {/* Clinical Disclaimer strictly specified in prompt */}
        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span className="font-semibold">
            {t.aiTriageDisclaimer}
          </span>
        </div>
      </div>

      {/* Main Questionnaire Card */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
              currentStep === 1 ? 'bg-[#087F8C] text-white' : 'bg-teal-100 text-[#087F8C]'
            }`}>
              1
            </span>
            <span className={currentStep === 1 ? 'text-gray-900 font-bold' : 'text-gray-400'}>
              {language === 'ta' ? 'அறிகுறிகள்' : 'Symptoms'}
            </span>
          </div>
          <span className="text-gray-300">———</span>
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
              currentStep === 2 ? 'bg-[#087F8C] text-white' : 'bg-gray-100 text-gray-500'
            }`}>
              2
            </span>
            <span className={currentStep === 2 ? 'text-gray-900 font-bold' : 'text-gray-400'}>
              {language === 'ta' ? 'தீவிரம் & காலம்' : 'Severity & Duration'}
            </span>
          </div>
          <span className="text-gray-300">———</span>
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
              currentStep === 3 ? 'bg-[#087F8C] text-white' : 'bg-gray-100 text-gray-500'
            }`}>
              3
            </span>
            <span className={currentStep === 3 ? 'text-gray-900 font-bold' : 'text-gray-400'}>
              {language === 'ta' ? 'மதிப்பீடு' : 'Assessment'}
            </span>
          </div>
        </div>

        {/* STEP 1: What are you experiencing? */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {t.step1Title}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {language === 'ta' ? 'ஒன்றுக்கும் மேற்பட்டவற்றை தேர்ந்தெடுக்கலாம்:' : 'Select all symptoms that apply to you:'}
              </p>
            </div>

            {/* Selectable symptoms grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {symptomList.map((sym) => {
                const isSelected = selectedSymptoms.includes(sym.id);
                return (
                  <button
                    key={sym.id}
                    type="button"
                    onClick={() => toggleSymptom(sym.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#087F8C] bg-teal-50/60 ring-2 ring-teal-100 font-bold text-[#075E67]'
                        : 'border-gray-200 hover:border-gray-300 bg-gray-50/40 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm">
                        {language === 'ta' ? sym.labelTa : sym.label}
                      </span>
                      {sym.urgent && (
                        <span className="text-[10px] uppercase font-bold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                          Urgent
                        </span>
                      )}
                    </div>
                    <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-[#087F8C] border-[#087F8C] text-white' : 'border-gray-300 bg-white'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedSymptoms.includes('other') && (
              <div className="pt-2">
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  Describe your symptom briefly:
                </label>
                <input
                  type="text"
                  value={otherSymptomText}
                  onChange={(e) => setOtherSymptomText(e.target.value)}
                  placeholder="e.g. Skin rash, earache, joint pain..."
                  className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-xs focus:bg-white focus:border-[#087F8C] outline-hidden"
                />
              </div>
            )}

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {selectedSymptoms.length} symptoms selected
              </span>
              <button
                disabled={selectedSymptoms.length === 0}
                onClick={() => setCurrentStep(2)}
                className="px-6 py-2.5 bg-[#087F8C] disabled:bg-gray-300 hover:bg-[#075E67] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs transition-colors"
              >
                <span>{t.next}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Severity and onset */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {t.step2Title}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Help us calibrate the intensity and duration of your discomfort:
              </p>
            </div>

            {/* Severity question */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                {t.howSevere}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['Mild', 'Moderate', 'Severe'] as const).map((sev) => {
                  const isSelected = severity === sev;
                  return (
                    <button
                      key={sev}
                      type="button"
                      onClick={() => setSeverity(sev)}
                      className={`p-3.5 rounded-2xl border text-center transition-all ${
                        isSelected
                          ? sev === 'Severe'
                            ? 'border-rose-500 bg-rose-50 ring-2 ring-rose-200 font-bold text-rose-800'
                            : 'border-[#087F8C] bg-teal-50 ring-2 ring-teal-100 font-bold text-[#075E67]'
                          : 'border-gray-200 hover:border-gray-300 bg-gray-50/50 text-gray-700'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-bold">
                        {sev === 'Mild' ? t.mild : sev === 'Moderate' ? t.moderate : t.severe}
                      </div>
                      <div className="text-[10px] text-gray-500 mt-0.5">
                        {sev === 'Mild' && 'Tolerable'}
                        {sev === 'Moderate' && 'Affects daily routine'}
                        {sev === 'Severe' && 'Incapacitating'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Onset question */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                {t.whenBegan}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['Today', '1–3 days', 'More than 3 days'] as const).map((timeOption) => {
                  const isSelected = onset === timeOption;
                  return (
                    <button
                      key={timeOption}
                      type="button"
                      onClick={() => setOnset(timeOption)}
                      className={`p-3.5 rounded-2xl border text-center transition-all ${
                        isSelected
                          ? 'border-[#087F8C] bg-teal-50 ring-2 ring-teal-100 font-bold text-[#075E67]'
                          : 'border-gray-200 hover:border-gray-300 bg-gray-50/50 text-gray-700'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-bold">
                        {timeOption === 'Today' ? t.today : timeOption === '1–3 days' ? t.oneToThreeDays : t.moreThanThreeDays}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold rounded-xl flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.back}</span>
              </button>

              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-2.5 bg-[#087F8C] hover:bg-[#075E67] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.seeRecommendation}</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: RESULT CARDS (3 Outcomes strictly required by Prompt Section 9!) */}
        {currentStep === 3 && (
          <div className="space-y-6">
            {/* 1. URGENT OUTCOME */}
            {outcomeData.outcome === 'urgent' && (
              <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <ShieldAlert className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-rose-700">
                      High Priority Alert
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-rose-950">
                      {t.urgentCareAlert}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-rose-900 leading-relaxed">
                  {outcomeData.explanation}
                </p>

                <div className="p-3 bg-white/80 rounded-2xl border border-rose-200 text-xs text-rose-900">
                  <strong>Nearest 24/7 Centre:</strong> Kanyakumari Government PHC or Agastheeswaram Rural Hospital Emergency Ward.
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={onOpenEmergency}
                    className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md transition-colors"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>{t.getEmergencyHelp} (108)</span>
                  </button>

                  <button
                    onClick={() => onNavigate('find_healthcare')}
                    className="px-4 py-3 bg-white border border-rose-200 text-rose-800 text-xs font-bold rounded-xl hover:bg-rose-100/50 transition-colors"
                  >
                    View Emergency Facilities
                  </button>
                </div>
              </div>
            )}

            {/* 2. SCHEDULED VISIT OUTCOME */}
            {outcomeData.outcome === 'scheduled' && (
              <div className="bg-[#E8F7F5] border-2 border-teal-300 rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#087F8C] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#075E67]">
                      Recommended Clinical Pathway
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#075E67]">
                      {t.scheduledVisitRec}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-teal-950 leading-relaxed">
                  {outcomeData.explanation}
                </p>

                <div className="p-3 bg-white/80 rounded-2xl border border-teal-200 text-xs text-teal-900">
                  <strong>Expected Action:</strong> Book an outpatient appointment at Kanyakumari Government PHC (average wait time ~25 mins) or consult a teleconsultant.
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onNavigate('find_healthcare')}
                    className="px-6 py-3 bg-[#087F8C] hover:bg-[#075E67] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md transition-colors"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>{t.findFacilityBtn}</span>
                  </button>

                  <button
                    onClick={() => onNavigate('teleconsultation')}
                    className="px-4 py-3 bg-white border border-teal-200 text-[#075E67] text-xs font-bold rounded-xl hover:bg-teal-50 transition-colors"
                  >
                    Talk to Teleconsultant
                  </button>
                </div>
              </div>
            )}

            {/* 3. HOME CARE OUTCOME */}
            {outcomeData.outcome === 'home' && (
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <HeartPulse className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-800">
                      Self-Care & Observation
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-emerald-950">
                      {t.homeCareRec}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                  {outcomeData.explanation}
                </p>

                <div className="p-3 bg-white/80 rounded-2xl border border-emerald-200 text-xs text-emerald-900">
                  <strong>Key Measures:</strong> Adequate rest, warm fluids, monitoring temperature twice daily. Visit your local Sub-Centre if fever exceeds 101°F.
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setShowHomeGuidanceModal(true)}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-md transition-colors"
                  >
                    <Info className="w-4 h-4" />
                    <span>{t.viewGuidanceBtn}</span>
                  </button>

                  <button
                    onClick={() => onNavigate('find_healthcare')}
                    className="px-4 py-3 bg-white border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl hover:bg-emerald-100/50 transition-colors"
                  >
                    Find Nearby PHC
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-400">
                Never present the AI result as a definitive medical diagnosis.
              </span>
              <button
                onClick={handleReset}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl font-semibold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.startOver}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Home Care Guidance Modal */}
      {showHomeGuidanceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-gray-900 text-base">Home Care Advisory</h3>
              </div>
              <button 
                onClick={() => setShowHomeGuidanceModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-600">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="font-bold text-emerald-900">Hydration & Rest</div>
                <p className="mt-0.5">Drink clean boiled water, ORS solution, or tender coconut water regularly throughout the day.</p>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="font-bold text-gray-800">Paracetamol Guidance</div>
                <p className="mt-0.5">For mild fever or headache, Paracetamol 500mg may be taken with water after food, as available at your local Sub-Centre.</p>
              </div>

              <div className="p-3 bg-rose-50 rounded-xl border border-rose-100">
                <div className="font-bold text-rose-900">Red-Flag Warning Signs</div>
                <p className="mt-0.5">If you develop persistent breathlessness, high fever &gt;102°F, inability to keep fluids down, or severe dizziness, immediately visit the nearest PHC or dial 108.</p>
              </div>
            </div>

            <button
              onClick={() => setShowHomeGuidanceModal(false)}
              className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition-colors"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
