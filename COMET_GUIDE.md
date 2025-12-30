# Comet ML Guide

This guide explains how to use Comet ML for experiment tracking, model registry, and visualization in your MLOps project.

## What is Comet ML?

Comet ML is a platform for tracking machine learning experiments, managing models, and comparing performance across runs. It automatically logs:
- Metrics (accuracy, loss, F1, etc.)
- Hyperparameters
- Model artifacts
- Code and environment
- Visualizations (charts, images)

## Setting Up Comet ML

### 1. Get Your API Key

1. Go to [comet.com](https://www.comet.com) and sign up
2. After logging in, click your avatar → "Account Settings" → "API Keys"
3. Copy your API key (starts with `...` or `wsc_...`)

### 2. Add API Key to Your Project

Create a `.env` file in the project root:

```bash
COMET_API_KEY=your_api_key_here
```

Or set it as an environment variable:

```bash
export COMET_API_KEY=your_api_key_here
```

### 3. Verify in Docker

The `docker-compose.yml` already has `COMET_API_KEY` configured. Make sure it's set before running:

```bash
export COMET_API_KEY=your_key_here
docker-compose up --build
```

## Saving Models to Comet ML

Your project already has Comet ML integration. Here's how it works:

### In Training Code (`backend/train_and_log.py`)

```python
from comet_ml import Experiment

# Create experiment
experiment = Experiment(
    api_key="YOUR_API_KEY",
    project_name="mlops",
    workspace="nerar6806"
)

# Log hyperparameters
experiment.log_parameters({
    "model_type": "random_forest",
    "n_estimators": 200,
    "max_depth": 10,
    "learning_rate": 0.01
})

# Train your model
model = RandomForestClassifier(n_estimators=200, max_depth=10)
model.fit(X_train, y_train)

# Log metrics
experiment.log_metrics({
    "accuracy": accuracy_score(y_test, y_pred),
    "precision": precision_score(y_test, y_pred),
    "recall": recall_score(y_test, y_pred),
    "f1": f1_score(y_test, y_pred)
})

# Save model to Comet ML
experiment.log_model(
    name="diabetes-rf-model",
    file_or_folder="./RandomForest.pkl"
)

# Mark as ready for production
experiment.register_model(
    model_name="diabetes-rf-model",
    version="1.0.0",
    description="Random Forest for diabetes prediction"
)

experiment.end()
```

### Quick One-Line Model Save

```python
from comet_ml import start, log_model

# At the start of training
start(project_name="mlops")

# After training
log_model("my-model", "./model.pkl")
```

## Saving Images (Confusion Matrix, ROC Curves)

### Save Confusion Matrix

```python
from comet_ml import Experiment
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay

experiment = Experiment(api_key="YOUR_API_KEY", ...)

# Generate confusion matrix
cm = confusion_matrix(y_test, y_pred)
disp = ConfusionMatrixDisplay(confusion_matrix=cm)

# Plot and save
fig, ax = plt.subplots(figsize=(8, 6))
disp.plot(ax=ax)
plt.title("Confusion Matrix - Random Forest")

# Log to Comet ML
experiment.log_figure(figure_name="confusion_matrix", figure=plt.gcf())
plt.close()
```

### Save ROC Curve

```python
from comet_ml import Experiment
import matplotlib.pyplot as plt
from sklearn.metrics import roc_curve, auc

experiment = Experiment(api_key="YOUR_API_KEY", ...)

# Get probabilities
y_proba = model.predict_proba(X_test)[:, 1]

# Calculate ROC curve
fpr, tpr, thresholds = roc_curve(y_test, y_proba)
roc_auc = auc(fpr, tpr)

# Plot
plt.figure(figsize=(8, 6))
plt.plot(fpr, tpr, color='blue', lw=2, label=f'ROC curve (AUC = {roc_auc:.2f})')
plt.plot([0, 1], [0, 1], color='gray', lw=1, linestyle='--')
plt.xlim([0.0, 1.0])
plt.ylim([0.0, 1.05])
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('ROC Curve - Diabetes Prediction')
plt.legend(loc="lower right")

# Log to Comet ML
experiment.log_figure(figure_name="roc_curve", figure=plt.gcf())
plt.close()

# Also log AUC as a metric
experiment.log_metric("auc", roc_auc)
```

### Log Multiple Model Comparisons

```python
from comet_ml import Experiment

experiment = Experiment(api_key="YOUR_API_KEY", ...)

# Log comparison data
experiment.log_table(
    filename="model_comparison.csv",
    tabular_data={
        "Model": ["Logistic Regression", "Random Forest", "SVM"],
        "Accuracy": [0.89, 0.92, 0.88],
        "F1": [0.89, 0.92, 0.88]
    }
)

# Or log as asset
experiment.log_asset(
    asset_data="model_comparison.csv",
    asset_name="model_metrics.csv"
)
```

## Viewing Your Comet ML Dashboard

### 1. Open Comet ML

Go to [comet.com](https://www.comet.com) and log in.

### 2. Find Your Project

1. Click **"Projects"** in the sidebar
2. Find `mlops` (or your project name)
3. Click to open

### 3. View Experiments

The project page shows:
- **Experiments list**: All training runs with key metrics
- **Experiment details**: Click any run to see:
  - Hyperparameters used
  - Metrics over time (charts)
  - System info (CPU, GPU, memory)
  - Code version
  - Uploaded files and images

### 4. View Models

1. Click **"Models"** in the sidebar
2. See all registered models
3. Click a model to:
  - See version history
  - Download model files
  - Compare metrics across versions
  - Promote to staging/production

### 5. View Images

1. Open any experiment
2. Scroll to **"Assets"** section
3. Find your confusion matrix, ROC curves, etc.
4. Click to view full size

## Using Comet ML Programmatically

### Download a Registered Model

```python
from comet_ml import API

api = API(api_key="YOUR_API_KEY")

# Get latest version of a model
model = api.get_model(
    workspace="your_workspace",
    registry_name="diabetes-rf-model"
)

# Download model
model.download("./downloaded_model.pkl")
```

### List All Experiments

```python
from comet_ml import API

api = API(api_key="YOUR_API_KEY")

# Get all experiments in a project
experiments = api.get_experiments(
    project_name="mlops"
)

for exp in experiments:
    print(f"{exp.name}: {exp.metrics}")
```

### Compare Experiments

```python
from comet_ml import API

api = API(api_key="YOUR_API_KEY")

# Get two experiments
exp1 = api.get_experiment("experiment_key_1")
exp2 = api.get_experiment("experiment_key_2")

# Compare metrics
print(f"Exp1 Accuracy: {exp1.metrics['accuracy']}")
print(f"Exp2 Accuracy: {exp2.metrics['accuracy']}")
```

## Quick Reference

| Task | Comet ML Feature | Link |
|------|------------------|------|
| View experiments | Projects page | comet.com/projects |
| Download models | Model Registry | comet.com/models |
| See images/viz | Experiment → Assets | Open experiment → Assets |
| Compare runs | Experiment comparison | Select multiple → Compare |
| Production model | Model Registry | Register → Promote |

## Troubleshooting

### "API key not valid"

1. Go to comet.com → Account → API Keys
2. Copy the key (not the secret)
3. Make sure no extra spaces in `.env`

### "Experiment not appearing"

1. Make sure you called `experiment.end()` at the end
2. Check the project name matches exactly
3. Wait 30 seconds (Comet takes a moment to sync)

### "Model not saving"

```python
# Make sure you call log_model BEFORE end()
experiment.log_model("name", "./model.pkl")
experiment.end()  # Must come AFTER log_model
```

## Next Steps

1. Add your API key to `.env`
2. Run a training job: `docker-compose up airflow`
3. Open comet.com to see your experiment
4. Register your best model
5. Use the Model Registry to manage production models

## Example: Full Training Script

```python
from comet_ml import Experiment
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
import pandas as pd

# Load data
df = pd.read_csv("Diabetes_Final_Data_V2.csv")
X = df.drop("Outcome", axis=1)
y = df["Outcome"]

# Split
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Create Comet experiment
experiment = Experiment(
    api_key="YOUR_API_KEY",
    project_name="mlops",
    workspace="nerar6806"
)

# Log params
experiment.log_parameters({
    "model_type": "RandomForest",
    "n_estimators": 200,
    "max_depth": 10
})

# Train
model = RandomForestClassifier(n_estimators=200, max_depth=10)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
metrics = {
    "accuracy": accuracy_score(y_test, y_pred),
    "precision": precision_score(y_test, y_pred),
    "recall": recall_score(y_test, y_pred),
    "f1": f1_score(y_test, y_pred)
}
experiment.log_metrics(metrics)

# Save model
experiment.log_model("diabetes-rf-model", "./RandomForest.pkl")
experiment.register_model("diabetes-rf-model", version="1.0.0")

experiment.end()
print("Training complete! Check comet.com for results.")
```
