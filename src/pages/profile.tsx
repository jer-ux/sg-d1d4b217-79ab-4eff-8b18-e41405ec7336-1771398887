import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SEO } from "@/components/SEO";
import { SiriusBNav } from "@/components/siriusb/SiriusBNav";
import { SiriusBFooter } from "@/components/siriusb/SiriusBFooter";
import { supabase } from "@/integrations/supabase/client";
import { OrderService } from "@/services/orderService";
import type { Database } from "@/integrations/supabase/types";
import { motion } from "framer-motion";
import { 
  User, Mail, Building2, Briefcase, Phone, Calendar,
  FileText, Download, Clock, CheckCircle2, AlertCircle,
  Loader2, ExternalLink, Shield, ChevronRight, Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

type Order = Database["public"]["Tables"]["orders"]["Row"];
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      router.push("/");
      return;
    }

    setUser(user);
    await loadProfile(user.id);
    await loadOrders();
    setLoading(false);
  }

  async function loadProfile(userId: string) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    setProfile(data);
  }

  async function loadOrders() {
    const userOrders = await OrderService.getUserOrders();
    setOrders(userOrders);
  }

  function getStatusBadge(status: Order["report_status"]) {
    const statusConfig: Record<string, {color: string, icon: any, label: string}> = {
      awaiting_contract: { color: "bg-blue-500/20 text-blue-300 border-blue-500/30", icon: Clock, label: "Payment Confirmed" },
      processing: { color: "bg-purple-500/20 text-purple-300 border-purple-500/30", icon: FileText, label: "Contract Uploaded" },
      analyzing: { color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30", icon: Loader2, label: "Analysis In Progress" },
      completed: { color: "bg-green-500/20 text-green-300 border-green-500/30", icon: CheckCircle2, label: "Report Ready" },
      delivered: { color: "bg-green-500/20 text-green-300 border-green-500/30", icon: CheckCircle2, label: "Delivered" },
      failed: { color: "bg-red-500/20 text-red-300 border-red-500/30", icon: AlertCircle, label: "Issue Detected" }
    };

    const config = statusConfig[status] || statusConfig.awaiting_contract;
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} flex items-center gap-2`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(amount);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <SEO
        title="My Profile - Kincaid IQ"
        description="Manage your account and view your RX Defense Board Report order history"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <SiriusBNav />
        
        <div className="container mx-auto px-4 py-20 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                My Account
              </h1>
              <p className="text-blue-200 text-lg">
                Manage your profile and track your RX Defense Board Reports
              </p>
            </div>

            <Tabs defaultValue="orders" className="space-y-8">
              <TabsList className="bg-white/5 border border-white/10">
                <TabsTrigger value="orders" className="data-[state=active]:bg-blue-500/20">
                  <Package className="w-4 h-4 mr-2" />
                  Order History
                </TabsTrigger>
                <TabsTrigger value="profile" className="data-[state=active]:bg-blue-500/20">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </TabsTrigger>
              </TabsList>

              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-6">
                {orders.length === 0 ? (
                  <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-12 text-center">
                    <Package className="w-16 h-16 text-blue-400/30 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No Orders Yet</h3>
                    <p className="text-blue-200 mb-6">
                      You haven't purchased any RX Defense Board Reports yet.
                    </p>
                    <Button
                      onClick={() => router.push("/")}
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Get Your Board Report
                    </Button>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card
                        key={order.id}
                        className="bg-white/5 border-white/10 backdrop-blur-xl p-6 hover:bg-white/10 transition-all cursor-pointer"
                        onClick={() => router.push(`/orders/${order.id}`)}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-blue-400" />
                              <h3 className="text-lg font-semibold text-white">
                                RX Defense Board Report
                              </h3>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-blue-200">
                              <Calendar className="w-4 h-4" />
                              Ordered {formatDate(order.created_at)}
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <div className="text-2xl font-bold text-white">
                              {formatCurrency(order.amount_paid)}
                            </div>
                            {getStatusBadge(order.report_status)}
                          </div>
                        </div>

                        <Separator className="my-4 bg-white/10" />

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Building2 className="w-4 h-4 text-blue-400" />
                              <span className="text-blue-200">Company:</span>
                              <span className="text-white font-medium">{order.customer_company || "N/A"}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Briefcase className="w-4 h-4 text-blue-400" />
                              <span className="text-blue-200">Role:</span>
                              <span className="text-white font-medium">{order.customer_job_title || "N/A"}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            {order.contract_file_name && (
                              <div className="flex items-center gap-2 text-sm">
                                <FileText className="w-4 h-4 text-green-400" />
                                <span className="text-green-200">Contract: {order.contract_file_name}</span>
                              </div>
                            )}
                            {order.report_generated_date && (
                              <div className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                                <span className="text-green-200">
                                  Delivered {formatDate(order.report_generated_date)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {order.report_status === "completed" || order.report_status === "delivered" ? (
                          <div className="mt-4 pt-4 border-t border-white/10">
                            <Button
                              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle download
                              }}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download Report
                            </Button>
                          </div>
                        ) : (
                          <div className="mt-4 flex items-center justify-end gap-2 text-sm text-blue-200">
                            <span>View Details</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Account Information</h2>
                  
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-blue-200">
                          <User className="w-4 h-4" />
                          <span>Full Name</span>
                        </div>
                        <div className="text-white font-medium">
                          {profile?.full_name || "Not set"}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-blue-200">
                          <Mail className="w-4 h-4" />
                          <span>Email</span>
                        </div>
                        <div className="text-white font-medium">
                          {user?.email}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-blue-200">
                          <Calendar className="w-4 h-4" />
                          <span>Member Since</span>
                        </div>
                        <div className="text-white font-medium">
                          {formatDate(profile?.created_at || user?.created_at)}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-blue-200">
                          <Shield className="w-4 h-4" />
                          <span>Account Status</span>
                        </div>
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                          Active
                        </Badge>
                      </div>
                    </div>

                    <Separator className="bg-white/10" />

                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                        onClick={() => supabase.auth.signOut().then(() => router.push("/"))}
                      >
                        Sign Out
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Stats Card */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/30 backdrop-blur-xl p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Package className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-white">{orders.length}</div>
                        <div className="text-sm text-blue-200">Total Orders</div>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/30 backdrop-blur-xl p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-white">
                          {orders.filter(o => o.report_status === "delivered" || o.report_status === "completed").length}
                        </div>
                        <div className="text-sm text-green-200">Delivered</div>
                      </div>
                    </div>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/30 backdrop-blur-xl p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-white">
                          {orders.filter(o => o.report_status === "analyzing" || o.report_status === "processing").length}
                        </div>
                        <div className="text-sm text-purple-200">In Progress</div>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        <SiriusBFooter />
      </div>
    </>
  );
}