# Master Prompt: Create 9 Instances of 4-Tile Executive Drill-Down Pattern

## Overview
Create 9 different executive war room pages, each with 4 KPI tiles that drill down into detailed event streams. This is a proven pattern for C-suite decision intelligence.

## Core Pattern Architecture

### The 4-Tile Drill-Down Pattern:
1. **Landing Page** - 4 large KPI tiles with summary metrics
2. **Tile Click** - Opens drawer with filtered event stream for that KPI
3. **Event Click** - Opens detail drawer with deep analysis, evidence, attachments
4. **Action Layer** - Notes, proof packs, evidence attachment on each event

## File Structure Template (Repeat 9 Times)

For each war room, create these files:

```
src/pages/war-room/[topic-name].tsx          // Main page with 4 tiles
src/components/warroom/[Topic]KPITile.tsx    // Reusable tile component
src/components/warroom/[Topic]KPIDrawer.tsx  // Drill-down drawer
src/lib/warroom/[topic]Mock.ts               // Demo data
src/pages/api/war-room/[topic]-stream.ts     // Real-time API endpoint
```

## Step-by-Step Implementation (Per War Room)

### STEP 1: Define Your 4 KPIs

Each war room needs 4 distinct KPIs. Examples:

**Claims Efficiency War Room:**
1. Processing Speed (avg days to process)
2. Error Rate (% claims with errors)
3. Cost Per Claim ($)
4. Member Satisfaction (NPS score)

