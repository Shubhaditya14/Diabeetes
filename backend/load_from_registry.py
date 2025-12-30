import joblib
import os

try:
    from comet_ml.api import API
except Exception:
    API = None


def load_latest_model():
    if API is None:
        print("comet_ml not available — attempting to load local model from ./models")
        model_path = os.path.join("models", "LogisticRegression.pkl")
        if not os.path.exists(model_path):
            raise RuntimeError("comet_ml not installed and local model not found at ./models/LogisticRegression.pkl")
        model = joblib.load(model_path)
        print("Loaded local model successfully")
        return model

    print("Connecting to Comet...")
    api = API(api_key="pIuJsYSAD5iYthJbUtX922e1w")

    print("Fetching experiments...")
    experiments = api.get_experiments(
        workspace="shrxyxs",
        project_name="diabetes-prediction"
    )

    if not experiments:
        raise RuntimeError("No experiments found")

    exp = experiments[0]  # latest experiment

    os.makedirs("models", exist_ok=True)

    print("Downloading model...")
    exp.download_model("LogisticRegression", "models")

    model_path = os.path.join("models", "LogisticRegression.pkl")
    model = joblib.load(model_path)

    print("Model loaded successfully")
    return model
