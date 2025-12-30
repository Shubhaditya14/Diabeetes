"""
Complete Training Pipeline - Retrain all models and register to Comet ML
"""
import os
os.environ["COMET_API_KEY"] = os.getenv("COMET_API_KEY", "XDQssBc8ND37JyE1L2HfvZwUW")

import comet_ml

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    confusion_matrix, ConfusionMatrixDisplay, roc_curve, auc
)
from comet_ml import Experiment, API
import joblib
from datetime import datetime

WORKSPACE = "nerar6806"
PROJECT_NAME = "mlops"
DATA_FILE = "Diabetes_Final_Data_V2.csv"

def load_and_preprocess_data():
    print("Loading data...")
    df = pd.read_csv(DATA_FILE)
    
    print(f"Dataset shape: {df.shape}")
    print(f"Columns: {list(df.columns)}")
    
    X = df.drop("Outcome", axis=1)
    y = df["Outcome"]
    
    print(f"Features: {X.shape[1]}, Samples: {X.shape[0]}")
    print(f"Class distribution: {dict(y.value_counts())}")
    
    return X, y

def train_models(X_train, X_test, y_train, y_test):
    models = {}
    
    print("\n--- Training Logistic Regression ---")
    lr = LogisticRegression(solver='liblinear', class_weight='balanced', max_iter=1000)
    lr.fit(X_train, y_train)
    models['LogisticRegression'] = lr
    print("LR trained")
    
    print("\n--- Training Random Forest ---")
    rf = RandomForestClassifier(n_estimators=200, max_depth=10, random_state=42)
    rf.fit(X_train, y_train)
    models['RandomForest'] = rf
    print("RF trained")
    
    print("\n--- Training SVM ---")
    svm = SVC(kernel='rbf', class_weight='balanced', probability=True, random_state=42)
    svm.fit(X_train, y_train)
    models['SVM'] = svm
    print("SVM trained")
    
    return models

def evaluate_models(models, X_test, y_test, experiment):
    results = {}
    
    for name, model in models.items():
        print(f"\nEvaluating {name}...")
        y_pred = model.predict(X_test)
        y_proba = model.predict_proba(X_test)[:, 1] if hasattr(model, 'predict_proba') else None
        
        metrics = {
            'accuracy': accuracy_score(y_test, y_pred),
            'precision': precision_score(y_test, y_pred),
            'recall': recall_score(y_test, y_pred),
            'f1': f1_score(y_test, y_pred)
        }
        
        experiment.log_metrics(metrics, prefix=name)
        print(f"  {name} metrics: {metrics}")
        
        results[name] = {
            'model': model,
            'metrics': metrics,
            'y_pred': y_pred,
            'y_proba': y_proba
        }
    
    return results

def save_confusion_matrix(y_true, y_pred, model_name, experiment):
    print(f"Generating confusion matrix for {model_name}...")
    cm = confusion_matrix(y_true, y_pred)
    
    fig, ax = plt.subplots(figsize=(8, 6))
    disp = ConfusionMatrixDisplay(confusion_matrix=cm)
    disp.plot(ax=ax, cmap='Blues')
    plt.title(f'Confusion Matrix - {model_name}')
    
    experiment.log_figure(figure_name=f"{model_name}_confusion_matrix", figure=fig)
    plt.savefig(f"confusion_matrix_{model_name}.png", dpi=150, bbox_inches='tight')
    plt.close()
    print(f"  Saved confusion_matrix_{model_name}.png")

def save_roc_curve(y_true, y_proba, model_name, experiment):
    print(f"Generating ROC curve for {model_name}...")
    fpr, tpr, thresholds = roc_curve(y_true, y_proba)
    roc_auc = auc(fpr, tpr)
    
    fig, ax = plt.subplots(figsize=(8, 6))
    ax.plot(fpr, tpr, color='blue', lw=2, label=f'ROC curve (AUC = {roc_auc:.3f})')
    ax.plot([0, 1], [0, 1], color='gray', lw=1, linestyle='--')
    ax.set_xlim([0.0, 1.0])
    ax.set_ylim([0.0, 1.05])
    ax.set_xlabel('False Positive Rate')
    ax.set_ylabel('True Positive Rate')
    ax.set_title(f'ROC Curve - {model_name}')
    ax.legend(loc="lower right")
    
    experiment.log_figure(figure_name=f"{model_name}_roc_curve", figure=fig)
    experiment.log_metric(f"{model_name}_auc", roc_auc)
    plt.savefig(f"roc_curve_{model_name}.png", dpi=150, bbox_inches='tight')
    plt.close()
    print(f"  Saved roc_curve_{model_name}.png (AUC: {roc_auc:.3f})")
    
    return roc_auc

