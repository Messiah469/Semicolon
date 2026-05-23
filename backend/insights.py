import pandas as pd


def generate_insights(df):

    df["debit"] = pd.to_numeric(
        df["debit"],
        errors="coerce"
    ).fillna(0)

    df["credit"] = pd.to_numeric(
        df["credit"],
        errors="coerce"
    ).fillna(0)

    total_income = float(df["credit"].sum())

    total_expense = float(df["debit"].sum())

    category_totals = (
        df.groupby("category")["debit"]
        .sum()
        .sort_values(ascending=False)
    )

    top_category = (
        category_totals.idxmax()
        if not category_totals.empty
        else "Others"
    )

    summary = (
        f"Total income is ₹{total_income:.2f}. "
        f"Total expenses are ₹{total_expense:.2f}. "
        f"Highest spending category is {top_category}."
    )

    return {
        "income": total_income,
        "expense": total_expense,
        "top_category": top_category,
        "summary": summary
    }