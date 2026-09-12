import React, { useState } from 'react';
import { 
  UserRole, 
  Language, 
  Facility, 
  Appointment, 
  Referral, 
  FollowUpItem 
} from './types';
import { 
  mockFacilities, 
  mockPatient, 
  mockAppointments, 
  mockReferrals, 
  mockFollowups, 
  mockMedicines, 
  mockDiagnostics, 
  mockSpecialists, 
  mockHealthWorkerStats 
} from './mockData';
import { translations } from './translations';
import { Sidebar, NavTab } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { LoginScreen } from './components/LoginScreen';
import { EmergencyModal } from './components/EmergencyModal';
import { PatientDashboard } from './components/PatientDashboard';
import { FindHealthcare } from './components/FindHealthcare';
import { AppointmentsScreen } from './components/AppointmentsScreen';
import { BookAppointmentModal } from './components/BookAppointmentModal';
import { AITriage } from './components/AITriage';
import { TeleconsultationScreen } from './components/TeleconsultationScreen';
import { ReferralTracking } from './components/ReferralTracking';
import { MedicinesDiagnostics } from './components/MedicinesDiagnostics';
import { PatientRecords } from './components/PatientRecords';
import { HealthWorkerDashboard } from './components/HealthWorkerDashboard';
import { HighRiskFollowup } from './components/HighRiskFollowup';
import { NotificationsModal } from './components/NotificationsModal';
import { UserProfileModal } from './components/UserProfileModal';

