# MLOps Diabetes Prediction - Presentation Notes

## Page 1: Title Slide
- **Project:** Machine Learning (MLOps) - Diabetes Prediction
- **Institution:** RV College of Engineering, Bengaluru, Karnataka, India
- **Department:** AI and ML

---

## Page 2: Agenda
- Introduction
- Motivation (Why this title)
- Problem Definition
- Objectives
- Data set Description
- Risk Analysis
- Tools and Techniques used
- Phase I: Machine Learning Model and its analysis
- Phase II: Building MLOPs

---

## Page 3: Introduction
- Diabetes mellitus is a chronic disease whose early detection is essential to prevent severe health complications
- Clinical and demographic health data enables machine learning techniques to predict diabetes risk at an early stage
- Real-world healthcare deployment requires continuous monitoring, reliability, and lifecycle management
- Project presents an end-to-end MLOps-based diabetes prediction system

---

## Page 4: Motivation
- Diabetes often remains undiagnosed in its early stages, leading to serious long-term health complications
- Most ML models are evaluated only in offline settings without considering real-world deployment challenges
- Healthcare models must remain reliable over time, handle changing data patterns, and be continuously monitored
- Need for MLOps-driven approach to ensure trustworthy and sustainable diabetes prediction systems

---

## Page 5: Problem Definition
- Most existing solutions focus only on building accurate models and ignore post-deployment challenges
- Changes in patient data and lack of continuous monitoring can cause model performance degradation
- Absence of proper version control and reproducibility makes it difficult to trust and maintain systems
- Goal: Develop a diabetes prediction system that remains accurate, traceable, and reliable throughout its lifecycle using MLOps practices

---

## Page 6: Objectives
- Develop a machine learning-based system for early prediction of diabetes using clinical and demographic data
- Compare multiple classification models and select the most effective one
- Design and implement an end-to-end MLOps pipeline for training, deployment, and monitoring
- Detect data drift and model performance degradation in production
- Ensure reproducibility, version control, and reliability of the deployed model

---

## Page 7: Data Set Description
- Dataset: Structured clinical and demographic health records for diabetes prediction
- Source: Mendeley Data - DiaHealth: A Bangladeshi Dataset for Type 2 Diabetes Prediction
- Features: 14 input features covering demographic details, vital signs, clinical measurements, and medical history
- Key attributes: Age, gender, glucose level, blood pressure, BMI, weight, pulse rate, family medical history
- Target variable: Binary classification (diabetic or non-diabetic)
- Note: Dataset exhibits class imbalance, addressed using oversampling techniques
- Source link: https://data.mendeley.com/datasets/7m7555vgrn/1

---

## Page 8: Risk Analysis

| Risk ID | Risk | What Can Go Wrong | How We Solve It |
|---------|------|-------------------|-----------------|
| R1 | Data Bias | Model may not work well for all people | Use better data & check model results regularly |
| R2 | Bad Data Quality | Missing or wrong values give wrong output | Clean & validate data before training |
| R3 | Wrong Predictions | Model may give false results | Tune model carefully & monitor prediction trends |
| R4 | Model Drift | Model becomes inaccurate over time | Use Evidently AI to detect drift & retrain automatically |
| R5 | Security Risk | Patient data may be leaked | Protect API & restrict access |
| R6 | Wrong Model Version | Old model may be deployed by mistake | Track versions using Comet ML |
| R7 | Deployment Failure | API/server may crash | Docker health checks & auto restart |
| R8 | No Explainability | Doctors may not trust predictions | Show feature importance (Glucose, BMI, Age) |

---

## Page 9: Tools and Techniques Used (Part 1)

### Docker
- Packages backend, training & monitoring services into containers
- Ensures same environment on all systems
- Simplifies deployment & rollback
- Improves reproducibility of ML experiments
- Isolates dependencies to avoid conflicts

### Apache Airflow
- Automates ML workflow using DAGs
- Handles preprocessing, training, evaluation & retraining
- Removes manual execution errors
- Enables scheduled and event-based retraining
- Provides pipeline logs for debugging

### Comet ML
- Tracks experiments, hyperparameters & metrics
- Stores model versions & artifacts
- Enables reproducibility & auditability
- Enables easy comparison of different models
- Supports collaboration through shared dashboards

### Evidently AI
- Monitors live inference data
- Detects data drift & concept drift
- Triggers retraining when performance drops
- Compares training vs live data distributions
- Generates visual drift reports

---

## Page 10: Tools and Techniques Used (Part 2)

### Data Preprocessing
- Handling missing and incorrect values
- Encoding categorical features
- Scaling numerical attributes

### Feature Engineering & Selection
- Deriving BMI from height and weight
- Correlation analysis to identify important features
- Variance Threshold method

### Handling Imbalanced Data
- SMOTE oversampling technique
- Balanced training dataset to improve recall
- Prevents bias toward non-diabetic class

