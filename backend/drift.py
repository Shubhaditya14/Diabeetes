from evidently.legacy.report import Report
from evidently.legacy.metric_preset import DataDriftPreset
import pandas as pd
import os
import numpy as np
import json
from datetime import datetime

def run_drift_check():

    if not os.path.exists("train_reference.csv"):
        return {"error": "train_reference.csv not found"}

    if not os.path.exists("recent_predictions.csv"):
        return {"error": "recent_predictions.csv not found. Call /predict first."}

    reference = pd.read_csv("train_reference.csv")
    current = pd.read_csv("recent_predictions.csv")

    # ✅ IMPORTANT FIX: align schemas
    if "prediction" in current.columns:
        current = current.drop(columns=["prediction"])

    if "timestamp" in current.columns:
        current = current.drop(columns=["timestamp"])

    report = Report(metrics=[DataDriftPreset()])
    report.run(reference_data=reference, current_data=current)
    report.save_html("drift_report.html")

    # Basic numeric mean-shift detector (fallback/simple):
    numeric_cols = reference.select_dtypes(include=[np.number]).columns.intersection(current.columns)
    shifts = {}
    drift = False
    for c in numeric_cols:
        ref_mean = reference[c].mean()
        cur_mean = current[c].mean()
        if pd.isna(ref_mean) or pd.isna(cur_mean):
            continue
        rel = abs(cur_mean - ref_mean) / (abs(ref_mean) + 1e-9)
        shifts[c] = float(rel)
        if rel > 0.15:  # 15% mean shift threshold
            drift = True

    # compute simple drift score (mean relative shift)
    if len(shifts) > 0:
        vals = list(shifts.values())
        drift_score = float(np.mean(vals))
        max_shift = float(np.max(vals))
    else:
        drift_score = 0.0
        max_shift = 0.0

    # append to drift log
    log_row = {
        "timestamp": datetime.utcnow().isoformat(),
        "drift": bool(drift),
        "drift_score": drift_score,
        "max_shift": max_shift,
        "shifts": json.dumps(shifts)
    }
    log_file = "drift_log.csv"
    dfrow = pd.DataFrame([log_row])
    if not os.path.exists(log_file):
        dfrow.to_csv(log_file, index=False)
    else:
        dfrow.to_csv(log_file, mode="a", header=False, index=False)

    return {"drift_report": "generated", "drift": drift, "shifts": shifts, "drift_score": drift_score}