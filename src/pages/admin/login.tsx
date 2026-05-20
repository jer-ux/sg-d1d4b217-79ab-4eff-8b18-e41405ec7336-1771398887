import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { adminLogin, getAdminSession } from "@/lib/auth/adminAuth";
import { Shield, Loader2, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Redirect if already logged in
    const session = getAdminSession();
    if (session) {
      router.push("/admin/contacts");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await adminLogin(email, password);

      if (!result.success) {
        setError(result.error || "Login failed");
        setIsLoading(false);
        return;
      }

      // Redirect to admin dashboard
      router.push("/admin/contacts");
    } catch (err) {
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login - SiriusB iQ</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="bg-gray-900/50 border-gray-800 p-8">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-purple-500/20 rounded-full p-4">
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-white text-center mb-2">
              Admin Login
            </h1>
            <p className="text-gray-400 text-center mb-8">
              Access the contact management system
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@siriusb-iq.com"
                  required
                  disabled={isLoading}
                  className="bg-gray-900/50 border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  className="bg-gray-900/50 border-gray-700 text-white"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <p className="text-sm text-red-300">{error}</p>
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-6">
              For authorized personnel only
            </p>
          </Card>
        </motion.div>
      </div>
    </>
  );
}