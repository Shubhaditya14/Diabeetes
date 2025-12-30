import pandas as pd

df = pd.read_csv("Diabetes_Final_Data_V2.csv")

# Drop target column – keep only features
df.drop("diabetic", axis=1).to_csv(
    "train_reference.csv",
    index=False
)

print("train_reference.csv created successfully")