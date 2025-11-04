export interface VisaApplication {
  id?: number;
  userId: number;
  visaType: string;
  country: string;
  status: 'pending' | 'in_progress' | 'approved' | 'rejected' | 'cancelled';
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: Date | string;
    nationality: string;
    passportNumber: string;
    passportExpiry: Date | string;
  };
  travelInfo: {
    purpose: string;
    intendedArrivalDate: Date | string;
    intendedDepartureDate: Date | string;
    accommodation: string;
  };
  documents: {
    passport: string[];
    photos: string[];
    bankStatements: string[];
    employmentLetter?: string[];
    invitationLetter?: string[];
    other: string[];
  };
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
  submittedAt?: Date | null;
  processedAt?: Date | null;
}

export interface VisaType {
  id?: number;
  name: string;
  country: string;
  category: 'travel' | 'schengen';
  requirements: string[];
  processingTime: string;
  validity: string;
  fees: {
    consultation?: number; // Deprecated, not shown in UI
    government: number | string; // Will be displayed as "Visa Fee" - can be a range like "80-180" or a number
    total: number;
  };
  isActive: boolean;
  description?: string | null;
  notes?: string | null;
  embassyInfo?: string | null;
  embassyAppointment?: string | null;
  mainRequirements?: string | null;
  visaTypes?: string[] | null;
  heroImage?: string | null;
  // Arabic fields
  nameAr?: string | null;
  descriptionAr?: string | null;
  notesAr?: string | null;
  embassyInfoAr?: string | null;
  embassyAppointmentAr?: string | null;
  mainRequirementsAr?: string | null;
  requirementsAr?: string[] | null;
  visaTypesAr?: string[] | null;
  processingTimeAr?: string | null;
  validityAr?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface VisaRow {
  id: number;
  name: string;
  country: string;
  category: 'travel' | 'schengen';
  requirements: string;
  processing_time: string;
  validity: string;
  fees: string;
  description: string | null;
  notes: string | null;
  embassy_info?: string | null;
  embassy_appointment?: string | null;
  main_requirements?: string | null;
  visa_types?: string | null;
  hero_image?: string | null;
  // Arabic fields
  name_ar?: string | null;
  description_ar?: string | null;
  notes_ar?: string | null;
  embassy_info_ar?: string | null;
  embassy_appointment_ar?: string | null;
  main_requirements_ar?: string | null;
  requirements_ar?: string | null;
  visa_types_ar?: string | null;
  processing_time_ar?: string | null;
  validity_ar?: string | null;
  is_active: number;
  created_at: Date;
  updated_at: Date;
}