# MLOps Project

A full-stack ML operations platform with FastAPI backend, React frontend, Airflow orchestration, and real-time monitoring.

## Architecture

```
mlops/
├── backend/          # FastAPI ML prediction service
├── frontend/         # React dashboard
├── airflow/          # Airflow DAGs for ML pipelines
├── generator/        # Data generator service
├── monitor/          # Real-time monitoring service
├── models/           # Trained ML models
├── dags/             # Additional DAG definitions
└── docker-compose.yml
```

## Quick Start

```bash
# Clone the repository
git clone <repo-url>
cd mlops

# Copy environment file
cp .env.example .env
# Edit .env with your API keys

# Start all services
docker-compose up --build

# Access points:
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:8000
# - Airflow UI: http://localhost:8080
```

## Services

| Service | Port | Description |
|---------|------|-------------|
| frontend | 3000 | React dashboard |
| backend | 8000 | FastAPI ML API |
| airflow | 8080 | Workflow orchestration |
| generator | - | Data generator |
| monitor | - | Monitoring service |

## Development

```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

## CI/CD

GitHub Actions workflows are configured in `.github/workflows/`:

- **CI**: Linting, testing, and building on every push
- **CD**: Automated deployment on merge to main

## Environment Variables

| Variable | Description |
|----------|-------------|
| `COMET_API_KEY` | Comet ML API key for experiment tracking |
| `REACT_APP_BACKEND_URL` | Backend URL for frontend |

## License

MIT
