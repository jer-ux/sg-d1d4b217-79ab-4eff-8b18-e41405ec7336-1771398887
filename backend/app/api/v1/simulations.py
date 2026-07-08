"""
KINCAID HEALTH™ ACTUARIAL ENGINE
Simulation API Endpoints
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, List, Optional
import io
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_RIGHT
from datetime import datetime

from app.actuarial.simulation import (
    SimulationEngine,
    HealthcareTrendModel,
    StopLossModel,
    IBNRModel,
    PensionFundingModel,
    PricingModel,
    WorkforceCostModel,
    default_scenarios,
    SummaryStatistics,
    RiskMetrics
)


router = APIRouter()


class SimulationRequest(BaseModel):
    model: str
    scenario: str
    iterations: int = 10000
    custom_params: Optional[Dict[str, Any]] = None


class PDFExportRequest(BaseModel):
    model: str
    scenario: str
    result: Dict[str, Any]


# Initialize simulation engine and register models
engine = SimulationEngine()
engine.register("healthcare", HealthcareTrendModel().simulate)
engine.register("stop_loss", StopLossModel().simulate)
engine.register("ibnr", IBNRModel().simulate)
engine.register("pension", PensionFundingModel().simulate)
engine.register("pricing", PricingModel().simulate)
engine.register("workforce", WorkforceCostModel().simulate)


@router.post("/run")
async def run_simulation(request: SimulationRequest):
    """Run a simulation"""
    try:
        # Get scenario
        scenario = default_scenarios.get(request.scenario)
        if not scenario:
            raise HTTPException(status_code=404, detail="Scenario not found")
        
        # Merge scenario assumptions with custom params
        params = {**scenario.assumptions}
        if request.custom_params:
            params.update(request.custom_params)
        
        # Run simulation
        result = engine.run(
            request.model,
            iterations=request.iterations,
            **params
        )
        
        return {
            "summary": result.summary,
            "values": result.values.tolist(),
            "assumptions": result.assumptions
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/scenarios")
async def list_scenarios():
    """List all available scenarios"""
    scenarios = default_scenarios.all()
    return [
        {
            "name": s.name,
            "description": s.description,
            "assumptions": s.assumptions,
            "tags": s.tags
        }
        for s in scenarios
    ]


@router.post("/export-pdf")
async def export_pdf(request: PDFExportRequest):
    """Export simulation results to PDF"""
    try:
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter)
        story = []
        styles = getSampleStyleSheet()
        
        # Custom styles
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=24,
            textColor=colors.HexColor('#1e293b'),
            spaceAfter=30,
            alignment=TA_CENTER
        )
        
        heading_style = ParagraphStyle(
            'CustomHeading',
            parent=styles['Heading2'],
            fontSize=16,
            textColor=colors.HexColor('#334155'),
            spaceAfter=12
        )
        
        # Title page
        story.append(Paragraph("KINCAID HEALTH™", title_style))
        story.append(Paragraph("Actuarial Intelligence Engine", styles['Normal']))
        story.append(Spacer(1, 0.5*inch))
        story.append(Paragraph(f"Simulation Report: {request.model.upper()}", heading_style))
        story.append(Paragraph(f"Scenario: {request.scenario}", styles['Normal']))
        story.append(Paragraph(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", styles['Normal']))
        story.append(Spacer(1, 0.5*inch))
        
        # Executive Summary
        story.append(Paragraph("Executive Summary", heading_style))
        summary = request.result['summary']
        summary_data = [
            ['Metric', 'Value'],
            ['Mean', f"${summary['mean']:,.0f}"],
            ['Median', f"${summary['median']:,.0f}"],
            ['Standard Deviation', f"${summary['std_dev']:,.0f}"],
            ['Minimum', f"${summary['minimum']:,.0f}"],
            ['Maximum', f"${summary['maximum']:,.0f}"],
            ['5th Percentile', f"${summary['p5']:,.0f}"],
            ['95th Percentile', f"${summary['p95']:,.0f}"],
        ]
        
        summary_table = Table(summary_data, colWidths=[3*inch, 3*inch])
        summary_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#3b82f6')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 12),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.black)
        ]))
        
        story.append(summary_table)
        story.append(Spacer(1, 0.5*inch))
        
        # Risk Analysis
        story.append(Paragraph("Risk Analysis", heading_style))
        story.append(Paragraph(
            f"Based on 10,000 Monte Carlo simulations, the expected value is "
            f"${summary['mean']:,.0f} with a standard deviation of ${summary['std_dev']:,.0f}.",
            styles['Normal']
        ))
        story.append(Spacer(1, 0.2*inch))
        story.append(Paragraph(
            f"There is a 95% probability that the actual value will be below "
            f"${summary['p95']:,.0f} (Value at Risk).",
            styles['Normal']
        ))
        story.append(Spacer(1, 0.2*inch))
        
        cv = (summary['std_dev'] / summary['mean']) * 100
        story.append(Paragraph(
            f"The coefficient of variation is {cv:.1f}%, indicating "
            f"{'high' if cv > 15 else 'moderate' if cv > 8 else 'low'} volatility.",
            styles['Normal']
        ))
        story.append(Spacer(1, 0.5*inch))
        
        # Assumptions
        story.append(Paragraph("Model Assumptions", heading_style))
        assumptions_data = [['Parameter', 'Value']]
        for key, value in request.result.get('assumptions', {}).items():
            formatted_key = key.replace('_', ' ').title()
            formatted_value = f"{value:.4f}" if isinstance(value, float) else str(value)
            assumptions_data.append([formatted_key, formatted_value])
        
        if len(assumptions_data) > 1:
            assumptions_table = Table(assumptions_data, colWidths=[3*inch, 3*inch])
            assumptions_table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#3b82f6')),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('FONTSIZE', (0, 0), (-1, 0), 12),
                ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
                ('GRID', (0, 0), (-1, -1), 1, colors.black)
            ]))
            story.append(assumptions_table)
        
        # Build PDF
        doc.build(story)
        buffer.seek(0)
        
        return buffer.getvalue()
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))