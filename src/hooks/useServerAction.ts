"use client";

import { useActionState, useEffect } from "react";
import type { ActionState } from "@/lib/actions/types";

/**
 * Enhanced useActionState hook with automatic success handling
 * React 19 pattern for server actions
 */
export function useServerAction<T>(
  action: (prevState: ActionState<T> | null, formData: FormData) => Promise<ActionState<T>>,
  onSuccess?: (data: T) => void,
  onError?: (message: string) => void
) {
  const [state, formAction, isPending] = useActionState(action, null);

  useEffect(() => {
    if (state?.success && state.data && onSuccess) {
      onSuccess(state.data);
    }
    if (state?.success === false && state.message && onError) {
      onError(state.message);
    }
  }, [state, onSuccess, onError]);

  return {
    state,
    formAction,
    isPending,
    error: state?.success === false ? state.message : null,
    data: state?.success === true ? state.data : null,
  };
}