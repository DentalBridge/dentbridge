# DentBridge - Transfer to New Laptop Checklist

## Quick Reference Guide for Moving Your Project

---

## BEFORE YOU START ON OLD LAPTOP

### 1. Prepare Project Export

```bash
# Navigate to project
cd /Users/ajay.kv/Documents/NewProject/DentBridge

# Option A: Create compressed archive (Quick - 5 minutes)
tar -czf ~/Desktop/DentBridge-$(date +%Y%m%d).tar.gz \
  --exclude='target' \
  --exclude='frontend/node_modules' \
  --exclude='frontend/dist' \
  --exclude='.idea' \
  --exclude='.DS_Store' \
  .

# Option B: Use Git (Recommended - Better version control)
git init
git add .
git commit -m "Initial commit - DentBridge complete project"
# Then push to GitHub (instructions in step 2)
```

### 2. Push to GitHub (Recommended Method)

```bash
# Create new repo on GitHub.com first, then:
git remote add origin https://github.com/YOUR_USERNAME/DentBridge.git
git branch -M main
git push -u origin main
```

### 3. Export Environment Settings (IMPORTANT!)

```bash
# Copy your .env file separately (DO NOT commit to Git)
cp .env ~/Desktop/DentBridge.env

# Note: This contains sensitive data - transfer securely!
```

### 4. Document Database State (If you have data)

```bash
# If running locally with data you want to keep:
docker-compose exec postgres pg_dump -U postgres dentbridge > ~/Desktop/dentbridge-backup.sql

# Or if not using Docker:
pg_dump -U postgres dentbridge > ~/Desktop/dentbridge-backup.sql
```

---

## ON NEW LAPTOP

### Phase 1: Install Prerequisites (30-45 minutes)

#### For macOS:

```bash
# 1. Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Install Java 17
brew install openjdk@17
echo 'export PATH="/usr/local/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# 3. Install Maven
brew install maven

# 4. Install Node.js 18+
brew install node

# 5. Install PostgreSQL (optional - can use Docker instead)
brew install postgresql@15

# 6. Install Docker Desktop
# Download from: https://www.docker.com/products/docker-desktop
# Install and start Docker Desktop

# 7. Install Git (if not already installed)
brew install git

# 8. Verify installations
java -version     # Should show: openjdk version "17.x.x"
mvn -version      # Should show: Apache Maven 3.9+
node -version     # Should show: v18.x.x or higher
npm -version      # Should show: 9.x.x or higher
docker --version  # Should show: Docker version 24.x.x
git --version     # Should show: git version 2.x.x
```

#### For Windows:

```powershell
# 1. Install Chocolatey (package manager)
# Run PowerShell as Administrator, then:
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# 2. Install tools
choco install openjdk17 -y
choco install maven -y
choco install nodejs -y
choco install docker-desktop -y
choco install git -y

# 3. Restart terminal and verify
java -version
mvn -version
node -version
docker --version
git --version
```

#### For Linux (Ubuntu/Debian):

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Java 17
sudo apt install openjdk-17-jdk -y

# Install Maven
sudo apt install maven -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Git
sudo apt install git -y

# Verify installations
java -version
mvn -version
node -version
docker --version
git --version
```

---

### Phase 2: Get the Project (10 minutes)

#### Option A: From GitHub (Recommended)

```bash
# Navigate to your projects folder
cd ~/Documents  # or wherever you want the project

# Clone repository
git clone https://github.com/YOUR_USERNAME/DentBridge.git
cd DentBridge

# Verify files
ls -la
# You should see: src/, frontend/, pom.xml, docker-compose.yml, etc.
```

#### Option B: From Archive File

```bash
# Copy the .tar.gz file to new laptop first, then:
cd ~/Documents
tar -xzf DentBridge-20240223.tar.gz
cd DentBridge

# Verify files
ls -la
```

---

### Phase 3: Setup Backend (15 minutes)

```bash
# 1. Install Java dependencies and build project
mvn clean install

# Wait for completion - should see:
# [INFO] BUILD SUCCESS
# Takes 3-5 minutes on first run

# 2. Copy environment file
cp .env.example .env

# 3. Edit .env if needed (use nano, vim, or VS Code)
nano .env
# Default values work for local development

# 4. Test backend build
mvn spring-boot:run

# Should see:
# Started DentBridgeApplication in X.XXX seconds
# Press Ctrl+C to stop
```

**Troubleshooting Backend:**
```bash
# If Maven build fails:
mvn clean install -U -X  # Force update dependencies with debug

# If Java version issues:
java -version  # Must be Java 17+

# If port 8080 is in use:
# Edit application.properties: server.port=8081
```

---

### Phase 4: Setup Frontend (10 minutes)

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install
# Takes 2-4 minutes

# Create .env file for frontend
cp .env.example .env
# Or create manually:
echo "VITE_API_BASE_URL=http://localhost:8080/api" > .env

# Test frontend
npm run dev

# Should see:
# VITE ready in XXX ms
# ➜ Local: http://localhost:5173
# Press Ctrl+C to stop

# Return to root directory
cd ..
```