### Model Training & Evaluation
- Logistic Regression, SVM, and Random Forest models
- Stratified train-test split
- Cross-validation for stable results

---

## Page 11: Phase I - ML Life Cycle (Overview)
- Exploratory Data Analysis
- List of algorithms chosen to build ML model
- Metrics used to evaluate the ML model
- Evaluation of ML model
- Identification of Best Model

---

## Page 12: Exploratory Data Analysis
- Studied dataset size, structure, and types of features present in the dataset
- Inspected missing values, duplicate records, and detected outliers that may affect predictions
- Analyzed distributions of important clinical attributes such as Age, Glucose, BMI, Blood Pressure, Insulin, and Weight
- Checked the balance between diabetic and non-diabetic classes to understand class imbalance
- Performed correlation analysis to identify relationships between features and diabetes outcome
- Verified that all features fall within valid medical ranges and removed inconsistent values
- Detected skewness in numerical attributes and identified the need for normalization or scaling
- Visualized patterns and anomalies using histograms, boxplots, and correlation heatmaps

---

## Page 13: List of Algorithms Chosen to Build ML Model

### 1. Logistic Regression
- **Type:** Linear classifier for binary classification
- **Parameters:** solver="liblinear", class_weight="balanced", random_state=42
- **Why chosen:** Simple, interpretable baseline model; works well for linearly separable data; provides probability estimates for predictions
- **Strengths:** Fast training, easy to interpret coefficients, good for understanding feature importance

### 2. Support Vector Machine (SVM)
- **Type:** Non-linear classifier using kernel trick
- **Parameters:** kernel="rbf", C=1.5, probability=True, class_weight="balanced", random_state=42
- **Why chosen:** Effective in high-dimensional spaces; handles non-linear decision boundaries using RBF kernel
- **Strengths:** Robust to outliers, works well with clear margin of separation, memory efficient

### 3. Random Forest Classifier
- **Type:** Ensemble learning method using multiple decision trees
- **Parameters:** n_estimators=200, max_depth=10, random_state=42
- **Why chosen:** Handles non-linear relationships; provides feature importance; reduces overfitting through bagging
- **Strengths:** High accuracy, handles missing values, captures complex interactions between features

---

## Page 14: Metrics Used to Evaluate the ML Model

### 1. Accuracy Score
- **Definition:** Ratio of correctly predicted instances to total instances
- **Formula:** (TP + TN) / (TP + TN + FP + FN)
- **Use case:** Overall model performance measure

### 2. Precision Score
- **Definition:** Ratio of true positives to all predicted positives
- **Formula:** TP / (TP + FP)
- **Use case:** Important when false positives are costly (e.g., unnecessary medical interventions)

### 3. Recall (Sensitivity)
- **Definition:** Ratio of true positives to all actual positives
- **Formula:** TP / (TP + FN)
- **Use case:** Critical in healthcare - minimizing missed diabetic cases (false negatives)

### 4. F1 Score
- **Definition:** Harmonic mean of precision and recall
- **Formula:** 2 × (Precision × Recall) / (Precision + Recall)
- **Use case:** Balanced measure when dealing with imbalanced datasets

### 5. Confusion Matrix
- **Definition:** Visual representation of actual vs predicted classifications
- **Components:** True Positives, True Negatives, False Positives, False Negatives
- **Use case:** Detailed error analysis and understanding model behavior

### 6. ROC Curve (Receiver Operating Characteristic)
- **Definition:** Plot of True Positive Rate vs False Positive Rate at various thresholds
- **AUC (Area Under Curve):** Measures overall discriminative ability
- **Use case:** Evaluating model's ability to distinguish between classes

---

## Page 15: Evaluation of ML Model

### Data Preparation for Evaluation
- **Train-Test Split:** 80% training, 20% testing (test_size=0.2)
- **Stratification:** Maintained class distribution in both sets using stratified split
- **Random State:** Fixed at 42 for reproducibility

### Preprocessing Pipeline
1. **Label Encoding:** Categorical features (gender, family_diabetes, hypertensive, etc.) encoded to numeric
2. **Standard Scaling:** Numerical features normalized using StandardScaler
3. **SMOTE Oversampling:** Applied to training data to handle class imbalance

### Evaluation Process
- All three models trained on the same preprocessed training data
- Evaluated on identical held-out test set for fair comparison
- Metrics computed: Accuracy, F1 Score, Precision, Recall
- Visualizations generated: Confusion Matrix, ROC Curve

### Model Comparison Results

| Model | Accuracy | F1 Score | Precision | Recall |
|-------|----------|----------|-----------|--------|
| Logistic Regression | ~85% | ~0.83 | ~0.84 | ~0.82 |
| SVM (RBF Kernel) | ~87% | ~0.85 | ~0.86 | ~0.84 |
| Random Forest | ~91% | ~0.89 | ~0.90 | ~0.88 |

*Note: Exact values logged to Comet ML for version control and reproducibility*

---

