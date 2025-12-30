# MLOps Tutorial Report - Screenshot Placement Guide

This guide provides detailed instructions on what screenshots to capture and where to place them in the MLOps Tutorial Report.

---

## Phase 1: Model Development and Foundations

### Chapter 3: Data Collection and Preprocessing

#### Section 3.1 - Data Collection and Exploration
**Screenshots needed:**
1. **SS-3.1a: Dataset Overview**
   - **What:** `df.head()` and `df.info()` output showing dataset structure
   - **How:** Run in Jupyter/Python: `pd.read_csv("Diabetes_Final_Data_V2.csv").head()`
   - **Where:** After "The dataset includes attributes such as age, gender..."

2. **SS-3.1b: Dataset Statistics**
   - **What:** `df.describe()` output showing statistical summary
   - **How:** Run `df.describe()` in Python
   - **Where:** After dataset structure screenshot

3. **SS-3.1c: Class Distribution**
   - **What:** Bar chart showing diabetic vs non-diabetic counts
   - **How:** `df['diabetic'].value_counts().plot(kind='bar')`
   - **Where:** After "Checked the balance between diabetic and non-diabetic classes"

#### Section 3.2 - Data Profiling, Cleaning, and Preprocessing
**Screenshots needed:**
4. **SS-3.2a: Missing Values Heatmap**
   - **What:** Heatmap showing missing values in dataset
   - **How:** `import seaborn as sns; sns.heatmap(df.isnull())`
   - **Where:** After "Missing values, duplicate records, and inconsistent formats"

5. **SS-3.2b: Correlation Heatmap**
   - **What:** Feature correlation matrix heatmap
   - **How:** `sns.heatmap(df.corr(), annot=True, cmap='coolwarm')`
   - **Where:** After "correlation analysis revealed that features such as glucose..."

#### Section 3.3 - Feature Extraction and Feature Selection
**Screenshots needed:**
6. **SS-3.3a: Feature Importance Plot**
   - **What:** Bar chart showing Random Forest feature importances
   - **How:** After training RF model: `plt.barh(features, rf.feature_importances_)`
   - **Where:** After "Random Forest feature importance, to estimate feature contribution"

---

### Chapter 4: Model Development and Evaluation

#### Section 4.1 - Model Building
**Screenshots needed:**
7. **SS-4.1a: Training Code Snippet**
   - **What:** Screenshot of `train_and_log.py` showing model definitions
   - **File:** `backend/train_and_log.py` lines 130-178
   - **Where:** After "Baselines: LogisticRegression for interpretability"

#### Section 4.2 - Training, Validation and Testing
**Screenshots needed:**
8. **SS-4.2a: SMOTE Application**
   - **What:** Code showing SMOTE oversampling and class balance before/after
   - **How:** Show `y_train.value_counts()` before and after SMOTE
   - **Where:** After "Apply SMOTE on training fold only"

9. **SS-4.2b: Train-Test Split**
   - **What:** Screenshot showing stratified split code and data shapes
   - **Where:** After "Use stratified train/test split to preserve class balance"

#### Section 4.3 - Evaluation Metrics and Visualization
**Screenshots needed (already partially present):**
10. **Figure 1: Confusion Matrix** (Already in report - Page 14)
    - Located at: `confusion_matrix.png` in project root

11. **Figure 2: ROC Curve** (Already in report - Page 15)
    - Located at: `roc_curve.png` in project root

12. **SS-4.3a: Model Comparison Table**
    - **What:** Terminal/notebook output showing all 3 models' metrics
    - **How:** Run `train_and_log.py` and capture the printed metrics
    - **Where:** After the accuracy comparison paragraph

#### Section 4.4 - Experiment Tracking
**Screenshots needed:**
13. **SS-4.4a: Comet ML Dashboard - Experiments List**
    - **What:** Comet ML web interface showing list of experiments
    - **How:** Go to `comet.ml` > Your workspace > diabetes-prediction project
    - **Where:** After "For each experiment, create a Comet Experiment"

14. **SS-4.4b: Comet ML - Experiment Details**
    - **What:** Single experiment view showing metrics, parameters, artifacts
    - **How:** Click on one experiment in Comet ML
    - **Where:** After "Use the Comet dashboard to compare runs"

15. **SS-4.4c: Comet ML - Model Registry**
    - **What:** Model registry showing registered model versions
    - **How:** Comet ML > Model Registry section
    - **Where:** After "register the model and note the production tag"

16. **SS-4.4d: Comet ML - Metrics Comparison**
    - **What:** Side-by-side comparison of multiple experiments
    - **How:** Select multiple experiments > Compare
    - **Where:** After "compare runs, inspect metrics"

---

## Phase 2: Deployment, Monitoring and Governance

### Chapter 6: Model Analysis and Refinement

