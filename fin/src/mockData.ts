import {
  Patient,
  Facility,
  Appointment,
  Referral,
  TimelineRecord,
  FollowUpItem,
  MedicineItem,
  DiagnosticItem,
  TeleconsultSpecialist,
  NotificationItem,
  QueuePatient,
  HealthRecord,
  HealthWorkerStats
} from './types';

export const mockPatients: Patient[] = [
  {
    id: 'pat-1',
    name: 'Devi S.',
    age: 32,
    gender: 'Female',
    bloodGroup: 'O+',
    phone: '+91 94432 18920',
    address: '24/B, Beach Road, Kanyakumari - 629702',
    abhaId: '91-4820-1940-2210',
    emergencyContact: {
      name: 'Senthil S.',
      relation: 'Spouse',
      phone: '+91 94431 82710'
    },
    preferredLanguage: 'en',
    highRiskCategory: 'maternal',
    highRiskStatus: 'Active',
    careStatus: 'Active',
    taluk: 'Agastheeswaram',
    healthRecords: [
      {
        id: 'hr-1',
        date: '05 Sep 2026',
        type: 'OPD Clinical Visit & Referral',
        title: 'Antenatal Checkup & Blood Pressure Evaluation',
        facility: 'Kanyakumari Government PHC',
        doctor: 'Dr. Priya M., MBBS, DGO',
        notes: 'Patient presented with headache and persistent mild bilateral pedal edema. BP recorded at 144/92 mmHg on left arm sitting position. Suspected Gestational Hypertension at 28 weeks gestation. Ultrasound Doppler and specialist consultation at Agastheeswaram Rural Hospital advised. Referral slip REF-2026-00482 issued.',
        vitals: {
          bp: '144/92',
          pulse: 78,
          weight: 61.2,
          hb: 11.2
        },
        prescriptions: [
          { name: 'Labetalol', dosage: '100 mg', frequency: 'Twice daily after meals' },
          { name: 'Iron & Folic Acid (IFA)', dosage: '1 tablet', frequency: 'Daily after lunch' },
          { name: 'Calcium Carbonate', dosage: '500 mg', frequency: 'Daily after dinner' }
        ]
      },
      {
        id: 'hr-2',
        date: '28 Aug 2026',
        type: 'Sub-Centre Checkup',
        title: 'Routine Field Health Nurse Checkup',
        facility: 'Kottaram Health Sub-Centre',
        doctor: 'Sister Anitha (VHN)',
        notes: 'Routine 27-week antenatal field assessment. Fundal height corresponds to dates. Foetal heart sounds clear at 142 bpm via Doppler. BP was 138/88 mmHg. Advised to reduce dietary table salt, maintain hydration, and report back if swelling worsens.',
        vitals: {
          bp: '138/88',
          pulse: 76,
          weight: 60.5
        }
      },
      {
        id: 'hr-3',
        date: '14 Jul 2026',
        type: 'Diagnostic Laboratory',
        title: 'Routine Antenatal Lab Battery (CBC, Blood Sugar, Urine)',
        facility: 'Kanyakumari PHC Diagnostic Lab',
        doctor: 'Dr. Priya M.',
        notes: 'Complete Blood Count (CBC) showed Hb 11.4 g/dL, platelets 2.4 lakhs. Fasting Blood Sugar was 84 mg/dL (Normal). Urine routine showed Nil albumin and Nil sugar. Blood group confirmed O Rh-Positive.',
        vitals: {
          hb: 11.4
        }
      },
      {
        id: 'hr-4',
        date: '02 May 2026',
        type: 'Vaccination',
        title: 'Tetanus & Adult Diphtheria (Td-1) Booster',
        facility: 'Kottaram Health Sub-Centre',
        doctor: 'Sister Anitha (VHN)',
        notes: 'First dose of Td vaccine administered intramuscularly in left deltoid. Batch #TD-9022, Expiry Dec 2027. Tolerated well with no immediate adverse reactions. Scheduled Td-2 dose after 4 weeks.',
        vitals: {
          weight: 58.0
        }
      }
    ]
  },
  {
    id: 'pat-2',
    name: 'Murugan P.',
    age: 58,
    gender: 'Male',
    bloodGroup: 'B+',
    phone: '+91 94421 99124',
    address: '12 Main Bazaar St, Suchindram - 629704',
    abhaId: '91-3104-5829-1002',
    emergencyContact: {
      name: 'Karthik M.',
      relation: 'Son',
      phone: '+91 94421 77112'
    },
    preferredLanguage: 'ta',
    highRiskCategory: 'chronic',
    highRiskStatus: 'Active',
    careStatus: 'Active',
    taluk: 'Agastheeswaram'
  },
  {
    id: 'pat-3',
    name: 'Lakshmi S.',
    age: 28,
    gender: 'Female',
    bloodGroup: 'A+',
    phone: '+91 98421 65432',
    address: '7 Temple Car Street, Kottaram - 629703',
    abhaId: '91-7712-4019-9943',
    emergencyContact: {
      name: 'Sundaram K.',
      relation: 'Spouse',
      phone: '+91 98421 99881'
    },
    preferredLanguage: 'ta',
    highRiskCategory: 'maternal',
    highRiskStatus: 'Active',
    careStatus: 'Active',
    taluk: 'Agastheeswaram'
  },
  {
    id: 'pat-4',
    name: 'Meena V.',
    age: 31,
    gender: 'Female',
    bloodGroup: 'AB+',
    phone: '+91 97890 12345',
    address: '45 Lighthouse Colony, Kovalam Post - 629702',
    abhaId: '91-9988-2231-5501',
    emergencyContact: {
      name: 'Vasanth R.',
      relation: 'Spouse',
      phone: '+91 97890 88990'
    },
    preferredLanguage: 'ta',
    highRiskCategory: 'maternal',
    highRiskStatus: 'Active',
    careStatus: 'Active',
    taluk: 'Agastheeswaram'
  },
  {
    id: 'pat-5',
    name: 'Rajesh K.',
    age: 42,
    gender: 'Male',
    bloodGroup: 'O-',
    phone: '+91 94862 33445',
    address: '18 Vivekananda Rock View, Kanyakumari',
    abhaId: '91-1245-8899-7712',
    emergencyContact: {
      name: 'Kavitha R.',
      relation: 'Spouse',
      phone: '+91 94862 99001'
    },
    preferredLanguage: 'en',
    highRiskCategory: 'none',
    highRiskStatus: 'None',
    careStatus: 'Active',
    taluk: 'Agastheeswaram'
  },
  {
    id: 'pat-6',
    name: 'Kavitha M. (Mother of Infant Aarav)',
    age: 26,
    gender: 'Female',
    bloodGroup: 'A-',
    phone: '+91 94883 45678',
    address: '8 Coastal Lane, Colachel - 629251',
    abhaId: '91-5544-3322-1109',
    emergencyContact: {
      name: 'Muthu K.',
      relation: 'Spouse',
      phone: '+91 94883 11223'
    },
    preferredLanguage: 'ta',
    highRiskCategory: 'child',
    highRiskStatus: 'Active',
    careStatus: 'Active',
    taluk: 'Kalkulam'
  },
  {
    id: 'pat-7',
    name: 'Selvam K.',
    age: 67,
    gender: 'Male',
    bloodGroup: 'B-',
    phone: '+91 94433 99887',
    address: '5 North Car St, Vadasery, Nagercoil - 629001',
    abhaId: '91-6677-8899-0012',
    emergencyContact: {
      name: 'Selvi S.',
      relation: 'Daughter',
      phone: '+91 94433 11223'
    },
    preferredLanguage: 'ta',
    highRiskCategory: 'chronic',
    highRiskStatus: 'Active',
    careStatus: 'Active',
    taluk: 'Nagercoil'
  },
  {
    id: 'pat-8',
    name: 'Anandhi T.',
    age: 24,
    gender: 'Female',
    bloodGroup: 'O+',
    phone: '+91 93601 44556',
    address: '14 Gandhi Memorial Rd, Kanyakumari - 629702',
    abhaId: '91-3322-1144-8899',
    emergencyContact: {
      name: 'Thangavel M.',
      relation: 'Father',
      phone: '+91 93601 99887'
    },
    preferredLanguage: 'ta',
    highRiskCategory: 'none',
    highRiskStatus: 'None',
    careStatus: 'Active',
    taluk: 'Agastheeswaram'
  },
  {
    id: 'pat-9',
    name: 'Priya R.',
    age: 36,
    gender: 'Female',
    bloodGroup: 'B+',
    phone: '+91 94420 88776',
    address: '33 Hospital Road, Nagercoil - 629001',
    abhaId: '91-4455-6677-8899',
    emergencyContact: {
      name: 'Ramesh P.',
      relation: 'Spouse',
      phone: '+91 94420 11223'
    },
    preferredLanguage: 'en',
    highRiskCategory: 'none',
    highRiskStatus: 'None',
    careStatus: 'Active',
    taluk: 'Nagercoil'
  },
  {
    id: 'pat-10',
    name: 'Vijay M.',
    age: 49,
    gender: 'Male',
    bloodGroup: 'AB-',
    phone: '+91 94870 12908',
    address: '9 Canal Bank, Suchindram - 629704',
    abhaId: '91-7788-9900-1122',
    emergencyContact: {
      name: 'Revathi V.',
      relation: 'Spouse',
      phone: '+91 94870 99887'
    },
    preferredLanguage: 'ta',
    highRiskCategory: 'chronic',
    highRiskStatus: 'Active',
    careStatus: 'Active',
    taluk: 'Agastheeswaram'
  }
];

