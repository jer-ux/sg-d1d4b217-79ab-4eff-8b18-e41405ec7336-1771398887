# KINCAID HEALTH™ AIOS
## DEPLOYMENT GUIDE

**Production Deployment for Enterprise Actuarial Intelligence Operating System**

---

## ARCHITECTURE OVERVIEW

```
Internet
    ↓
Load Balancer (AWS ALB / GCP LB / Azure LB)
    ↓
┌─────────────────────────────────────────────┐
│           Kubernetes Cluster                │
│                                             │
│  ┌──────────────────┐  ┌─────────────────┐│
│  │  Next.js Pods    │  │  FastAPI Pods   ││
│  │  (3 replicas)    │  │  (3-20 replicas)││
│  │  Frontend        │  │  Backend        ││
│  └──────────────────┘  └─────────────────┘│
│                                             │
│  ┌──────────────────┐  ┌─────────────────┐│
│  │  Redis Cluster   │  │  PostgreSQL     ││
│  │  (3 nodes)       │  │  (Supabase)     ││
│  └──────────────────┘  └─────────────────┘│
└─────────────────────────────────────────────┘
```

---

## PREREQUISITES

### Tools
- Docker 24+
- Kubernetes 1.28+
- kubectl
- Helm 3+
- Terraform 1.6+

### Cloud Resources
- Kubernetes cluster (EKS/GKE/AKS)
- PostgreSQL database (Supabase)
- Redis cluster
- Object storage (S3/GCS/Azure Blob)
- CDN (CloudFront/Cloud CDN/Azure CDN)

### Secrets
- API keys (OpenAI, Anthropic, Google)
- Database credentials
- TLS certificates
- JWT signing keys

---

## LOCAL DEVELOPMENT

### Step 1: Clone Repository
```bash
git clone https://github.com/your-org/kincaid-aios.git
cd kincaid-aios
```

### Step 2: Setup Environment Variables
```bash
# Frontend
cd frontend
cp .env.example .env.local
# Edit .env.local with your keys

# Backend
cd ../backend
cp .env.example .env
# Edit .env with your keys
```

### Step 3: Start Services
```bash
# Start backend (FastAPI + Redis)
cd backend
docker-compose up -d

# Start frontend (Next.js)
cd ../frontend
npm install
npm run dev
```

### Step 4: Verify
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api/docs
- Redis: localhost:6379

---

## DOCKER DEPLOYMENT

### Build Images
```bash
# Backend
cd backend
docker build -t kincaid-aios-backend:latest .

# Frontend
cd ../frontend
docker build -t kincaid-aios-frontend:latest .
```

### Push to Registry
```bash
# Tag for your registry
docker tag kincaid-aios-backend:latest your-registry.com/kincaid-aios-backend:latest
docker tag kincaid-aios-frontend:latest your-registry.com/kincaid-aios-frontend:latest

# Push
docker push your-registry.com/kincaid-aios-backend:latest
docker push your-registry.com/kincaid-aios-frontend:latest
```

---

## KUBERNETES DEPLOYMENT

### Step 1: Create Namespace
```bash
kubectl create namespace kincaid-aios
```

### Step 2: Create Secrets
```bash
kubectl create secret generic kincaid-secrets \
  --from-literal=database-url=$DATABASE_URL \
  --from-literal=openai-api-key=$OPENAI_API_KEY \
  --from-literal=anthropic-api-key=$ANTHROPIC_API_KEY \
  --from-literal=supabase-service-role-key=$SUPABASE_SERVICE_ROLE_KEY \
  -n kincaid-aios
```

### Step 3: Deploy Backend
```yaml
# backend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kincaid-backend
  namespace: kincaid-aios
spec:
  replicas: 3
  selector:
    matchLabels:
      app: kincaid-backend
  template:
    metadata:
      labels:
        app: kincaid-backend
    spec:
      containers:
      - name: backend
        image: your-registry.com/kincaid-aios-backend:latest
        ports:
        - containerPort: 8000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: kincaid-secrets
              key: database-url
        - name: OPENAI_API_KEY
          valueFrom:
            secretKeyRef:
              name: kincaid-secrets
              key: openai-api-key
        resources:
          requests:
            memory: "2Gi"
            cpu: "1000m"
          limits:
            memory: "4Gi"
            cpu: "2000m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 10
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: kincaid-backend-service
  namespace: kincaid-aios
spec:
  selector:
    app: kincaid-backend
  ports:
  - port: 80
    targetPort: 8000
  type: LoadBalancer
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: kincaid-backend-hpa
  namespace: kincaid-aios
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: kincaid-backend
  minReplicas: 3
  maxReplicas: 20
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
```

### Step 4: Deploy Frontend
```yaml
# frontend-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kincaid-frontend
  namespace: kincaid-aios
spec:
  replicas: 3
  selector:
    matchLabels:
      app: kincaid-frontend
  template:
    metadata:
      labels:
        app: kincaid-frontend
    spec:
      containers:
      - name: frontend
        image: your-registry.com/kincaid-aios-frontend:latest
        ports:
        - containerPort: 3000
        env:
        - name: NEXT_PUBLIC_API_URL
          value: "https://api.yourdomain.com"
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: kincaid-frontend-service
  namespace: kincaid-aios
spec:
  selector:
    app: kincaid-frontend
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
```

