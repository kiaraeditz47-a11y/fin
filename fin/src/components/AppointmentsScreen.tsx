import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Ticket, 
  Plus, 
  AlertCircle, 
  CheckCircle2, 
  XCircle,
  QrCode,
  X
} from 'lucide-react';
import { Appointment, Language } from '../types';
import { translations } from '../translations';

interface AppointmentsScreenProps {
  appointments: Appointment[];
  language: Language;
  onOpenBookAppointment: () => void;
  onCancelAppointment: (id: string) => void;
  onRescheduleAppointment: (id: string, newDate: string, newTime: string) => void;
}

export const AppointmentsScreen: React.FC<AppointmentsScreenProps> = ({
  appointments,
  language,
  onOpenBookAppointment,
  onCancelAppointment,
  onRescheduleAppointment
}) => {
  const t = translations[language];

  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [selectedTokenAppointment, setSelectedTokenAppointment] = useState<Appointment | null>(null);
  const [reschedulingAppointment, setReschedulingAppointment] = useState<Appointment | null>(null);
  const [newDate, setNewDate] = useState('11 Sep 2026');
  const [newTime, setNewTime] = useState('11:00 AM');

  const filteredAppointments = appointments.filter((apt) => apt.status === activeTab);

  const handleConfirmReschedule = () => {
    if (reschedulingAppointment) {
      onRescheduleAppointment(reschedulingAppointment.id, newDate, newTime);
      setReschedulingAppointment(null);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172026] tracking-tight">
            {t.navAppointments}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {language === 'ta'
              ? 'உங்கள் அரசு மருத்துவமனை நியமனங்கள் மற்றும் நேரலை வரிசை டோக்கன்கள்'
              : 'Manage outpatient visits and track your live queue tokens across Kanyakumari'}
          </p>
        </div>

        <button
          onClick={onOpenBookAppointment}
          className="px-5 py-2.5 bg-[#087F8C] hover:bg-[#075E67] text-white text-xs font-bold rounded-2xl shadow-xs transition-colors flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>{t.bookNewAppointment}</span>
        </button>
      </div>

      {/* Tabs: Upcoming / Completed / Cancelled */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'upcoming'
              ? 'bg-[#E8F7F5] text-[#075E67] border border-teal-200'
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          {t.upcomingTab} ({appointments.filter((a) => a.status === 'upcoming').length})
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'completed'
              ? 'bg-[#E8F7F5] text-[#075E67] border border-teal-200'
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          {t.completedTab} ({appointments.filter((a) => a.status === 'completed').length})
        </button>

        <button
          onClick={() => setActiveTab('cancelled')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'cancelled'
              ? 'bg-[#E8F7F5] text-[#075E67] border border-teal-200'
              : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          {t.cancelledTab} ({appointments.filter((a) => a.status === 'cancelled').length})
        </button>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className="p-10 bg-white rounded-3xl border border-gray-200 text-center space-y-3">
            <Calendar className="w-10 h-10 text-gray-300 mx-auto" />
            <div className="font-bold text-gray-700 text-sm">
              No {activeTab} appointments
            </div>
            <p className="text-xs text-gray-400">
              When you book public healthcare visits, they will appear here with live queue tracking.
            </p>
          </div>
        ) : (
          filteredAppointments.map((apt) => (
            <div
              key={apt.id}
              className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-6 shadow-xs space-y-4 hover:border-gray-300 transition-all"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-[#075E67] border border-teal-200">
                      {apt.date}
                    </span>
                    <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {apt.time}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                    {apt.facilityName}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Doctor: <strong className="text-gray-800">{apt.doctorName}</strong> • {apt.serviceType}
                  </p>
                </div>

                {/* Big Token Badge */}
                <div className="bg-[#E8F7F5] border border-teal-200 rounded-2xl px-4 py-2 text-center self-start sm:self-auto">
                  <div className="text-[10px] uppercase font-bold text-teal-800">Token</div>
                  <div className="text-xl font-black text-[#087F8C]">{apt.token}</div>
                </div>
              </div>

              {/* Status details */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <div>
                  <span className="text-gray-500">Queue Status:</span>
                  <div className="font-bold text-gray-800 mt-0.5">{apt.queueStatus}</div>
                </div>
                <div>
                  <span className="text-gray-500">{t.estWaitLabel}:</span>
                  <div className="font-bold text-gray-800 mt-0.5">{apt.estimatedWaitMins} min</div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-gray-500">Priority:</span>
                  <div className="font-bold text-emerald-700 mt-0.5">Confirmed Outpatient</div>
                </div>
              </div>

              {/* Actions */}
              {apt.status === 'upcoming' && (
                <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center justify-end gap-2.5">
                  <button
                    onClick={() => setSelectedTokenAppointment(apt)}
                    className="px-3.5 py-1.5 bg-[#087F8C] hover:bg-[#075E67] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>{t.viewToken}</span>
                  </button>

                  <button
                    onClick={() => setReschedulingAppointment(apt)}
                    className="px-3.5 py-1.5 border border-gray-200 hover:border-gray-300 text-gray-700 text-xs font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    {t.reschedule}
                  </button>

                  <button
                    onClick={() => onCancelAppointment(apt.id)}
                    className="px-3.5 py-1.5 border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold rounded-xl transition-colors"
                  >
                    {t.cancel}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* View Token Modal */}
      {selectedTokenAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-gray-200 text-center space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">Outpatient Token Slip</span>
              <button 
                onClick={() => setSelectedTokenAppointment(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-4xl font-black text-[#087F8C] py-2">
              # {selectedTokenAppointment.token}
            </div>

            <div className="text-xs text-gray-600 space-y-1">
              <div>Facility: <strong>{selectedTokenAppointment.facilityName}</strong></div>
              <div>Doctor: <strong>{selectedTokenAppointment.doctorName}</strong></div>
              <div>Date & Time: <strong>{selectedTokenAppointment.date} at {selectedTokenAppointment.time}</strong></div>
            </div>

            <div className="p-3 bg-teal-50 rounded-2xl border border-teal-100 text-xs text-teal-900">
              Estimated wait: <strong>~{selectedTokenAppointment.estimatedWaitMins} min</strong> ({selectedTokenAppointment.queueStatus})
            </div>

            <div className="flex flex-col items-center pt-2">
              <div className="p-2 bg-gray-50 rounded-xl border border-gray-200">
                <QrCode className="w-20 h-20 text-gray-800" />
              </div>
              <span className="text-[10px] text-gray-400 mt-1">Present at PHC counter upon arrival</span>
            </div>

            <button
              onClick={() => setSelectedTokenAppointment(null)}
              className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition-colors"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {reschedulingAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Reschedule Appointment</h3>
              <button 
                onClick={() => setReschedulingAppointment(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-gray-600 space-y-1">
              <div>Current: <strong>{reschedulingAppointment.facilityName}</strong></div>
              <div>Token: <strong>{reschedulingAppointment.token}</strong></div>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Select New Date</label>
                <select
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50 text-xs font-medium focus:bg-white"
                >
                  <option value="10 Sep 2026">Tomorrow - 10 Sep 2026</option>
                  <option value="11 Sep 2026">Friday - 11 Sep 2026</option>
                  <option value="12 Sep 2026">Saturday - 12 Sep 2026</option>
                  <option value="15 Sep 2026">Next Tuesday - 15 Sep 2026</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Select Time Slot</label>
                <select
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50 text-xs font-medium focus:bg-white"
                >
                  <option value="09:30 AM">09:30 AM</option>
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="02:30 PM">02:30 PM</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-end gap-2 text-xs">
              <button
                onClick={() => setReschedulingAppointment(null)}
                className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleConfirmReschedule}
                className="px-4 py-2 bg-[#087F8C] hover:bg-[#075E67] text-white font-bold rounded-xl shadow-xs"
              >
                Confirm New Slot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
