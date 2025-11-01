// Common types used throughout the application

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface AdminUser {
  _id?: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'super-admin';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface VisaApplication {
  _id?: string;
  userId: string;
  type: string;
  country: string;
  status: 'pending' | 'approved' | 'rejected' | 'in-review';
  documents: string[];
  submittedAt: Date;
  processedAt?: Date;
  notes?: string;
}

export interface GooglePlace {
  _id?: string;
  placeId: string;
  name: string;
  address: string;
  types: string[];
  rating?: number;
  userRatingsTotal?: number;
  priceLevel?: number;
  photos?: string[];
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  createdAt?: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface DashboardData {
  statistics: {
    totalApplications: number;
    pendingApplications: number;
    approvedApplications: number;
    rejectedApplications: number;
    totalUsers: number;
  };
  recentApplications: VisaApplication[];
  applicationsByStatus: Record<string, number>;
  applicationsByCountry: Record<string, number>;
}
