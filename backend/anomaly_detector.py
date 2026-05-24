from sklearn.ensemble import IsolationForest
import pandas as pd


def detect_anomalies(df):

    amount_column = None

    possible_columns = [
        "debit",
        "amount",
        "withdrawal",
        "transaction_amount"
    ]

    for col in possible_columns:

        if col in df.columns:

            amount_column = col
            break

    # No usable amount column
    if amount_column is None:

        return []

    # --------------------------------
    # CLEAN AMOUNT VALUES
    # --------------------------------
    cleaned_values = (
        df[amount_column]
        .astype(str)
        .str.replace("$", "", regex=False)
        .str.replace(",", "", regex=False)
        .str.replace("CR", "", regex=False)
        .str.strip()
    )

    # Convert to numeric
    cleaned_values = pd.to_numeric(
        cleaned_values,
        errors="coerce"
    )

    # Replace NaN with 0
    cleaned_values = cleaned_values.fillna(0)

    # Create dataframe for ML
    values = cleaned_values.to_frame()

    # Isolation Forest
    model = IsolationForest(
        contamination=0.1,
        random_state=42
    )

    predictions = model.fit_predict(values)

    anomalies = []

    for i, pred in enumerate(predictions):

        if pred == -1:

            anomalies.append(
                df.iloc[i].to_dict()
            )

    return anomalies