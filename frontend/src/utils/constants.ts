/**
 * Application-wide constants
 */

export const APP_NAME = 'DentBridge';
export const APP_VERSION = '1.0.0';

// API Configuration
export const API_TIMEOUT = 30000; // 30 seconds

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// Date Formats
export const DATE_FORMAT = 'yyyy-MM-dd';
export const DATETIME_FORMAT = 'yyyy-MM-dd HH:mm';
export const DISPLAY_DATE_FORMAT = 'MMM dd, yyyy';
export const DISPLAY_DATETIME_FORMAT = 'MMM dd, yyyy hh:mm a';

// Payment Methods
export const PAYMENT_METHODS = [
  { value: 'CASH', label: 'Cash' },
  { value: 'CARD', label: 'Card' },
  { value: 'INSURANCE', label: 'Insurance' },
  { value: 'BANK_TRANSFER', label: 'Bank Transfer' },
  { value: 'OTHER', label: 'Other' },
] as const;

// Payment Status
export const PAYMENT_STATUS = [
  { value: 'PAID', label: 'Paid', color: 'green' },
  { value: 'PENDING', label: 'Pending', color: 'yellow' },
  { value: 'REFUNDED', label: 'Refunded', color: 'red' },
] as const;

// Appointment Status
export const APPOINTMENT_STATUS = [
  { value: 'SCHEDULED', label: 'Scheduled', color: 'blue' },
  { value: 'CONFIRMED', label: 'Confirmed', color: 'green' },
  { value: 'COMPLETED', label: 'Completed', color: 'gray' },
  { value: 'CANCELLED', label: 'Cancelled', color: 'red' },
  { value: 'NO_SHOW', label: 'No Show', color: 'yellow' },
] as const;

// Gender Options
export const GENDER_OPTIONS = [
  { value: 'MALE', label: 'Male' },
  { value: 'FEMALE', label: 'Female' },
  { value: 'OTHER', label: 'Other' },
] as const;

// Duration Options (in minutes)
export const APPOINTMENT_DURATIONS = [
  { value: 15, label: '15 minutes' },
  { value: 30, label: '30 minutes' },
  { value: 45, label: '45 minutes' },
  { value: 60, label: '1 hour' },
  { value: 90, label: '1.5 hours' },
  { value: 120, label: '2 hours' },
] as const;

// Toast Configuration
export const TOAST_DURATION = 3000; // 3 seconds
export const TOAST_ERROR_DURATION = 5000; // 5 seconds

// File Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
export const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  UNAUTHORIZED: 'Your session has expired. Please log in again.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'An unexpected error occurred. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  CREATED: 'Created successfully',
  UPDATED: 'Updated successfully',
  DELETED: 'Deleted successfully',
  SAVED: 'Saved successfully',
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 6,
  MIN_NAME_LENGTH: 2,
  MIN_PHONE_LENGTH: 10,
  MAX_PHONE_LENGTH: 15,
  MAX_TEXT_LENGTH: 1000,
  MAX_DESCRIPTION_LENGTH: 5000,
} as const;

// Inventory
export const INVENTORY_CATEGORIES = [
  'Instruments',
  'Materials',
  'Equipment',
  'Consumables',
  'Pharmaceuticals',
  'Other',
] as const;

// Treatment Types
export const COMMON_TREATMENTS = [
  'Checkup',
  'Cleaning',
  'Filling',
  'Root Canal',
  'Extraction',
  'Crown',
  'Bridge',
  'Implant',
  'Whitening',
  'Orthodontics',
  'Emergency',
  'Other',
] as const;