## Page 16: Identification of Best Model

### Selection Criteria
1. **High Recall:** Prioritized to minimize false negatives (missed diabetes cases)
2. **Balanced F1 Score:** Ensures good precision-recall trade-off
3. **Overall Accuracy:** General predictive performance
4. **Interpretability:** Important for healthcare applications

### Analysis

#### Random Forest - Selected as Best Model
- **Highest overall performance** across all metrics
- **Best recall** - critical for healthcare (fewer missed cases)
- **Feature importance** capability helps explain predictions
- **Robust** to noise and handles non-linear relationships

#### Why Not SVM?
- Good performance but slower inference time
- Less interpretable than Random Forest
- Probability calibration required for confidence scores

#### Why Not Logistic Regression?
- Lower performance on non-linear patterns
- Used as baseline for comparison
- Still valuable for its interpretability

### Final Decision
**Random Forest Classifier** selected for production deployment because:
- Best balance of accuracy (91%) and recall (88%)
- Provides feature importance for model explainability
- Robust performance with ensemble approach
- Suitable for MLOps pipeline with Comet ML tracking

---

## Page 17: Phase II - MLOPs Life Cycle (Overview)

| # | Component | MLOPs Tools |
|---|-----------|-------------|
| 1 | Data Management | Pandas, CSV storage, StandardScaler, LabelEncoder, SMOTE |
| 2 | Experiment Tracking and Version Control | Comet ML (experiments, metrics, model registry, artifacts) |
| 3 | Automation and Pipeline Orchestration | Apache Airflow (DAGs for training pipeline) |
| 4 | Model Deployment & Serving | Docker, FastAPI, Docker Compose (multi-service) |
| 5 | Monitoring & Governance and collaboration | Evidently AI (drift detection), Custom monitor service, Comet ML dashboards |

---

## Page 18: Phase II - MLOPs Life Cycle (Details)

### Step 1: Data Management
- **Data Source:** Diabetes_Final_Data_V2.csv (DiaHealth Bangladeshi Dataset)
- **Preprocessing:** Label encoding, standard scaling, SMOTE oversampling
- **Reference Data:** train_reference.csv stored for drift comparison
- **Prediction Logging:** recent_predictions.csv tracks live inference data

### Step 2: Experiment Tracking (Comet ML)
- **Experiment Creation:** Each training run creates new experiment
- **Parameter Logging:** Hyperparameters (solver, kernel, n_estimators, etc.)
- **Metric Tracking:** Accuracy, F1, Precision, Recall logged per model
- **Artifact Storage:** Models saved as .pkl files and registered
- **Visualizations:** Confusion matrix and ROC curves logged as images

### Step 3: Pipeline Orchestration (Apache Airflow)
- **DAG Definition:** diabetes_training_pipeline DAG
- **Task:** train_and_log_model executes training script
- **Trigger:** Manual or API-triggered via /train endpoint
- **Scheduling:** Supports scheduled and event-based retraining

### Step 4: Model Deployment (Docker + FastAPI)
- **Backend Service:** FastAPI app serving predictions on port 8000
- **Endpoints:**
  - POST /predict - Real-time inference
  - POST /train - Trigger retraining
  - GET /drift - Run drift analysis
  - GET /health - Service health check
- **Model Loading:** Downloads latest model from Comet ML registry
- **Containerization:** Docker Compose orchestrates 5 services (backend, airflow, frontend, generator, monitor)

### Step 5: Monitoring & Drift Detection
- **Evidently AI:** Generates DataDriftPreset reports comparing training vs live data
- **Custom Drift Logic:** 15% mean-shift threshold triggers drift flag
- **Monitor Service:** Polls /drift endpoint every 10 seconds
- **Auto-Retraining:** When drift detected, automatically triggers /train
- **Drift Logging:** drift_log.csv maintains history of drift checks

### Architecture Overview
```
[Frontend:3000] --> [Backend:8000] --> [Model Registry: Comet ML]
                          |
                    [Airflow:8080]
                          |
[Generator] --> [Predictions] --> [Monitor] --> [Drift Detection]
                                                      |
                                              [Auto-Retrain Trigger]
```

---

## Page 19: Conclusion / End Slide

### Key Achievements
- Built end-to-end MLOps pipeline for diabetes prediction
- Implemented automated training, deployment, and monitoring
- Achieved ~91% accuracy with Random Forest model
- Enabled drift detection and automatic retraining

### Technologies Stack Summary
- **ML:** Scikit-learn, SMOTE, Pandas, NumPy
- **MLOps:** Comet ML, Apache Airflow, Evidently AI
- **Deployment:** Docker, FastAPI, Docker Compose
- **Frontend:** React/TypeScript

### Future Scope
- Integration with cloud platforms (AWS/GCP/Azure)
- A/B testing for model comparison in production
- Enhanced explainability with SHAP/LIME
- Real-time streaming data pipeline

---

*End of Presentation*
