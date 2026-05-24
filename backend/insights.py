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


def generate_insights(df):

    if "debit" not in df.columns:

        return {
            "total_spending": 0,
            "average_transaction": 0,
            "total_transactions": 0
        }

    df["debit_clean"] = df["debit"].apply(clean_amount)

    total_spending = float(df["debit_clean"].sum())

    total_transactions = int(len(df))

    if total_transactions == 0:
        average_transaction = 0

    else:
        average_transaction = (
            total_spending / total_transactions
        )

    # Prevent NaN
    if pd.isna(average_transaction):
        average_transaction = 0

    return {

        "total_spending": round(
            total_spending,
            2
        ),

        "average_transaction": round(
            average_transaction,
            2
        ),

        "total_transactions": total_transactions
    }