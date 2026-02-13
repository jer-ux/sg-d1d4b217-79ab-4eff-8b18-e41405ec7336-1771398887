"use client";

import { useEffect, useState } from "react";
import type { TileData, StreamMessage, ExecutiveEvent } from "./executiveTypes";

// Mock initial data for instant load
function getInitialTiles(): TileData[] {
  return [
    {
      key: "costTrendStress",
      title: "Cost Trend Stress Index",
      current: 118,
      target: 100,
      delta: "+18pp",
      trend: "up",
      severity: "critical",
      subtitle: "YoY PMPM vs McKinsey Baseline",
      framework: "McKinsey",
    },
    {
      key: "contractLeakage",
      title: "Contract Value Leakage Rate",
      current: 3.2,
      target: 1.5,
      delta: "+1.7pp",
      trend: "up",
      severity: "high",
      subtitle: "Off-contract + Pricing Variance",
      framework: "McKinsey",
    },
    {
      key: "contractCompliance",
      title: "Contract Compliance Rate",
      current: 94.8,
      target: 98.0,
      delta: "-3.2pp",
      trend: "down",
      severity: "medium",
      subtitle: "Contract Terms Adherence",
      framework: "McKinsey",
    },
    {
      key: "contractAmbiguity",
      title: "Contract Ambiguity Risk Score",
      current: 42,
      target: 25,
      delta: "+17pts",
      trend: "up",
      severity: "high",
      subtitle: "High-spend Contract Clarity",
      framework: "McKinsey",
    },
    {
      key: "planDesignAdoption",
      title: "Plan Design Innovation Adoption",
      current: 47,
      target: 55,
      delta: "+12pp QoQ",
      trend: "up",
      severity: "low",
      subtitle: "HDHP/HSA + COE Enrollment",
      framework: "McKinsey",
    },
    {
      key: "pharmacyExposure",
      title: "Pharmacy Reimbursement Exposure",
      current: 8.2,
      target: 5.0,
      delta: "+3.2pp",
      trend: "up",
      severity: "high",
      subtitle: "Opaque PBM Terms Risk",
      framework: "McKinsey",
    },
    {
      key: "benefitsNPS",
      title: "Benefits NPS",
      current: 38,
      target: 45,
      delta: "+7pts QoQ",
      trend: "up",
      severity: "low",
      subtitle: "Employee Benefits Experience",
      framework: "Bain",
    },
    {
      key: "employeeNPS",
      title: "Employee NPS (eNPS)",
      current: 42,
      target: 50,
      delta: "+5pts",
      trend: "up",
      severity: "low",
      subtitle: "Internal + Vendor Service Teams",
      framework: "Bain",
    },
  ];
}

function getInitialEvents(): ExecutiveEvent[] {
  return [
    {
      id: "EVT-INIT-001",
      timestamp: new Date().toISOString(),
      category: "cost_trend",
      severity: "critical",
      title: "YoY PMPM Trend Exceeds McKinsey Baseline",
      description: "Net PMPM trend reached 11.8%, 280bps above McKinsey commercial baseline (9-10%).",
      impact: "$4.8M annualized EBITDA at risk",
      kpi: "Cost Trend Stress Index",
      framework: "McKinsey",
    },
    {
      id: "EVT-INIT-002",
      timestamp: new Date(Date.now() - 120000).toISOString(),
      category: "contract",
      severity: "high",
      title: "Contract Value Leakage Detected",
      description: "Off-contract spend + pricing misses identified in Q4 vendor reconciliation.",
      impact: "$2.1M recoverable EBITDA",
      kpi: "Contract Value Leakage Rate",
      framework: "McKinsey",
    },
    {
      id: "EVT-INIT-003",
      timestamp: new Date(Date.now() - 240000).toISOString(),
      category: "pharmacy",
      severity: "high",
      title: "Pharmacy Rebate Discrepancy Alert",
      description: "Opaque reimbursement terms flagged in specialty pharmacy contracts.",
      impact: "$1.3M annual exposure",
      kpi: "Pharmacy Reimbursement Exposure",
      framework: "McKinsey",
    },
  ];
}

function getInitialTicker(): string[] {
  return [
    "Portfolio MTD: Cost Trend +11.8% | Contract Compliance 94.8% | Benefits NPS +38",
    "McKinsey Alert: YoY PMPM exceeds baseline by 280bps | $4.8M EBITDA at risk",
    "Contract Leakage: $2.1M recovery opportunity identified in Q4 vendor reconciliation",
  ];
}

export function useExecutiveStream(query: string) {
  const [status, setStatus] = useState<"connecting" | "live" | "offline">("live");
  const [tiles, setTiles] = useState<TileData[]>(getInitialTiles());
  const [tickerItems, setTickerItems] = useState<string[]>(getInitialTicker());
  const [events, setEvents] = useState<ExecutiveEvent[]>(getInitialEvents());

  useEffect(() => {
    const es = new EventSource(`/api/war-room/executive-stream?${query}`);
    
    es.onopen = () => setStatus("live");
    
    es.onmessage = (evt) => {
      try {
        const msg = JSON.parse(evt.data) as StreamMessage;
        
        if (msg.type === "tiles") {
          setTiles(msg.tiles);
        }
        
        if (msg.type === "ticker") {
          setTickerItems((prev) => [msg.item, ...prev].slice(0, 30));
        }
        
        if (msg.type === "event") {
          setEvents((prev) => [msg.event, ...prev].slice(0, 50));
        }
        
        if (msg.type === "ping") {
          // Keep-alive
        }
      } catch (error) {
        console.error("Stream parse error:", error);
      }
    };
    
    es.onerror = () => {
      setStatus("offline");
      es.close();
    };
    
    return () => {
      es.close();
    };
  }, [query]);

  return { status, tiles, tickerItems, events };
}