**Troubleshooting Frontend:**
```bash
# If npm install fails:
rm -rf node_modules package-lock.json
npm install

# If port 5173 is in use:
# Vite will auto-select next available port

# Clear cache if needed:
npm cache clean --force
```

---

### Phase 5: Setup Database (5 minutes)

#### Option A: Using Docker (Easiest)

```bash
# Just start docker-compose (includes PostgreSQL)
docker-compose up -d postgres

# Verify database is running
docker-compose ps

# Check logs
docker-compose logs postgres
```

#### Option B: Local PostgreSQL

```bash
# Start PostgreSQL service
# macOS:
brew services start postgresql@15

# Linux:
sudo systemctl start postgresql

# Windows:
# PostgreSQL should auto-start as service

# Create database
createdb dentbridge

# Or using psql:
psql postgres
CREATE DATABASE dentbridge;
\q
```

---

### Phase 6: Import Your Data (If applicable)

```bash
# If you exported data from old laptop:

# Using Docker:
docker-compose exec -T postgres psql -U postgres dentbridge < ~/Desktop/dentbridge-backup.sql

# Using local PostgreSQL:
psql -U postgres dentbridge < ~/Desktop/dentbridge-backup.sql
```

---

### Phase 7: Start Everything (5 minutes)

#### Option A: Using Docker (Recommended)

```bash
# Start all services (backend, frontend, database)
docker-compose up -d

# View logs
docker-compose logs -f

# Check status
docker-compose ps

# All services should be "Up"
```

#### Option B: Manual Start (for development)

```bash
# Terminal 1 - Backend
mvn spring-boot:run

# Terminal 2 - Frontend
cd frontend
npm run dev

# Terminal 3 - Database (if not using Docker)
brew services start postgresql@15  # macOS
# or
sudo systemctl start postgresql    # Linux
```

---

### Phase 8: Verify Everything Works ✅

#### 1. Check Backend Health
```bash
# Open browser or use curl
curl http://localhost:8080/actuator/health

# Should return:
# {"status":"UP"}
```

#### 2. Check Frontend
```
Open browser: http://localhost:5173 (or http://localhost:3000 with Docker)
You should see the DentBridge login page
```

#### 3. Test Full Flow
1. Click "Sign Up"
2. Create test account:
   - Name: Test User
   - Email: test@example.com
   - Password: Test123!
3. Login with credentials
4. Navigate through pages:
   - Dashboard ✓
   - Patients ✓
   - Appointments ✓
   - Payments ✓
   - Inventory ✓
   - Treatments ✓

#### 4. Test API Directly
```bash
# Register user
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test123!"
  }'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!"
  }'

# Should return JWT token
```

---

## IDE Setup (Optional but Recommended)

### IntelliJ IDEA (for Java)

```bash
# Install via Homebrew (macOS)
brew install --cask intellij-idea-ce  # Community Edition (Free)

# Or download from: https://www.jetbrains.com/idea/download/

# Open project:
# 1. Launch IntelliJ
# 2. Open -> Select DentBridge folder
# 3. Wait for Maven to import dependencies
# 4. Set JDK to Java 17:
#    File -> Project Structure -> Project SDK -> 17
```

### VS Code (for Frontend/Full Stack)

```bash
# Install via Homebrew (macOS)
brew install --cask visual-studio-code

# Or download from: https://code.visualstudio.com/

# Recommended Extensions:
# - ESLint
# - Prettier
# - Tailwind CSS IntelliSense
# - ES7+ React/Redux/React-Native snippets
# - GitLens
# - Thunder Client (API testing)

# Open project:
code ~/Documents/DentBridge
```

---

## Common Issues & Solutions

### Issue: "Port already in use"
```bash
# Find process using port 8080
lsof -i :8080  # macOS/Linux
netstat -ano | findstr :8080  # Windows

# Kill the process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows

# Or change port in application.properties
```

### Issue: "Database connection failed"
```bash
# Check if PostgreSQL is running
docker-compose ps  # If using Docker
pg_isready  # If local PostgreSQL

# Check connection string in .env
# Make sure DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD are correct

# Test connection
psql -h localhost -p 5432 -U postgres -d dentbridge
```

### Issue: "Maven build fails"
```bash
# Clear Maven cache
rm -rf ~/.m2/repository

# Clean and rebuild
mvn clean install -U

# Check Java version
java -version  # Must be 17+

# Update Maven
brew upgrade maven  # macOS
```

### Issue: "npm install fails"
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and lock file
cd frontend
rm -rf node_modules package-lock.json

# Reinstall
npm install

