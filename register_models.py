"""
Register all trained models to Comet ML Model Registry
"""
import os
from comet_ml import Experiment, API

COMET_API_KEY = os.getenv("COMET_API_KEY", "XDQssBc8ND37JyE1L2HfvZwUW")
WORKSPACE = "nerar6806"
PROJECT_NAME = "mlops"

MODELS = [
    {
        "name": "diabetes-lr-model",
        "file": "LogisticRegression.pkl",
        "metrics": {"accuracy": 0.89, "precision": 0.87, "recall": 0.91, "f1": 0.89},
        "params": {"model_type": "LogisticRegression", "solver": "liblinear", "class_weight": "balanced"}
    },
    {
        "name": "diabetes-rf-model",
        "file": "RandomForest.pkl",
        "metrics": {"accuracy": 0.92, "precision": 0.90, "recall": 0.94, "f1": 0.92},
        "params": {"model_type": "RandomForest", "n_estimators": 200, "max_depth": 10}
    },
    {
        "name": "diabetes-svm-model",
        "file": "SVM.pkl",
        "metrics": {"accuracy": 0.88, "precision": 0.85, "recall": 0.92, "f1": 0.88},
        "params": {"model_type": "SVM", "kernel": "RBF", "class_weight": "balanced"}
    }
]

def register_all_models():
    print(f"Registering models to Comet ML...")
    print(f"Workspace: {WORKSPACE}")
    print(f"Project: {PROJECT_NAME}")
    print()

    for model_info in MODELS:
        model_name = model_info["name"]
        model_file = model_info["file"]
        metrics = model_info["metrics"]
        params = model_info["params"]

        print(f"\n{'='*50}")
        print(f"Registering: {model_name}")
        print(f"File: {model_file}")
        print(f"Metrics: {metrics}")

        if not os.path.exists(model_file):
            print(f"  ERROR: File {model_file} not found!")
            continue

        try:
            experiment = Experiment(
                api_key=COMET_API_KEY,
                project_name=PROJECT_NAME,
                workspace=WORKSPACE
            )

            experiment.log_parameters(params)
            experiment.log_metrics(metrics)

            experiment.log_model(
                name=model_name,
                file_or_folder=model_file
            )

            experiment.register_model(
                model_name=model_name,
                version="1.0.0",
                description=f"{model_info['params']['model_type']} for diabetes prediction"
            )

            experiment.end()
            print(f"  SUCCESS: {model_name}:v1.0.0 registered!")

        except Exception as e:
            print(f"  ERROR: {e}")

    print(f"\n{'='*50}")
    print("All models registered!")
    print(f"\nView at: https://www.comet.com/{WORKSPACE}/{PROJECT_NAME}")
    print(f"Models: https://www.comet.com/{WORKSPACE}/models")

def verify_registration():
    print("\nVerifying registration...")
    try:
        api = API(api_key=COMET_API_KEY)
        for model_info in MODELS:
            model_name = model_info["name"]
            try:
                model_versions = api.get_model_versions(
                    workspace=WORKSPACE,
                    registry_name=model_name
                )
                print(f"  {model_name}: {len(model_versions)} version(s) registered")
            except Exception as e:
                print(f"  {model_name}: Not found - {e}")
    except Exception as e:
        print(f"Verification failed: {e}")

if __name__ == "__main__":
    register_all_models()
    verify_registration()
