import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authenticateTools, isToolsAuthenticated } from "@/lib/auth/toolsAuth";
import { SEO } from "@/components/SEO";

export default function ToolsLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redirect if already authenticated
    if (isToolsAuthenticated()) {
      router.push("/intelligence-hub");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const success = authenticateTools(password, email);

      if (success) {
        // Redirect to the originally requested page or intelligence hub
        const returnUrl = (router.query.returnUrl as string) || "/intelligence-hub";
        router.push(returnUrl);
      } else {
        setError("Invalid password. Please try again.");
      }
    } catch (err) {
      setError("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Tools Login - Kincaid Health"
        description="Access Kincaid Health intelligence tools and analytics platform"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shield className="h-12 w-12 text-blue-500" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Kincaid Health</h1>
              <p className="text-gray-400">Intelligence Tools Access</p>
            </Link>
          </div>

          {/* Login Card */}
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Sign In</h2>
              <p className="text-gray-400 text-sm">Access your intelligence tools dashboard</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                    placeholder="your.email@company.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading || !password}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-3 rounded-lg transition-all shadow-lg shadow-blue-500/20"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Help Text */}
            <div className="mt-6 pt-6 border-t border-gray-800">
              <p className="text-center text-sm text-gray-400">
                Need access?{" "}
                <Link href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Contact support
                </Link>
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
              ← Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}