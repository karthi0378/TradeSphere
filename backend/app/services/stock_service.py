import requests
from flask import current_app


INDIAN_STOCKS = {
    "RELIANCE": "RELIANCE.NS",
    "TCS": "TCS.NS",
    "HDFCBANK": "HDFCBANK.NS",
    "INFY": "INFY.NS",
    "ICICIBANK": "ICICIBANK.NS",
    "BHARTIARTL": "BHARTIARTL.NS",
    "SBIN": "SBIN.NS",
    "LICI": "LICI.NS",
    "ITC": "ITC.NS",
    "LT": "LT.NS",
    "HCLTECH": "HCLTECH.NS",
    "MARUTI": "MARUTI.NS",
    "AXISBANK": "AXISBANK.NS",
    "KOTAKBANK": "KOTAKBANK.NS",
    "SUNPHARMA": "SUNPHARMA.NS",
    "TATAMOTORS": "TATAMOTORS.NS",
    "ASIANPAINT": "ASIANPAINT.NS",
    "WIPRO": "WIPRO.NS",
    "TITAN": "TITAN.NS",
    "ADANIENT": "ADANIENT.NS",
}


def get_indian_quote(symbol):
    yahoo_symbol = INDIAN_STOCKS.get(symbol)

    if not yahoo_symbol:
        raise ValueError("Indian stock symbol not configured")

    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{yahoo_symbol}"

    response = requests.get(
        url,
        params={
            "range": "1d",
            "interval": "1d"
        },
        headers={
            "User-Agent": "Mozilla/5.0"
        },
        timeout=10
    )

    response.raise_for_status()

    data = response.json()

    chart = data.get("chart", {})
    results = chart.get("result")

    if not results:
        raise ValueError("No stock data returned")

    result = results[0]
    meta = result.get("meta", {})

    price = meta.get("regularMarketPrice")

    if price is None:
        indicators = result.get("indicators", {})
        quote_data = indicators.get("quote", [{}])[0]
        closes = quote_data.get("close", [])

        if closes:
            valid_closes = [x for x in closes if x is not None]

            if valid_closes:
                price = valid_closes[-1]

    if price is None:
        raise ValueError("No current price returned")

    previous_close = (
        meta.get("previousClose")
        or meta.get("chartPreviousClose")
        or price
    )

    change = price - previous_close

    percent_change = (
        (change / previous_close) * 100
        if previous_close
        else 0
    )

    return {
        "symbol": symbol,
        "name": meta.get("longName") or meta.get("shortName"),
        "exchange": "NSE",
        "currency": "INR",
        "price": float(price),
        "change": float(change),
        "percent_change": float(percent_change),
        "previous_close": float(previous_close),
    }


def get_us_quote(symbol):
    api_key = current_app.config.get("TWELVE_DATA_API_KEY")

    if not api_key:
        raise ValueError("TWELVE_DATA_API_KEY is not configured")

    url = "https://api.twelvedata.com/quote"

    response = requests.get(
        url,
        params={
            "symbol": symbol,
            "apikey": api_key
        },
        timeout=10
    )

    response.raise_for_status()

    data = response.json()

    if data.get("status") == "error" or data.get("code"):
        raise ValueError(
            data.get("message", "Stock API error")
        )

    price = data.get("close") or data.get("price")

    if price is None:
        raise ValueError("No current price returned for this symbol")

    return {
        "symbol": data.get("symbol", symbol),
        "name": data.get("name"),
        "exchange": data.get("exchange"),
        "currency": data.get("currency"),
        "price": float(price),
        "change": float(data.get("change") or 0),
        "percent_change": float(data.get("percent_change") or 0),
        "previous_close": float(data.get("previous_close") or 0),
    }


def get_quote(symbol):
    symbol = symbol.upper().strip()

    if symbol in INDIAN_STOCKS:
        return get_indian_quote(symbol)

    return get_us_quote(symbol)
