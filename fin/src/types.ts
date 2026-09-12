export type Language = 'en' | 'ta';
export type UserRole = 'patient' | 'health_worker';

export type FacilityType = 'Sub-Centre' | 'PHC' | 'Rural Hospital' | 'District Hospital';

export interface HealthRecord {
  id: string;
  date: string;
  type: string;
  title: string;
  facility: string;
  doctor: string;
  notes: string;
  vitals?: {
    bp?: string;
    pulse?: number;
    weight?: number;
    hb?: number;
    [key: string]: any;
  };
  prescriptions?: Array<{
    name: string;
    dosage: string;
    frequency: string;
  }>;
}

export interface HealthWorkerStats {
  patientsInArea: string;
  highRiskFollowupsDue: string;
  activeReferrals: string;
  medicinesLowStock: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  bloodGroup: string;
  phone: string;
  address: string;
  abhaId: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  preferredLanguage: Language;
  highRiskCategory?: 'maternal' | 'child' | 'chronic' | 'none';
  highRiskStatus: 'Active' | 'None';
  careStatus: 'Active' | 'Inactive';
  taluk: string;
  healthRecords?: HealthRecord[];
}

export interface Facility {
  id: string;
  name: string;
  nameTa: string;
  type: FacilityType;
  distanceKm: number;
  address: string;
  phone: string;
  openStatus: 'Open' | 'Closed';
  openingHours: string;
  currentQueue: {
    token: string;
    nowServing: string;
    estimatedWaitMins: number;
  };
  services: string[];
  pharmacyStatus: 'Well-Stocked' | 'Limited Stock' | 'Critical Shortage';
  diagnosticsAvailability: string[];
  bedCapacity?: number;
  emergencyCare: boolean;
  mapCoords: { x: number; y: number }; // Relative coordinates for district SVG map
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  facilityId: string;
  facilityName: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  token: string;
  queueStatus: string;
  estimatedWaitMins: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  serviceType: string;
}

export interface ReferralStage {
  stage: string;
  facility: string;
  time: string;
  status: 'completed' | 'current' | 'pending';
  note?: string;
}

export interface Referral {
  id: string;
  referralId: string;
  patientId: string;
  patientName: string;
  category: string;
  reason: string;
  fromFacility: string;
  throughFacility: string;
  toFacility: string;
  stages: ReferralStage[];
  currentStageIndex: number;
  statusText: string;
  referringDoctor: string;
  createdDate: string;
  priority: 'Routine' | 'Urgent' | 'Emergency';
}

export interface TimelineRecord {
  id: string;
  patientId: string;
  date: string;
  type: 'appointment' | 'triage' | 'referral' | 'diagnostic' | 'medication';
  title: string;
  facility: string;
  description: string;
  outcomeBadge?: string;
  doctor?: string;
  details?: string;
}

export interface FollowUpItem {
  id: string;
  patientId: string;
  patientName: string;
  category?: 'maternal' | 'child' | 'chronic';
  age?: number;
  dueDate: string;
  status: 'due_today' | 'overdue' | 'upcoming' | 'Due Soon' | 'Overdue' | 'Due Today' | 'Completed';
  condition: string;
  facility: string;
  vhnAssigned: string;
  contactPhone?: string;
  phone?: string;
  priority?: string;
  notes?: string;
}

export interface MedicineItem {
  id: string;
  name: string;
  dosage: string;
  category: string;
  availability: 'Available' | 'Low Stock' | 'Out of Stock' | string;
  stockCount: number;
  facility: string;
  facilityId: string;
  indication: string;
  facilityName?: string;
  stockStatus?: 'In Stock' | 'Low Stock' | 'Out of Stock' | string;
  unit?: string;
  lastUpdated?: string;
}

export interface DiagnosticItem {
  id: string;
  name: string;
  category: 'Blood Test' | 'Imaging' | 'Urine' | 'Maternal' | 'Cardiology' | string;
  availability: 'Available' | 'Limited Slots' | 'Unavailable' | string;
  nextSlot: string;
  facility: string;
  facilityId: string;
  reportTurnaround: string;
  facilityName?: string;
  preparation?: string;
  turnaroundTime?: string;
  timing?: string;
}

export type DiagnosticTestItem = DiagnosticItem;

export interface TeleconsultSpecialist {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  status: 'available' | 'busy' | 'offline';
  estimatedWaitMins: number;
  facility: string;
  languages: string[];
  avatarBg: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'appointment' | 'referral' | 'followup' | 'lab';
  read: boolean;
  actionTab?: string;
}

export interface QueuePatient {
  token: string;
  patientId: string;
  patientName: string;
  service: string;
  status: 'Waiting' | 'In consultation' | 'Completed';
  arrivalTime: string;
  age: number;
  gender: string;
}
