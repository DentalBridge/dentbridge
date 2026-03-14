# DentBridge - Patient Management System

A comprehensive patient management system designed for dental practices, featuring appointment scheduling, payment tracking, inventory management, and treatment records.

## Features

- **Authentication & Authorization**: Secure JWT-based authentication with signup/login
- **Patient Management**:
  - Add, edit, view, and search patients
  - Complete patient records with medical history and allergies
  - Interactive modals for patient data entry
  - Search functionality by name, email, or phone
- **Appointment Scheduling**:
  - Create, edit, and delete appointments
  - Filter appointments by status (Scheduled, Confirmed, Completed, Cancelled, No Show)
  - Date/time picker with duration selection
  - Link appointments to patients
  - Google Calendar integration (optional)
- **Payment Tracking**:
  - Record and manage patient payments
  - Multiple payment methods (Cash, Card, Insurance, Bank Transfer, Other)
  - Payment status tracking (Paid, Pending, Refunded)
  - Real-time payment statistics dashboard
- **Inventory Management**:
  - Add and edit inventory items
  - Track quantities, prices, and reorder levels
  - Automatic low-stock alerts
  - Category and supplier management
- **Treatment Records**:
  - Create, edit, and view treatment records
  - Link treatments to patients and appointments
  - Track treatment costs and details
  - Maintain comprehensive treatment history
- **Dashboard**: Overview with real-time metrics and quick stats
- **Error Handling**: Comprehensive error boundary and user-friendly error messages
- **Responsive Design**: Mobile-friendly interface with TailwindCSS

## Tech Stack

### Backend
- **Java 17** with **Spring Boot 3.2.0**
- **PostgreSQL** database
- **Spring Security** with JWT authentication
- **Flyway** for database migrations
- **Google Calendar API** for appointment synchronization
- **Maven** for dependency management

### Frontend
- **React 18** with **TypeScript**
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **React Hot Toast** for notifications

### Deployment
- **Docker & Docker Compose** for containerization
- **Nginx** for serving frontend
- **PostgreSQL** in Docker container

## Prerequisites

- **Java 17 or higher**
- **Node.js 18 or higher**
- **PostgreSQL 15** (or use Docker)
- **Maven 3.9+**
- **Docker & Docker Compose** (for containerized deployment)

## Extracting from Archive

If you received this project as a compressed archive (DentBridge.tar.gz):

1. **Extract the archive**
```bash
tar -xzf DentBridge.tar.gz
cd DentBridge
```

2. **Install backend dependencies**
```bash
mvn clean install
```

3. **Install frontend dependencies**
```bash
cd frontend
npm install
cd ..
```

4. **Proceed with Quick Start below**

## Quick Start

### Option 1: Using Docker (Recommended)

1. **Clone the repository**
```bash
git clone <repository-url>
cd DentBridge
```

2. **Create environment file**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Start all services**
```bash
docker-compose up -d
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- API Health: http://localhost:8080/actuator/health

### Option 2: Local Development

#### Backend Setup

1. **Install PostgreSQL and create database**
```bash
createdb dentbridge
```

2. **Configure application properties**
Edit `src/main/resources/application.properties` with your database credentials.

3. **Build and run the backend**
```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on http://localhost:8080

#### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
# Edit .env if needed
```

4. **Start development server**
```bash
npm run dev
```

The frontend will start on http://localhost:5173

## Configuration

### Environment Variables

#### Backend (application.properties or environment)

```properties
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dentbridge
DB_USERNAME=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_256_bit_secret
JWT_EXPIRATION_MS=86400000

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5173

# Google Calendar (Optional)
GOOGLE_CALENDAR_ENABLED=false
GOOGLE_CALENDAR_CREDENTIALS_PATH=/path/to/credentials.json
GOOGLE_CALENDAR_ID=primary
```

#### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### Google Calendar Integration (Optional)

1. Create a Google Cloud Project at https://console.cloud.google.com
2. Enable the Google Calendar API
3. Create OAuth2 credentials (Service Account or OAuth2 Client)
4. Download the credentials JSON file
5. Set the path in `GOOGLE_CALENDAR_CREDENTIALS_PATH`
6. Set `GOOGLE_CALENDAR_ENABLED=true`

## Database Schema

The application uses Flyway for database migrations. Migrations are located in `src/main/resources/db/migration/`.

### Tables
- **users**: User authentication and profiles
- **patients**: Patient records and medical information
- **appointments**: Appointment scheduling and tracking
- **payments**: Payment records and transactions
- **inventory_items**: Medical supplies and equipment
- **treatments**: Treatment history and records

## API Documentation

### Authentication Endpoints

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/profile` - Get current user profile

