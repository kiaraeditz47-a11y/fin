import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Building2, 
  Stethoscope, 
  Ticket, 
  ArrowRight, 
  ArrowLeft,
  QrCode,
  ShieldCheck,
  Share2
} from 'lucide-react';
import { Facility, Appointment, Language } from '../types';
import { translations } from '../translations';

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  facilities: Facility[];
  preselectedFacility?: Facility | null;
  language: Language;
  onAppointmentBooked: (newAppointment: Appointment) => void;
}

export const BookAppointmentModal: React.FC<BookAppointmentModalProps> = ({
  isOpen,
  onClose,
  facilities,
  preselectedFacility,
  language,
  onAppointmentBooked
}) => {
  const t = translations[language];

  // Steps: 1: Facility, 2: Service, 3: Date, 4: Time, 5: Confirm, 6: Digital Token Screen
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedFacility, setSelectedFacility] = useState<Facility>(
    preselectedFacility || facilities[0]
  );
  const [selectedService, setSelectedService] = useState<string>('General Outpatient & Consultation');
  const [selectedDate, setSelectedDate] = useState<string>('09 Sep 2026');
  const [selectedTime, setSelectedTime] = useState<string>('10:30 AM');
  const [generatedToken, setGeneratedToken] = useState<string>('A-27');
  const [createdAppointment, setCreatedAppointment] = useState<Appointment | null>(null);

  React.useEffect(() => {
    if (preselectedFacility) {
      setSelectedFacility(preselectedFacility);
      setCurrentStep(2); // Jump straight to choosing service if facility is preselected
    } else {
      setCurrentStep(1);
    }
  }, [preselectedFacility, isOpen]);

  if (!isOpen) return null;

  const servicesList = [
    'General Outpatient & Consultation',
    'Antenatal Care (ANC) & Maternal Health',
    'Under-5 Child Immunization',
    'Non-Communicable Diseases (Diabetes / BP)',
    'Elderly & Chronic Care Review',
    'Dental & Oral Health Checkup'
  ];

  const dateOptions = [
    { label: 'Today', date: '09 Sep 2026', day: 'Wednesday' },
    { label: 'Tomorrow', date: '10 Sep 2026', day: 'Thursday' },
    { label: 'Friday', date: '11 Sep 2026', day: 'Friday' },
    { label: 'Saturday', date: '12 Sep 2026', day: 'Saturday' }
  ];

  const timeSlots = [
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '02:00 PM',
    '02:30 PM',
    '03:00 PM'
  ];

  const handleConfirmBooking = () => {
    // Generate realistic token for the facility
    const tokenLetter = selectedFacility.type === 'PHC' ? 'A' : selectedFacility.type === 'Rural Hospital' ? 'RH' : 'DH';
    const randomNum = Math.floor(Math.random() * 30) + 20;
    const newToken = `${tokenLetter}-${randomNum}`;
    setGeneratedToken(newToken);

    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      patientId: 'pat-1',
      patientName: 'Devi S.',
      facilityId: selectedFacility.id,
      facilityName: selectedFacility.name,
      doctorName: selectedFacility.id === 'fac-1' ? 'Dr. Priya M.' : 'Dr. Arun Kumar',
      specialty: selectedService,
      date: selectedDate,
      time: selectedTime,
      token: newToken,
      queueStatus: '5 patients ahead',
      estimatedWaitMins: 25,
      status: 'upcoming',
      serviceType: selectedService
    };

    setCreatedAppointment(newApt);
    setCurrentStep(6); // Move to Digital Token Screen
  };

  const handleFinalAdd = () => {
    if (createdAppointment) {
      onAppointmentBooked(createdAppointment);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-gray-200 my-6"
        role="dialog"
        aria-modal="true"
      >
        {/* Header (Steps 1 to 5) */}
        {currentStep <= 5 && (
          <div className="bg-gradient-to-r from-[#087F8C] to-[#075E67] text-white p-5 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-200">
                Step {currentStep} of 5
              </span>
              <h2 className="text-lg font-bold">
                {currentStep === 1 && 'Step 1: Choose facility'}
                {currentStep === 2 && 'Step 2: Choose service'}
                {currentStep === 3 && 'Step 3: Choose date'}
                {currentStep === 4 && 'Step 4: Choose time'}
                {currentStep === 5 && 'Step 5: Confirm appointment'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Step 1: Choose Facility */}
        {currentStep === 1 && (
          <div className="p-6 space-y-4">
            <p className="text-xs text-gray-500">
              Select the public healthcare facility near your home in Kanyakumari district:
            </p>
            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {facilities.map((fac) => {
                const isSelected = selectedFacility.id === fac.id;
                return (
                  <button
                    key={fac.id}
                    onClick={() => setSelectedFacility(fac)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'border-[#087F8C] bg-teal-50/50 ring-2 ring-teal-100 shadow-xs'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-sm">{fac.name}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                          {fac.type}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{fac.address} • {fac.distanceKm} km</p>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-[#087F8C] shrink-0 mt-1" />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 bg-[#087F8C] hover:bg-[#075E67] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs"
              >
                <span>Continue to Service</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Choose Service */}
        {currentStep === 2 && (
          <div className="p-6 space-y-4">
            <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600 flex items-center justify-between">
              <span>Facility: <strong>{selectedFacility.name}</strong></span>
              <button 
                onClick={() => setCurrentStep(1)} 
                className="text-[#087F8C] font-semibold hover:underline"
              >
                Change
              </button>
            </div>

            <p className="text-xs text-gray-500">
              Select the healthcare department or service you require:
            </p>

            <div className="space-y-2 max-h-72 overflow-y-auto">
              {servicesList.map((service) => {
                const isSelected = selectedService === service;
                return (
                  <button
                    key={service}
                    onClick={() => setSelectedService(service)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#087F8C] bg-teal-50/50 ring-2 ring-teal-100'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-xs font-semibold text-gray-800">{service}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#087F8C]" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold rounded-xl flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="px-5 py-2.5 bg-[#087F8C] hover:bg-[#075E67] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs"
              >
                <span>Continue to Date</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Choose Date */}
        {currentStep === 3 && (
          <div className="p-6 space-y-4">
            <p className="text-xs text-gray-500">
              Select preferred appointment date:
            </p>

            <div className="grid grid-cols-2 gap-3">
              {dateOptions.map((opt) => {
                const isSelected = selectedDate === opt.date;
                return (
                  <button
                    key={opt.date}
                    onClick={() => setSelectedDate(opt.date)}
                    className={`p-4 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'border-[#087F8C] bg-teal-50 ring-2 ring-teal-100 shadow-xs'
                        : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
                    }`}
                  >
                    <div className="text-[11px] font-semibold text-[#087F8C]">{opt.label}</div>
                    <div className="text-sm font-bold text-gray-900 mt-1">{opt.date}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{opt.day}</div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold rounded-xl flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="px-5 py-2.5 bg-[#087F8C] hover:bg-[#075E67] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs"
              >
                <span>Continue to Time</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Choose Time */}
        {currentStep === 4 && (
          <div className="p-6 space-y-4">
            <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600 flex items-center justify-between">
              <span>Date selected: <strong>{selectedDate}</strong></span>
              <button 
                onClick={() => setCurrentStep(3)} 
                className="text-[#087F8C] font-semibold hover:underline"
              >
                Change
              </button>
            </div>

            <p className="text-xs text-gray-500">
              Select available OPD consultation slot:
            </p>

            <div className="grid grid-cols-3 gap-2.5">
              {timeSlots.map((slot) => {
                const isSelected = selectedTime === slot;
                return (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`py-3 px-2 rounded-xl border text-center transition-all text-xs font-bold ${
                      isSelected
                        ? 'border-[#087F8C] bg-[#087F8C] text-white shadow-xs'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-gray-50'
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(3)}
                className="px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold rounded-xl flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setCurrentStep(5)}
                className="px-5 py-2.5 bg-[#087F8C] hover:bg-[#075E67] text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-xs"
              >
                <span>Review & Confirm</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Confirm Details */}
        {currentStep === 5 && (
          <div className="p-6 space-y-5">
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 space-y-3 text-xs">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Patient:</span>
                <span className="font-bold text-gray-900">Devi S. (Age 32, Female)</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">ABHA Health ID:</span>
                <span className="font-mono font-medium text-gray-800">91-4820-1940-2210</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Facility:</span>
                <span className="font-bold text-[#087F8C]">{selectedFacility.name}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Service:</span>
                <span className="font-semibold text-gray-800">{selectedService}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Date & Slot:</span>
                <span className="font-bold text-gray-900">{selectedDate} at {selectedTime}</span>
              </div>
              <div className="flex justify-between text-emerald-800 font-semibold">
                <span>Fee / Charges:</span>
                <span>FREE (Tamil Nadu Public Health)</span>
              </div>
            </div>

            <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-[11px] text-teal-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#087F8C] shrink-0" />
              <span>A digital outpatient token will be immediately allocated for live tracking.</span>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(4)}
                className="px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-semibold rounded-xl flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleConfirmBooking}
                className="px-6 py-2.5 bg-[#087F8C] hover:bg-[#075E67] text-white text-xs font-bold rounded-xl shadow-md transition-colors"
              >
                Confirm & Generate Token
              </button>
            </div>
          </div>
        )}

        {/* Step 6: DIGITAL TOKEN SCREEN (Specified strictly in Section 8 of prompt!) */}
        {currentStep === 6 && (
          <div className="p-6 sm:p-8 space-y-6 text-center bg-gradient-to-b from-teal-50/50 to-white">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Appointment Confirmed</span>
            </div>

            {/* Big Digital Token Card */}
            <div className="bg-white rounded-3xl border-2 border-[#087F8C] p-6 shadow-xl space-y-4 max-w-sm mx-auto">
              <div className="text-xs font-bold uppercase tracking-widest text-[#087F8C]">
                Digital Queue Token
              </div>

              {/* Large Token # A-27 */}
              <div className="text-5xl font-black tracking-tight text-[#087F8C] py-2">
                # {generatedToken}
              </div>

              {/* Estimated wait & queue */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 text-xs">
                <div className="bg-gray-50 p-2.5 rounded-xl">
                  <div className="text-[10px] text-gray-500 uppercase font-semibold">Estimated wait</div>
                  <div className="text-sm font-bold text-gray-900 mt-0.5">25 minutes</div>
                </div>
                <div className="bg-gray-50 p-2.5 rounded-xl">
                  <div className="text-[10px] text-gray-500 uppercase font-semibold">Queue Status</div>
                  <div className="text-sm font-bold text-gray-900 mt-0.5">5 patients ahead</div>
                </div>
              </div>

              {/* Facility name */}
              <div className="pt-2 text-xs text-gray-600">
                Facility: <strong className="text-gray-900">{selectedFacility.name}</strong>
              </div>

              {/* QR Code Graphic Mockup */}
              <div className="pt-2 flex flex-col items-center justify-center">
                <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <QrCode className="w-24 h-24 text-gray-800" />
                </div>
                <span className="text-[10px] font-mono text-gray-400 mt-1">Scan at PHC Registration Counter</span>
              </div>
            </div>

            {/* Prompt Button Requirement: "Add to My Appointments" */}
            <div className="space-y-2 max-w-sm mx-auto">
              <button
                onClick={handleFinalAdd}
                className="w-full py-3 bg-[#087F8C] hover:bg-[#075E67] active:bg-[#064c54] text-white text-sm font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Ticket className="w-4 h-4" />
                <span>Add to My Appointments</span>
              </button>
              <p className="text-[11px] text-gray-400">
                You can view or reschedule this token anytime from the Appointments tab.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