# If still fails, try:
npm install --legacy-peer-deps
```

### Issue: "Frontend can't connect to backend"
```bash
# 1. Check backend is running
curl http://localhost:8080/actuator/health

# 2. Check CORS configuration
# In application.properties:
# cors.allowed-origins should include http://localhost:5173

# 3. Check frontend .env
# VITE_API_BASE_URL=http://localhost:8080/api
cat frontend/.env

# 4. Restart both backend and frontend
```

---

## Development Workflow

### Daily Development
```bash
# Start development environment
docker-compose up -d postgres  # Just database
mvn spring-boot:run           # Backend (Terminal 1)
cd frontend && npm run dev    # Frontend (Terminal 2)

# Or use Docker for everything:
docker-compose up -d
```

### Making Changes

**Backend (Java):**
1. Make code changes in `src/main/java/com/dentbridge/`
2. Spring Boot DevTools will auto-reload (if configured)
3. Or restart: `mvn spring-boot:run`

**Frontend (TypeScript/React):**
1. Make changes in `frontend/src/`
2. Vite will hot-reload automatically
3. See changes instantly in browser

**Database Schema:**
1. Create new migration file: `src/main/resources/db/migration/V7__description.sql`
2. Restart backend to apply migration
3. Flyway will auto-apply on startup

### Testing Changes
```bash
# Backend tests (when you add them)
mvn test

# Frontend tests (when you add them)
cd frontend
npm test

# Build for production
mvn clean package              # Backend JAR
cd frontend && npm run build   # Frontend static files
```

---

## Quick Commands Reference

### Docker Commands
```bash
docker-compose up -d              # Start all services
docker-compose down               # Stop all services
docker-compose ps                 # Check status
docker-compose logs -f [service]  # View logs
docker-compose restart [service]  # Restart service
docker-compose build              # Rebuild containers
```

### Maven Commands
```bash
mvn clean install        # Build project
mvn spring-boot:run      # Run application
mvn test                 # Run tests
mvn clean package        # Create JAR file
mvn dependency:tree      # View dependencies
```

### npm Commands
```bash
npm install              # Install dependencies
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run linter
```

### Database Commands
```bash
# Connect to database
docker-compose exec postgres psql -U postgres dentbridge

# Backup database
docker-compose exec postgres pg_dump -U postgres dentbridge > backup.sql

# Restore database
docker-compose exec -T postgres psql -U postgres dentbridge < backup.sql

# View tables
\dt

# Describe table
\d table_name

# Quit
\q
```

---

## Post-Setup Checklist

- [ ] All prerequisites installed
- [ ] Project imported successfully
- [ ] Backend builds without errors
- [ ] Frontend installs dependencies successfully
- [ ] Database connection works
- [ ] Backend starts on http://localhost:8080
- [ ] Frontend starts on http://localhost:5173
- [ ] Can create account and login
- [ ] All pages load correctly
- [ ] API calls work (check browser Network tab)
- [ ] Environment files (.env) configured
- [ ] IDE set up (IntelliJ/VS Code)
- [ ] Git repository connected (if using GitHub)

---

## Next Steps After Transfer

1. **Test thoroughly** - Go through all features
2. **Set up IDE** - Configure IntelliJ IDEA or VS Code
3. **Review documentation** - Read README.md, ENHANCEMENT_GUIDE.md
4. **Start development** - Pick an enhancement from ENHANCEMENT_GUIDE.md
5. **Set up Git workflow** - Create branches for features
6. **Consider enhancements** - Review ENHANCEMENT_GUIDE.md for priorities

---

## Getting Help

**Documentation:**
- README.md - Main project documentation
- QUICK_START.md - Quick deployment guide
- DEPLOYMENT_GUIDE.md - Production deployment
- ENHANCEMENT_GUIDE.md - Feature enhancement roadmap

**Resources:**
- Spring Boot: https://spring.io/guides
- React + TypeScript: https://react-typescript-cheatsheet.netlify.app/
- PostgreSQL: https://www.postgresql.org/docs/
- Docker: https://docs.docker.com/get-started/

**Community Help:**
- Stack Overflow (tag: spring-boot, react, postgresql)
- Spring Boot Gitter: https://gitter.im/spring-projects/spring-boot
- Reactiflux Discord: https://www.reactiflux.com/

---

## Time Estimates

- Prerequisites installation: **30-45 minutes**
- Project download/extraction: **5 minutes**
- Backend setup: **15 minutes**
- Frontend setup: **10 minutes**
- Database setup: **5 minutes**
- Testing and verification: **15 minutes**

**Total: ~90 minutes** (for first-time setup on new laptop)

**Quick setup (if experienced):** ~30 minutes

---

## Success!

Once you see the DentBridge login page and can create an account, your transfer is complete! 🎉

**Your project is now ready for development on your new laptop.**

Remember to:
- Commit changes regularly
- Push to GitHub for backup
- Follow enhancement guide for improvements
- Keep documentation updated