#### Section 6.1 - Revisiting Model Performance
**Screenshots needed:**
17. **SS-6.1a: recent_predictions.csv Sample**
    - **What:** Screenshot of recent_predictions.csv content
    - **File:** `backend/recent_predictions.csv`
    - **Where:** After "Prediction outputs stored in recent_predictions.csv"

#### Section 6.3 - Interpretability
**Screenshots needed:**
18. **SS-6.3a: Feature Importance Analysis**
    - **What:** Feature importance bar chart from Random Forest
    - **How:** `plt.barh(feature_names, model.feature_importances_)`
    - **Where:** After "Feature importance scores and coefficient analysis"

#### Section 6.4 - Model Versioning and Registry
**Screenshots needed:**
19. **SS-6.4a: Model Artifacts Directory**
    - **What:** Terminal showing `ls -la models/` with .pkl files
    - **Where:** After "stored either locally in the models directory"

20. **SS-6.4b: Comet ML Model Versions**
    - **What:** Comet ML showing different model versions
    - **Where:** After "structured versioning approach enables rollback"

---

### Chapter 7: Implementing CI/CD Pipeline

#### Section 7.2 - Tools Setup
**Screenshots needed:**
21. **SS-7.2a: Docker Compose File**
    - **What:** Screenshot of `docker-compose.yml`
    - **File:** `docker-compose.yml`
    - **Where:** After "Using Docker Compose to manage and deploy"

22. **SS-7.2b: Docker Services Running**
    - **What:** Terminal showing `docker-compose ps` or `docker ps`
    - **How:** Run `docker-compose up -d && docker-compose ps`
    - **Where:** After Docker Compose explanation

#### Section 7.3 - Automating Model Training and Testing
**Screenshots needed:**
23. **SS-7.3a: Airflow DAG View**
    - **What:** Apache Airflow web UI showing diabetes_training_pipeline DAG
    - **How:** Go to `localhost:8080` > DAGs
    - **Where:** After "the pipeline executes the training orchestration script"

24. **SS-7.3b: Airflow DAG Graph**
    - **What:** DAG graph view showing task dependencies
    - **How:** Click on DAG > Graph view
    - **Where:** After previous Airflow screenshot

25. **SS-7.3c: Airflow DAG Run Success**
    - **What:** Successful DAG run showing green task status
    - **How:** Trigger DAG and wait for completion
    - **Where:** After "Automated validation ensures that only models meeting..."

#### Section 7.4 - Building and Running Deployment Pipeline
**Screenshots needed:**
26. **SS-7.4a: Docker Build Output**
    - **What:** Terminal showing docker-compose build output
    - **How:** Run `docker-compose build`
    - **Where:** After "deployment pipeline builds Docker images"

27. **SS-7.4b: All Services Up**
    - **What:** Docker Compose showing all 5 services running
    - **How:** `docker-compose up -d && docker-compose ps`
    - **Where:** After "deployed using Docker Compose"

#### Section 7.5 - CI/CD Hands-On Exercise (PAGE 21 - [images] placeholder)
**Screenshots needed:**
28. **SS-7.5a: FastAPI Swagger UI**
    - **What:** FastAPI automatic docs at `localhost:8000/docs`
    - **How:** Open browser to `http://localhost:8000/docs`
    - **Caption:** "FastAPI Swagger UI showing available endpoints"

29. **SS-7.5b: Health Check Endpoint**
    - **What:** Response from `/health` endpoint
    - **How:** `curl localhost:8000/health` or browser
    - **Caption:** "Health check confirming model is loaded"

30. **SS-7.5c: Prediction Endpoint Test**
    - **What:** POST request to `/predict` with sample data and response
    - **How:** Use Swagger UI or curl to test prediction
    - **Caption:** "Successful prediction from deployed model"

31. **SS-7.5d: Frontend Dashboard**
    - **What:** React frontend at `localhost:3000`
    - **How:** Open browser to `http://localhost:3000`
    - **Caption:** "Frontend dashboard for diabetes prediction"

32. **SS-7.5e: Training Trigger**
    - **What:** Response from `/train` endpoint triggering Airflow
    - **How:** POST to `localhost:8000/train`
    - **Caption:** "Training triggered via API endpoint"

---

### Chapter 8: Monitoring and Tracking Model Lifecycle

#### Section 8.2 - Tools: EvidentlyAI and Frontend Visualization
**Screenshots needed:**
33. **SS-8.2a: Evidently AI Drift Report (HTML)**
    - **What:** Browser view of `drift_report.html`
    - **File:** `backend/drift_report.html`
    - **Where:** After "compiled into a detailed HTML report"

34. **SS-8.2b: Evidently Drift Summary**
    - **What:** Summary section of Evidently drift report
    - **Where:** After previous screenshot

35. **SS-8.2c: Evidently Feature Drift Details**
    - **What:** Per-feature drift analysis from Evidently report
    - **Where:** After "Compares training vs live data distributions"

