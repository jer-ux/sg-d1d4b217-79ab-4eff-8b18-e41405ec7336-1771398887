# KINCAID HEALTH™ — Accessing New Tools Guide

## Overview
This guide shows you how to access and use the newly created Intelligence Kernel tools.

---

## 🆕 New Tools Created

### 1. **File Upload Zone** (Data Ingestion)
**Location:** Component at `src/components/kincaid-health/FileUploadZone.tsx`

**How to Access:**
```tsx
import { FileUploadZone } from "@/components/kincaid-health/FileUploadZone";

// Use in any page:
<FileUploadZone onUploadComplete={(data) => console.log(data)} />
```

**Features:**
- Drag & drop file upload
- Supports CSV and Excel files
- Real-time upload progress
- Quality score visualization
- Connects to FastAPI `/upload/` endpoint

**Backend Endpoint:**
```
POST http://localhost:8000/upload/
```

---

### 2. **Evidence Spine Dashboard** (Audit & Provenance)
**Location:** Page at `src/pages/evidence-spine.tsx`

**How to Access:**
- **URL:** `http://localhost:3000/evidence-spine`
- **Direct link:** Add to navigation or visit URL directly

**Features:**
- Search and filter evidence objects
- Date range filtering
- Confidence/impact sliders
- Risk level filtering
- Review status tracking
- Dual view: Evidence Objects + Audit Logs
- Export functionality
- Detailed evidence modal

**Backend Endpoints:**
```
GET  http://localhost:8000/api/v1/evidence
GET  http://localhost:8000/api/v1/evidence/{id}
POST http://localhost:8000/api/v1/evidence
GET  http://localhost:8000/api/v1/audit
```

---

### 3. **API Documentation Dashboard**
**Location:** Page at `src/pages/api-documentation.tsx`

**How to Access:**
- **URL:** `http://localhost:3000/api-documentation`
- **Interactive Swagger docs:** `http://localhost:8000/docs`

**Features:**
- Complete API endpoint documentation
- Request/response schemas
- Example code snippets
- API health status
- Evidence Spine architecture visualization

---

## 🚀 Quick Start

### Step 1: Start the Backend

```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
uvicorn app.main:app --reload
```

Backend running at: `http://localhost:8000`

### Step 2: Start the Frontend

```bash
# In the project root
npm run dev
```

Frontend running at: `http://localhost:3000`

### Step 3: Access the Tools

**Evidence Spine Dashboard:**
```
http://localhost:3000/evidence-spine
```

**API Documentation:**
```
http://localhost:3000/api-documentation
```

**Interactive API Docs (Swagger):**
```
http://localhost:8000/docs
```

---

## 📊 Using the File Upload Zone

### Integration Example

```tsx
import { useState } from "react";
import { FileUploadZone } from "@/components/kincaid-health/FileUploadZone";

export default function MyPage() {
  const [uploadedData, setUploadedData] = useState(null);

  return (
    <div>
      <h1>Upload Claims Data</h1>
      <FileUploadZone 
        onUploadComplete={(data) => {
          setUploadedData(data);
          console.log("Quality Score:", data.quality.quality_score);
        }} 
      />
      
      {uploadedData && (
        <div>
          <h2>Upload Complete!</h2>
          <p>Rows: {uploadedData.dataset.rows}</p>
          <p>Quality: {uploadedData.quality.quality_score}/100</p>
        </div>
      )}
    </div>
  );
}
```

---

## 🔍 Using the Evidence Spine

### Search & Filter Workflow

1. **Open Evidence Spine:** `http://localhost:3000/evidence-spine`

2. **Apply Filters:**
   - Search by keywords
   - Set date range
   - Choose object type (finding, recommendation, decision, risk, model, report)
   - Adjust confidence threshold (0.0 to 1.0)
   - Set minimum financial impact
   - Filter by risk level
   - Filter by review status

3. **View Results:**
   - Evidence Objects tab: See all filtered intelligence objects
   - Audit Logs tab: See system activity logs

4. **Drill Down:**
   - Click any evidence object to see full details
   - View confidence scoring, financial impact, risk assessment
   - See agent attribution (which AI agent created it)
   - Review evidence chain (provenance)

5. **Take Action:**
   - Approve evidence objects
   - Request review
   - Reject findings
   - Export filtered results

---

## 🛠️ Backend API Endpoints

### Data Ingestion
```bash
# Upload CSV/Excel file
curl -X POST http://localhost:8000/upload/ \
  -F "file=@claims.csv"

# List datasets
curl http://localhost:8000/upload/datasets
```

### Analytics
```bash
# Summary statistics
curl -X POST http://localhost:8000/analytics/summary \
  -F "file=@claims.csv"

# Trend analysis
curl -X POST http://localhost:8000/analytics/trend \
  -F "file=@claims.csv" \
  -d "column=paid_amount"

# Correlation matrix
curl -X POST http://localhost:8000/analytics/correlation \
  -F "file=@claims.csv"
```

