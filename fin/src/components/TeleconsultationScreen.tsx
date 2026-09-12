import React, { useState, useEffect } from 'react';
import { 
  Video, 
  PhoneCall, 
  PhoneOff, 
  Mic, 
  MicOff, 
  VideoOff, 
  Share2, 
  User, 
  Clock, 
  Building2, 
  CheckCircle2, 
  MessageSquare, 
  ShieldCheck, 
  FileText,
  Send,
  AlertCircle
} from 'lucide-react';
import { TeleconsultSpecialist, Language } from '../types';
import { translations } from '../translations';

interface TeleconsultationScreenProps {
  specialists: TeleconsultSpecialist[];
  language: Language;
}

export const TeleconsultationScreen: React.FC<TeleconsultationScreenProps> = ({
  specialists,
  language
}) => {
  const t = translations[language];

  const [activeDoctor, setActiveDoctor] = useState<TeleconsultSpecialist | null>(specialists[0]);
  const [isInCall, setIsInCall] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isVideoOn, setIsVideoOn] = useState<boolean>(true);
  const [callDurationSecs, setCallDurationSecs] = useState<number>(0);
  const [recordShared, setRecordShared] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<{ sender: 'patient' | 'doctor'; text: string; time: string }[]>([
    { sender: 'doctor', text: 'வணக்கம் Devi. How are you feeling today with your blood pressure?', time: '10:30 AM' }
  ]);
  const [newMessageText, setNewMessageText] = useState('');

  // Timer for active call
  useEffect(() => {
    let interval: any = null;
    if (isInCall) {
      interval = setInterval(() => {
        setCallDurationSecs((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDurationSecs(0);
    }
    return () => clearInterval(interval);
  }, [isInCall]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartCall = (doc: TeleconsultSpecialist) => {
    setActiveDoctor(doc);
    setIsInCall(true);
    setRecordShared(false);
  };

  const handleEndCall = () => {
    setIsInCall(false);
  };

  const handleShareRecord = () => {
    setRecordShared(true);
    setChatMessages((prev) => [
      ...prev,
      {
        sender: 'patient',
        text: '📎 Devi S. shared connected longitudinal health records (ABHA: 91-4820-1940-2210)',
        time: 'Just now'
      },
      {
        sender: 'doctor',
        text: 'Thank you Devi. I can see your previous antenatal records and the referral note from Kanyakumari PHC.',
        time: 'Just now'
      }
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    const msg = newMessageText.trim();
    setChatMessages((prev) => [
      ...prev,
      { sender: 'patient', text: msg, time: 'Just now' }
    ]);
    setNewMessageText('');

    // Doctor auto response simulation
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'doctor',
          text: 'Understood. Please keep resting in left lateral position and maintain your prescribed Labetalol.',
          time: 'Just now'
        }
      ]);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172026] tracking-tight">
            {t.teleconsultTitle}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {language === 'ta'
              ? 'மாவட்ட தலைமை மருத்துவமனை மற்றும் வட்டார சிறப்பு மருத்துவர்களுடன் நேரடி காணொளி ஆலோசனை'
              : 'Consult district government specialists and medical officers directly from home via telemedicine'}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold self-start">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>eSanjeevani Tele-OPD Hub Active</span>
        </div>
      </div>

      {/* Available Specialists List */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
          Available Public Health Specialists
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {specialists.map((doc) => {
            const isSelected = activeDoctor?.id === doc.id;
            return (
              <div
                key={doc.id}
                className={`bg-white rounded-3xl border p-5 transition-all flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? 'border-[#087F8C] shadow-md ring-2 ring-teal-100'
                    : 'border-gray-200 hover:border-gray-300 shadow-xs'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-2xl text-white flex items-center justify-center font-bold text-base shadow-xs ${doc.avatarBg}`}>
                      {doc.name.split(' ')[1]?.[0] || 'D'}
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 ${
                      doc.status === 'available'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        doc.status === 'available' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                      }`} />
                      <span>{doc.status === 'available' ? t.availableNow : 'Busy in OPD'}</span>
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 text-base">{doc.name}</h4>
                    <p className="text-xs font-semibold text-[#087F8C]">{doc.specialty}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">{doc.qualification}</p>
                  </div>

                  <div className="text-[11px] text-gray-600 space-y-1 pt-1 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-gray-400" />
                      <span className="truncate">{doc.facility}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span>{t.estWaitLabel}: <strong>{doc.estimatedWaitMins} min</strong></span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleStartCall(doc)}
                  className="w-full py-2.5 bg-[#087F8C] hover:bg-[#075E67] active:bg-[#064c54] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  <span>{t.startConsultation}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mock Consultation Room (Strictly Specified in Section 10!) */}
      {activeDoctor && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-[#087F8C]" />
              <h3 className="font-bold text-gray-900 text-base">
                Teleconsultation Room • {activeDoctor.name}
              </h3>
            </div>
            {isInCall && (
              <span className="px-3 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-full text-xs font-mono font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                <span>REC • {formatTimer(callDurationSecs)}</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Doctor Profile (3 cols) */}
            <div className="lg:col-span-3 bg-gray-50 rounded-2xl p-4 border border-gray-200 space-y-4">
              <div className="text-center space-y-2">
                <div className={`w-16 h-16 rounded-2xl text-white flex items-center justify-center font-bold text-2xl mx-auto shadow-md ${activeDoctor.avatarBg}`}>
                  {activeDoctor.name.split(' ')[1]?.[0] || 'D'}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{activeDoctor.name}</h4>
                  <p className="text-xs text-[#087F8C] font-semibold">{activeDoctor.specialty}</p>
                  <p className="text-[11px] text-gray-500">{activeDoctor.qualification}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs border-t border-gray-200 pt-3">
                <div>
                  <span className="text-gray-400 font-medium">Affiliated Center:</span>
                  <div className="font-semibold text-gray-800 mt-0.5">{activeDoctor.facility}</div>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Spoken Languages:</span>
                  <div className="font-semibold text-gray-800 mt-0.5">{activeDoctor.languages.join(', ')}</div>
                </div>
                <div>
                  <span className="text-gray-400 font-medium">Doctor Registration:</span>
                  <div className="font-mono text-gray-800 mt-0.5">TNM-MED-449102</div>
                </div>
              </div>

              <div className="p-2.5 bg-teal-50 rounded-xl border border-teal-100 text-[11px] text-teal-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#087F8C] shrink-0" />
                <span>Verified Tamil Nadu Public Health Specialist</span>
              </div>
            </div>

            {/* Center: Video-Call Placeholder (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-16/10 bg-slate-950 rounded-3xl overflow-hidden shadow-xl border border-slate-800 flex flex-col justify-between p-4">
                {/* Simulated Doctor Video Stream */}
                {isInCall ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950">
                    <div className="text-center space-y-3">
                      <div className="w-24 h-24 rounded-full bg-emerald-600/30 ring-4 ring-emerald-500/50 flex items-center justify-center text-white mx-auto animate-pulse">
                        <User className="w-12 h-12 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-base">{activeDoctor.name}</div>
                        <div className="text-emerald-400 text-xs">Live Audio/Video Encrypted Feed</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-white space-y-3 p-6 text-center">
                    <Video className="w-12 h-12 text-teal-400" />
                    <div className="font-bold text-base">Video Consultation Room Ready</div>
                    <p className="text-xs text-slate-400 max-w-xs">
                      Click “Start Call” to connect directly with {activeDoctor.name} on the secure district network.
                    </p>
                  </div>
                )}

                {/* Self preview PIP window */}
                {isInCall && (
                  <div className="relative z-10 self-end w-24 h-18 sm:w-28 sm:h-20 bg-slate-800 rounded-xl border border-slate-700 shadow-md overflow-hidden flex items-center justify-center text-[10px] text-white">
                    {isVideoOn ? (
                      <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                        <span>Devi (You)</span>
                      </div>
                    ) : (
                      <div className="text-slate-400">Camera Off</div>
                    )}
                  </div>
                )}

                {/* Bottom Call Controls Bar */}
                <div className="relative z-10 flex items-center justify-center gap-3 pt-2">
                  {isInCall ? (
                    <>
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className={`p-3 rounded-full text-white transition-colors ${
                          isMuted ? 'bg-rose-600 hover:bg-rose-700' : 'bg-slate-800 hover:bg-slate-700'
                        }`}
                        title={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                      </button>

                      <button
                        onClick={() => setIsVideoOn(!isVideoOn)}
                        className={`p-3 rounded-full text-white transition-colors ${
                          !isVideoOn ? 'bg-rose-600 hover:bg-rose-700' : 'bg-slate-800 hover:bg-slate-700'
                        }`}
                        title={isVideoOn ? 'Turn Video Off' : 'Turn Video On'}
                      >
                        {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                      </button>

                      {/* End Call Button */}
                      <button
                        onClick={handleEndCall}
                        className="px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-bold text-xs flex items-center gap-2 shadow-lg transition-colors"
                      >
                        <PhoneOff className="w-4 h-4" />
                        <span>{t.endCall}</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleStartCall(activeDoctor)}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold text-xs flex items-center gap-2 shadow-lg transition-colors"
                    >
                      <PhoneCall className="w-4 h-4" />
                      <span>{t.startCall}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Consultation Control Action Buttons strictly required in Section 10 */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  {!isInCall ? (
                    <button
                      onClick={() => handleStartCall(activeDoctor)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{t.startCall}</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleEndCall}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      <PhoneOff className="w-3.5 h-3.5" />
                      <span>{t.endCall}</span>
                    </button>
                  )}

                  {/* Share Record Button (Prompt Section 10 requirement) */}
                  <button
                    onClick={handleShareRecord}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      recordShared
                        ? 'bg-teal-100 text-[#075E67] border border-teal-300'
                        : 'bg-[#087F8C] hover:bg-[#075E67] text-white shadow-xs'
                    }`}
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{recordShared ? 'Record Shared ✓' : t.shareRecord}</span>
                  </button>
                </div>

                <span className="text-[11px] text-gray-500">
                  Government Tele-health Protocol Active
                </span>
              </div>
            </div>

            {/* Right: Consultation Information & Live Chat (3 cols) */}
            <div className="lg:col-span-3 bg-gray-50 rounded-2xl p-4 border border-gray-200 flex flex-col justify-between h-[420px]">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                  <span className="font-bold text-gray-900 text-xs">Consultation Notes & Chat</span>
                  <MessageSquare className="w-3.5 h-3.5 text-[#087F8C]" />
                </div>

                {/* Messages stream */}
                <div className="space-y-2 py-3 overflow-y-auto max-h-[300px] text-xs">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl ${
                        msg.sender === 'patient'
                          ? 'bg-[#E8F7F5] border border-teal-200 text-teal-950 ml-2'
                          : 'bg-white border border-gray-200 text-gray-800 mr-2'
                      }`}
                    >
                      <div className="text-[10px] font-bold text-gray-400 mb-0.5">
                        {msg.sender === 'patient' ? 'Devi (Patient)' : activeDoctor.name}
                      </div>
                      <p>{msg.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="pt-2 border-t border-gray-200 flex gap-2">
                <input
                  type="text"
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  placeholder="Type message to doctor..."
                  className="flex-1 px-3 py-2 bg-white rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#087F8C]"
                />
                <button
                  type="submit"
                  className="p-2 bg-[#087F8C] hover:bg-[#075E67] text-white rounded-xl"
                  aria-label="Send"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