### Patient Endpoints

- `GET /api/patients` - List all patients (paginated)
- `GET /api/patients/{id}` - Get patient by ID
- `POST /api/patients` - Create new patient
- `PUT /api/patients/{id}` - Update patient
- `DELETE /api/patients/{id}` - Delete patient

### Appointment Endpoints

- `GET /api/appointments` - List appointments (supports `?status=SCHEDULED` filter)
- `GET /api/appointments/{id}` - Get appointment details
- `GET /api/appointments/calendar?start=&end=` - Get appointments in date range
- `GET /api/appointments/patient/{patientId}` - Get appointments for a patient
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/{id}` - Update appointment
- `DELETE /api/appointments/{id}` - Cancel appointment

### Payment Endpoints

- `GET /api/payments` - List payments
- `GET /api/payments/{id}` - Get payment details
- `GET /api/payments/stats` - Get payment statistics
- `POST /api/payments` - Record payment
- `PUT /api/payments/{id}` - Update payment
- `DELETE /api/payments/{id}` - Delete payment

### Inventory Endpoints

- `GET /api/inventory` - List inventory items
- `GET /api/inventory/{id}` - Get item details
- `GET /api/inventory/low-stock` - Get low stock items
- `POST /api/inventory` - Add inventory item
- `PUT /api/inventory/{id}` - Update item
- `POST /api/inventory/{id}/adjust-quantity` - Adjust quantity
- `DELETE /api/inventory/{id}` - Delete item

### Treatment Endpoints

- `GET /api/treatments` - List treatments
- `GET /api/treatments/{id}` - Get treatment details
- `POST /api/treatments` - Create treatment record
- `PUT /api/treatments/{id}` - Update treatment
- `DELETE /api/treatments/{id}` - Delete treatment

## Production Deployment

### Docker Deployment (Recommended)

1. **Prepare production environment file**
```bash
cp .env.example .env.production
# Edit with production values
```

2. **Build and deploy**
```bash
docker-compose -f docker-compose.yml --env-file .env.production up -d
```

3. **Configure reverse proxy (Nginx/Apache)**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

4. **Set up SSL with Let's Encrypt**
```bash
sudo certbot --nginx -d yourdomain.com
```

### Traditional Deployment

#### Backend

1. Build the JAR file:
```bash
mvn clean package -DskipTests
```

2. Run the application:
```bash
java -jar target/dentbridge-1.0.0.jar
```

#### Frontend

1. Build for production:
```bash
cd frontend
npm run build
```

2. Serve with Nginx or deploy to static hosting.

## Database Backup

### Backup
```bash
docker-compose exec postgres pg_dump -U postgres dentbridge > backup.sql
```

### Restore
```bash
docker-compose exec -T postgres psql -U postgres dentbridge < backup.sql
```

## Development

### Running Tests

Backend tests:
```bash
mvn test
```

### Code Style

The project follows standard Java and TypeScript/React conventions.

## Security Considerations

1. **Change default credentials** in production
2. **Use strong JWT secret** (minimum 256 bits)
3. **Enable HTTPS** in production
4. **Configure CORS** properly for your domain
5. **Regular security updates** for dependencies
6. **Database backups** scheduled regularly
7. **Secure Google Calendar credentials** if using integration

## Troubleshooting

### Backend won't start
- Check PostgreSQL is running and accessible
- Verify database credentials in application.properties
- Check Java version (requires Java 17+)
- Review logs for specific errors

### Frontend won't connect to backend
- Verify VITE_API_BASE_URL in .env
- Check CORS configuration in backend
- Ensure backend is running on port 8080

### Database migration errors
- Check Flyway migration files for syntax errors
- Verify database user has CREATE/ALTER permissions
- Review flyway_schema_history table

### Docker issues
- Ensure ports 3000, 8080, 5432 are not in use
- Check Docker logs: `docker-compose logs -f`
- Rebuild containers: `docker-compose up --build`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is proprietary software for dental practice management.

## Support

For support and questions, please contact the development team or create an issue in the repository.

## Acknowledgments

- Spring Boot framework
- React and Vite teams
- TailwindCSS
- Google Calendar API
- PostgreSQL community
