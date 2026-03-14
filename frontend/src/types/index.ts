export interface User {
  id: number;
  email: string;
  fullName: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  id: number;
  email: string;
  fullName: string;
  role: string;
}

export interface Patient {
  id: number;
  name: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  email?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  medicalHistory?: string;
  allergies?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: number;
  patientId: number;
  patientName: string;
  appointmentDateTime: string;
  durationMinutes: number;
  status: 'SCHEDULED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  treatmentType?: string;
  notes?: string;
  googleCalendarEventId?: string;
  createdBy: number;
  createdByName: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: number;
  patientId: number;
  patientName: string;
  appointmentId?: number;
  amount: number;
  paymentDate: string;
  paymentMethod: 'CASH' | 'CARD' | 'INSURANCE' | 'BANK_TRANSFER' | 'OTHER';
  status: 'PAID' | 'PENDING' | 'REFUNDED';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryItem {
  id: number;
  itemName: string;
  category?: string;
  description?: string;
  quantity: number;
  unitPrice?: number;
  unitOfMeasure?: string;
  reorderLevel?: number;
  supplier?: string;
  isLowStock: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Treatment {
  id: number;
  patientId: number;
  patientName: string;
  appointmentId?: number;
  treatmentName: string;
  description?: string;
  cost?: number;
  treatmentDate: string;
  performedBy: number;
  performedByName: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentStats {
  totalPaid: number;
  totalPending: number;
  totalPayments: number;
}

export interface DashboardStats {
  totalPatients: number;
  appointmentsToday: number;
  pendingPayments: number;
  lowStockItems: number;
}

export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  validationErrors?: Record<string, string>;
}
