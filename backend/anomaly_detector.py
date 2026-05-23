from sklearn.ensemble import IsolationForest
import pandas as pd
import numpy as np


def detect_anomalies(df):

    df["debit"] = pd.to_numeric(
        df["debit"],
        errors="coerce"
    ).fillna(0)

    model = IsolationForest(
        contamination=0.05,
        random_state=42
    )

    df["anomaly"] = model.fit_predict(
        df[["debit"]]
    )

    anomalies = df[
        df["anomaly"] == -1
    ].copy()

    anomalies = anomalies.replace(
        [np.nan, np.inf, -np.inf],
        0
    )

    return anomalies.to_dict(
        orient="records"
    )