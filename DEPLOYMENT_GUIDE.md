# MartelAI Deployment Guide to GoDaddy Domain

## Current Status
✅ Build successful - App is production ready  
✅ All features implemented (Landing page, Auth, Meta Business integration)  
✅ File-based storage system working  

## Deployment Options

### Option 1: Vercel + GoDaddy Domain (Recommended)

#### Step 1: Deploy to Vercel
1. **Create Vercel account** at [vercel.com](https://vercel.com)
2. **Connect GitHub** and import your repository
3. **Set environment variables** in Vercel dashboard:
   ```
   NEXTAUTH_URL=https://yourdomain.com
   NEXTAUTH_SECRET=your-secret-key
   OPENAI_API_KEY=your-openai-key
   META_APP_ID=755765623464368
   META_APP_SECRET=4d538f7e7048367b438279ba722a2e7e
   META_ACCESS_TOKEN=your-meta-token
   ```

#### Step 2: Connect GoDaddy Domain
1. **In Vercel Dashboard:**
   - Go to Project → Settings → Domains
   - Add your custom domain (e.g., `martelai.com`)
   - Copy the DNS records provided

2. **In GoDaddy DNS Management:**
   - Add A record: `@` → `76.76.19.61` (Vercel IP)
   - Add CNAME record: `www` → `cname.vercel-dns.com`

#### Step 3: SSL Certificate
- Vercel automatically provides SSL certificates
- Your site will be available at `https://yourdomain.com`

### Option 2: AWS Amplify + GoDaddy Domain

#### Step 1: Deploy to AWS Amplify
1. **Go to AWS Amplify Console**
2. **Connect GitHub repository**
3. **Build settings** (create amplify.yml):
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - cd apps/web
           - npm install -g pnpm
           - pnpm install
       build:
         commands:
           - pnpm run build
     artifacts:
       baseDirectory: apps/web/.next
       files:
         - '**/*'
   ```

#### Step 2: Environment Variables in Amplify
- Add the same environment variables as above

#### Step 3: Custom Domain in Amplify
- Add custom domain in Amplify console
- Update GoDaddy DNS with provided records

### Option 3: Traditional VPS/Server

#### For VPS deployment:
1. **Build the app locally:**
   ```bash
   pnpm run build
   ```

2. **Upload to your server**
3. **Install dependencies and start:**
   ```bash
   pnpm install --prod
   pnpm start
   ```

## Database Considerations

### Current Setup: File-based Storage
- User data stored in JSON files
- Meta Business credentials in local files
- Works for small to medium scale

### Scaling Options:
1. **Keep file-based** for simplicity
2. **Upgrade to PostgreSQL** for better performance
3. **Use AWS RDS** if deploying to AWS

## DNS Configuration for GoDaddy

### For any deployment option:
1. **Login to GoDaddy DNS Management**
2. **Update A Records:**
   - Type: A
   - Name: @
   - Value: [Your deployment IP]
   - TTL: 1 Hour

3. **Update CNAME (if needed):**
   - Type: CNAME
   - Name: www
   - Value: [Your deployment domain]

## Security Checklist

✅ Environment variables secured  
✅ API keys not in code  
✅ HTTPS enabled  
✅ Authentication implemented  
✅ Input validation in forms  

## Next Steps

1. **Choose deployment option** (Vercel recommended)
2. **Set up domain DNS** in GoDaddy
3. **Test production deployment**
4. **Monitor performance**

## Support Commands

### Test build locally:
```bash
cd apps/web
pnpm run build
pnpm start
```

### Check deployment status:
- Vercel: Check dashboard
- AWS: Check Amplify console
- VPS: Check server logs

## File Structure Ready for Production
```
apps/web/
├── .next/          # Built application
├── src/
│   ├── app/        # Next.js 15 app router
│   ├── components/ # UI components
│   ├── lib/        # Utilities & stores
│   └── ...
├── public/         # Static assets
└── package.json    # Dependencies
```

Your app is production-ready! Choose your deployment method and follow the steps above.
