# Technical Assessment: Fourfront Management & Money Tracker

This repository contains a high-fidelity implementation of a Frontend Dashboard and a robust Backend API as part of a technical assessment.

## Project Overview
- **Frontend**: A premium investment club dashboard built with Bootstrap 5, featuring a responsive 2x2 grid for member cards on mobile and interactive membership selection.
- **Backend**: A RESTful Money Tracker API built with Laravel 12 and SQLite, featuring transactional integrity and precise financial calculations.

---

## Author
**Author: Simwa Mideva**

---

## 🚀 Frontend Features
- **Branding**: Fully customized for **Fourfront Management**.
- **Responsive Design**: Mobile-first approach with optimized grid layouts.
- **Interactivity**: Dynamic modals, membership selection state, and smooth transitions.
- **Typography**: Premium **Inter** font family.

---

## ⚡ Backend Features
- **API Endpoints**: Full CRUD for Users, Wallets, and Transactions.
- **Precision**: Eloquent decimal casts (`decimal:2`) for all financial values.
- **Integrity**: Database transactions ensure wallet balances are always accurate.
- **Testing**: Comprehensive Feature test suite included.

---

## 🛠️ Setup Instructions

### Frontend Setup
1. Open `frontend/public/index.html` in any modern browser.

### Backend Setup
1. Navigate to the `backend/` directory.
2. Run `composer install`.
3. Copy `.env.example` to `.env`.
4. Run `php artisan key:generate`.
5. Run `php artisan migrate`.
6. Start the server: `php artisan serve`.

### API Verification
You can verify the API using the following `curl` commands (PowerShell):
```powershell
# Create User
curl.exe -X POST http://127.0.0.1:8000/api/users -H "Content-Type: application/json" -H "Accept: application/json" -d "{\""name\"": \""Test User\"", \""email\"": \""test@example.com\""}"

# Create Wallet
curl.exe -X POST http://127.0.0.1:8000/api/wallets -H "Content-Type: application/json" -H "Accept: application/json" -d "{\""user_id\"": 1, \""name\"": \""Savings\""}"

# Add Income
curl.exe -X POST http://127.0.0.1:8000/api/transactions -H "Content-Type: application/json" -H "Accept: application/json" -d "{\""wallet_id\"": 1, \""type\"": \""income\"", \""amount\"": 5000}"

# Run Automated Tests
php artisan test
```