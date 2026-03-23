import { useState } from "react";
import Head from "next/head";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Calculator, TrendingDown, Users, DollarSign, CheckCircle2, Gift, Zap } from "lucide-react";

export default function VolumeCalculatorPage() {
  const [seats, setSeats] = useState([50]);
  const [contracts, setContracts] = useState([100]);
  const [term, setTerm] = useState<"monthly" | "annual">("annual");

  // Pricing tiers
  const basePricePerSeat = 190; // $190/seat/month
  const baseContractPrice = 25; // $25 per contract

  // Volume discounts
  const getSeatDiscount = (numSeats: number) => {
    if (numSeats >= 500) return 0.40; // 40% off
    if (numSeats >= 250) return 0.35; // 35% off
    if (numSeats >= 100) return 0.30; // 30% off
    if (numSeats >= 50) return 0.20; // 20% off
    if (numSeats >= 25) return 0.15; // 15% off
    if (numSeats >= 10) return 0.10; // 10% off
    return 0;
  };

  const getContractDiscount = (numContracts: number) => {
    if (numContracts >= 1000) return 0.50; // 50% off
    if (numContracts >= 500) return 0.40; // 40% off
    if (numContracts >= 250) return 0.30; // 30% off
    if (numContracts >= 100) return 0.20; // 20% off
    if (numContracts >= 50) return 0.10; // 10% off
    return 0;
  };

  const seatDiscount = getSeatDiscount(seats[0]);
  const contractDiscount = getContractDiscount(contracts[0]);

  const monthlySeatCost = seats[0] * basePricePerSeat * (1 - seatDiscount);
  const monthlyContractCost = contracts[0] * baseContractPrice * (1 - contractDiscount);
  const monthlyTotal = monthlySeatCost + monthlyContractCost;

  const annualTotal = monthlyTotal * 12;
  const annualDiscount = term === "annual" ? 0.20 : 0; // Additional 20% off for annual prepay
  const finalAnnualTotal = annualTotal * (1 - annualDiscount);
  const finalMonthlyTotal = term === "annual" ? finalAnnualTotal / 12 : monthlyTotal;

  const totalSavings = (seats[0] * basePricePerSeat * 12 + contracts[0] * baseContractPrice * 12) - finalAnnualTotal;

  const volumeTiers = [
    { seats: "1-9", discount: "Standard Pricing", badge: "Starter" },
    { seats: "10-24", discount: "10% off", badge: "Growth" },
    { seats: "25-49", discount: "15% off", badge: "Business" },
    { seats: "50-99", discount: "20% off", badge: "Professional" },
    { seats: "100-249", discount: "30% off", badge: "Enterprise" },
    { seats: "250-499", discount: "35% off", badge: "Enterprise Plus" },
    { seats: "500+", discount: "40% off", badge: "Strategic" }
  ];

  const bundleDeals = [
    {
      name: "Startup Bundle",
      seats: 10,
      contracts: 50,
      price: "$15K/year",
      savings: "$6K",
      features: ["10 user seats", "50 contracts/month", "Standard support", "Basic analytics"]
    },
    {
      name: "Growth Bundle",
      seats: 25,
      contracts: 100,
      price: "$35K/year",
      savings: "$15K",
      features: ["25 user seats", "100 contracts/month", "Priority support", "Advanced analytics", "API access"],
      popular: true
    },
    {
      name: "Enterprise Bundle",
      seats: 100,
      contracts: 500,
      price: "$120K/year",
      savings: "$80K",
      features: ["100 user seats", "500 contracts/month", "Dedicated CSM", "Custom integrations", "SLA guarantee", "Onboarding included"]
    },
    {
      name: "Strategic Bundle",
      seats: 500,
      contracts: 2000,
      price: "$400K/year",
      savings: "$500K",
      features: ["500 user seats", "2000 contracts/month", "Executive sponsor", "White-label options", "Custom AI training", "Revenue share programs"]
    }
  ];

  return (
    <>
      <Head>
        <title>Volume Discount Calculator - Enterprise Pricing | SiriusB iQ</title>
        <meta name="description" content="Calculate your enterprise volume discounts and savings" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-slate-100">
        <SiteHeader />

        <main className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="h-8 w-8 text-green-600" />
              <h1 className="text-4xl font-bold">Volume Discount Calculator</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              See your potential savings with enterprise volume pricing
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calculator Panel */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configure Your Plan</CardTitle>
                  <CardDescription>Adjust sliders to see real-time pricing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Seats Slider */}
                  <div>
                    <div className="flex justify-between mb-4">
                      <label className="font-semibold flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Number of Users
                      </label>
                      <span className="text-2xl font-bold text-blue-600">{seats[0]} seats</span>
                    </div>
                    <Slider
                      value={seats}
                      onValueChange={setSeats}
                      min={1}
                      max={1000}
                      step={1}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>1 seat</span>
                      <span>1,000 seats</span>
                    </div>
                    {seatDiscount > 0 && (
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm font-semibold text-green-800">
                          🎉 Volume discount applied: {(seatDiscount * 100).toFixed(0)}% off seat pricing
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Contracts Slider */}
                  <div>
                    <div className="flex justify-between mb-4">
                      <label className="font-semibold flex items-center gap-2">
                        <DollarSign className="h-4 w-4" />
                        Contracts per Month
                      </label>
                      <span className="text-2xl font-bold text-purple-600">{contracts[0]} contracts</span>
                    </div>
                    <Slider
                      value={contracts}
                      onValueChange={setContracts}
                      min={10}
                      max={2000}
                      step={10}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>10 contracts</span>
                      <span>2,000 contracts</span>
                    </div>
                    {contractDiscount > 0 && (
                      <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                        <p className="text-sm font-semibold text-purple-800">
                          🎉 Volume discount applied: {(contractDiscount * 100).toFixed(0)}% off contract pricing
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Billing Term Toggle */}
                  <div>
                    <label className="font-semibold mb-3 block">Billing Term</label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant={term === "monthly" ? "default" : "outline"}
                        onClick={() => setTerm("monthly")}
                        className="h-auto py-4"
                      >
                        <div className="text-center">
                          <p className="font-bold">Monthly</p>
                          <p className="text-xs text-muted-foreground">Pay as you go</p>
                        </div>
                      </Button>
                      <Button
                        variant={term === "annual" ? "default" : "outline"}
                        onClick={() => setTerm("annual")}
                        className="h-auto py-4"
                      >
                        <div className="text-center">
                          <p className="font-bold">Annual Prepay</p>
                          <p className="text-xs text-green-600 font-semibold">Save 20%</p>
                        </div>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Pricing Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between p-3 bg-slate-50 rounded">
                    <span>Base seat cost ({seats[0]} × ${basePricePerSeat})</span>
                    <span className="font-semibold">${(seats[0] * basePricePerSeat).toLocaleString()}/month</span>
                  </div>
                  {seatDiscount > 0 && (
                    <div className="flex justify-between p-3 bg-green-50 rounded text-green-700">
                      <span>Seat volume discount (-{(seatDiscount * 100).toFixed(0)}%)</span>
                      <span className="font-semibold">-${(seats[0] * basePricePerSeat * seatDiscount).toLocaleString()}/month</span>
                    </div>
                  )}

                  <div className="flex justify-between p-3 bg-slate-50 rounded">
                    <span>Base contract cost ({contracts[0]} × ${baseContractPrice})</span>
                    <span className="font-semibold">${(contracts[0] * baseContractPrice).toLocaleString()}/month</span>
                  </div>
                  {contractDiscount > 0 && (
                    <div className="flex justify-between p-3 bg-purple-50 rounded text-purple-700">
                      <span>Contract volume discount (-{(contractDiscount * 100).toFixed(0)}%)</span>
                      <span className="font-semibold">-${(contracts[0] * baseContractPrice * contractDiscount).toLocaleString()}/month</span>
                    </div>
                  )}

                  {term === "annual" && (
                    <div className="flex justify-between p-3 bg-blue-50 rounded text-blue-700">
                      <span>Annual prepay discount (-20%)</span>
                      <span className="font-semibold">-${(annualTotal * 0.20).toLocaleString()}/year</span>
                    </div>
                  )}

                  <div className="flex justify-between p-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg">
                    <span className="font-bold text-lg">Your Price</span>
                    <span className="font-bold text-2xl">
                      ${finalMonthlyTotal.toLocaleString()}/month
                    </span>
                  </div>

                  {term === "annual" && (
                    <div className="text-center p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">
                        <TrendingDown className="inline h-4 w-4 mr-1" />
                        <strong>Total annual savings: ${totalSavings.toLocaleString()}</strong> compared to monthly billing at list price
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Summary & CTA Panel */}
            <div className="space-y-6">
              <Card className="border-2 border-green-300 bg-gradient-to-br from-green-50 to-blue-50">
                <CardHeader>
                  <CardTitle className="text-2xl">Your Custom Quote</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                    <p className="text-sm text-muted-foreground mb-2">Your Price</p>
                    <p className="text-5xl font-bold text-green-600 mb-2">
                      ${finalMonthlyTotal.toLocaleString()}
                    </p>
                    <p className="text-muted-foreground">/month</p>
                    {term === "annual" && (
                      <p className="text-sm text-green-600 font-semibold mt-2">
                        (${finalAnnualTotal.toLocaleString()}/year prepaid)
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>{seats[0]} user seats included</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>{contracts[0]} contracts/month analyzed</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span>{(seatDiscount * 100).toFixed(0)}% volume discount applied</span>
                    </div>
                    {term === "annual" && (
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span>20% annual prepay discount</span>
                      </div>
                    )}
                  </div>

                  <Button className="w-full" size="lg">
                    <Zap className="mr-2 h-4 w-4" />
                    Get This Deal
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Talk to sales for custom enterprise agreements
                  </p>
                </CardContent>
              </Card>

              {/* Volume Discount Tiers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-green-600" />
                    Volume Discount Tiers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {volumeTiers.map((tier, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-3 rounded ${
                          seats[0] >= parseInt(tier.seats.split("-")[0]) &&
                          (tier.seats.includes("+") || seats[0] <= parseInt(tier.seats.split("-")[1] || "9999"))
                            ? "bg-green-100 border-2 border-green-300"
                            : "bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{tier.badge}</Badge>
                          <span className="text-sm font-medium">{tier.seats} seats</span>
                        </div>
                        <span className="text-sm font-semibold text-green-600">{tier.discount}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Pre-Built Bundles */}
          <div className="mt-12">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">Pre-Built Bundles</h2>
              <p className="text-muted-foreground">Popular configurations with maximum savings</p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {bundleDeals.map((bundle, idx) => (
                <Card key={idx} className={bundle.popular ? "border-2 border-blue-500 relative" : ""}>
                  {bundle.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600">MOST POPULAR</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">{bundle.name}</CardTitle>
                    <div className="mt-4">
                      <p className="text-3xl font-bold">{bundle.price}</p>
                      <p className="text-sm text-green-600 font-semibold mt-1">Save {bundle.savings}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {bundle.features.map((feature, fidx) => (
                        <div key={fidx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full" variant={bundle.popular ? "default" : "outline"}>
                      <Gift className="mr-2 h-4 w-4" />
                      Get Bundle
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}