**Contract Leakage War Room:**
1. Underpayment Events ($ at risk)
2. Compliance Gaps (# violations)
3. Vendor Overcharges ($ exposure)
4. Audit Findings (critical issues)

**EBITDA Impact War Room:**
1. Revenue Leakage ($ monthly)
2. Cost Optimization ($ saved)
3. Risk Exposure ($ potential loss)
4. Process Efficiency (hours saved)

**Vendor Performance War Room:**
1. SLA Compliance (% on-time)
2. Quality Score (1-100)
3. Cost Variance (% over/under budget)
4. Risk Rating (1-10)

### STEP 2: Create the Main Page Component

```typescript
// src/pages/war-room/[your-topic].tsx
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { KPITile } from "@/components/warroom/tiles/KPITile";
import { ExecutiveKPIDrawer } from "@/components/warroom/ExecutiveKPIDrawer";

export default function YourTopicWarRoom() {
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);
  
  const kpis = [
    {
      id: "kpi1",
      title: "KPI 1 Title",
      value: "$1.2M",
      trend: "+12%",
      trendDirection: "up" as const,
      description: "Brief description of this KPI",
      severity: "high" as const,
      eventCount: 47
    },
    {
      id: "kpi2",
      title: "KPI 2 Title",
      value: "3.2 days",
      trend: "-8%",
      trendDirection: "down" as const,
      description: "Brief description",
      severity: "medium" as const,
      eventCount: 23
    },
    {
      id: "kpi3",
      title: "KPI 3 Title",
      value: "94%",
      trend: "+5%",
      trendDirection: "up" as const,
      description: "Brief description",
      severity: "low" as const,
      eventCount: 12
    },
    {
      id: "kpi4",
      title: "KPI 4 Title",
      value: "8.5/10",
      trend: "→",
      trendDirection: "neutral" as const,
      description: "Brief description",
      severity: "medium" as const,
      eventCount: 31
    }
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold">Your Topic War Room</h1>
          <p className="text-muted-foreground mt-2">
            Real-time executive intelligence dashboard
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {kpis.map((kpi) => (
            <KPITile
              key={kpi.id}
              {...kpi}
              onClick={() => setSelectedKPI(kpi.id)}
            />
          ))}
        </div>

        <ExecutiveKPIDrawer
          open={!!selectedKPI}
          onClose={() => setSelectedKPI(null)}
          kpiId={selectedKPI || ""}
          kpiTitle={kpis.find(k => k.id === selectedKPI)?.title || ""}
        />
      </div>
    </div>
  );
}
```

### STEP 3: Create Mock Data

```typescript
// src/lib/warroom/[topic]Mock.ts
export const mockEvents = {
  kpi1: [
    {
      id: "evt1",
      timestamp: "2026-04-16T10:30:00Z",
      title: "Event Title",
      description: "Detailed description of what happened",
      severity: "high" as const,
      impact: "$150K",
      category: "financial",
      status: "open" as const,
      assignedTo: "John Doe",
      evidence: [
        { type: "pdf", name: "contract.pdf", url: "/uploads/contract.pdf" }
      ]
    }
    // Add 10-20 events per KPI
  ],
  kpi2: [/* events */],
  kpi3: [/* events */],
  kpi4: [/* events */]
};
```

### STEP 4: Create API Endpoint

```typescript
// src/pages/api/war-room/[topic]-stream.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { mockEvents } from "@/lib/warroom/[topic]Mock";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { kpiId } = req.query;
  
  if (!kpiId || typeof kpiId !== "string") {
    return res.status(400).json({ error: "Missing kpiId" });
  }

  const events = mockEvents[kpiId as keyof typeof mockEvents] || [];
  
  return res.status(200).json({
    events,
    metadata: {
      total: events.length,
      kpiId,
      timestamp: new Date().toISOString()
    }
  });
}
```

### STEP 5: Wire Up Real-Time Hook

```typescript
// In your component, use the existing useExecutiveStream hook:
import { useExecutiveStream } from "@/components/warroom/useExecutiveStream";

const { events, loading } = useExecutiveStream({
  kpiId: selectedKPI || "",
  endpoint: "/api/war-room/[topic]-stream"
});
```

## The 9 War Rooms to Create

Create the following 9 war rooms using the pattern above:

### 1. Claims Efficiency War Room
**Route:** `/war-room/claims-efficiency`
**KPIs:** Processing Speed, Error Rate, Cost Per Claim, Member Satisfaction
**Focus:** Healthcare claims operations

### 2. Contract Leakage War Room
**Route:** `/war-room/contract-leakage`
**KPIs:** Underpayment Events, Compliance Gaps, Vendor Overcharges, Audit Findings
**Focus:** PBM contract enforcement

### 3. EBITDA Impact War Room
**Route:** `/war-room/ebitda-impact`
**KPIs:** Revenue Leakage, Cost Optimization, Risk Exposure, Process Efficiency
**Focus:** Financial performance

### 4. Vendor Performance War Room
**Route:** `/war-room/vendor-performance`
**KPIs:** SLA Compliance, Quality Score, Cost Variance, Risk Rating
**Focus:** Third-party vendor management

### 5. CHRO Operations War Room
**Route:** `/war-room/chro-operations`
**KPIs:** Benefits Utilization, Cost Per Employee, Enrollment Quality, Compliance Status
**Focus:** HR benefits administration

### 6. Fiduciary Governance War Room
**Route:** `/war-room/fiduciary-governance`
**KPIs:** ERISA Compliance, Audit Readiness, Risk Mitigation, Documentation Quality
**Focus:** Legal/compliance oversight

### 7. Member Experience War Room
**Route:** `/war-room/member-experience`
**KPIs:** NPS Score, Resolution Time, Complaint Rate, Self-Service Adoption
**Focus:** Customer satisfaction

### 8. Pharmacy Optimization War Room
**Route:** `/war-room/pharmacy-optimization`
**KPIs:** Formulary Compliance, Generic Adoption, Specialty Spend, Waste Reduction
**Focus:** Rx cost management

### 9. Audit & Evidence War Room
**Route:** `/war-room/audit-evidence`
**KPIs:** Evidence Coverage, Source Reliability, Validation Status, Audit Trail Completeness
**Focus:** Proof & documentation

## Customization Guide

### For Each War Room:

1. **Color Scheme:**
```typescript
const severity = {
  high: "bg-red-500/10 border-red-500",
  medium: "bg-amber-500/10 border-amber-500",
  low: "bg-emerald-500/10 border-emerald-500"
};
```

2. **Icons (from lucide-react):**
```typescript
import { TrendingUp, AlertTriangle, DollarSign, Users } from "lucide-react";
```

3. **Event Types:**
```typescript
type EventCategory = 
  | "financial" 
  | "operational" 
  | "compliance" 
  | "quality" 
  | "risk";
```

4. **Status Flow:**
```typescript
type EventStatus = 
  | "open" 
  | "investigating" 
  | "resolved" 
  | "escalated" 
  | "closed";
```

## Key Features to Include in Each

✅ **Tile Level:**
- Large metric display
- Trend indicator (up/down/neutral)
- Event count badge
- Severity color coding
- Click to drill down

✅ **Drawer Level:**
- Filtered event stream for that KPI
- Time-series sparkline
- Filter by severity/status
- Search events
- Export capabilities

✅ **Event Detail Level:**
- Full event description
- Attachments/evidence viewer
- Note-taking interface
- Proof pack assembly
- Audit trail
- Assignment/workflow

## Testing Checklist

For each of the 9 war rooms:

- [ ] 4 tiles render correctly
- [ ] Click tile → drawer opens
- [ ] Drawer shows filtered events for that KPI
- [ ] Click event → detail drawer opens
- [ ] Can attach notes to events
- [ ] Can upload evidence
- [ ] Can create proof packs
- [ ] API endpoint returns data
- [ ] Real-time updates work (if using Supabase)
- [ ] Mobile responsive
- [ ] Dark mode support

## Supabase Integration (Optional Real-Time)

If connecting to Supabase, add:

```typescript
// src/services/warRoomService.ts
import { supabase } from "@/integrations/supabase/client";

export async function subscribeToKPI(kpiId: string, callback: (events: any[]) => void) {
  const channel = supabase
    .channel(`kpi:${kpiId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "war_room_events",
        filter: `kpi_id=eq.${kpiId}`
      },
      (payload) => {
        // Handle real-time updates
        callback([payload.new]);
      }
    )
    .subscribe();
    
  return () => {
    supabase.removeChannel(channel);
  };
}
```

## Quick Start Command

To create all 9 war rooms at once in Replit:

```bash
# Run this in the Replit shell
npm run generate:war-rooms
```

Then create this script in `package.json`:

```json
{
  "scripts": {
    "generate:war-rooms": "node scripts/generate-war-rooms.js"
  }
}
```

## Navigation Setup

Add to your main navigation:

```typescript
// src/components/Nav.tsx
const warRooms = [
  { name: "Claims Efficiency", href: "/war-room/claims-efficiency" },
  { name: "Contract Leakage", href: "/war-room/contract-leakage" },
  { name: "EBITDA Impact", href: "/war-room/ebitda-impact" },
  { name: "Vendor Performance", href: "/war-room/vendor-performance" },
  { name: "CHRO Operations", href: "/war-room/chro-operations" },
  { name: "Fiduciary Governance", href: "/war-room/fiduciary-governance" },
  { name: "Member Experience", href: "/war-room/member-experience" },
  { name: "Pharmacy Optimization", href: "/war-room/pharmacy-optimization" },
  { name: "Audit & Evidence", href: "/war-room/audit-evidence" }
];
```

## Success Criteria

You've successfully replicated the pattern when:

1. ✅ All 9 war room pages exist at `/war-room/*` routes
2. ✅ Each has 4 distinct KPI tiles
3. ✅ Tiles open drawers with filtered event streams
4. ✅ Events open detail drawers with evidence/notes
5. ✅ All pages share consistent UI/UX
6. ✅ Navigation menu links to all 9 war rooms
7. ✅ Mock data populates all events
8. ✅ API endpoints serve data for each KPI
9. ✅ Mobile responsive throughout

---

**IMPLEMENTATION ORDER:**

Start with #1 (Claims Efficiency) to validate the pattern, then replicate 2-9.

Use the existing components as templates:
- Copy from: `src/pages/war-room/demo/claims-efficiency.tsx`
- Adapt the KPIs and data for each new topic
- Maintain the exact same interaction pattern

This pattern is proven at enterprise scale. Follow it exactly for best results.