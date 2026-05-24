import pandas as pd


def generate_insights(df):

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

        return {
            "total_spending": 0,
            "average_transaction": 0,
            "total_transactions": len(df)
        }

    # --------------------------------
    # CLEAN AMOUNTS
    # --------------------------------
    cleaned_values = (
        df[amount_column]
        .astype(str)
        .str.replace("$", "", regex=False)
        .str.replace(",", "", regex=False)
        .str.replace("CR", "", regex=False)
        .str.strip()
    )

    cleaned_values = pd.to_numeric(
        cleaned_values,
        errors="coerce"
    )

    cleaned_values = cleaned_values.fillna(0)

    # --------------------------------
    # CALCULATE INSIGHTS
    # --------------------------------
    total_spending = float(
        cleaned_values.sum()
    )

    average_transaction = float(
        cleaned_values.mean()
    )

    total_transactions = int(
        len(df)
    )

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