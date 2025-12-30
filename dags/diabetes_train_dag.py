from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime
import subprocess

def train_model():
    subprocess.run(
        ["python", "backend/train_and_log.py"],
        cwd="/opt/airflow"
    )

with DAG(
    dag_id="diabetes_training_pipeline",
    start_date=datetime(2024, 1, 1),
    schedule_interval=None,  # manual trigger
    catchup=False,
) as dag:

    train = PythonOperator(
        task_id="train_and_log_model",
        python_callable=train_model,
    )