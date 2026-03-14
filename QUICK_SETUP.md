# Quick Setup Guide for Clinic Use

## 🚀 Getting DentBridge Running (5 Minutes)

This guide helps you get the system up and running quickly for clinic operations.

---

## Prerequisites Checklist

Make sure you have installed:
- ✅ Java 17+ (`java -version` to check)
- ✅ Node.js 18+ (`node -v` to check)
- ✅ PostgreSQL 15+ (or Docker)

---

## Option 1: Quick Start with Existing Database

If PostgreSQL is already running:

### Step 1: Configure Database (1 minute)

1. Open terminal and create database:
```bash
psql -U postgres
CREATE DATABASE dentbridge;
\q
```

### Step 2: Configure Backend (1 minute)

1. Navigate to project root:
```bash
cd /Users/ajay.kv/Documents/NewProject/DentBridge
```

2. Edit `.env` file with your database password:
```bash
DB_PASSWORD=your_postgres_password
JWT_SECRET=your_secure_secret_key_here_minimum_32_characters
```

### Step 3: Start Backend (1 minute)

```bash
mvn spring-boot:run
```

Wait for message: `Started DentBridgeApplication in X seconds`
Backend will run on: **http://localhost:8080**

### Step 4: Start Frontend (1 minute)

Open a **new terminal window**:

```bash
cd /Users/ajay.kv/Documents/NewProject/DentBridge/frontend
npm run dev
```

Wait for message: `Local: http://localhost:5173/`
Frontend will run on: **http://localhost:5173**

### Step 5: Create First User (1 minute)

1. Open browser: **http://localhost:5173**
2. Click **"Sign Up"**
3. Fill in:
   - Full Name: `Clinic Admin`
   - Email: `admin@clinic.com`
   - Password: `admin123` (change this!)
4. Click **"Sign Up"**
5. You're logged in! ✅

---

## Option 2: Using Docker (Easiest)

If you have Docker installed:

```bash
cd /Users/ajay.kv/Documents/NewProject/DentBridge
docker-compose up -d
```

Wait 2 minutes for containers to start, then:
- Frontend: **http://localhost:3000**
- Backend: **http://localhost:8080**

---

## Verify Everything Works

### Test 1: Add a Patient
1. Go to **Patients** page
2. Click **"Add Patient"**
3. Fill: Name: "Test Patient", Gender: "Male"
4. Click **"Add Patient"**
5. ✅ Should see success message

### Test 2: Schedule Appointment
1. Go to **Appointments** page
2. Click **"Schedule Appointment"**
3. Select patient, date/time, duration
4. Click **"Schedule Appointment"**
5. ✅ Should see appointment in table

### Test 3: Add Inventory
1. Go to **Inventory** page
2. Click **"Add Item"**
3. Fill: Item Name: "Test Item", Quantity: 10
4. Click **"Add Item"**
5. ✅ Should see item in list

### Test 4: Record Payment
1. Go to **Payments** page
2. Click **"Record Payment"**
3. Select patient, amount, payment method
4. Click **"Record Payment"**
5. ✅ Should see payment recorded

**All tests passed?** You're ready to use the system! 🎉

---

## Common Issues & Solutions

### Issue: Backend won't start
**Error**: "Failed to configure a DataSource"
**Solution**: Check PostgreSQL is running:
```bash
# On Mac
brew services list

# On Linux
sudo systemctl status postgresql

# Start if stopped
brew services start postgresql
# or
sudo systemctl start postgresql
```

### Issue: Frontend can't connect to backend
**Error**: "Network Error" when adding patient
**Solution**:
1. Check backend is running on port 8080
2. Check `.env` file in frontend folder:
   ```
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

### Issue: Port already in use
**Error**: "Port 8080 is already in use"
**Solution**: Stop other application or change port:
```bash
# Find what's using port 8080
lsof -i :8080

# Kill the process
kill -9 <PID>
```

### Issue: Database connection failed
**Error**: "Connection refused"
**Solution**:
1. Check database is created: `psql -U postgres -c "\l"`
2. Check password in `.env` matches PostgreSQL password
3. Try connecting manually: `psql -U postgres dentbridge`

---

## Stopping the Application

### Stop Frontend
Press `Ctrl + C` in the terminal running `npm run dev`

### Stop Backend
Press `Ctrl + C` in the terminal running `mvn spring-boot:run`

### Stop Docker (if using)
```bash
docker-compose down
```

---

## Starting Again Later

### Every day startup:

**Terminal 1 - Backend:**
```bash
cd /Users/ajay.kv/Documents/NewProject/DentBridge
mvn spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
cd /Users/ajay.kv/Documents/NewProject/DentBridge/frontend
npm run dev
```

**Browser:**
Open **http://localhost:5173**

That's it! ✅

---

## Important URLs to Bookmark

- 🏥 **Clinic System**: http://localhost:5173
- 🔧 **Backend API**: http://localhost:8080/api
- 📊 **Backend Health**: http://localhost:8080/actuator/health

---

## Security Notes

### For Production Use:
1. ⚠️ **Change default passwords**
2. ⚠️ **Use strong JWT secret** (minimum 32 characters)
3. ⚠️ **Enable HTTPS**
4. ⚠️ **Backup database regularly**
5. ⚠️ **Don't expose port 8080 to internet** (use reverse proxy)

### Backup Database:
```bash
# Daily backup
pg_dump -U postgres dentbridge > backup_$(date +%Y%m%d).sql

# Restore if needed
psql -U postgres dentbridge < backup_20260313.sql
```

---

## Next Steps

1. ✅ Read **RECEPTIONIST_GUIDE.md** for daily operations
2. ✅ Train staff on the system
3. ✅ Add all existing patients
4. ✅ Start scheduling appointments
5. ✅ Enter current inventory

---

## Getting Help

- 📖 Full documentation: See **README.md**
- 📋 Receptionist guide: See **RECEPTIONIST_GUIDE.md**
- 🔍 All changes: See **CHANGELOG.md**
- ✅ Completion details: See **COMPLETION_SUMMARY.md**

---

**System is ready for clinic operations! Start adding patients and scheduling appointments.** 🏥
