import numpy as np
from prediction_logger import log_prediction

def predict(data: dict, model):
    x = np.array([[
        data["age"],
        data["gender"],
        data["pulse_rate"],
        data["systolic_bp"],
        data["diastolic_bp"],
        data["glucose"],
        data["height"],
        data["weight"],
        data["bmi"],
        data["family_diabetes"],
        data["hypertensive"],
        data["family_hypertension"],
        data["cardiovascular_disease"],
        data["stroke"]
    ]])

    pred = int(model.predict(x)[0])
    log_prediction(data, pred)
    return {"prediction": pred}