#### Section 8.3 - Detecting Concept Drift and Data Drift
**Screenshots needed:**
36. **SS-8.3a: Drift Endpoint Response**
    - **What:** JSON response from `/drift` endpoint
    - **How:** `curl localhost:8000/drift`
    - **Where:** After "drift detection is performed by comparing"

37. **SS-8.3b: drift_log.csv Sample**
    - **What:** Content of drift log file showing drift history
    - **How:** View `drift_log.csv` if it exists after running drift checks
    - **Where:** After "quantitative metrics and visual summaries"

#### Section 8.4 - Model Retraining and Redeployment
**Screenshots needed:**
38. **SS-8.4a: Auto-Retraining Trigger**
    - **What:** Monitor service logs showing drift detection and retraining trigger
    - **How:** `docker-compose logs monitor`
    - **Where:** After "the model retraining process is triggered"

39. **SS-8.4b: Airflow Retraining Run**
    - **What:** New DAG run triggered by drift detection
    - **How:** Airflow UI showing new run after drift
    - **Where:** After "follows the same automated pipeline"

#### Section 8.5 - Logging, Alerting, and Dashboard Setup
**Screenshots needed:**
40. **SS-8.5a: Prediction Logs**
    - **What:** Sample of recent_predictions.csv with timestamps
    - **Where:** After "Each inference request and response is logged"

41. **SS-8.5b: Training Log**
    - **What:** Content of training_log.csv
    - **How:** View file or call `/training_log` endpoint
    - **Where:** After "Dashboards built using frontend visualization tools"

42. **SS-8.5c: Frontend Monitoring View**
    - **What:** Frontend showing prediction trends/drift indicators
    - **How:** Navigate to monitoring section of React app
    - **Where:** After "present prediction trends, drift indicators"

---

### Chapter 9: Performance Evaluation and Governance

#### Section 9.4 - Documentation: Model Cards and Data Cards
**Screenshots needed:**
43. **SS-9.4a: Comet ML Experiment Metadata**
    - **What:** Comet ML showing logged parameters and metadata
    - **Where:** After "Model cards describe the purpose, architecture"

---

## Summary: Quick Reference Table

| Screenshot ID | Section | What to Capture | Tool/Command |
|--------------|---------|-----------------|--------------|
| SS-3.1a | 3.1 | Dataset head/info | Python: `df.head()` |
| SS-3.1b | 3.1 | Dataset statistics | Python: `df.describe()` |
| SS-3.1c | 3.1 | Class distribution | Matplotlib bar chart |
| SS-3.2a | 3.2 | Missing values | Seaborn heatmap |
| SS-3.2b | 3.2 | Correlation matrix | Seaborn heatmap |
| SS-3.3a | 3.3 | Feature importance | Matplotlib barh |
| SS-4.4a-d | 4.4 | Comet ML views | comet.ml website |
| SS-7.2a-b | 7.2 | Docker setup | docker-compose |
| SS-7.3a-c | 7.3 | Airflow DAG | localhost:8080 |
| SS-7.5a-e | 7.5 | **CI/CD Exercise** | Multiple tools |
| SS-8.2a-c | 8.2 | Evidently report | drift_report.html |
| SS-8.3a-b | 8.3 | Drift detection | /drift endpoint |
| SS-8.5a-c | 8.5 | Logs & dashboard | CSV files, frontend |

---

## How to Capture Screenshots

### Terminal Screenshots
```bash
# Start all services
docker-compose up -d

# View running containers
docker-compose ps

# View logs
docker-compose logs backend
docker-compose logs airflow
docker-compose logs monitor
```

### API Testing
```bash
# Health check
curl http://localhost:8000/health

# Prediction
curl -X POST http://localhost:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"age":45,"gender":1,"pulse_rate":72,"systolic_bp":120,"diastolic_bp":80,"glucose":150,"height":170,"weight":75,"bmi":26,"family_diabetes":1,"hypertensive":0,"family_hypertension":1,"cardiovascular_disease":0,"stroke":0}'

# Drift check
curl http://localhost:8000/drift

# Trigger training
curl -X POST http://localhost:8000/train
```

### URLs to Access
| Service | URL |
|---------|-----|
| Backend API | http://localhost:8000 |
| API Docs (Swagger) | http://localhost:8000/docs |
| Airflow UI | http://localhost:8080 |
| Frontend | http://localhost:3000 |
| Drift Report | http://localhost:8000/drift_report |

---

## Notes

1. **Order matters**: Run the system and generate predictions before taking drift screenshots
2. **Airflow login**: Default credentials are `admin`/`admin`
3. **Comet ML**: Ensure you've run training at least once to have experiments logged
4. **Screenshots should be clear**: Use light theme for better print quality
5. **Add figure captions**: Each screenshot should have a descriptive caption like "Figure X: Description"
