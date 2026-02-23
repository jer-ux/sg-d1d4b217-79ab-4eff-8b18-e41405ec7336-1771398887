/**
 * Shared types for Server Actions
 * React 19 useActionState pattern
 */

export type ActionState<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
};

export type FormState<T = unknown> = ActionState<T> & {
  timestamp?: number;
};

/**
 * Helper to create action result
 */
export function createActionResult<T>(
  success: boolean,
  options?: {
    message?: string;
    data?: T;
    errors?: Record<string, string[]>;
  }
): ActionState<T> {
  return {
    success,
    message: options?.message,
    data: options?.data,
    errors: options?.errors,
  };
}

/**
 * Helper to create form state
 */
export function createFormState<T>(
  success: boolean,
  options?: {
    message?: string;
    data?: T;
    errors?: Record<string, string[]>;
  }
): FormState<T> {
  return {
    success,
    message: options?.message,
    data: options?.data,
    errors: options?.errors,
    timestamp: Date.now(),
  };
}