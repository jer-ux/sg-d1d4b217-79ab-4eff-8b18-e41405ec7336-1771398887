import { useState } from "react";
import { MapPin, Users, Award, TrendingUp, Building2, CheckCircle2, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Partner {
  id: string;
  name: string;
  type: "actuarial" | "consulting" | "technology" | "clinical";
  location: string;
  specialties: string[];
  credentials: string[];
  engagements: number;
  region: "northeast" | "southeast" | "midwest" | "west" | "international";
}

export function InteractivePartnershipMap() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const partners: Partner[] = [
    {
      id: "p1",
      name: "Northeast Actuarial Group",
      type: "actuarial",
      location: "New York, NY",
      specialties: ["Stop-Loss", "Medicare Advantage", "ACA Compliance"],
      credentials: ["FSA", "MAAA", "EA"],
      engagements: 127,
      region: "northeast",
    },
    {
      id: "p2",
      name: "Midwest Benefits Consultants",
      type: "consulting",
      location: "Chicago, IL",
      specialties: ["Self-Funding", "Wellness Programs", "ERISA Compliance"],
      credentials: ["CEBS", "RHU", "REBC"],
      engagements: 94,
      region: "midwest",
    },
    {
      id: "p3",
      name: "West Coast Analytics Partners",
      type: "technology",
      location: "San Francisco, CA",
      specialties: ["Claims Analytics", "Predictive Modeling", "AI/ML"],
      credentials: ["ASA", "Data Science Certified"],
      engagements: 68,
      region: "west",
    },
    {
      id: "p4",
      name: "Southeast Clinical Solutions",
      type: "clinical",
      location: "Atlanta, GA",
      specialties: ["Utilization Management", "Clinical Pathways", "Quality Metrics"],
      credentials: ["MD", "MBA", "FACPE"],
      engagements: 82,
      region: "southeast",
    },
    {
      id: "p5",
      name: "Global Actuarial Network",
      type: "actuarial",
      location: "London, UK",
      specialties: ["International Benefits", "Reinsurance", "Risk Transfer"],
      credentials: ["FIA", "CERA", "FSA"],
      engagements: 156,
      region: "international",
    },
    {
      id: "p6",
      name: "Pacific Northwest Consulting",
      type: "consulting",
      location: "Seattle, WA",
      specialties: ["Technology Integration", "Change Management", "ROI Analysis"],
      credentials: ["CEBS", "PMP", "Six Sigma Black Belt"],
      engagements: 73,
      region: "west",
    },
  ];

  const regions = [
    { id: "northeast", name: "Northeast", color: "blue" },
    { id: "southeast", name: "Southeast", color: "green" },
    { id: "midwest", name: "Midwest", color: "purple" },
    { id: "west", name: "West", color: "orange" },
    { id: "international", name: "International", color: "pink" },
  ];

  const partnerTypes = [
    { id: "actuarial", name: "Actuarial", icon: TrendingUp, color: "purple" },
    { id: "consulting", name: "Consulting", icon: Users, color: "blue" },
    { id: "technology", name: "Technology", icon: Globe, color: "green" },
    { id: "clinical", name: "Clinical", icon: Building2, color: "red" },
  ];

  const filteredPartners = partners.filter(p => {
    const regionMatch = !selectedRegion || p.region === selectedRegion;
    const typeMatch = !selectedType || p.type === selectedType;
    return regionMatch && typeMatch;
  });

  const totalEngagements = filteredPartners.reduce((sum, p) => sum + p.engagements, 0);

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <Users className="w-8 h-8 text-purple-400 mb-3" />
          <div className="text-3xl font-bold mb-1">{filteredPartners.length}</div>
          <div className="text-sm text-gray-400">Active Partners</div>
        </Card>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <Award className="w-8 h-8 text-blue-400 mb-3" />
          <div className="text-3xl font-bold mb-1">47</div>
          <div className="text-sm text-gray-400">Professional Designations</div>
        </Card>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <TrendingUp className="w-8 h-8 text-green-400 mb-3" />
          <div className="text-3xl font-bold mb-1">{totalEngagements}</div>
          <div className="text-sm text-gray-400">Client Engagements</div>
        </Card>
        <Card className="p-6 bg-gray-900/50 border-gray-800">
          <Globe className="w-8 h-8 text-orange-400 mb-3" />
          <div className="text-3xl font-bold mb-1">5</div>
          <div className="text-sm text-gray-400">Global Regions</div>
        </Card>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Filter by Region</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedRegion(null)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedRegion === null
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              All Regions
            </button>
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedRegion === region.id
                    ? `bg-${region.color}-500/20 border-2 border-${region.color}-500 text-${region.color}-400`
                    : "bg-gray-800 text-gray-400 hover:text-white"
                }`}
              >
                {region.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-400 mb-3">Filter by Expertise</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedType(null)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedType === null
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              All Types
            </button>
            {partnerTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedType === type.id
                      ? "bg-purple-500/20 border-2 border-purple-500 text-purple-400"
                      : "bg-gray-800 text-gray-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {type.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Partner Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPartners.map((partner) => {
          const typeInfo = partnerTypes.find(t => t.id === partner.type);
          const TypeIcon = typeInfo?.icon || Users;
          
          return (
            <Card key={partner.id} className="p-6 bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-purple-500/20">
                  <TypeIcon className="w-6 h-6 text-purple-400" />
                </div>
                <span className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-semibold">
                  {partner.engagements} engagements
                </span>
              </div>

              <h4 className="text-lg font-bold mb-2">{partner.name}</h4>
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                <MapPin className="w-4 h-4" />
                {partner.location}
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2 font-semibold">Specialties</p>
                <div className="flex flex-wrap gap-2">
                  {partner.specialties.map((specialty, idx) => (
                    <span key={idx} className="px-2 py-1 rounded text-xs bg-gray-800 text-gray-300">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-2 font-semibold">Credentials</p>
                <div className="flex flex-wrap gap-2">
                  {partner.credentials.map((cred, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-xs text-purple-400">
                      <CheckCircle2 className="w-3 h-3" />
                      {cred}
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredPartners.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No partners match the selected filters</p>
        </div>
      )}
    </div>
  );
}