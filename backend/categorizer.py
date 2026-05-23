CATEGORY_KEYWORDS = {

    "Food": [
        "zomato",
        "swiggy",
        "restaurant",
        "cafe"
    ],

    "Shopping": [
        "amazon",
        "flipkart",
        "myntra"
    ],

    "Travel": [
        "uber",
        "ola",
        "irctc"
    ],

    "Salary": [
        "salary",
        "credited"
    ],

    "Rent": [
        "rent",
        "landlord"
    ],

    "Subscription": [
        "netflix",
        "spotify",
        "prime"
    ],

    "UPI": [
        "upi",
        "gpay",
        "phonepe",
        "paytm"
    ],

    "EMI": [
        "emi",
        "loan"
    ]
}


def detect_category(text):

    text = str(text).lower()

    for category, words in CATEGORY_KEYWORDS.items():

        for word in words:

            if word in text:
                return category

    return "Others"


def categorize_transactions(df):

    df["category"] = df[
        "narration"
    ].apply(detect_category)

    return df