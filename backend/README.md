# KINCAID IQ™ DATA INTELLIGENCE CORE v0.1
## Simplified MVP Backend

Enterprise Healthcare Intelligence Platform — Production-Ready API

---

## Quick Start

### Prerequisites
- Python 3.11+
- PostgreSQL 14+

### Installation

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up database
createdb kincaid
```

### Configuration

Create `.env` file:
```
DATABASE_URL=postgresql://postgres:password@localhost/kincaid
```

### Run

```bash
# Development
uvicorn app.main:app --reload

# Production
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

API Documentation: http://localhost:8000/docs

---

## Architecture

```
Upload File
    ↓
Profile Dataset (rows, columns, missing values)
    ↓
Score Quality (completeness, duplicates, outliers)
    ↓
Calculate Metrics (mean, median, variance, trend)
    ↓
Generate Dashboard Cards
    ↓
Return JSON API Response
```

---

## API Endpoints

### Upload
- `POST /upload/` — Upload CSV/Excel file
- `GET /upload/datasets` — List all datasets

### Analytics
- `POST /analytics/summary` — Summary statistics
- `POST /analytics/trend` — Trend analysis
- `POST /analytics/correlation` — Correlation matrix

### Dashboard
- `POST /dashboard/generate` — Generate dashboard
- `GET /dashboard/cfo` — CFO dashboard

---

## Example Usage

### Upload File
```bash
curl -X POST "http://localhost:8000/upload/" \
  -F "file=@claims.csv"
```

Response:
```json
{
  "dataset_id": 1,
  "profile": {
    "rows": 10000,
    "columns": ["claim_id", "amount", "date"],
    "missing": {"claim_id": 0, "amount": 5, "date": 2}
  },
  "quality": {
    "quality_score": 95,
    "missing": 7,
    "duplicates": 3,
    "outliers": 12
  }
}
```

### Generate Dashboard
```bash
curl -X POST "http://localhost:8000/dashboard/generate" \
  -F "file=@claims.csv"
```

Response:
```json
{
  "cards": [
    {"title": "Data Quality Score", "value": "95%"},
    {"title": "Total Records", "value": 10000},
    {"title": "Missing Values", "value": 7},
    {"title": "Duplicate Records", "value": 3}
  ],
  "generated_at": "2026-07-08T12:00:00Z"
}
```

---

## Database Models

### Dataset
- id (Primary Key)
- name (String)
- source (String)
- rows (Integer)
- quality_score (Integer)
- created_at (DateTime)

### Metric
- id (Primary Key)
- dataset_id (Foreign Key)
- name (String)
- value (Float)
- category (String)

### Dashboard
- id (Primary Key)
- name (String)
- dashboard_type (String)
- config (JSON)
- created_at (DateTime)

---

## Services

### DataIngestion
- `load_csv()` — Load CSV file
- `load_excel()` — Load Excel file
- `profile()` — Profile dataset

### DataValidator
- `validate()` — Validate data quality
  - Check missing values
  - Check duplicates
  - Check outliers (z-score > 3)

### AnalyticsEngine
- `summary()` — Summary statistics
- `trend()` — Trend analysis
- `correlation()` — Correlation matrix

### DashboardBuilder
- `create_dashboard()` — Generate dashboard cards
- `create_cfo_dashboard()` — CFO-specific dashboard

---

## Next Steps

### Integration with Frontend
Connect Next.js frontend to these API endpoints:

```typescript
// Upload file
const formData = new FormData();
formData.append('file', file);

const response = await fetch('http://localhost:8000/upload/', {
  method: 'POST',
  body: formData
});

const data = await response.json();
```

### Deploy to Production
```bash
# Docker
docker build -t kincaid-iq-backend .
docker run -p 8000:8000 kincaid-iq-backend

# Or use docker-compose
docker-compose up
```

---

## Development Roadmap

### Phase 1: MVP (Current) ✅
- File upload and profiling
- Data quality scoring
- Summary statistics
- Dashboard generation

### Phase 2: Advanced Analytics
- Actuarial calculations
- Predictive modeling
- Monte Carlo simulation
- Optimization engine

### Phase 3: AI Agents
- Chief Actuary Agent
- CFO Agent
- Risk Officer Agent
- Multi-agent orchestration

### Phase 4: Enterprise Features
- Knowledge graph
- Evidence provenance
- Governance engine
- Audit trails

---

## License

Proprietary — SiriusB IQ™

---

**The Intelligence Infrastructure Is Operational.**