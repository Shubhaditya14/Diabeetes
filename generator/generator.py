import time
import time
import os
import random
import requests
import pandas as pd

BACKEND = os.environ.get('BACKEND_URL', 'http://backend:8000')
INTERVAL = float(os.environ.get('GEN_INTERVAL', '2.0'))
CSV_PATH = os.environ.get('CSV_PATH', '/app/Diabetes_Final_Data_V2.csv')


def load_source():
    if os.path.exists(CSV_PATH):
        try:
            df = pd.read_csv(CSV_PATH)
            return df
        except Exception:
            return None
    return None


def sample_record(df):
    # sample a real row and perturb numeric columns slightly
    row = df.sample(1).iloc[0].to_dict()
    # perturb numeric columns
    for k, v in row.items():
        if isinstance(v, (int, float)):
            noise = (random.random() - 0.5) * 0.1 * (abs(v) + 1)
            row[k] = float(v + noise)
    # coerce expected types for categorical flags to 0/1
    for cat in ['gender','family_diabetes','hypertensive','family_hypertension','cardiovascular_disease','stroke']:
        if cat in row:
            try:
                row[cat] = int(round(float(row[cat])))
            except Exception:
                row[cat] = 0
    return row


def main():
    df = load_source()
    url = f"{BACKEND.rstrip('/')}/predict"
    while True:
        try:
            if df is not None:
                rec = sample_record(df)
            else:
                # fallback random generator
                rec = {
                    'age': random.randint(18, 80),
                    'gender': random.choice([0,1]),
                    'pulse_rate': random.randint(50, 110),
                    'systolic_bp': random.randint(90, 160),
                    'diastolic_bp': random.randint(60, 100),
                    'glucose': random.uniform(70, 200),
                    'height': random.uniform(150, 190),
                    'weight': random.uniform(50, 120),
                    'bmi': random.uniform(18, 40),
                    'family_diabetes': random.choice([0,1]),
                    'hypertensive': random.choice([0,1]),
                    'family_hypertension': random.choice([0,1]),
                    'cardiovascular_disease': random.choice([0,1]),
                    'stroke': random.choice([0,1])
                }

            requests.post(url, json=rec, timeout=5)
        except Exception:
            pass
        time.sleep(INTERVAL)


if __name__ == '__main__':
    main()