export const mockFacilities: Facility[] = [
  {
    id: 'fac-1',
    name: 'Kanyakumari Government PHC',
    nameTa: 'கன்னியாகுமரி அரசு ஆரம்ப சுகாதார நிலையம்',
    type: 'PHC',
    distanceKm: 1.8,
    address: 'Near Old Bus Stand, Beach Road, Kanyakumari - 629702',
    phone: '+91 4652 246210',
    openStatus: 'Open',
    openingHours: '24 Hours (OPD: 8:00 AM - 4:00 PM)',
    currentQueue: {
      token: 'A-21',
      nowServing: 'A-16',
      estimatedWaitMins: 25
    },
    services: [
      'General consultation',
      'Maternal care',
      'Vaccination',
      'Pharmacy',
      'Non-Communicable Diseases (NCD)',
      'Basic Laboratory'
    ],
    pharmacyStatus: 'Well-Stocked',
    diagnosticsAvailability: [
      'Complete Blood Count (CBC)',
      'Blood Sugar (RBS/FBS)',
      'Urine Albumin & Sugar',
      'Sputum AFB'
    ],
    bedCapacity: 12,
    emergencyCare: true,
    mapCoords: { x: 58, y: 78 }
  },
  {
    id: 'fac-2',
    name: 'Agastheeswaram Rural Hospital',
    nameTa: 'அகஸ்தீஸ்வரம் அரசு வட்டார மருத்துவமனை',
    type: 'Rural Hospital',
    distanceKm: 6.4,
    address: 'Taluk HQ Road, Agastheeswaram - 629701',
    phone: '+91 4652 270420',
    openStatus: 'Open',
    openingHours: '24 Hours Open',
    currentQueue: {
      token: 'RH-44',
      nowServing: 'RH-39',
      estimatedWaitMins: 35
    },
    services: [
      'General Medicine',
      'Obstetrics & Gynaecology',
      'Paediatrics',
      '24/7 Emergency & Trauma',
      'Digital X-Ray',
      'Ambulance 108 Base'
    ],
    pharmacyStatus: 'Well-Stocked',
    diagnosticsAvailability: [
      'Digital X-Ray',
      'Obstetric Ultrasound',
      'Electrolytes & Renal Panel',
      'Lipid Profile',
      'ECG'
    ],
    bedCapacity: 45,
    emergencyCare: true,
    mapCoords: { x: 45, y: 62 }
  },
  {
    id: 'fac-3',
    name: 'Kanyakumari District Govt Headquarters Hospital, Nagercoil',
    nameTa: 'கன்னியாகுமரி அரசு தலைமை மருத்துவமனை, நாகர்கோவில்',
    type: 'District Hospital',
    distanceKm: 18.2,
    address: 'Kottar, Nagercoil, Kanyakumari District - 629002',
    phone: '+91 4652 232233',
    openStatus: 'Open',
    openingHours: '24 Hours Tertiary Care',
    currentQueue: {
      token: 'DH-102',
      nowServing: 'DH-88',
      estimatedWaitMins: 45
    },
    services: [
      'Super-specialty OPD',
      'Comprehensive Emergency & NICU',
      'Dialysis Centre',
      'Blood Bank',
      'CT Scan & Advanced Diagnostics',
      'Major OT Complex'
    ],
    pharmacyStatus: 'Well-Stocked',
    diagnosticsAvailability: [
      '16-Slice CT Scan',
      'Color Doppler Ultrasound',
      'Fully Automated Biochemistry',
      'Histopathology',
      'Echocardiography'
    ],
    bedCapacity: 520,
    emergencyCare: true,
    mapCoords: { x: 30, y: 35 }
  },
  {
    id: 'fac-4',
    name: 'Suchindram Government PHC',
    nameTa: 'சுசீந்திரம் அரசு ஆரம்ப சுகாதார நிலையம்',
    type: 'PHC',
    distanceKm: 11.5,
    address: 'Car Street Junction, Suchindram - 629704',
    phone: '+91 4652 240315',
    openStatus: 'Open',
    openingHours: '8:00 AM - 4:00 PM',
    currentQueue: {
      token: 'S-14',
      nowServing: 'S-11',
      estimatedWaitMins: 15
    },
    services: [
      'General Outpatient',
      'Antenatal Care (ANC)',
      'Under-5 Immunization',
      'Hypertension & Diabetes Clinic',
      'Pharmacy'
    ],
    pharmacyStatus: 'Limited Stock',
    diagnosticsAvailability: [
      'Hemoglobin Estimation',
      'Blood Glucose',
      'Urine Rapid Test'
    ],
    bedCapacity: 6,
    emergencyCare: false,
    mapCoords: { x: 40, y: 50 }
  },
  {
    id: 'fac-5',
    name: 'Kottaram Health Sub-Centre (Ayushman Arogya Mandir)',
    nameTa: 'கொட்டாரம் நல துணை நிலையம் (ஆரோக்கிய மந்திர்)',
    type: 'Sub-Centre',
    distanceKm: 4.2,
    address: 'Near Panchayat Office, Kottaram - 629703',
    phone: '+91 4652 271005',
    openStatus: 'Open',
    openingHours: '9:00 AM - 2:00 PM',
    currentQueue: {
      token: 'HWC-08',
      nowServing: 'HWC-06',
      estimatedWaitMins: 10
    },
    services: [
      'First-contact primary care',
      'Village Health Nurse (VHN) Visits',
      'Vaccination Camps',
      'Essential NCD Drugs Dispensing',
      'Maternal Blood Pressure Monitoring'
    ],
    pharmacyStatus: 'Well-Stocked',
    diagnosticsAvailability: [
      'Glucometer Blood Sugar',
      'Hemoglobin Rapid Strip',
      'Pregnancy Test Kit (Nishchay)'
    ],
    bedCapacity: 2,
    emergencyCare: false,
    mapCoords: { x: 50, y: 70 }
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 'apt-1',
    patientId: 'pat-1',
    patientName: 'Devi S.',
    facilityId: 'fac-1',
    facilityName: 'Kanyakumari Government PHC',
    doctorName: 'Dr. Priya M., MBBS, DGO',
    specialty: 'Maternal & Child Health',
    date: '09 Sep 2026',
    time: '10:30 AM',
    token: 'A-27',
    queueStatus: '5 patients ahead',
    estimatedWaitMins: 25,
    status: 'upcoming',
    serviceType: 'Antenatal Checkup & BP Review'
  },
  {
    id: 'apt-2',
    patientId: 'pat-1',
    patientName: 'Devi S.',
    facilityId: 'fac-2',
    facilityName: 'Agastheeswaram Rural Hospital',
    doctorName: 'Dr. Arun Kumar, MD',
    specialty: 'Obstetric Ultrasound Review',
    date: '12 Sep 2026',
    time: '02:00 PM',
    token: 'RH-18',
    queueStatus: 'Confirmed slot',
    estimatedWaitMins: 15,
    status: 'upcoming',
    serviceType: 'High-Risk Consultation'
  },
  {
    id: 'apt-3',
    patientId: 'pat-1',
    patientName: 'Devi S.',
    facilityId: 'fac-1',
    facilityName: 'Kanyakumari Government PHC',
    doctorName: 'Dr. Priya M.',
    specialty: 'General OPD',
    date: '18 Aug 2026',
    time: '11:00 AM',
    token: 'A-12',
    queueStatus: 'Completed',
    estimatedWaitMins: 0,
    status: 'completed',
    serviceType: 'Routine Antenatal Visit'
  },
  {
    id: 'apt-4',
    patientId: 'pat-2',
    patientName: 'Murugan P.',
    facilityId: 'fac-4',
    facilityName: 'Suchindram Government PHC',
    doctorName: 'Dr. Sundar R.',
    specialty: 'NCD Care',
    date: '09 Sep 2026',
    time: '09:45 AM',
    token: 'S-08',
    queueStatus: '2 patients ahead',
    estimatedWaitMins: 12,
    status: 'upcoming',
    serviceType: 'Hypertension Follow-up'
  },
  {
    id: 'apt-5',
    patientId: 'pat-3',
    patientName: 'Lakshmi S.',
    facilityId: 'fac-5',
    facilityName: 'Kottaram Health Sub-Centre',
    doctorName: 'Sister Vimala (CHO)',
    specialty: 'Maternal Wellness',
    date: '09 Sep 2026',
    time: '10:00 AM',
    token: 'HWC-04',
    queueStatus: '1 patient ahead',
    estimatedWaitMins: 8,
    status: 'upcoming',
    serviceType: 'BP and Nutrition Counseling'
  },
  {
    id: 'apt-6',
    patientId: 'pat-6',
    patientName: 'Kavitha M.',
    facilityId: 'fac-1',
    facilityName: 'Kanyakumari Government PHC',
    doctorName: 'Dr. Rajesh K.',
    specialty: 'Paediatrics',
    date: '10 Sep 2026',
    time: '09:30 AM',
    token: 'A-05',
    queueStatus: 'Scheduled',
    estimatedWaitMins: 10,
    status: 'upcoming',
    serviceType: 'Pentavalent 3 Vaccination'
  },
  {
    id: 'apt-7',
    patientId: 'pat-7',
    patientName: 'Selvam K.',
    facilityId: 'fac-3',
    facilityName: 'District Govt Hospital Nagercoil',
    doctorName: 'Dr. K. Balaji, DM',
    specialty: 'Cardiology',
    date: '11 Sep 2026',
    time: '11:15 AM',
    token: 'DH-34',
    queueStatus: 'Confirmed',
    estimatedWaitMins: 30,
    status: 'upcoming',
    serviceType: 'Cardiac Review & Echo'
  },
  {
    id: 'apt-8',
    patientId: 'pat-5',
    patientName: 'Rajesh K.',
    facilityId: 'fac-1',
    facilityName: 'Kanyakumari Government PHC',
    doctorName: 'Dr. Priya M.',
    specialty: 'General Outpatient',
    date: '04 Sep 2026',
    time: '10:15 AM',
    token: 'A-19',
    queueStatus: 'Completed',
    estimatedWaitMins: 0,
    status: 'completed',
    serviceType: 'Viral Fever & Cough'
  },
  {
    id: 'apt-9',
    patientId: 'pat-1',
    patientName: 'Devi S.',
    facilityId: 'fac-1',
    facilityName: 'Kanyakumari Government PHC',
    doctorName: 'Dr. Priya M.',
    specialty: 'Maternal Health',
    date: '10 Jul 2026',
    time: '09:30 AM',
    token: 'A-04',
    queueStatus: 'Completed',
    estimatedWaitMins: 0,
    status: 'completed',
    serviceType: '1st Trimester Registration & TT'
  },
  {
    id: 'apt-10',
    patientId: 'pat-8',
    patientName: 'Anandhi T.',
    facilityId: 'fac-1',
    facilityName: 'Kanyakumari Government PHC',
    doctorName: 'Dr. Priya M.',
    specialty: 'Dental Clinic',
    date: '01 Sep 2026',
    time: '12:00 PM',
    token: 'A-31',
    queueStatus: 'Cancelled',
    estimatedWaitMins: 0,
    status: 'cancelled',
    serviceType: 'Dental Scaling'
  }
];

