# Stock Trading System - Flask Backend

Final-year BCA project: virtual stock trading application.

## Features
- User registration and JWT login
- Virtual wallet
- Stock quote lookup through Twelve Data
- Buy and sell virtual shares
- Portfolio and profit/loss calculation
- Transaction history
- Watchlist
- Health endpoint
- CORS for web/mobile clients

## Setup - Windows PowerShell

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```

Edit `.env` and add your Twelve Data API key.

Run:

```powershell
python run.py
```

API base URL:
`http://127.0.0.1:5000/api`

## Main endpoints

POST `/api/auth/register`
POST `/api/auth/login`
GET `/api/auth/me`

GET `/api/stocks/quote/<symbol>`

GET `/api/wallet`
POST `/api/trading/buy`
POST `/api/trading/sell`

GET `/api/portfolio`
GET `/api/transactions`

GET `/api/watchlist`
POST `/api/watchlist`
DELETE `/api/watchlist/<symbol>`

GET `/api/health`

All money and trading are virtual/paper trading only.
