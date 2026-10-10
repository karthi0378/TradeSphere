
# API Documentation

Base URL: `http://127.0.0.1:5000/api`

## Authentication

### POST /auth/register

```json
{
  "name": "Karthik",
  "email": "karthik@example.com",
  "password": "password123"
}
```

### POST /auth/login

```json
{
  "email": "karthik@example.com",
  "password": "password123"
}
```

Save `access_token` and send:

`Authorization: Bearer <token>`

## Stock quote

GET `/stocks/quote/AAPL`

No login required.

## Wallet

GET `/trading/wallet`

Requires JWT.

## Buy

POST `/trading/buy`

```json
{
  "symbol": "AAPL",
  "quantity": 2
}
```

## Sell

POST `/trading/sell`

```json
{
  "symbol": "AAPL",
  "quantity": 1
}
```

## Portfolio

GET `/portfolio`

## Transactions

GET `/transactions`

## Watchlist

GET `/watchlist`

POST `/watchlist`

```json
{
  "symbol": "AAPL"
}
```

DELETE `/watchlist/AAPL`
