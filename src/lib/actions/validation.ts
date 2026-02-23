/**
 * Server-side validation utilities
 * Replaces client-side Zod schemas for form validation
 */

type ValidationError = {
  field: string;
  message: string;
};

type ValidationResult = {
  valid: boolean;
  errors: Record<string, string[]>;
};

/**
 * Validate form data with custom rules
 */
export function validateFormData(
  data: FormData | Record<string, unknown>,
  rules: Record<string, ValidationRule[]>
): ValidationResult {
  const errors: Record<string, string[]> = {};
  const formObj = data instanceof FormData ? Object.fromEntries(data) : data;

  for (const [field, fieldRules] of Object.entries(rules)) {
    const value = formObj[field];
    const fieldErrors: string[] = [];

    for (const rule of fieldRules) {
      const error = rule(value, field);
      if (error) {
        fieldErrors.push(error);
      }
    }

    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validation rule type
 */
export type ValidationRule = (value: unknown, field: string) => string | null;

/**
 * Common validation rules
 */
export const rules = {
  required: (message?: string): ValidationRule => (value, field) => {
    if (value === null || value === undefined || value === "") {
      return message || `${field} is required`;
    }
    return null;
  },

  email: (message?: string): ValidationRule => (value, field) => {
    if (typeof value !== "string") return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return message || `${field} must be a valid email`;
    }
    return null;
  },

  minLength: (min: number, message?: string): ValidationRule => (value, field) => {
    if (typeof value !== "string") return null;
    if (value.length < min) {
      return message || `${field} must be at least ${min} characters`;
    }
    return null;
  },

  maxLength: (max: number, message?: string): ValidationRule => (value, field) => {
    if (typeof value !== "string") return null;
    if (value.length > max) {
      return message || `${field} must be at most ${max} characters`;
    }
    return null;
  },

  pattern: (regex: RegExp, message: string): ValidationRule => (value, field) => {
    if (typeof value !== "string") return null;
    if (!regex.test(value)) {
      return message;
    }
    return null;
  },

  number: (message?: string): ValidationRule => (value, field) => {
    if (typeof value === "number") return null;
    if (typeof value === "string" && !isNaN(Number(value))) return null;
    return message || `${field} must be a number`;
  },

  min: (min: number, message?: string): ValidationRule => (value, field) => {
    const num = typeof value === "string" ? Number(value) : value;
    if (typeof num !== "number" || isNaN(num)) return null;
    if (num < min) {
      return message || `${field} must be at least ${min}`;
    }
    return null;
  },

  max: (max: number, message?: string): ValidationRule => (value, field) => {
    const num = typeof value === "string" ? Number(value) : value;
    if (typeof num !== "number" || isNaN(num)) return null;
    if (num > max) {
      return message || `${field} must be at most ${max}`;
    }
    return null;
  },

  oneOf: (values: unknown[], message?: string): ValidationRule => (value, field) => {
    if (!values.includes(value)) {
      return message || `${field} must be one of: ${values.join(", ")}`;
    }
    return null;
  },

  custom: (fn: (value: unknown) => boolean, message: string): ValidationRule => (value) => {
    if (!fn(value)) {
      return message;
    }
    return null;
  },
};