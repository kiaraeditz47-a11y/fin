import React from 'react';
import { 
  Bell, 
  X, 
  Calendar, 
  GitFork, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Trash2
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'appointment' | 'referral' | 'warning' | 'info';
  read: boolean;
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const t = translations[language];

  const [notifications, setNotifications] = React.useState<NotificationItem[]>([
    {
      id: '1',
      title: 'Appointment Reminder: Today 10:30 AM',
      description: 'Your token #A-27 at Kanyakumari Government PHC with Dr. Priya is scheduled for today.',
      time: '15 mins ago',
      type: 'appointment',
      read: false
    },
    {
      id: '2',
      title: 'Referral Accepted by Rural Hospital',
      description: 'Agastheeswaram Rural Hospital accepted your maternal health referral (REF-2026-00482).',
      time: '2 hours ago',
      type: 'referral',
      read: false
    },
    {
      id: '3',
      title: 'Maternal Health Follow-up Due',
      description: 'Sister Anitha (VHN) scheduled a home review for Gestational Hypertension follow-up.',
      time: '1 day ago',
      type: 'warning',
      read: true
    }
  ]);

  if (!isOpen) return null;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#087F8C]" />
            <h3 className="font-bold text-gray-900 text-base">Notifications</h3>
            {notifications.filter((n) => !n.read).length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                {notifications.filter((n) => !n.read).length} new
              </span>
            )}
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <button 
            onClick={handleMarkAllRead}
            className="text-[#087F8C] hover:underline font-semibold"
          >
            Mark all read
          </button>
          <button 
            onClick={handleClearAll}
            className="text-rose-600 hover:underline flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        </div>

        <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-xs">
              No notifications at this time.
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border transition-colors space-y-1 ${
                  item.read ? 'bg-gray-50/70 border-gray-200' : 'bg-teal-50/50 border-teal-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900 text-xs">{item.title}</span>
                  <span className="text-[10px] text-gray-400">{item.time}</span>
                </div>
                <p className="text-xs text-gray-600">{item.description}</p>
              </div>
            ))
          )}
        </div>

        <div className="pt-2 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
