/**
 * Shared types for Server Actions
 * React 19 useActionState pattern
 */

export type ActionState<T> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
  timestamp?: number;
};

export function successAction<T>(message: string, options?: { data?: T }): ActionState<T> {
  return {
    success: true,
    message,
    data: options?.data,
    timestamp: Date.now(),
  };
}

export function errorAction<T>(message: string, options?: { errors?: Record<string, string[]> }): ActionState<T> {
  return {
    success: false,
    message,
    errors: options?.errors,
    timestamp: Date.now(),
  };
}