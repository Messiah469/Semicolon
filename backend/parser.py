import pandas as pd
import pdfplumber


def extract_transactions(file_path):

    # -----------------------------
    # CSV FILE PROCESSING
    # -----------------------------
    if file_path.lower().endswith(".csv"):

        # Read raw CSV
        raw_df = pd.read_csv(
            file_path,
            header=None
        )

        header_row = None

        # Detect actual header row
        for i, row in raw_df.iterrows():

            row_values = [
                str(value).lower()
                for value in row.values
            ]

            if (
                "date" in row_values
                and (
                    "description" in row_values
                    or "narration" in row_values
                )
            ):

                header_row = i
                break

        # If no valid header found
        if header_row is None:

            return pd.DataFrame()

        # Reload CSV using detected header
        df = pd.read_csv(
            file_path,
            header=header_row
        )

        # Clean columns
        df.columns = [
            str(col).lower().strip()
            for col in df.columns
        ]

        # --------------------------------
        # STANDARDIZE NARRATION
        # --------------------------------
        narration_columns = [
            "narration",
            "description",
            "transaction details",
            "remarks",
            "details"
        ]

        for col in narration_columns:

            if col in df.columns:

                df.rename(
                    columns={
                        col: "narration"
                    },
                    inplace=True
                )

                break

        # --------------------------------
        # STANDARDIZE DEBIT
        # --------------------------------
        debit_columns = [
            "debit",
            "withdrawal",
            "amount",
            "debit amount"
        ]

        for col in debit_columns:

            if col in df.columns:

                df.rename(
                    columns={
                        col: "debit"
                    },
                    inplace=True
                )

                break

        # --------------------------------
        # STANDARDIZE CREDIT
        # --------------------------------
        credit_columns = [
            "credit",
            "deposit",
            "credit amount"
        ]

        for col in credit_columns:

            if col in df.columns:

                df.rename(
                    columns={
                        col: "credit"
                    },
                    inplace=True
                )

                break

        # --------------------------------
        # STANDARDIZE BALANCE
        # --------------------------------
        balance_columns = [
            "balance",
            "closing balance",
            "available balance"
        ]

        for col in balance_columns:

            if col in df.columns:

                df.rename(
                    columns={
                        col: "balance"
                    },
                    inplace=True
                )

                break

        return df.fillna("")

    # -----------------------------
    # PDF FILE PROCESSING
    # -----------------------------
    rows = []

    with pdfplumber.open(file_path) as pdf:

        for page in pdf.pages:

            table = page.extract_table()

            if table:

                for row in table[1:]:

                    if row and len(row) >= 5:

                        rows.append(row[:5])

    df = pd.DataFrame(
        rows,
        columns=[
            "date",
            "narration",
            "debit",
            "credit",
            "balance"
        ]
    )

    return df.fillna("")