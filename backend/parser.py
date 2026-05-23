import pandas as pd
import pdfplumber


def extract_transactions(file_path):

    # CSV FILE
    if file_path.lower().endswith(".csv"):

        df = pd.read_csv(file_path)

        return df.fillna("")

    # PDF FILE
    rows = []

    with pdfplumber.open(file_path) as pdf:

        for page in pdf.pages:

            table = page.extract_table()

            if table:

                for row in table[1:]:
                    rows.append(row)

    df = pd.DataFrame(rows)

    df.columns = [
        "date",
        "narration",
        "debit",
        "credit",
        "balance"
    ]

    return df.fillna("")