def save_all_models(models, results):
    print("\n--- Saving Models ---")
    
    model_configs = {
        'LogisticRegression': {
            'file': 'LogisticRegression.pkl',
            'params': {'solver': 'liblinear', 'class_weight': 'balanced', 'max_iter': 1000}
        },
        'RandomForest': {
            'file': 'RandomForest.pkl',
            'params': {'n_estimators': 200, 'max_depth': 10, 'random_state': 42}
        },
        'SVM': {
            'file': 'SVM.pkl',
            'params': {'kernel': 'rbf', 'class_weight': 'balanced', 'random_state': 42}
        }
    }
    
    for name, model in models.items():
        file_path = model_configs[name]['file']
        joblib.dump(model, file_path)
        print(f"  Saved {file_path}")
        
        experiment.log_model(name=f"diabetes-{name.lower()}-model", file_or_folder=file_path)
    
    return model_configs

def register_models(model_configs, results):
    print("\n--- Registering Models to Comet ML ---")
    
    model_names = {
        'LogisticRegression': 'diabetes-lr-model',
        'RandomForest': 'diabetes-rf-model',
        'SVM': 'diabetes-svm-model'
    }
    
    for name, config in model_configs.items():
        model_file = config['file']
        metrics = results[name]['metrics']
        comet_name = model_names[name]
        
        print(f"  Registering {comet_name}:v1.0.0...")
        print(f"    Accuracy: {metrics['accuracy']:.2f}, F1: {metrics['f1']:.2f}")
        
        try:
            experiment.register_model(
                model_name=comet_name,
                version="1.0.0",
                description=f"{name} for diabetes prediction - Retrained {datetime.now().strftime('%Y-%m-%d %H:%M')}"
            )
            print(f"    Registered successfully!")
        except Exception as e:
            print(f"    Registration note: {e}")

def main():
    print("=" * 60)
    print("  MLOps Model Retraining Pipeline")
    print("  Workspace: nerar6806 | Project: mlops")
    print("=" * 60)
    
    experiment = Experiment(
        api_key=os.getenv("COMET_API_KEY", "XDQssBc8ND37JyE1L2HfvZwUW"),
        project_name=PROJECT_NAME,
        workspace=WORKSPACE
    )
    
    experiment.set_name(f"retraining-{datetime.now().strftime('%Y%m%d-%H%M%S')}")
    
    X, y = load_and_preprocess_data()
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    joblib.dump(scaler, 'scaler.pkl')
    experiment.log_model("scaler", "scaler.pkl")
    print("\nSaved and logged scaler.pkl")
    
    models = train_models(X_train_scaled, X_test_scaled, y_train, y_test)
    
    results = evaluate_models(models, X_test_scaled, y_test, experiment)
    
    print("\n--- Generating Visualizations ---")
    for name, result in results.items():
        save_confusion_matrix(y_test, result['y_pred'], name, experiment)
        if result['y_proba'] is not None:
            save_roc_curve(y_test, result['y_proba'], name, experiment)
    
    save_all_models(models, results)
    register_models({'LogisticRegression': models['LogisticRegression'], 'RandomForest': models['RandomForest'], 'SVM': models['SVM']}, results)
    
    experiment.end()
    
    print("\n" + "=" * 60)
    print("  Training Complete!")
    print("=" * 60)
    print("\nMetrics Summary:")
    for name, result in results.items():
        m = result['metrics']
        print(f"  {name}: Accuracy={m['accuracy']:.2f}, F1={m['f1']:.2f}")
    
    print(f"\nView experiments: https://www.comet.com/{WORKSPACE}/{PROJECT_NAME}")
    print(f"View models: https://www.comet.com/{WORKSPACE}/models")
    print("\nGenerated files:")
    print("  - LogisticRegression.pkl")
    print("  - RandomForest.pkl")
    print("  - SVM.pkl")
    print("  - scaler.pkl")
    print("  - confusion_matrix_*.png (3 files)")
    print("  - roc_curve_*.png (3 files)")

if __name__ == "__main__":
    main()