export const mockReferrals: Referral[] = [
  {
    id: 'ref-1',
    referralId: 'REF-2026-00482',
    patientId: 'pat-1',
    patientName: 'Devi S.',
    category: 'Maternal Care / Obstetric',
    reason: 'Mild gestational hypertension (BP 146/92) requiring secondary obstetric evaluation and growth scan.',
    fromFacility: 'Kanyakumari Government PHC',
    throughFacility: 'Agastheeswaram Rural Hospital',
    toFacility: 'Kanyakumari District Govt Hospital, Nagercoil',
    stages: [
      {
        stage: 'PHC',
        facility: 'Kanyakumari Government PHC',
        time: '09 Sep, 9:15 AM',
        status: 'completed',
        note: 'Referral created by Dr. Priya M. Clinical summary transmitted to district EHR.'
      },
      {
        stage: 'Rural Hospital',
        facility: 'Agastheeswaram Rural Hospital',
        time: '09 Sep, 11:20 AM',
        status: 'completed',
        note: 'Referral received & triaged. Baseline lab panel validated. Forwarded for tertiary level scan.'
      },
      {
        stage: 'District Hospital',
        facility: 'Kanyakumari District Govt Hospital, Nagercoil',
        time: 'Pending Slot: Today 2:30 PM',
        status: 'current',
        note: 'Awaiting consultation in Obstetric High-Risk OPD (Room 14, 2nd Floor).'
      }
    ],
    currentStageIndex: 2,
    statusText: 'Rural Hospital — Awaiting consultation',
    referringDoctor: 'Dr. Priya M. (MBBS, DGO)',
    createdDate: '09 Sep 2026',
    priority: 'Urgent'
  },
  {
    id: 'ref-2',
    referralId: 'REF-2026-00450',
    patientId: 'pat-2',
    patientName: 'Murugan P.',
    category: 'Cardiology / NCD',
    reason: 'Refractory Stage 2 Hypertension with borderline ECG changes. Recommended 2D-Echo.',
    fromFacility: 'Suchindram Government PHC',
    throughFacility: 'Agastheeswaram Rural Hospital',
    toFacility: 'District Govt Hospital Nagercoil',
    stages: [
      {
        stage: 'PHC',
        facility: 'Suchindram Government PHC',
        time: '07 Sep, 10:00 AM',
        status: 'completed',
        note: 'Created by Dr. Sundar R.'
      },
      {
        stage: 'District Hospital',
        facility: 'District Govt Hospital Nagercoil',
        time: '08 Sep, 11:30 AM',
        status: 'completed',
        note: 'Consultation completed by Dr. Balaji. Medications adjusted to Telmisartan + Amlodipine.'
      }
    ],
    currentStageIndex: 1,
    statusText: 'Completed — Care plan updated',
    referringDoctor: 'Dr. Sundar R.',
    createdDate: '07 Sep 2026',
    priority: 'Routine'
  },
  {
    id: 'ref-3',
    referralId: 'REF-2026-00491',
    patientId: 'pat-3',
    patientName: 'Lakshmi S.',
    category: 'Maternal Care',
    reason: 'Severe anemia in pregnancy (Hb 7.8 g/dL) requiring IV Iron Sucrose infusion.',
    fromFacility: 'Kottaram Health Sub-Centre',
    throughFacility: 'Kanyakumari Government PHC',
    toFacility: 'Agastheeswaram Rural Hospital',
    stages: [
      {
        stage: 'Sub-Centre',
        facility: 'Kottaram Health Sub-Centre',
        time: '08 Sep, 11:00 AM',
        status: 'completed',
        note: 'VHN detected pallor and low Hb. Dispatched via referral slip.'
      },
      {
        stage: 'PHC',
        facility: 'Kanyakumari Government PHC',
        time: '08 Sep, 1:45 PM',
        status: 'current',
        note: 'Evaluating for day-care IV iron infusion.'
      }
    ],
    currentStageIndex: 1,
    statusText: 'PHC — Evaluating daycare infusion',
    referringDoctor: 'Sister Vimala (CHO)',
    createdDate: '08 Sep 2026',
    priority: 'Urgent'
  }
];

