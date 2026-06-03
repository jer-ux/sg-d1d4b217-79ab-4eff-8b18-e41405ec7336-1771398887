import { useState } from "react";
import { Calendar, Users, CheckCircle2, Clock, Video, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ExpertConsultationSchedulerProps {
  solutionArea?: string;
  variant?: "compact" | "full";
}

export function ExpertConsultationScheduler({ 
  solutionArea = "General",
  variant = "full" 
}: ExpertConsultationSchedulerProps) {
  const [selectedType, setSelectedType] = useState<"strategy" | "technical" | "implementation">("strategy");

  const consultationTypes = [
    {
      id: "strategy" as const,
      title: "Strategy Session",
      duration: "60 minutes",
      description: "Executive-level discussion with FSA/MAAA actuaries on strategic planning and risk management",
      icon: Users,
      url: "https://calendly.com/jer-kincaidrmc/60min",
    },
    {
      id: "technical" as const,
      title: "Technical Deep Dive",
      duration: "90 minutes",
      description: "In-depth technical review with ASA/FCA consultants on implementation and analytics",
      icon: MessageSquare,
      url: "https://calendly.com/jer-kincaidrmc/90min",
    },
    {
      id: "implementation" as const,
      title: "Implementation Planning",
      duration: "45 minutes",
      description: "Practical roadmap session with CEBS/RHU specialists for deployment planning",
      icon: CheckCircle2,
      url: "https://calendly.com/jer-kincaidrmc/30min",
    },
  ];

  const selectedConsultation = consultationTypes.find(t => t.id === selectedType);
  const Icon = selectedConsultation?.icon || Calendar;

  const handleBooking = () => {
    if (selectedConsultation && typeof window !== "undefined") {
      window.open(selectedConsultation.url, "_blank", "noopener,noreferrer");
    }
  };

  if (variant === "compact") {
    return (
      <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/30">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-purple-500/20">
            <Calendar className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-grow">
            <h3 className="text-xl font-bold mb-2">Book Expert Consultation</h3>
            <p className="text-gray-400 text-sm mb-4">
              Discuss {solutionArea} strategies with our FSA/MAAA actuaries and consultants
            </p>
            <Button 
              onClick={handleBooking}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Schedule Now
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-purple-500/20">
          <Calendar className="w-8 h-8 text-purple-400" />
        </div>
        <div>
          <h3 className="text-2xl font-bold">Schedule Expert Consultation</h3>
          <p className="text-gray-400">Connect with qualified actuaries and consultants</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {consultationTypes.map((type) => {
          const TypeIcon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`p-6 rounded-xl text-left transition-all ${
                selectedType === type.id
                  ? "bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-2 border-purple-500"
                  : "bg-gray-800/50 border border-gray-700 hover:border-gray-600"
              }`}
            >
              <TypeIcon className={`w-6 h-6 mb-3 ${selectedType === type.id ? "text-purple-400" : "text-gray-400"}`} />
              <h4 className="font-bold mb-1">{type.title}</h4>
              <p className="text-sm text-gray-400 mb-2">{type.duration}</p>
              <p className="text-xs text-gray-500">{type.description}</p>
            </button>
          );
        })}
      </div>

      {selectedConsultation && (
        <div className="p-6 rounded-xl bg-black/50 border border-gray-800 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-purple-500/20">
              <Icon className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex-grow">
              <h4 className="text-xl font-bold mb-2">{selectedConsultation.title}</h4>
              <p className="text-gray-400 mb-4">{selectedConsultation.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {selectedConsultation.duration}
                </div>
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Video Conference
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Option Available
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-800">
              <h5 className="font-semibold mb-2 text-purple-400">What to Expect</h5>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>• Personalized {solutionArea} analysis</li>
                <li>• Industry benchmarking insights</li>
                <li>• Actionable recommendations</li>
                <li>• Q&A with credentialed experts</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-800">
              <h5 className="font-semibold mb-2 text-blue-400">Expert Credentials</h5>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>• FSA, MAAA Actuaries</li>
                <li>• ASA, FCA Consultants</li>
                <li>• CEBS, RHU Specialists</li>
                <li>• 15+ years average experience</li>
              </ul>
            </div>
          </div>

          <Button 
            onClick={handleBooking}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-6"
          >
            Book {selectedConsultation.title}
          </Button>
        </div>
      )}

      <p className="text-center text-sm text-gray-500">
        All consultations are complimentary for qualified prospects
      </p>
    </div>
  );
}