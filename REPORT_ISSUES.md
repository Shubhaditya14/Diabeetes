# MLOps Tutorial Report - Accuracy Issues

This document highlights inaccuracies between the PDF report and the actual project implementation.

---

## Page 6 - Section 1.3 (Tools and Environmental Setup)

**Issue:** Report claims the following monitoring tools are used:
> "Evidently AI is integrated to perform data drift detection and monitoring."

**Partial Truth:** Only Evidently AI is actually implemented. The report later (Page 26) implies Prometheus and Grafana are also used, but they are not present in the codebase.

---

## Page 12 - Section 3.3 (Feature Extraction)

**Issue:** Report claims these derived features were created:
- Mean Arterial Pressure (MAP)
- Pulse Pressure
- Glucose Category
- Age Group

**Reality:** None of these features exist in the code. `backend/train_and_log.py` uses raw CSV features directly without any feature engineering.

```python
# Actual code (train_and_log.py lines 38-52):
df = pd.read_csv("Diabetes_Final_Data_V2.csv")
# ... label encoding only, no derived features
X = df.drop("diabetic", axis=1)
```

---

## Page 15 - Section Numbering

**Issue:** Table of Contents (Page 2-3) lists "3.5 Governance and Data Version Control" but the body text shows "3.6 Governance and Data Version Control"

---

## Page 26-27 - Section 7.2 (Tools)

**Issue:** Report states:
> "Tools: Prometheus, Grafana, EvidentlyAI"

**Reality:**
- Prometheus - **NOT IMPLEMENTED**
- Grafana - **NOT IMPLEMENTED**
- Evidently AI - Implemented (drift.py)

No Prometheus or Grafana configuration files exist anywhere in the project.

---

## Page 29 - Section 8.4 (Documentation)

**Issue:** Report claims:
> "Model cards describe the purpose, architecture, training data..."
> "Data cards document dataset sources, preprocessing steps..."

**Reality:** No Model Cards or Data Cards files exist in the project.

---

## Page 31 - Appendix A.1 (Tools Table)

**Issue:** Table lists all tools as if implemented:

| Tool | Listed Feature | Actually Implemented? |
|------|---------------|----------------------|
| FastAPI | Backend API | Yes |
| Apache Airflow | Orchestration | Yes |
| Comet ML | Experiment Tracking | Yes |
| Evidently AI | Drift Detection | Yes |
| Docker | Containerization | Yes |
| React | Frontend | Yes |
| Prometheus | Monitoring | **NO** |
| Grafana | Dashboards | **NO** |

---

## Page 32-35 - Appendix A.4 (Folder Structure)

**Issue 1:** Shows `monitor.py` in wrong location:
```
├── backend/
│   ├── monitor.py    # Drift monitor, triggers retraining
```

**Reality:** `monitor.py` is at `/monitor/monitor.py`, not in backend/

**Issue 2:** Missing files not documented:
- `register_models.py` (root)
- `retrain_models.py` (root)
- `.github/workflows/ci.yml`
- `.github/workflows/cd.yml`
- `docker-compose.prod.yml`
- Root-level model files: `LogisticRegression.pkl`, `RandomForest.pkl`, `SVM.pkl`

---

## Page 32 - Appendix A.2 (Tool Installation)

**Issue:** States airflow requirements need installation but `airflow/requirements.txt` is **empty** (0 bytes).

---

## Security Issue (Not in report but in code)

**File:** `backend/train_and_log.py` line 69

**Issue:** Comet ML API key is hardcoded:
```python
api_key="pIuJsYSAD5iYthJbUtX922e1w"
```

Should use environment variable: `os.environ.get('COMET_API_KEY')`

---

## Summary

| Page | Section | Issue Type |
|------|---------|------------|
| 6 | 1.3 | Missing tools claim |
| 12 | 3.3 | Feature engineering not implemented |
| 15 | 3.5/3.6 | Section numbering mismatch |
| 26-27 | 7.2 | Prometheus/Grafana not present |
| 29 | 8.4 | Model/Data Cards don't exist |
| 31 | A.1 | Tool table includes unimplemented tools |
| 32-35 | A.4 | Folder structure inaccurate |
| 32 | A.2 | Empty requirements file |
