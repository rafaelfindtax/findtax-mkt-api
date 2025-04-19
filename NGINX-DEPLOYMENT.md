# FindTax API - Nginx Configuration Guide

This guide provides instructions on how to configure and deploy the FindTax Marketing API using Nginx as a reverse proxy.

## Files Overview

1. **nginx.conf** - Main Nginx configuration file
2. **findtax-api.conf** - Specific configuration for the FindTax API
3. **docker-compose.yml** - Docker Compose configuration for running the API with Nginx
4. **Dockerfile** - Docker configuration for building the Node.js application

## Deployment Options

### Option 1: Standalone Nginx (on a server with Node.js)

1. Install Nginx:
   ```bash
   # For Ubuntu/Debian
   sudo apt update
   sudo apt install nginx

   # For CentOS/RHEL
   sudo yum install epel-release
   sudo yum install nginx
   ```

2. Deploy the configuration files:
   ```bash
   # Copy the main Nginx configuration
   sudo cp nginx.conf /etc/nginx/nginx.conf

   # Copy the API-specific configuration
   sudo cp findtax-api.conf /etc/nginx/conf.d/
   ```

3. Customize the configuration:
   - Replace `findtax-api.yourdomain.com` with your actual domain name
   - Set up SSL certificates if needed (for production environments)

4. Test the configuration:
   ```bash
   sudo nginx -t
   ```

5. Restart Nginx:
   ```bash
   sudo systemctl restart nginx
   ```

6. Start your Node.js application:
   ```bash
   npm run build
   npm start
   ```

### Option 2: Using Docker Compose

1. Ensure Docker and Docker Compose are installed on your server

2. Customize the configuration files:
   - Update domain names in `findtax-api.conf`
   - Configure SSL (recommended for production)

3. Start the services:
   ```bash
   docker-compose up -d
   ```

4. Check the logs:
   ```bash
   docker-compose logs -f
   ```

## SSL Configuration

For production environments, you should enable SSL:

1. Obtain SSL certificates:
   - You can use Let's Encrypt: 
     ```bash
     sudo apt install certbot python3-certbot-nginx
     sudo certbot --nginx -d findtax-api.yourdomain.com
     ```
   - Or purchase certificates from a certificate authority

2. Configure SSL paths in `nginx.conf` or `findtax-api.conf`

3. Uncomment the HTTPS server block in `findtax-api.conf`

4. Restart Nginx or rebuild your Docker containers

## Security Considerations

The configurations include several security best practices:

- HTTP to HTTPS redirection
- Modern TLS protocols only (TLSv1.2 and TLSv1.3)
- Secure cipher configurations
- HTTP security headers (HSTS, X-Content-Type-Options, etc.)

For additional security, consider:

1. Setting up a firewall (UFW, firewalld, or cloud provider)
2. Implementing rate limiting
3. Setting up monitoring and logging
4. Regularly updating Nginx and your Node.js application

## Troubleshooting

- Check Nginx error logs: `/var/log/nginx/error.log`
- Check Nginx access logs: `/var/log/nginx/access.log` 
- Verify that your API is running properly on port 3000
- Test connections with `curl -v http://localhost:3000/api/v1/...` 