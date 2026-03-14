# DentBridge Deployment Guide

## Prerequisites
- Domain purchased from Spaceship (you have this ✓)
- Credit card for cloud server (approximately $6-12/month)

## Step-by-Step Deployment

### 1. Set Up Cloud Server (Choose One Provider)

#### Option A: DigitalOcean (Recommended for Beginners)
1. Go to https://www.digitalocean.com
2. Create an account (you'll get $200 free credit for 60 days)
3. Click "Create" → "Droplets"
4. Choose:
   - **Image**: Ubuntu 22.04 LTS
   - **Plan**: Basic ($12/month - 2 GB RAM, 2 vCPUs)
   - **Datacenter**: Choose closest to your users
   - **Authentication**: SSH Key (recommended) or Password
5. Click "Create Droplet"
6. Note down your server IP address (e.g., 123.45.67.89)

#### Option B: AWS Lightsail (Also Good)
1. Go to https://lightsail.aws.amazon.com
2. Create instance → Linux/Unix → Ubuntu 22.04
3. Choose $10/month plan (2 GB RAM)
4. Create instance and note the IP address

#### Option C: Vultr or Linode (Similar Process)
- Similar pricing and setup to DigitalOcean

---

### 2. Connect to Your Server

Open Terminal and connect via SSH:
```bash
ssh root@YOUR_SERVER_IP
# Example: ssh root@123.45.67.89
# Enter password when prompted
```

---

### 3. Install Docker on Server

Once connected to your server, run these commands:

```bash
# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt install docker-compose -y

# Verify installation
docker --version
docker-compose --version
```

---

### 4. Configure Your Domain (Spaceship)

1. Go to https://www.spaceship.com
2. Log in to your account
3. Go to "Domains" → Select your domain
4. Click "DNS" or "Manage DNS"
5. Add these DNS records:

**A Record:**
- Type: `A`
- Name: `@` (represents root domain)
- Value: `YOUR_SERVER_IP` (e.g., 123.45.67.89)
- TTL: 3600

**A Record (for www):**
- Type: `A`
- Name: `www`
- Value: `YOUR_SERVER_IP`
- TTL: 3600

6. Save changes (DNS propagation takes 5-60 minutes)

---

### 5. Upload Your Project to Server

On your local machine (Mac Terminal):

```bash
# Navigate to your project
cd /Users/ajay.kv/Documents/NewProject/DentBridge

# Upload to server (replace YOUR_SERVER_IP)
scp -r . root@YOUR_SERVER_IP:/root/dentbridge

# Or use rsync (better for large projects)
rsync -avz --exclude 'node_modules' --exclude 'target' --exclude '.git' \
  . root@YOUR_SERVER_IP:/root/dentbridge
```

---

### 6. Set Up Environment Variables on Server

SSH back into your server:
```bash
ssh root@YOUR_SERVER_IP
cd /root/dentbridge
```

Edit the .env file:
```bash
nano .env
```

Update with production values:
```env
# Database Configuration
DB_PASSWORD=YourStrongPassword123!

# JWT Configuration (generate a new secure secret)
JWT_SECRET=your_very_long_random_secret_key_here_at_least_32_characters
JWT_EXPIRATION_MS=86400000

# CORS Configuration (replace with your domain)
CORS_ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Google Calendar Integration (Optional)
GOOGLE_CALENDAR_ENABLED=false

# Frontend API URL (replace with your domain)
VITE_API_BASE_URL=https://yourdomain.com/api
```

Press `Ctrl + X`, then `Y`, then `Enter` to save.

---

### 7. Install SSL Certificate (HTTPS)

On your server, install Certbot:

```bash
# Install Nginx (for SSL termination)
apt install nginx certbot python3-certbot-nginx -y

# Get SSL certificate (replace yourdomain.com)
certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow prompts:
# - Enter your email
# - Agree to terms
# - Choose to redirect HTTP to HTTPS
```

---

### 8. Configure Nginx Reverse Proxy

Create Nginx configuration:
```bash
nano /etc/nginx/sites-available/dentbridge
```

Add this configuration (replace yourdomain.com):
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:
```bash
ln -s /etc/nginx/sites-available/dentbridge /etc/nginx/sites-enabled/
nginx -t  # Test configuration
systemctl restart nginx
```

---

### 9. Start Your Application

```bash
cd /root/dentbridge

# Build and start all services
docker-compose up -d --build

# Check if services are running
docker-compose ps

# View logs if needed
docker-compose logs -f
```

---

### 10. Verify Deployment

1. Open browser and go to: `https://yourdomain.com`
2. You should see the DentBridge login page
3. Try creating an account and logging in

---

## Useful Commands

```bash
# Stop services
docker-compose down

# Restart services
docker-compose restart

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Update application after code changes
cd /root/dentbridge
git pull  # if using git
docker-compose down
docker-compose up -d --build

# Backup database
docker exec dentbridge-db pg_dump -U postgres dentbridge > backup.sql

# Restore database
docker exec -i dentbridge-db psql -U postgres dentbridge < backup.sql
```

---

## Security Checklist

- [ ] Changed default database password
- [ ] Generated secure JWT secret
- [ ] Enabled HTTPS/SSL
- [ ] Configured firewall (UFW)
- [ ] Regular backups enabled
- [ ] Updated CORS origins to your domain

---

## Firewall Configuration (Important!)

```bash
# Enable firewall
ufw allow 22/tcp     # SSH
ufw allow 80/tcp     # HTTP
ufw allow 443/tcp    # HTTPS
ufw enable

# Check status
ufw status
```

---

## Troubleshooting

### Domain not loading
- Check DNS propagation: https://dnschecker.org
- Wait up to 24 hours for DNS to fully propagate

### SSL certificate error
```bash
certbot renew --dry-run  # Test renewal
certbot certificates      # Check status
```

### Services not starting
```bash
docker-compose logs -f   # Check error messages
docker ps                # See running containers
```

### Database connection issues
```bash
docker-compose restart postgres
docker-compose logs postgres
```

---

## Cost Estimate (Monthly)
- Domain: $10-15/year ($1-2/month)
- Cloud Server: $6-12/month
- **Total: ~$8-14/month**

---

## Next Steps After Deployment

1. Test all features thoroughly
2. Set up automatic backups
3. Monitor server resources
4. Configure email notifications (if needed)
5. Add monitoring tools (optional: UptimeRobot, Pingdom)

---

## Support Resources

- DigitalOcean Tutorials: https://www.digitalocean.com/community/tutorials
- Docker Documentation: https://docs.docker.com
- Let's Encrypt: https://letsencrypt.org
- Spaceship Support: https://www.spaceship.com/support