export const mockTimelineRecords: TimelineRecord[] = [
  {
    id: 'rec-1',
    patientId: 'pat-1',
    date: '09 Sep 2026',
    type: 'appointment',
    title: 'Appointment',
    facility: 'Kanyakumari PHC',
    description: 'General & Antenatal consultation with Dr. Priya M. Blood pressure monitored at 144/90 mmHg.',
    outcomeBadge: 'Scheduled Follow-up',
    doctor: 'Dr. Priya M.'
  },
  {
    id: 'rec-2',
    patientId: 'pat-1',
    date: '09 Sep 2026',
    type: 'triage',
    title: 'Triage',
    facility: 'ArogyaConnect AI Assistant',
    description: 'Symptoms assessed: Mild persistent headache and lower limb edema reported.',
    outcomeBadge: 'Scheduled visit recommended'
  },
  {
    id: 'rec-3',
    patientId: 'pat-1',
    date: '08 Sep 2026',
    type: 'referral',
    title: 'Referral',
    facility: 'Referred to Rural Hospital',
    description: 'Specialist consultation for elevated blood pressure monitoring and obstetric sonography.',
    outcomeBadge: 'Active Pathway'
  },
  {
    id: 'rec-4',
    patientId: 'pat-1',
    date: '02 Sep 2026',
    type: 'diagnostic',
    title: 'Diagnostic',
    facility: 'Kanyakumari PHC Laboratory',
    description: 'Complete Blood Count (CBC) and Urine Albumin requested.',
    outcomeBadge: 'Completed — Hb 11.2 g/dL, Albumin Trace'
  },
  {
    id: 'rec-5',
    patientId: 'pat-1',
    date: '20 Aug 2026',
    type: 'medication',
    title: 'Medication',
    facility: 'Government PHC Pharmacy',
    description: 'Prescription recorded: Iron & Folic Acid tabs (100 days), Calcium Carbonate 500mg, Labetalol 100mg.',
    outcomeBadge: 'Dispensed'
  },
  {
    id: 'rec-6',
    patientId: 'pat-2',
    date: '07 Sep 2026',
    type: 'appointment',
    title: 'NCD Clinic Visit',
    facility: 'Suchindram PHC',
    description: 'Monthly blood pressure and sugar evaluation. BP 154/96 mmHg.',
    outcomeBadge: 'Referral Issued'
  },
  {
    id: 'rec-7',
    patientId: 'pat-2',
    date: '07 Sep 2026',
    type: 'diagnostic',
    title: '12-Lead ECG',
    facility: 'Suchindram PHC',
    description: 'Sinus rhythm with mild left ventricular strain pattern.',
    outcomeBadge: 'Reviewed'
  }
];

