# DentBridge - Transfer to New Laptop Guide

## 📦 How to Transfer DentBridge to Another Computer

This guide will help you package and set up DentBridge on a different laptop.

---

## Option 1: Create Archive (Recommended - Fast & Clean)

### Step 1: Package the Project (On Current Laptop)

Open terminal and run:

```bash
cd /Users/ajay.kv/Documents/NewProject

# Create compressed archive (excludes unnecessary files)
tar --exclude='DentBridge/node_modules' \
    --exclude='DentBridge/target' \
    --exclude='DentBridge/frontend/dist' \
    --exclude='DentBridge/frontend/node_modules' \
    --exclude='DentBridge/.git' \
    --exclude='DentBridge/.idea' \
    --exclude='DentBridge/.DS_Store' \
    -czf DentBridge-Transfer.tar.gz DentBridge/

# This creates: DentBridge-Transfer.tar.gz (approximately 5-10 MB)
```

### Step 2: Transfer the Archive

Choose any method:

**Method A: USB Drive**
```bash
# Copy to USB drive
cp DentBridge-Transfer.tar.gz /Volumes/YOUR_USB_DRIVE/
```

**Method B: Cloud Storage**
- Upload `DentBridge-Transfer.tar.gz` to Google Drive, Dropbox, or OneDrive
- Download on the new laptop

**Method C: Network Transfer (if both laptops on same network)**
```bash
# On new laptop, get IP address
ipconfig getifaddr en0  # or: ifconfig | grep "inet "

# On current laptop, transfer via scp
scp DentBridge-Transfer.tar.gz username@NEW_LAPTOP_IP:~/Downloads/
```

**Method D: Email** (if file is small enough)
- Attach `DentBridge-Transfer.tar.gz` to email
- Send to yourself
- Download on new laptop

### Step 3: Extract on New Laptop

```bash
# Navigate to where you want the project
cd ~/Documents  # or wherever you want it

# Extract the archive
tar -xzf ~/Downloads/DentBridge-Transfer.tar.gz

# Navigate into the project
cd DentBridge
```

### Step 4: Install Dependencies on New Laptop

**A. Install Backend Dependencies:**
```bash
# In project root
mvn clean install
```

**B. Install Frontend Dependencies:**
```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Go back to root
cd ..
```

### Step 5: Configure for New Laptop

**Edit database password if needed:**
```bash
# Edit .env file
nano .env
# or
open -e .env
```

Change:
```
DB_PASSWORD=your_postgres_password_on_new_laptop
```

**That's it! Now start the application:**

```bash
# Terminal 1 - Backend
mvn spring-boot:run

# Terminal 2 - Frontend (new terminal)
cd frontend
npm run dev
```

**Open browser:** http://localhost:5173

---

## Option 2: Direct Folder Copy (Slower but Simple)

### Step 1: Copy Entire Folder

**Using USB Drive:**
1. Plug in USB drive
2. Copy entire `DentBridge` folder to USB
3. Wait for copy to complete (may take 10-30 minutes due to node_modules)
4. Eject USB
5. Plug into new laptop
6. Copy folder from USB to new laptop

**Using Cloud Storage:**
1. Zip the entire DentBridge folder
2. Upload to Google Drive/Dropbox
3. Download on new laptop
4. Unzip

### Step 2: Clean and Reinstall on New Laptop

```bash
cd DentBridge

# Remove old dependencies
rm -rf frontend/node_modules
rm -rf target

# Reinstall
mvn clean install
cd frontend
npm install
cd ..
```

### Step 3: Configure and Run

Same as Option 1, Steps 5-6 above.

---

## Option 3: Using Git (Best for Version Control)

### Step 1: Initialize Git Repository (Current Laptop)

```bash
cd /Users/ajay.kv/Documents/NewProject/DentBridge

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Complete DentBridge project"
```

### Step 2: Push to GitHub/GitLab (Optional but Recommended)

**If you have GitHub account:**

```bash
# Create repository on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/DentBridge.git
git branch -M main
git push -u origin main
```

### Step 3: Clone on New Laptop

```bash
# On new laptop
cd ~/Documents
git clone https://github.com/YOUR_USERNAME/DentBridge.git
cd DentBridge

# Install dependencies
mvn clean install
cd frontend
npm install
cd ..
```

---

## What Gets Transferred?

### ✅ Included (Important Files):
- ✅ Source code (frontend/src, src/main)
- ✅ Configuration files (.env, application.properties)
- ✅ Documentation (all .md files)
- ✅ Package definitions (pom.xml, package.json)
- ✅ Database migrations (src/main/resources/db/migration)

### ❌ Excluded (Will be regenerated):
- ❌ node_modules (frontend dependencies) - ~500 MB
- ❌ target (compiled Java code) - ~100 MB
- ❌ frontend/dist (built files) - ~5 MB
- ❌ .git (version control) - optional
- ❌ .idea (IDE settings) - optional

**This is why the archive is only 5-10 MB instead of 600+ MB!**

---

## Prerequisites on New Laptop

### Must Install Before Running:

**1. Java 17 or higher**
```bash
# Check if installed
java -version

# If not, install:
# Mac: brew install openjdk@17
# Or download from: https://www.oracle.com/java/technologies/downloads/
```

**2. Node.js 18 or higher**
```bash
# Check if installed
node -v

# If not, install:
# Mac: brew install node
# Or download from: https://nodejs.org/
```

**3. Maven 3.9+**
```bash
# Check if installed
mvn -v

# If not, install:
# Mac: brew install maven
# Or download from: https://maven.apache.org/download.cgi
```

