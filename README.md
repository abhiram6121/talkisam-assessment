# Employee Management Dashboard

## Roles & Permissions

- **Super Admin**: View all employees, delete any employee.
- **Normal Employee**: View only own profile, edit only own profile.

## Quick Start

### 1. Backend Setup
```bash
cd backend
cp .env.example .env # Set your MONGODB_URI in backend/.env
npm run seed     # Seeds 1 superadmin and 2 employees
npm start        # Runs on http://localhost:5000
```

### 2. Frontend Setup
```bash
cd frontend
npm run dev      # Runs on http://localhost:3000
```

## Demo Credentials (from seed)
- **Super Admin**: `admin@company.com` / `admin123`
- **Employee 1**: `jhon@company.com` / `user123`
- **Employee 2**: `smith@company.com` / `user123`