export const mockFollowUps: FollowUpItem[] = [
  {
    id: 'fol-1',
    patientId: 'pat-1',
    patientName: 'Devi S.',
    category: 'maternal',
    dueDate: '03 Sep 2026',
    status: 'overdue',
    condition: 'Gestational Hypertension & 3rd Trimester Blood Pressure Review',
    facility: 'Kanyakumari Government PHC',
    vhnAssigned: 'Sister Anitha R. (VHN)',
    contactPhone: '+91 94432 18920',
    notes: 'Home visit pending. Blood pressure monitoring required within 48 hours.'
  },
  {
    id: 'fol-2',
    patientId: 'pat-3',
    patientName: 'Lakshmi S.',
    category: 'maternal',
    dueDate: '09 Sep 2026',
    status: 'due_today',
    condition: 'Moderate Anemia (Hb 7.8) Follow-up & Iron Supplementation check',
    facility: 'Kottaram Health Sub-Centre',
    vhnAssigned: 'Sister Vimala (CHO)',
    contactPhone: '+91 98421 65432'
  },
  {
    id: 'fol-3',
    patientId: 'pat-2',
    patientName: 'Murugan P.',
    category: 'chronic',
    dueDate: '09 Sep 2026',
    status: 'due_today',
    condition: 'Stage 2 Hypertension BP Audit',
    facility: 'Suchindram Government PHC',
    vhnAssigned: 'Sister Geetha S.',
    contactPhone: '+91 94421 99124'
  },
  {
    id: 'fol-4',
    patientId: 'pat-6',
    patientName: 'Kavitha M. (Baby Aarav)',
    category: 'child',
    dueDate: '10 Sep 2026',
    status: 'upcoming',
    condition: '14th-Week Immunization (Pentavalent-3, IPV-2, Rota-3)',
    facility: 'Kanyakumari Government PHC',
    vhnAssigned: 'Sister Anitha R.',
    contactPhone: '+91 94883 45678'
  },
  {
    id: 'fol-5',
    patientId: 'pat-7',
    patientName: 'Selvam K.',
    category: 'chronic',
    dueDate: '02 Sep 2026',
    status: 'overdue',
    condition: 'Post-MI Medication Adherence & Lipid Panel',
    facility: 'District Govt Hospital Nagercoil',
    vhnAssigned: 'Sister Meenakshi P.',
    contactPhone: '+91 94433 99887'
  },
  {
    id: 'fol-6',
    patientId: 'pat-10',
    patientName: 'Vijay M.',
    category: 'chronic',
    dueDate: '09 Sep 2026',
    status: 'due_today',
    condition: 'Type 2 Diabetes HbA1c screening',
    facility: 'Suchindram Government PHC',
    vhnAssigned: 'Sister Geetha S.',
    contactPhone: '+91 94870 12908'
  },
  {
    id: 'fol-7',
    patientId: 'pat-8',
    patientName: 'Anandhi T.',
    category: 'maternal',
    dueDate: '14 Sep 2026',
    status: 'upcoming',
    condition: 'Pre-conceptional health & Rubella vaccine check',
    facility: 'Kanyakumari Government PHC',
    vhnAssigned: 'Sister Anitha R.',
    contactPhone: '+91 93601 44556'
  },
  {
    id: 'fol-8',
    patientId: 'pat-4',
    patientName: 'Meena V.',
    category: 'maternal',
    dueDate: '15 Sep 2026',
    status: 'upcoming',
    condition: 'High-risk gestational tracking (Care plan established, no prior visits)',
    facility: 'Kanyakumari Government PHC',
    vhnAssigned: 'Sister Anitha R.',
    contactPhone: '+91 97890 12345'
  }
];

