from fastapi import FastAPI
from fastapi.responses import StreamingResponse, FileResponse
import asyncio
import json
from fastapi.middleware.cors import CORSMiddleware
from inference import predict
from training import trigger_training
from drift import run_drift_check
from load_from_registry import load_latest_model
import pandas as pd
import os
from datetime import datetime

app = FastAPI(title="Diabetes Prediction MLOps API")

# Allow requests from the frontend (localhost:3000) and for local testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("Loading production model at startup...")
model = load_latest_model()

@app.get("/health")
def health():
    return {
        "status": "ok",
        "model_loaded": True,
        "model_type": type(model).__name__
    }

@app.post("/train")
def train():
    # log training request
    log_file = "training_log.csv"
    row = {"timestamp": datetime.utcnow(), "action": "triggered"}
    df = pd.DataFrame([row])
    if not os.path.exists(log_file):
        df.to_csv(log_file, index=False)
    else:
        df.to_csv(log_file, mode="a", header=False, index=False)

    trigger_training()
    return {"status": "Training started"}

@app.post("/predict")
def inference_endpoint(data: dict):
    return predict(data, model)

@app.get("/drift")
def drift():
    return run_drift_check()


@app.get('/drift_log')
def drift_log():
    f = 'drift_log.csv'
    if not os.path.exists(f):
        return {'log': []}
    df = pd.read_csv(f)
    return df.to_dict(orient='records')


@app.post('/observe')
def observe(data: dict):
    """Accept observed feature vectors (synthetic or real) and append to observations file."""
    file = 'observations.csv'
    df = pd.DataFrame([data])
    if not os.path.exists(file):
        df.to_csv(file, index=False)
    else:
        df.to_csv(file, mode='a', header=False, index=False)
    return {'status': 'observed'}


@app.get('/recent')
def recent_predictions():
    f = 'recent_predictions.csv'
    if not os.path.exists(f):
        return {'error': 'no recent predictions'}
    df = pd.read_csv(f)
    return df.to_dict(orient='records')


@app.get('/events')
async def events():
    async def event_stream():
        last_ts = None
        while True:
            try:
                if os.path.exists('recent_predictions.csv'):
                    df = pd.read_csv('recent_predictions.csv')
                    if not df.empty:
                        last_row = df.iloc[-1]
                        ts = str(last_row['timestamp'])
                        if ts != last_ts:
                            last_ts = ts
                            data = last_row.to_dict()
                            yield f"data: {json.dumps(data, default=str)}\n\n"
            except Exception:
                pass
            await asyncio.sleep(1)
    return StreamingResponse(event_stream(), media_type='text/event-stream')


@app.get('/training_log')
def training_log():
    f = 'training_log.csv'
    if not os.path.exists(f):
        return []
    df = pd.read_csv(f)
    return df.to_dict(orient='records')


@app.get('/drift_report')
def serve_drift_report():
    path = 'drift_report.html'
    if not os.path.exists(path):
        return {"error": "drift report not found"}
    return FileResponse(path, media_type='text/html', filename='drift_report.html')