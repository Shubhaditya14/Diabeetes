import pandas as pd
import os
from datetime import datetime
import json

LOG_FILE = "recent_predictions.csv"

def log_prediction(features, prediction):
    row = features.copy()
    row["prediction"] = prediction
    row["timestamp"] = datetime.utcnow()

    df = pd.DataFrame([row])

    if not os.path.exists(LOG_FILE):
        df.to_csv(LOG_FILE, index=False)
    else:
        df.to_csv(LOG_FILE, mode="a", header=False, index=False)
    # also write a small latest JSON for quick access
    try:
        with open('latest_prediction.json', 'w') as f:
            json.dump({k: (str(v) if isinstance(v, (datetime,)) else v) for k,v in row.items()}, f, default=str)
    except Exception:
        pass