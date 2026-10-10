
# BCA Final Year Project - Project Documentation Outline

## 1. Introduction

The Stock Trading System is a web-based virtual trading platform that allows registered users to monitor stock prices and practice buying and selling shares using virtual money.

## 2. Problem Statement

New investors need a safe environment to understand basic trading operations without risking real money. The system provides a simulated environment for learning portfolio management and transaction tracking.

## 3. Objectives

- Provide secure user authentication.
- Display stock market information.
- Simulate buying and selling.
- Maintain a virtual wallet.
- Track holdings and transactions.
- Calculate portfolio value and profit/loss.
- Provide a watchlist.
- Expose REST APIs reusable by web and mobile clients.

## 4. Technologies

Frontend: HTML, CSS, JavaScript
Backend: Python, Flask
Database: SQLite, SQLAlchemy
Authentication: JWT
External API: Twelve Data
Architecture: REST API

## 5. Main Modules

1. User Management
2. Authentication
3. Market Data
4. Virtual Wallet
5. Trading
6. Portfolio
7. Transactions
8. Watchlist

## 6. Security

Passwords are stored as password hashes. JWT is used for protected API requests. API credentials are stored in environment variables rather than source code.

## 7. Limitations

The project is a virtual trading system. It does not execute real brokerage orders and does not process real money.

## 8. Future Scope

- Mobile application
- Admin dashboard
- Advanced charts
- Notifications
- PostgreSQL deployment
- Cloud hosting
- Real brokerage integration subject to applicable regulations and broker APIs
