import time
import requests
import os

BACKEND = os.environ.get('BACKEND_URL', 'http://backend:8000')
INTERVAL = float(os.environ.get('MONITOR_INTERVAL', '10.0'))
DRIFT_THRESHOLD = float(os.environ.get('DRIFT_THRESHOLD', '0.1'))

# monitor polls /drift and when drift is detected, triggers /train

def check_and_act():
    drift_url = f"{BACKEND.rstrip('/')}/drift"
    train_url = f"{BACKEND.rstrip('/')}/train"
    try:
        resp = requests.get(drift_url, timeout=10)
        payload = resp.json()
        # drift.run_drift_check currently writes a report; we consider presence of 'drift' key
        if isinstance(payload, dict) and payload.get('drift'):
            # trigger training
            requests.post(train_url, timeout=10)
    except Exception:
        pass


def main():
    while True:
        check_and_act()
        time.sleep(INTERVAL)

if __name__ == '__main__':
    main()
