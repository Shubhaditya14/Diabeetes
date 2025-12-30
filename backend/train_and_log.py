#diabeticsclassifier
try:
    from comet_ml import Experiment
except Exception:
    class Experiment:
        def __init__(self, *args, **kwargs):
            pass
        def set_name(self, *args, **kwargs):
            pass
        def log_parameters(self, *args, **kwargs):
            pass
        def log_metrics(self, *args, **kwargs):
            pass
        def log_asset(self, *args, **kwargs):
            pass
        def log_model(self, *args, **kwargs):
            pass
        def log_image(self, *args, **kwargs):
            pass
        def end(self, *args, **kwargs):
            pass

import joblib
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score
from sklearn.metrics import ConfusionMatrixDisplay, RocCurveDisplay
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from imblearn.over_sampling import SMOTE
import matplotlib.pyplot as plt

# ============== Load and Preprocess Data ==============
# Ensure this CSV exists in the same folder or provide full path
df = pd.read_csv("Diabetes_Final_Data_V2.csv") 

label_cols = [
    "gender", "family_diabetes", "hypertensive",
    "family_hypertension", "cardiovascular_disease", "stroke"
]

le = LabelEncoder()
for col in label_cols:
    df[col] = le.fit_transform(df[col])

df["diabetic"] = df["diabetic"].map({"No": 0, "Yes": 1})

X = df.drop("diabetic", axis=1)
y = df["diabetic"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

sm = SMOTE(random_state=42)
X_train, y_train = sm.fit_resample(X_train, y_train)

# ============== Helper Function (Comet ML) ==============
def log_results_to_comet(model_name, model, X_test, y_test, **params):
    
    experiment = Experiment(
        api_key="",  
        project_name="diabetes-prediction",
        workspace="",
        auto_output_logging="simple"
    )

    experiment.set_name(model_name)
    experiment.log_parameters(params)

    y_pred = model.predict(X_test)

    acc = accuracy_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred)
    recall = recall_score(y_test, y_pred)

    experiment.log_metrics({
        "accuracy": acc,
        "f1_score": f1,
        "precision": precision,
        "recall": recall
    })

    # --- FIX START: Save the model FIRST before trying to upload it ---
    model_path = f"{model_name}.pkl"
    joblib.dump(model, model_path)
    
    # Now you can log it as an asset (optional specific name)
    experiment.log_asset(
        model_path,
        file_name="production_model.pkl" # Overwrites name in Comet UI
    )
    
    # And log it as a registered model
    experiment.log_model(model_name, model_path)
    # --- FIX END ---

    # Confusion Matrix
    ConfusionMatrixDisplay.from_estimator(model, X_test, y_test)
    plt.title(f"{model_name} - Confusion Matrix")
    plt.savefig("confusion_matrix.png")
    experiment.log_image("confusion_matrix.png")
    plt.close()

    # ROC Curve
    RocCurveDisplay.from_estimator(model, X_test, y_test)
    plt.title(f"{model_name} - ROC Curve")
    plt.savefig("roc_curve.png")
    experiment.log_image("roc_curve.png")
    plt.close()

    experiment.end()

    print(f"{model_name} logged to Comet ML ✅")
    print(
        f"Accuracy: {acc:.3f}, "
        f"F1: {f1:.3f}, "
        f"Precision: {precision:.3f}, "
        f"Recall: {recall:.3f}\n"
    )

# ============== Train & Log Models ==============

lr = LogisticRegression(
    class_weight="balanced",
    solver="liblinear",
    random_state=42
)
lr.fit(X_train, y_train)
log_results_to_comet(
    "LogisticRegression",
    lr,
    X_test,
    y_test,
    solver="liblinear",
    class_weight="balanced"
)

svm = SVC(
    kernel="rbf",
    C=1.5,
    probability=True,
    class_weight="balanced",
    random_state=42
)
svm.fit(X_train, y_train)
log_results_to_comet(
    "SVM",
    svm,
    X_test,
    y_test,
    kernel="rbf",
    C=1.5,
    class_weight="balanced"
)

rf = RandomForestClassifier(
    n_estimators=200,
    max_depth=10,
    random_state=42
)
rf.fit(X_train, y_train)
log_results_to_comet(
    "RandomForest",
    rf,
    X_test,
    y_test,
    n_estimators=200,
    max_depth=10

)
