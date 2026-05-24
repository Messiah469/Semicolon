import pandas as pd
import pdfplumber
import re


def extract_transactions(file_path):

    # =========================
    # CSV FILE PROCESSING
    # =========================
    if file_path.lower().endswith(".csv"):

        df = pd.read_csv(file_path)

        # Normalize column names
        df.columns = [
            col.strip().lower()
            for col in df.columns
        ]

        # Rename common columns
        rename_map = {

            "description": "narration",
            "transaction details": "narration",
            "remarks": "narration",

            "withdrawal": "debit",
            "withdrawals": "debit",

            "deposit": "credit",
            "deposits": "credit"

        }

        df.rename(
            columns=rename_map,
            inplace=True
        )

        return df.fillna("")

    # =========================
    # PDF FILE PROCESSING
    # =========================

    rows = []

    with pdfplumber.open(file_path) as pdf:

        for page in pdf.pages:

            text = page.extract_text()

            if not text:
                continue

            lines = text.split("\n")

            for line in lines:

                # Match transaction date
                date_match = re.search(
                    r"\d{2}-[A-Za-z]{3}-\d{2}",
                    line
                )

                if not date_match:
                    continue

                date = date_match.group()

                # Extract all money values
                amounts = re.findall(
                    r"\$[\d,]+\.\d{2}",
                    line
                )

                # Remove date from narration
                narration = re.sub(
                    r"\d{2}-[A-Za-z]{3}-\d{2}",
                    "",
                    line
                )

                # Remove amounts from narration
                for amt in amounts:
                    narration = narration.replace(
                        amt,
                        ""
                    )

                # Remove CR / DR
                narration = narration.replace(
                    "CR",
                    ""
                )

                narration = narration.replace(
                    "DR",
                    ""
                )

                narration = narration.strip()

                debit = ""
                credit = ""
                balance = ""

                # Heuristic parsing
                if len(amounts) == 1:

                    credit = amounts[0]

                elif len(amounts) >= 2:

                    credit = amounts[0]

                    balance = amounts[1]

                rows.append([

                    date,
                    narration,
                    debit,
                    credit,
                    balance

                ])

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