export const mockMedicines: MedicineItem[] = [
  {
    id: 'med-1',
    name: 'Paracetamol 500 mg',
    dosage: '500 mg Tablets',
    category: 'Analgesic / Antipyretic',
    availability: 'Available',
    stockCount: 124,
    facility: 'Kanyakumari PHC',
    facilityId: 'fac-1',
    indication: 'Fever and general pain relief'
  },
  {
    id: 'med-2',
    name: 'ORS Packets (WHO Formula)',
    dosage: '20.5 g sachet',
    category: 'Oral Rehydration',
    availability: 'Low Stock',
    stockCount: 18,
    facility: 'Kanyakumari PHC',
    facilityId: 'fac-1',
    indication: 'Acute diarrhea and dehydration management'
  },
  {
    id: 'med-3',
    name: 'Amoxicillin 250 mg',
    dosage: '250 mg Capsules',
    category: 'Antibiotic',
    availability: 'Low Stock',
    stockCount: 22,
    facility: 'Kanyakumari PHC',
    facilityId: 'fac-1',
    indication: 'Respiratory tract infections'
  },
  {
    id: 'med-4',
    name: 'Iron & Folic Acid (IFA)',
    dosage: '100 mg elemental iron + 500 mcg FA',
    category: 'Maternal Nutrition',
    availability: 'Available',
    stockCount: 450,
    facility: 'Kanyakumari PHC',
    facilityId: 'fac-1',
    indication: 'Prevention & treatment of maternal anemia'
  },
  {
    id: 'med-5',
    name: 'Amlodipine 5 mg',
    dosage: '5 mg Tablets',
    category: 'Antihypertensive',
    availability: 'Available',
    stockCount: 210,
    facility: 'Kanyakumari PHC',
    facilityId: 'fac-1',
    indication: 'Essential hypertension'
  },
  {
    id: 'med-6',
    name: 'Metformin 500 mg',
    dosage: '500 mg Tablets',
    category: 'Antidiabetic',
    availability: 'Available',
    stockCount: 190,
    facility: 'Kanyakumari PHC',
    facilityId: 'fac-1',
    indication: 'Type 2 Diabetes Mellitus'
  },
  {
    id: 'med-7',
    name: 'Cetirizine 10 mg',
    dosage: '10 mg Tablets',
    category: 'Antihistamine',
    availability: 'Available',
    stockCount: 140,
    facility: 'Kanyakumari PHC',
    facilityId: 'fac-1',
    indication: 'Allergic rhinitis and urticaria'
  },
  {
    id: 'med-8',
    name: 'Iron Syrup (Paediatric)',
    dosage: '20 mg/mL - 50 mL bottle',
    category: 'Paediatric Nutrition',
    availability: 'Out of Stock',
    stockCount: 0,
    facility: 'Kanyakumari PHC',
    facilityId: 'fac-1',
    indication: 'Infant anemia prevention'
  }
];

