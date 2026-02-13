"use client";

import { useEffect, useState } from "react";
import type { TileData, StreamMessage, ExecutiveEvent } from "./executiveTypes";

// Mock initial data for instant load
function getInitialTiles(): TileData[] {
  return [
    {
      key: "costTrendStress",
      title: "Cost Trend Stress Index",
      value: "118",
      delta: "+18pp",
      trend: "up",
      subtitle: "YoY PMPM vs McKinsey Baseline",
      framework: "McKinsey",
      chartData: [
        { period: "Q1", value: 100 },
        { period: "Q2", value: 105 },
        { period: "Q3", value: 112 },
        { period: "Q4", value: 118 },
      ]
    },
    {
      key: "contractLeakage",
      title: "Contract Value Leakage Rate",
      value: "3.2%",
      delta: "+1.7pp",
      trend: "up",
      subtitle: "Off-contract + Pricing Variance",
      framework: "McKinsey",
      chartData: [
        { period: "Q1", value: 1.5 },
        { period: "Q2", value: 2.1 },
        { period: "Q3", value: 2.8 },
        { period: "Q4", value: 3.2 },
      ]
    },
    {
      key: "contractCompliance",
      title: "Contract Compliance Rate",
      value: "94.8%",
      delta: "-3.2pp",
      trend: "down",
      subtitle: "Contract Terms Adherence",
      framework: "McKinsey",
      chartData: [
        { period: "Q1", value: 98.0 },
        { period: "Q2", value: 97.2 },
        { period: "Q3", value: 96.5 },
        { period: "Q4", value: 94.8 },
      ]
    },
    {
      key: "contractAmbiguity",
      title: "Contract Ambiguity Risk Score",
      value: "42",
      delta: "+17pts",
      trend: "up",
      subtitle: "High-spend Contract Clarity",
      framework: "McKinsey",
      chartData: [
        { period: "Q1", value: 25 },
        { period: "Q2", value: 32 },
        { period: "Q3", value: 38 },
        { period: "Q4", value: 42 },
      ]
    },
    {
      key: "planDesignAdoption",
      title: "Plan Design Innovation Adoption",
      value: "47%",
      delta: "+12pp QoQ",
      trend: "up",
      subtitle: "HDHP/HSA + COE Enrollment",
      framework: "McKinsey",
      chartData: [
        { period: "Q1", value: 35 },
        { period: "Q2", value: 38 },
        { period: "Q3", value: 42 },
        { period: "Q4", value: 47 },
      ]
    },
    {
      key: "pharmacyExposure",
      title: "Pharmacy Reimbursement Exposure",
      value: "8.2%",
      delta: "+3.2pp",
      trend: "up",
      subtitle: "Opaque PBM Terms Risk",
      framework: "McKinsey",
      chartData: [
        { period: "Q1", value: 5.0 },
        { period: "Q2", value: 6.1 },
        { period: "Q3", value: 7.4 },
        { period: "Q4", value: 8.2 },
      ]
    },
    {
      key: "benefitsNPS",
      title: "Benefits NPS",
      value: "+38",
      delta: "+7pts QoQ",
      trend: "up",
      subtitle: "Employee Benefits Experience",
      framework: "Bain",
      chartData: [
        { period: "Q1", value: 31 },
        { period: "Q2", value: 33 },
        { period: "Q3", value: 35 },
        { period: "Q4", value: 38 },
      ]
    },
    {
      key: "employeeNPS",
      title: "Employee NPS (eNPS)",
      value: "+42",
      delta: "+5pts",
      trend: "up",
      subtitle: "Internal + Vendor Service Teams",
      framework: "Bain",
      chartData: [
        { period: "Q1", value: 37 },
        { period: "Q2", value: 39 },
        { period: "Q3", value: 40 },
        { period: "Q4", value: 42 },
      ]
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