### AI Agents
```bash
# Multi-agent orchestration
curl -X POST http://localhost:8000/api/v1/agents/orchestrate \
  -H "Content-Type: application/json" \
  -d '{
    "task": "Analyze PBM contract for hidden fees",
    "agents": ["Chief Actuary Agent", "CFO Agent"],
    "context": {}
  }'

# Get agent capabilities
curl http://localhost:8000/api/v1/agents/Chief%20Actuary%20Agent
```

### Evidence Spine
```bash
# Create evidence object
curl -X POST http://localhost:8000/api/v1/evidence \
  -H "Content-Type: application/json" \
  -d '{
    "object_type": "finding",
    "title": "PBM Spread Overcharge",
    "confidence_score": 0.95,
    "financial_impact_expected": 250000,
    "risk_score": 0.75,
    "evidence_chain": []
  }'

# List evidence objects
curl "http://localhost:8000/api/v1/evidence?object_type=finding&confidence_min=0.8"

# Get specific evidence
curl http://localhost:8000/api/v1/evidence/ev-1001
```

### Audit Logs
```bash
# Query audit logs
curl "http://localhost:8000/api/v1/audit?action_category=data&limit=50"
```

---

## 🗂️ Adding to Navigation

### Update Nav.tsx

```tsx
// Add to your navigation component
import Link from "next/link";

const navItems = [
  // ... existing items
  {
    label: "Evidence Spine",
    href: "/evidence-spine",
    icon: "shield"
  },
  {
    label: "API Docs",
    href: "/api-documentation",
    icon: "code"
  }
];
```

### Or Create a Tools Menu

```tsx
import { FileUpload, Shield, Code } from "lucide-react";

<DropdownMenu>
  <DropdownMenuTrigger>
    <Button>Intelligence Tools</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem asChild>
      <Link href="/evidence-spine">
        <Shield className="mr-2 h-4 w-4" />
        Evidence Spine
      </Link>
    </DropdownMenuItem>
    <DropdownMenuItem asChild>
      <Link href="/api-documentation">
        <Code className="mr-2 h-4 w-4" />
        API Documentation
      </Link>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

## 📈 Complete Workflow Example

### Scenario: Upload and Analyze Claims Data

1. **Upload Data:**
   - Use FileUploadZone component or POST to `/upload/`
   - System creates evidence object for data ingestion
   - Quality validation runs automatically

2. **Automatic Evidence Creation:**
   - Evidence object created: "Claims Data Upload"
   - Confidence score: Based on quality validation
   - Financial impact: Estimated from data profiling
   - Agent: Data Quality Agent

3. **View in Evidence Spine:**
   - Navigate to `/evidence-spine`
   - Filter by object_type = "data"
   - See the upload evidence object
   - Click to view full provenance chain

4. **Run AI Analysis:**
   - AI agents analyze the data
   - Each agent creates evidence objects for findings
   - Audit logs track all agent activities

5. **Review Findings:**
   - Filter evidence by confidence > 0.8
   - Filter by financial_impact > $100K
   - Review high-risk findings first
   - Approve findings for executive reporting

6. **Export Results:**
   - Click "Export Results" in Evidence Spine
   - Download filtered evidence objects as CSV
   - Share with stakeholders

---

## 🔐 Backend Evidence Spine Integration

### How the Evidence Spine Works

Every action in the system automatically creates evidence:

```python
# When you upload a file
evidence_spine = EvidenceSpineService(db)
evidence_spine.track_data_upload(
    organization_id="org-123",
    dataset_id="dataset-456",
    rows=10000,
    quality_score=95,
    user_id="user-789"
)

# When AI agent runs
evidence_spine.track_agent_execution(
    organization_id="org-123",
    agent_name="Chief Actuary Agent",
    task="Risk assessment",
    confidence=0.92,
    financial_impact=250000,
    risk_score=0.75
)

# When user makes a decision
evidence_spine.track_user_decision(
    organization_id="org-123",
    user_id="user-789",
    decision="Approve contract renegotiation",
    evidence_id="ev-1001"
)
```

---

## 📝 Next Steps

### Recommended Integration Order

1. **Add navigation links** to evidence-spine and api-documentation pages
2. **Integrate FileUploadZone** into existing upload pages
3. **Start the backend** and test API endpoints
4. **Upload sample data** to create evidence objects
5. **Explore Evidence Spine** dashboard with real data
6. **Set up automated reporting** using evidence objects

---

## 🆘 Troubleshooting

### Backend Not Starting
```bash
# Check Python version
python --version  # Should be 3.11+

# Install dependencies
pip install -r backend/requirements.txt

# Check database connection
psql -h localhost -U postgres -d kincaid_health
```

### Frontend Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
npm install

# Restart dev server
npm run dev
```

### API Connection Issues
- Verify backend is running: `http://localhost:8000/health`
- Check CORS settings in `backend/app/main.py`
- Ensure ports 8000 (backend) and 3000 (frontend) are not in use

---

## 📚 Additional Resources

- **FastAPI Docs:** `http://localhost:8000/docs`
- **Backend README:** `backend/README.md`
- **Database Schema:** `database/schemas/universal-data-model.sql`
- **API Examples:** `docs/api-ingest-examples.md`

---

**THE INTELLIGENCE INFRASTRUCTURE IS OPERATIONAL.**

For questions: engineering@siriusb.ai