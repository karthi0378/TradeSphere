
# Stock Trading System - Final Year BCA Project

A virtual/paper stock trading web application built with Flask REST API and a responsive HTML/CSS/JavaScript web frontend.

## Architecture

Browser Web App
        |
        v
Flask REST API
        |
   +----+----------------+
   |                     |
SQLite Database      Twelve Data API
   |
Users / Wallet / Holdings / Transactions / Watchlist

The same Flask API can later be consumed by an Android/Flutter mobile application.

## Project modules

### Authentication
- Registration
- Login
- JWT token
- Current user

### Market
- Stock quote lookup using Twelve Data

### Trading
- Virtual wallet
- Buy shares
- Sell shares
- Average purchase price

### Portfolio
- Current holdings
- Market value
- Invested amount
- Profit/loss

### User tools
- Transaction history
- Watchlist

## Setup

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```

Edit `.env`:

```env
SECRET_KEY=your-secret
JWT_SECRET_KEY=your-jwt-secret
TWELVE_DATA_API_KEY=your-twelve-data-key
DATABASE_URL=sqlite:///stock_trading.db
```

Start backend:

```powershell
python run.py
```

Backend:
`http://127.0.0.1:5000`

Frontend:

Open another PowerShell:

```powershell
cd frontend
python -m http.server 5500
```

Open:
`http://127.0.0.1:5500`

## API summary

### Auth
POST `/api/auth/register`
POST `/api/auth/login`
GET `/api/auth/me`

### Stocks
GET `/api/stocks/quote/AAPL`

### Trading
GET `/api/trading/wallet`
POST `/api/trading/buy`
POST `/api/trading/sell`

Example:

```json
{
  "symbol": "AAPL",
  "quantity": 2
}
```

### Portfolio
GET `/api/portfolio`
GET `/api/transactions`

### Watchlist
GET `/api/watchlist`
POST `/api/watchlist`
DELETE `/api/watchlist/AAPL`

## Important project scope

This is a virtual trading/educational application. It does not place real stock-market orders or handle real money.

## Suggested BCA project title

"Design and Development of a Web-Based Virtual Stock Trading System Using Flask REST API"

## Future extension

A mobile application can use the exact same REST endpoints. This keeps the backend independent from the user interface.
