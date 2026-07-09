import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isToolsAuthenticated } from "@/lib/auth/toolsAuth";
import { Loader2 } from "lucide-react";

interface ProtectedToolsRouteProps {
  children: React.ReactNode;
}

export function ProtectedToolsRoute({ children }: ProtectedToolsRouteProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (!isToolsAuthenticated()) {
        // Redirect to login with return URL
        router.push(`/tools/login?returnUrl=${encodeURIComponent(router.asPath)}`);
      } else {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Verifying access...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}