export default function App() {
  // App state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<UserRole>('patient');
  const [language, setLanguage] = useState<Language>('en');
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [selectedLocation, setSelectedLocation] = useState<string>('Kanyakumari District');

  // Modals state
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState<boolean>(false);
  const [isBookAppointmentOpen, setIsBookAppointmentOpen] = useState<boolean>(false);
  const [preselectedFacility, setPreselectedFacility] = useState<Facility | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Dynamic collections
  const [facilities, setFacilities] = useState<Facility[]>(mockFacilities);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [referrals, setReferrals] = useState<Referral[]>(mockReferrals);
  const [followups, setFollowups] = useState<FollowUpItem[]>(mockFollowups);
  const [selectedFollowup, setSelectedFollowup] = useState<FollowUpItem>(mockFollowups[0]);

  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === 'en' ? 'ta' : 'en'));
  };

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setIsLoggedIn(true);
    setCurrentTab('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsProfileOpen(false);
  };

  const handleSwitchRole = (newRole: UserRole) => {
    setUserRole(newRole);
    setCurrentTab('home');
  };

  const handleOpenBookAppointment = (facility?: Facility) => {
    setPreselectedFacility(facility || null);
    setIsBookAppointmentOpen(true);
  };

  const handleAppointmentBooked = (newApt: Appointment) => {
    setAppointments((prev) => [newApt, ...prev]);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a))
    );
  };

  const handleRescheduleAppointment = (id: string, newDate: string, newTime: string) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, date: newDate, time: newTime } : a))
    );
  };

  // If user is not logged in, render the Login Screen
  if (!isLoggedIn) {
    return (
      <LoginScreen
        onLogin={handleLogin}
        language={language}
        onLanguageToggle={handleLanguageToggle}
      />
    );
  }

  const todayAppointment = appointments.find((a) => a.date === '09 Sep 2026' && a.status === 'upcoming');
  const activeReferral = referrals[0];
  const overdueFollowup = followups.find((f) => f.status === 'Overdue') || followups[0];

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#172026] overflow-hidden font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          setIsMobileMenuOpen(false);
        }}
        language={language}
        onLanguageToggle={handleLanguageToggle}
        userRole={userRole}
        onRoleSwitch={handleSwitchRole}
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Bar */}
        <TopBar
          currentTab={currentTab}
          language={language}
          onLanguageToggle={handleLanguageToggle}
          userRole={userRole}
          onRoleSwitch={handleSwitchRole}
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          unreadNotificationsCount={2}
          onOpenEmergency={() => setIsEmergencyModalOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Patient Home Dashboard */}
          {currentTab === 'home' && userRole === 'patient' && (
            <PatientDashboard
              language={language}
              onNavigate={(tab) => setCurrentTab(tab)}
              onOpenEmergency={() => setIsEmergencyModalOpen(true)}
              onOpenBookAppointment={() => handleOpenBookAppointment()}
              todayAppointment={todayAppointment}
              activeReferral={activeReferral}
              overdueFollowup={overdueFollowup}
              onViewAppointmentDetails={() => setCurrentTab('appointments')}
              onViewReferralDetails={() => setCurrentTab('referrals')}
              onViewFollowupDetails={(fol) => {
                setSelectedFollowup(fol);
                setCurrentTab('high_risk_followup');
              }}
            />
          )}

          {/* Health Worker Dashboard */}
          {currentTab === 'home' && userRole === 'health_worker' && (
            <HealthWorkerDashboard
              stats={mockHealthWorkerStats}
              followups={followups}
              language={language}
              onNavigate={(tab) => setCurrentTab(tab)}
              onSelectFollowup={(fol) => {
                setSelectedFollowup(fol);
                setCurrentTab('high_risk_followup');
              }}
            />
          )}

          {/* Find Healthcare Screen */}
          {currentTab === 'find_healthcare' && (
            <FindHealthcare
              facilities={facilities}
              language={language}
              onBookAppointment={(fac) => handleOpenBookAppointment(fac)}
            />
          )}

          {/* Appointments Screen */}
          {currentTab === 'appointments' && (
            <AppointmentsScreen
              appointments={appointments}
              language={language}
              onOpenBookAppointment={() => handleOpenBookAppointment()}
              onCancelAppointment={handleCancelAppointment}
              onRescheduleAppointment={handleRescheduleAppointment}
            />
          )}

          {/* AI-Assisted Triage */}
          {currentTab === 'ai_triage' && (
            <AITriage
              language={language}
              onNavigate={(tab) => setCurrentTab(tab)}
              onOpenEmergency={() => setIsEmergencyModalOpen(true)}
            />
          )}

          {/* Teleconsultation Screen */}
          {currentTab === 'teleconsultation' && (
            <TeleconsultationScreen
              specialists={mockSpecialists}
              language={language}
            />
          )}

          {/* Referral Tracking */}
          {currentTab === 'referrals' && (
            <ReferralTracking
              referrals={referrals}
              language={language}
            />
          )}

          {/* Medicines & Diagnostics */}
          {currentTab === 'medicines_diagnostics' && (
            <MedicinesDiagnostics
              medicines={mockMedicines}
              diagnostics={mockDiagnostics}
              language={language}
            />
          )}

          {/* Patient Records */}
          {currentTab === 'patient_records' && (
            <PatientRecords
              patient={mockPatient}
              records={mockPatient.healthRecords}
              language={language}
            />
          )}

          {/* High-Risk Follow-up */}
          {currentTab === 'high_risk_followup' && (
            <HighRiskFollowup
              followup={selectedFollowup}
              language={language}
              onNavigate={(tab) => setCurrentTab(tab)}
              onOpenEmergency={() => setIsEmergencyModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Emergency Modal */}
      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        language={language}
      />

      {/* Book Appointment Flow Modal */}
      <BookAppointmentModal
        isOpen={isBookAppointmentOpen}
        onClose={() => setIsBookAppointmentOpen(false)}
        facilities={facilities}
        preselectedFacility={preselectedFacility}
        language={language}
        onAppointmentBooked={handleAppointmentBooked}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        language={language}
      />

      {/* User Profile & Role Switch Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userRole={userRole}
        onSwitchRole={handleSwitchRole}
        language={language}
        onLanguageToggle={handleLanguageToggle}
        onLogout={handleLogout}
      />
    </div>
  );
}
