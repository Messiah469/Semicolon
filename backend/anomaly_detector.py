from sklearn.ensemble import IsolationForest
import pandas as pd


def clean_amount(value):

    if pd.isna(value):
        return 0

    value = str(value)

    value = value.replace("$", "")
    value = value.replace(",", "")
    value = value.replace("CR", "")
    value = value.replace("DR", "")
    value = value.strip()

    if value == "":
        return 0

    try:
        return float(value)

    except:
        return 0


def detect_anomalies(df):

    if "debit" not in df.columns:
        return []

    # Clean debit values
    df["debit_clean"] = df["debit"].apply(clean_amount)

    # Remove zero values
    values = df[df["debit_clean"] > 0][["debit_clean"]]

    # Prevent empty dataframe crash
    if len(values) == 0:
        return []

    model = IsolationForest(
        contamination=0.1,
        random_state=42
    )

    predictions = model.fit_predict(values)

    anomaly_indices = values.index[predictions == -1]

    anomalies = df.loc[anomaly_indices]

    return anomalies.to_dict(
        orient="records"
    )