export const mockDiagnostics: DiagnosticItem[] = [
  {
    id: 'diag-1',
    name: 'Complete Blood Count (CBC)',
    category: 'Blood Test',
    availability: 'Available',
    nextSlot: 'Today — 3:30 PM',
    facility: 'Kanyakumari PHC Laboratory',
    facilityId: 'fac-1',
    reportTurnaround: 'Same day (2 hours)'
  },
  {
    id: 'diag-2',
    name: 'Obstetric Ultrasound (Growth & Doppler)',
    category: 'Imaging',
    availability: 'Available',
    nextSlot: 'Tomorrow — 10:00 AM',
    facility: 'Agastheeswaram Rural Hospital',
    facilityId: 'fac-2',
    reportTurnaround: 'Immediate during scan'
  },
  {
    id: 'diag-3',
    name: 'Random Blood Sugar (RBS)',
    category: 'Blood Test',
    availability: 'Available',
    nextSlot: 'Available Walk-in',
    facility: 'Kottaram Health Sub-Centre',
    facilityId: 'fac-5',
    reportTurnaround: 'Instant (5 mins)'
  },
  {
    id: 'diag-4',
    name: 'Urine Albumin & Sugar',
    category: 'Urine',
    availability: 'Available',
    nextSlot: 'Today — 11:30 AM',
    facility: 'Kanyakumari PHC',
    facilityId: 'fac-1',
    reportTurnaround: '30 minutes'
  },
  {
    id: 'diag-5',
    name: '12-Lead Electrocardiogram (ECG)',
    category: 'Cardiology',
    availability: 'Available',
    nextSlot: 'Today — 12:00 PM',
    facility: 'Agastheeswaram Rural Hospital',
    facilityId: 'fac-2',
    reportTurnaround: '15 minutes'
  },
  {
    id: 'diag-6',
    name: 'Lipid Profile & Serum Creatinine',
    category: 'Blood Test',
    availability: 'Limited Slots',
    nextSlot: 'Tomorrow — 08:30 AM (Fasting)',
    facility: 'Kanyakumari District Govt Hospital',
    facilityId: 'fac-3',
    reportTurnaround: '24 hours'
  }
];

