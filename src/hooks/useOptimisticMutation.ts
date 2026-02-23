"use client";

import { useOptimistic, useTransition } from "react";

/**
 * Hook for optimistic updates with server actions
 * React 19 pattern for instant UI feedback
 */
export function useOptimisticMutation<T>(
  initialData: T[],
  mutationFn: (data: FormData) => Promise<void>
) {
  const [isPending, startTransition] = useTransition();
  const [optimisticData, setOptimisticData] = useOptimistic(
    initialData,
    (state: T[], optimisticValue: T) => [...state, optimisticValue]
  );

  async function mutate(optimisticValue: T, formData: FormData) {
    startTransition(async () => {
      setOptimisticData(optimisticValue);
      await mutationFn(formData);
    });
  }

  return {
    data: optimisticData,
    mutate,
    isPending,
  };
}