# DentBridge - Quick Start Guide

## 🚀 Fast Track Deployment (30 minutes)

### What You'll Need
- ✅ Domain from Spaceship (you have this)
- ✅ Credit card for cloud server ($6-12/month)
- ✅ 30 minutes of time

---

## Step 1: Get a Cloud Server (5 minutes)

### DigitalOcean (Recommended)
1. Go to https://digitalocean.com
2. Sign up (get $200 free credit)
3. Create Droplet:
   - Ubuntu 22.04
   - $12/month plan (2GB RAM)
   - Choose datacenter near you
4. **Copy your server IP** (e.g., 123.45.67.89)

---

## Step 2: Point Your Domain (5 minutes)

1. Log in to Spaceship: https://spaceship.com
2. Go to your domain → DNS settings
3. Add A Records:
   ```
   Type: A
   Name: @
   Value: YOUR_SERVER_IP

   Type: A
   Name: www
   Value: YOUR_SERVER_IP
   ```
4. Save and wait 10-30 minutes for DNS to propagate

---

## Step 3: Set Up Server (10 minutes)

Open Terminal and connect to your server:

```bash
# Connect to server
ssh root@YOUR_SERVER_IP

# Install Docker
curl -fsSL https://get.docker.com | sh
apt install docker-compose -y

# Verify
docker --version
```

---

## Step 4: Upload Project (5 minutes)

On your **local Mac Terminal** (new window):

```bash
# Go to project folder
cd /Users/ajay.kv/Documents/NewProject/DentBridge

# Upload to server (replace YOUR_SERVER_IP)
scp -r . root@YOUR_SERVER_IP:/root/dentbridge
```

---

## Step 5: Configure & Deploy (5 minutes)

Back on the **server SSH**:

```bash
cd /root/dentbridge

# Create environment file
cp .env.production .env

# Edit it
nano .env
```

Update these values:
- `DB_PASSWORD`: Create a strong password
- `JWT_SECRET`: Create a random 32+ character string
- `CORS_ALLOWED_ORIGINS`: Replace with `https://yourdomain.com`
- `VITE_API_BASE_URL`: Replace with `https://yourdomain.com/api`

Save: `Ctrl+X`, `Y`, `Enter`

```bash
# Run deployment script
./deploy.sh
```

---

## Step 6: Set Up HTTPS (5 minutes)

Still on the server:

```bash
# Install Nginx and Certbot
apt install nginx certbot python3-certbot-nginx -y

# Copy nginx config
cp nginx-production.conf /etc/nginx/sites-available/dentbridge

# Edit it - replace 'yourdomain.com' with your actual domain
nano /etc/nginx/sites-available/dentbridge

# Enable the site
ln -s /etc/nginx/sites-available/dentbridge /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default

# Get SSL certificate (replace yourdomain.com)
certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Restart nginx
systemctl restart nginx

# Set up firewall
ufw allow 22
ufw allow 80
ufw allow 443
ufw enable
```

---

## Step 7: Test! ✅

Open your browser and go to:
```
https://yourdomain.com
```

You should see the DentBridge login page!

---

## 🎉 Done! Your app is live!

### First Time Setup
1. Click "Sign Up" to create an admin account
2. Log in with your credentials
3. Start testing the features

---

## Common Issues & Fixes

### "Domain not loading"
- Wait 30-60 minutes for DNS to propagate
- Check: https://dnschecker.org

### "Connection refused"
```bash
# Check if services are running
docker-compose ps

# Restart if needed
docker-compose restart
```

### "SSL certificate error"
```bash
# Check certificate status
certbot certificates

# Renew if needed
certbot renew
```

### View logs
```bash
docker-compose logs -f
```

---

## Daily Operations

### View application logs
```bash
ssh root@YOUR_SERVER_IP
cd /root/dentbridge
docker-compose logs -f backend
```

### Restart services
```bash
docker-compose restart
```

### Backup database
```bash
docker exec dentbridge-db pg_dump -U postgres dentbridge > backup-$(date +%Y%m%d).sql
```

### Update application
```bash
cd /root/dentbridge
# Upload new files from local machine first
docker-compose down
docker-compose up -d --build
```

---

## Security Checklist ✅
- [ ] Changed default DB password
- [ ] Created strong JWT secret
- [ ] HTTPS/SSL enabled
- [ ] Firewall configured
- [ ] Regular backups scheduled

---

## Support

If you get stuck:
1. Check logs: `docker-compose logs -f`
2. Verify services: `docker-compose ps`
3. Check DNS: https://dnschecker.org
4. Test SSL: https://www.ssllabs.com/ssltest/

---

## Monthly Cost
- Domain: ~$1-2/month
- Server: $6-12/month
- **Total: ~$8-14/month**

🎯 **For detailed explanations, see DEPLOYMENT_GUIDE.md**
