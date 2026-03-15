import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SEO } from "@/components/SEO";
import { SiriusBNav } from "@/components/siriusb/SiriusBNav";
import { SiriusBFooter } from "@/components/siriusb/SiriusBFooter";
import { OrderService } from "@/services/orderService";
import type { Database } from "@/integrations/supabase/types";
import { motion } from "framer-motion";
import {
  ArrowLeft, FileText, Download, Clock, CheckCircle2,
  AlertCircle, Loader2, Calendar, Building2, Briefcase,
  Mail, Phone, Package, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Order = Database["public"]["Tables"]["orders"]["Row"];
type ReportDeliverable = Database["public"]["Tables"]["report_deliverables"]["Row"];

export default function OrderDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<Order | null>(null);
  const [deliverables, setDeliverables] = useState<ReportDeliverable[]>([]);

  useEffect(() => {
    if (id && typeof id === "string") {
      loadOrder(id);
    }
  }, [id]);

  async function loadOrder(orderId: string) {
    const orderData = await OrderService.getOrder(orderId);
    setOrder(orderData);

    if (orderData) {
      const deliverablesData = await OrderService.getReportDeliverables(orderId);
      setDeliverables(deliverablesData);
    }

    setLoading(false);
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(amount);
  }

  function getStatusInfo(status: Order["report_status"]) {
    const statusConfig: Record<string, {color: string, icon: any, label: string, description: string}> = {
      awaiting_contract: {
        color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
        icon: Clock,
        label: "Payment Confirmed",
        description: "Your payment has been received. Please upload your PBM contract to begin analysis."
      },
      processing: {
        color: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        icon: FileText,
        label: "Contract Uploaded",
        description: "We've received your contract and will begin analysis shortly."
      },
      analyzing: {
        color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
        icon: Loader2,
        label: "Analysis In Progress",
        description: "Our team is analyzing your PBM contract. You'll receive your report within 48 hours."
      },
      completed: {
        color: "bg-green-500/20 text-green-300 border-green-500/30",
        icon: CheckCircle2,
        label: "Report Ready",
        description: "Your RX Defense Board Report is ready for download!"
      },
      delivered: {
        color: "bg-green-500/20 text-green-300 border-green-500/30",
        icon: CheckCircle2,
        label: "Delivered",
        description: "Your report has been delivered via email and is available for download below."
      },
      failed: {
        color: "bg-red-500/20 text-red-300 border-red-500/30",
        icon: AlertCircle,
        label: "Issue Detected",
        description: "There was an issue processing your contract. Our team has been notified."
      }
    };

    return statusConfig[status] || statusConfig.awaiting_contract;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <SiriusBNav />
        <div className="container mx-auto px-4 py-20 text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-4">Order Not Found</h1>
          <Button onClick={() => router.push("/profile")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </Button>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(order.report_status);
  const StatusIcon = statusInfo.icon;

  return (
    <>
      <SEO
        title={`Order Details - ${order.id.slice(0, 8)}`}
        description="View your RX Defense Board Report order details and download your report"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <SiriusBNav />
        
        <div className="container mx-auto px-4 py-20 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => router.push("/profile")}
              className="text-blue-200 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Profile
            </Button>

            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Order Details
                  </h1>
                  <p className="text-blue-200 mt-2">Order ID: {order.id.slice(0, 13).toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white mb-2">
                    {formatCurrency(order.amount_paid)}
                  </div>
                  <Badge className={statusInfo.color}>
                    <StatusIcon className="w-3 h-3 mr-2" />
                    {statusInfo.label}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Status Card */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <StatusIcon className={`w-6 h-6 ${order.report_status === "analyzing" ? "animate-spin" : ""}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{statusInfo.label}</h3>
                  <p className="text-blue-200">{statusInfo.description}</p>
                </div>
              </div>
            </Card>

            {/* Order Information */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Order Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-blue-200 mb-1">
                      <Calendar className="w-4 h-4" />
                      Order Date
                    </div>
                    <div className="text-white font-medium">{formatDate(order.created_at)}</div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm text-blue-200 mb-1">
                      <Package className="w-4 h-4" />
                      Product
                    </div>
                    <div className="text-white font-medium">RX Defense IQ Board Report</div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-sm text-blue-200 mb-1">
                      <Mail className="w-4 h-4" />
                      Payment Status
                    </div>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                      {order.payment_status.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.contract_upload_date && (
                    <div>
                      <div className="flex items-center gap-2 text-sm text-blue-200 mb-1">
                        <FileText className="w-4 h-4" />
                        Contract Uploaded
                      </div>
                      <div className="text-white font-medium">{formatDate(order.contract_upload_date)}</div>
                    </div>
                  )}

                  {order.contract_file_name && (
                    <div>
                      <div className="flex items-center gap-2 text-sm text-blue-200 mb-1">
                        <FileText className="w-4 h-4" />
                        Contract File
                      </div>
                      <div className="text-white font-medium">{order.contract_file_name}</div>
                    </div>
                  )}

                  {order.report_generated_date && (
                    <div>
                      <div className="flex items-center gap-2 text-sm text-blue-200 mb-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Report Delivered
                      </div>
                      <div className="text-white font-medium">{formatDate(order.report_generated_date)}</div>
                    </div>
                  )}
                </div>
              </div>

              <Separator className="my-6 bg-white/10" />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Customer Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
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
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-200">Email:</span>
                    <span className="text-white font-medium">{order.customer_email}</span>
                  </div>
                  {order.customer_phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-200">Phone:</span>
                      <span className="text-white font-medium">{order.customer_phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Report Deliverables */}
            {deliverables.length > 0 && (
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Report Deliverables</h2>
                <div className="space-y-4">
                  {deliverables.map((deliverable) => (
                    <div
                      key={deliverable.id}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-400" />
                        <div>
                          <div className="text-white font-medium">{deliverable.deliverable_name}</div>
                          <div className="text-sm text-blue-200">
                            {deliverable.deliverable_type.replace(/_/g, " ").toUpperCase()}
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                        onClick={() => window.open(deliverable.file_url, "_blank")}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Download Report Button (if ready) */}
            {(order.report_status === "completed" || order.report_status === "delivered") && order.report_url && (
              <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30 backdrop-blur-xl p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Your Report is Ready!</h3>
                      <p className="text-green-200">Download your comprehensive RX Defense Board Report</p>
                    </div>
                  </div>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    onClick={() => window.open(order.report_url!, "_blank")}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Report
                  </Button>
                </div>
              </Card>
            )}

            <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                Report Status
              </h2>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    order.report_status === 'awaiting_contract' ? 'bg-yellow-500/20 border-2 border-yellow-500' : 'bg-green-500/20 border-2 border-green-500'
                  }`}>
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold">Contract Upload</div>
                    <div className="text-sm text-blue-200">
                      {order.contract_file_url ? 'Contract received' : 'Awaiting contract upload'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    ['analyzing', 'completed', 'delivered'].includes(order.report_status) ? 'bg-green-500/20 border-2 border-green-500' : 'bg-slate-500/20 border-2 border-slate-500'
                  }`}>
                    <Loader2 className={`w-5 h-5 text-white ${order.report_status === 'analyzing' ? 'animate-spin' : ''}`} />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold">AI Analysis</div>
                    <div className="text-sm text-blue-200">
                      {order.report_status === 'analyzing' ? 'Analysis in progress (instant)' : 
                       ['completed', 'delivered'].includes(order.report_status) ? 'Analysis complete' : 'Pending contract upload'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    ['completed', 'delivered'].includes(order.report_status) ? 'bg-green-500/20 border-2 border-green-500' : 'bg-slate-500/20 border-2 border-slate-500'
                  }`}>
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold">Report Delivery</div>
                    <div className="text-sm text-blue-200">
                      {order.report_status === 'delivered' ? 'Report delivered via email' :
                       order.report_status === 'completed' ? 'Ready for download' : 'Pending analysis'}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Support */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl p-6 text-center">
              <p className="text-blue-200">
                Questions about your order?{" "}
                <a href="mailto:support@siriusb.ai" className="text-blue-400 hover:text-blue-300 underline">
                  Contact Support
                </a>
              </p>
            </Card>
          </motion.div>
        </div>

        <SiriusBFooter />
      </div>
    </>
  );
}