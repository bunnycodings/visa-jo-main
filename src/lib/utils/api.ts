// API configuration for Next.js internal API
const API_BASE_URL = '/api';

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    // Get token from localStorage on initialization
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  removeToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Authentication methods
  async login(email: string, password: string) {
    const response = await this.request<{
      success: boolean;
      token: string;
      user: {
        id: string;
        email: string;
        name: string;
        role: string;
        permissions: string[];
      };
    }>("/admin/login", {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.success && response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  async logout() {
    // Next.js API currently has no logout endpoint; clear token locally
    this.removeToken();
    return { success: true } as const;
  }

  async getCurrentUser() {
    return this.request<{
      success: boolean;
      user: {
        id: string;
        email: string;
        name: string;
        role: string;
        permissions: string[];
        lastLogin: string;
      };
    }>('/auth/me');
  }

  // Admin dashboard methods
  async getDashboardData() {
    return this.request<{
      totalApplications: number;
      pendingApplications: number;
      approvedApplications: number;
      rejectedApplications: number;
      totalUsers: number;
      recentApplications: any[];
    }>("/admin/dashboard");
  }

  async getApplications(filters?: {
    status?: string;
    country?: string;
    visaType?: string;
    per_page?: number;
  }) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, String(value));
      });
    }
    
    const queryString = params.toString();
    const endpoint = `/admin/applications${queryString ? `?${queryString}` : ''}`;
    
    return this.request<{
      success: boolean;
      data: {
        data: any[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
      };
    }>(endpoint);
  }

  async updateApplicationStatus(id: string, status: string, notes?: string) {
    return this.request<{
      success: boolean;
      message: string;
      data: any;
    }>(`/admin/applications/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, notes }),
    });
  }

  // Google Places methods
  async searchPlaces(query: string, type?: string, location?: string) {
    const params = new URLSearchParams({ query });
    if (type) params.append('type', type);
    if (location) params.append('location', location);
    
    return this.request<{
      success: boolean;
      places: any[];
      total: number;
    }>(`/google-places/search?${params.toString()}`);
  }

  async getCachedPlaces(filters?: {
    type?: string;
    lat?: number;
    lng?: number;
    radius?: number;
    search?: string;
    per_page?: number;
  }) {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, value.toString());
      });
    }
    
    const queryString = params.toString();
    const endpoint = `/google-places/cached${queryString ? `?${queryString}` : ''}`;
    
    return this.request<{
      success: boolean;
      data: {
        data: any[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
      };
    }>(endpoint);
  }

  async getPlaceDetails(placeId: string) {
    return this.request<{
      success: boolean;
      data: any;
    }>(`/google-places/${placeId}`);
  }

  // Health check
  async healthCheck() {
    return this.request<{
      status: string;
      timestamp: string;
      service: string;
    }>('/health');
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export the class for testing or multiple instances
export { ApiClient };