export const mockSpecialists: TeleconsultSpecialist[] = [
  {
    id: 'doc-1',
    name: 'Dr. Arun Kumar, MD',
    specialty: 'General Medicine',
    qualification: 'MD (Internal Medicine), MMC Chennai',
    status: 'available',
    estimatedWaitMins: 8,
    facility: 'Kanyakumari District Hospital',
    languages: ['English', 'தமிழ்'],
    avatarBg: 'bg-emerald-600'
  },
  {
    id: 'doc-2',
    name: 'Dr. Malathi Sundaram, MS, DGO',
    specialty: 'Obstetrics & Gynaecology',
    qualification: 'MS (OBG), Tirunelveli Medical College',
    status: 'available',
    estimatedWaitMins: 12,
    facility: 'Agastheeswaram Rural Hospital',
    languages: ['தமிழ்', 'English'],
    avatarBg: 'bg-rose-600'
  },
  {
    id: 'doc-3',
    name: 'Dr. Rajesh Kannan, MD (Paed)',
    specialty: 'Paediatrics & Neonatology',
    qualification: 'MD (Paediatrics), Madurai Medical College',
    status: 'busy',
    estimatedWaitMins: 20,
    facility: 'District Headquarters Hospital',
    languages: ['English', 'தமிழ்'],
    avatarBg: 'bg-blue-600'
  },
  {
    id: 'doc-4',
    name: 'Dr. Shalini Mohan, MD',
    specialty: 'Dermatology & Leprosy',
    qualification: 'MD (DVL), Stanley Medical College',
    status: 'available',
    estimatedWaitMins: 15,
    facility: 'District Hospital Telemedicine Wing',
    languages: ['தமிழ்', 'English'],
    avatarBg: 'bg-purple-600'
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Appointment reminder',
    message: 'Your PHC appointment is tomorrow at 10:30 AM with Dr. Priya.',
    time: '2 hours ago',
    type: 'appointment',
    read: false,
    actionTab: 'appointments'
  },
  {
    id: 'notif-2',
    title: 'Referral update',
    message: 'Your referral has been received by Agastheeswaram Rural Hospital.',
    time: '4 hours ago',
    type: 'referral',
    read: false,
    actionTab: 'referrals'
  },
  {
    id: 'notif-3',
    title: 'Follow-up overdue',
    message: 'Your maternal health follow-up was due on 03 Sep. Please schedule a visit.',
    time: 'Yesterday',
    type: 'followup',
    read: false,
    actionTab: 'followup'
  },
  {
    id: 'notif-4',
    title: 'Diagnostic report ready',
    message: 'Your CBC blood count report is now available in your Patient Records.',
    time: '2 days ago',
    type: 'lab',
    read: true,
    actionTab: 'records'
  }
];

export const mockLiveQueue: QueuePatient[] = [
  {
    token: 'A-21',
    patientId: 'pat-1',
    patientName: 'Devi S.',
    service: 'Maternal Care',
    status: 'Waiting',
    arrivalTime: '09:40 AM',
    age: 32,
    gender: 'F'
  },
  {
    token: 'A-22',
    patientId: 'pat-2',
    patientName: 'Murugan P.',
    service: 'General OPD',
    status: 'Waiting',
    arrivalTime: '09:45 AM',
    age: 58,
    gender: 'M'
  },
  {
    token: 'A-23',
    patientId: 'pat-5',
    patientName: 'Rajesh K.',
    service: 'General OPD',
    status: 'In consultation',
    arrivalTime: '09:30 AM',
    age: 42,
    gender: 'M'
  },
  {
    token: 'A-24',
    patientId: 'pat-3',
    patientName: 'Lakshmi S.',
    service: 'Maternal Care',
    status: 'Waiting',
    arrivalTime: '09:50 AM',
    age: 28,
    gender: 'F'
  },
  {
    token: 'A-25',
    patientId: 'pat-8',
    patientName: 'Anandhi T.',
    service: 'General OPD',
    status: 'Waiting',
    arrivalTime: '10:02 AM',
    age: 24,
    gender: 'F'
  }
];

export const mockPatient: Patient = mockPatients[0];
export const mockFollowups: FollowUpItem[] = mockFollowUps;
export const mockHealthWorkerStats: HealthWorkerStats = {
  patientsInArea: '1,240',
  highRiskFollowupsDue: '18',
  activeReferrals: '7',
  medicinesLowStock: '3'
};
