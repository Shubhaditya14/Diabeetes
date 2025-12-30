import requests
import os
import time
from requests.exceptions import ConnectionError, Timeout, HTTPError


def trigger_training(retries: int = 8, backoff: float = 1.5):
    """Trigger the Airflow DAG via the Airflow REST API with retries.

    Retries are useful because Airflow can take some time to become
    available after startup. The backend and airflow services share a
    Docker network so `airflow:8080` should resolve from the backend
    container when using compose.
    """
    host = os.environ.get("AIRFLOW_HOST", "http://airflow:8080")
    dag_id = os.environ.get("AIRFLOW_DAG_ID", "diabetes_training_pipeline")
    url = f"{host.rstrip('/')}/api/v1/dags/{dag_id}/dagRuns"

    last_exc = None
    # Add optional basic auth if credentials provided via env
    auth = None
    api_user = os.environ.get("AIRFLOW_API_USER")
    api_pass = os.environ.get("AIRFLOW_API_PASSWORD")
    if api_user and api_pass:
        auth = (api_user, api_pass)

    for attempt in range(1, retries + 1):
        try:
            resp = requests.post(url, json={"conf": {}}, timeout=10, auth=auth)
            resp.raise_for_status()
            return resp.json()
        except (ConnectionError, Timeout) as exc:
            last_exc = exc
            wait = backoff * attempt
            time.sleep(wait)
        except HTTPError as exc:
            # Non-retryable HTTP error (4xx/5xx)
            raise RuntimeError(f"Airflow API error ({exc.response.status_code}): {exc.response.text}") from exc

    raise RuntimeError(f"Could not connect to Airflow at {host} after {retries} attempts") from last_exc