### Step 5: Deploy Redis
```bash
helm repo add bitnami https://charts.bitnami.com/bitnami
helm install kincaid-redis bitnami/redis \
  --namespace kincaid-aios \
  --set auth.enabled=true \
  --set auth.password=$REDIS_PASSWORD \
  --set master.persistence.enabled=true \
  --set master.persistence.size=10Gi \
  --set replica.replicaCount=2
```

### Step 6: Apply Deployments
```bash
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml
```

### Step 7: Verify
```bash
kubectl get pods -n kincaid-aios
kubectl get services -n kincaid-aios
kubectl logs -f deployment/kincaid-backend -n kincaid-aios
```

---

## CI/CD PIPELINE

### GitHub Actions Example
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Backend
        run: |
          cd backend
          docker build -t ${{ secrets.REGISTRY }}/kincaid-backend:${{ github.sha }} .
          docker push ${{ secrets.REGISTRY }}/kincaid-backend:${{ github.sha }}
      
      - name: Build Frontend
        run: |
          cd frontend
          docker build -t ${{ secrets.REGISTRY }}/kincaid-frontend:${{ github.sha }} .
          docker push ${{ secrets.REGISTRY }}/kincaid-frontend:${{ github.sha }}
      
      - name: Deploy to Kubernetes
        run: |
          kubectl set image deployment/kincaid-backend \
            backend=${{ secrets.REGISTRY }}/kincaid-backend:${{ github.sha }} \
            -n kincaid-aios
          
          kubectl set image deployment/kincaid-frontend \
            frontend=${{ secrets.REGISTRY }}/kincaid-frontend:${{ github.sha }} \
            -n kincaid-aios
          
          kubectl rollout status deployment/kincaid-backend -n kincaid-aios
          kubectl rollout status deployment/kincaid-frontend -n kincaid-aios
```

---

## MONITORING

### Prometheus Metrics
```yaml
# prometheus-config.yaml
scrape_configs:
  - job_name: 'kincaid-backend'
    kubernetes_sd_configs:
      - role: pod
        namespaces:
          names: ['kincaid-aios']
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_label_app]
        regex: kincaid-backend
        action: keep
```

### Grafana Dashboards
- API request latency
- Error rates
- Agent task completion time
- Cache hit rates
- Database query performance

---

## SECURITY

### TLS Certificates
```bash
# Use cert-manager for automatic TLS
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.13.0/cert-manager.yaml

# Create ClusterIssuer
kubectl apply -f cluster-issuer.yaml
```

### Network Policies
```yaml
# network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: kincaid-network-policy
  namespace: kincaid-aios
spec:
  podSelector:
    matchLabels:
      app: kincaid-backend
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: kincaid-frontend
    ports:
    - protocol: TCP
      port: 8000
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: postgres
    ports:
    - protocol: TCP
      port: 5432
```

---

## BACKUP & DISASTER RECOVERY

### Database Backups
```bash
# Automated daily backups via Supabase
# Manual backup
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql
```

### Redis Backups
```bash
# Redis AOF persistence enabled
# Manual snapshot
redis-cli --rdb /backups/redis-$(date +%Y%m%d).rdb
```

---

## SCALING STRATEGY

### Horizontal Pod Autoscaling
- CPU threshold: 70%
- Memory threshold: 80%
- Min replicas: 3
- Max replicas: 20

### Database Scaling
- Read replicas for analytics
- Connection pooling (PgBouncer)
- Query optimization

### Caching Strategy
- Redis for hot data
- CDN for static assets
- Application-level caching

---

## TROUBLESHOOTING

### Common Issues

**Pods not starting:**
```bash
kubectl describe pod <pod-name> -n kincaid-aios
kubectl logs <pod-name> -n kincaid-aios
```

**High latency:**
```bash
# Check database connections
kubectl exec -it <backend-pod> -n kincaid-aios -- env | grep DATABASE

# Check Redis
kubectl exec -it <redis-pod> -n kincaid-aios -- redis-cli ping
```

**Memory issues:**
```bash
# Check resource usage
kubectl top pods -n kincaid-aios

# Increase memory limits if needed
kubectl set resources deployment/kincaid-backend --limits=memory=8Gi -n kincaid-aios
```

---

## PRODUCTION CHECKLIST

- [ ] All secrets stored in Kubernetes secrets
- [ ] TLS certificates configured
- [ ] Monitoring dashboards set up
- [ ] Alerts configured
- [ ] Backup strategy tested
- [ ] Load testing completed
- [ ] Security audit completed
- [ ] Documentation updated
- [ ] Team trained on operations
- [ ] Rollback procedure documented

---

**STATUS**: Deployment infrastructure ready for production.