**4. PostgreSQL 15+**
```bash
# Check if installed
psql --version

# If not, install:
# Mac: brew install postgresql@15
# Or download from: https://www.postgresql.org/download/
```

**5. Git (optional, for Option 3)**
```bash
# Check if installed
git --version

# Usually pre-installed on Mac/Linux
```

---

## Setting Up Database on New Laptop

### Step 1: Start PostgreSQL

```bash
# Mac
brew services start postgresql@15

# Linux
sudo systemctl start postgresql

# Windows
# Use pgAdmin or Windows Services
```

### Step 2: Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE dentbridge;

# Create user (optional)
CREATE USER dentbridge_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE dentbridge TO dentbridge_user;

# Exit
\q
```

### Step 3: Database Will Auto-Initialize

When you run the backend for the first time, Flyway will:
- ✅ Automatically create all tables
- ✅ Set up the schema
- ✅ Initialize the system

**Note:** You'll need to create a new user account (no data transfers automatically)

---

## Verification Checklist (On New Laptop)

After setup, verify everything works:

### ✅ Backend Check:
```bash
# Start backend
mvn spring-boot:run

# Should see: "Started DentBridgeApplication in X seconds"
# Test API: curl http://localhost:8080/actuator/health
```

### ✅ Frontend Check:
```bash
# Start frontend
cd frontend
npm run dev

# Should see: "Local: http://localhost:5173/"
# Open browser and visit
```

### ✅ Database Check:
```bash
# Connect to database
psql -U postgres dentbridge

# List tables
\dt

# Should see: users, patients, appointments, payments, inventory_items, treatments
# Exit
\q
```

### ✅ Full System Test:
1. ✅ Open http://localhost:5173
2. ✅ Sign up new user
3. ✅ Add a test patient
4. ✅ Schedule a test appointment
5. ✅ Add a test inventory item
6. ✅ Record a test payment

**All working?** ✅ Transfer complete!

---

## Troubleshooting Transfer Issues

### Issue: "mvn: command not found"
**Solution:** Install Maven
```bash
brew install maven
```

### Issue: "npm: command not found"
**Solution:** Install Node.js
```bash
brew install node
```

### Issue: "psql: command not found"
**Solution:** Install PostgreSQL
```bash
brew install postgresql@15
brew services start postgresql@15
```

### Issue: Backend fails with "Unable to connect to database"
**Solution:**
1. Check PostgreSQL is running: `brew services list`
2. Check database exists: `psql -U postgres -l | grep dentbridge`
3. Check password in `.env` file matches PostgreSQL password

### Issue: Frontend shows "Network Error"
**Solution:**
1. Make sure backend is running (Terminal 1)
2. Check `.env` in frontend folder has: `VITE_API_BASE_URL=http://localhost:8080/api`
3. Try: `curl http://localhost:8080/actuator/health`

### Issue: Port 8080 already in use
**Solution:**
```bash
# Find what's using the port
lsof -i :8080

# Kill it
kill -9 <PID>

# Or change port in application.properties
server.port=8081
```

---

## Quick Reference Commands

### Archive Creation (Current Laptop):
```bash
cd /Users/ajay.kv/Documents/NewProject
tar --exclude='DentBridge/node_modules' --exclude='DentBridge/target' --exclude='DentBridge/frontend/dist' --exclude='DentBridge/frontend/node_modules' -czf DentBridge-Transfer.tar.gz DentBridge/
```

### Extraction (New Laptop):
```bash
cd ~/Documents
tar -xzf ~/Downloads/DentBridge-Transfer.tar.gz
cd DentBridge
```

### Setup (New Laptop):
```bash
# Backend dependencies
mvn clean install

# Frontend dependencies
cd frontend
npm install
cd ..
```

### Run (New Laptop):
```bash
# Terminal 1
mvn spring-boot:run

# Terminal 2
cd frontend && npm run dev
```

---

## Important Files to Check After Transfer

### ✅ Must Review:
1. **`.env`** - Update database password
2. **`frontend/.env`** - Verify API URL is correct
3. **`RECEPTIONIST_GUIDE.md`** - Read for daily operations
4. **`QUICK_SETUP.md`** - Setup instructions

### ✅ Documentation Included:
- ✅ README.md - Full documentation
- ✅ RECEPTIONIST_GUIDE.md - Daily operations guide
- ✅ QUICK_SETUP.md - Setup instructions
- ✅ CHANGELOG.md - All changes made
- ✅ COMPLETION_SUMMARY.md - Project completion details
- ✅ TRANSFER_GUIDE.md - This file

---

## Security Reminder

### Before Transferring:
- ⚠️ Remove sensitive data from `.env` if sharing publicly
- ⚠️ Change default passwords on new laptop
- ⚠️ Don't commit `.env` files to public repositories

### After Transfer:
- ✅ Use strong passwords for new user accounts
- ✅ Change JWT_SECRET in `.env`
- ✅ Set up regular database backups

---

## Estimated Time

- **Archive creation:** 1 minute
- **Transfer (USB):** 1-5 minutes
- **Transfer (Cloud):** 5-15 minutes
- **Setup on new laptop:** 5-10 minutes
- **Total:** 15-30 minutes

---

## Support

If you encounter issues during transfer:
1. Check "Troubleshooting Transfer Issues" section above
2. Verify all prerequisites are installed
3. Read the error messages carefully
4. Try the verification checklist step by step

---

**Transfer is straightforward! Just package, copy, extract, and run.** 📦➡️💻✅
