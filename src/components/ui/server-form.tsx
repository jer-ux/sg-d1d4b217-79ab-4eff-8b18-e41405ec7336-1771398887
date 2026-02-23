"use client";

import * as React from "react";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

/**
 * Enhanced form components with React 19 useFormStatus
 * Automatically shows pending state during server actions
 */

interface ServerFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  action: (formData: FormData) => void | Promise<void>;
  children: React.ReactNode;
}

export function ServerForm({ action, children, ...props }: ServerFormProps) {
  return (
    <form action={action} {...props}>
      {children}
    </form>
  );
}

interface SubmitButtonProps extends ButtonProps {
  pendingText?: string;
  children: React.ReactNode;
}

export function SubmitButton({ 
  pendingText = "Submitting...", 
  children, 
  disabled,
  ...props 
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button 
      type="submit" 
      disabled={pending || disabled}
      {...props}
    >
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? pendingText : children}
    </Button>
  );
}

export function FormStatus() {
  const { pending } = useFormStatus();
  
  if (!pending) return null;
  
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" />
      Processing...
    </div>
  );
}