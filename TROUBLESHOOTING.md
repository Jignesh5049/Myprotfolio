# Troubleshooting EmailJS Contact Form

## Error: "The service ID not found"

This error means EmailJS cannot find the service with the ID you provided. Here's how to fix it:

### Step 1: Verify Your Service ID

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/admin)
2. Click on **Email Services** in the left menu
3. Find your service and click on it
4. Check the **Service ID** - it should look like `service_xxxxxxxxx`
5. Make sure it matches exactly what's in your `.env` file

### Step 2: Verify Your Template ID

1. In EmailJS Dashboard, go to **Email Templates**
2. Find your template and click on it
3. Check the **Template ID** - it should look like `template_xxxxxxxxx`
4. Make sure it matches exactly what's in your `.env` file

### Step 3: Verify Your Public Key

1. In EmailJS Dashboard, go to **Account** → **General**
2. Find your **Public Key**
3. Make sure it matches exactly what's in your `.env` file

### Step 4: Check Your .env File

Your `.env` file should look like this (without quotes):

```env
VITE_EMAILJS_SERVICE_ID=service_538qscn
VITE_EMAILJS_TEMPLATE_ID=template_9s5jd36
VITE_EMAILJS_PUBLIC_KEY=deatPddu4es3yZVFB
```

**Important:** 
- No spaces around the `=` sign
- No quotes around the values
- Make sure there are no extra characters or spaces

### Step 5: Rebuild Your Project

After updating your `.env` file:

1. Stop your dev server (Ctrl+C)
2. Delete the `dist` folder if it exists
3. Run `npm run build` to rebuild with new environment variables
4. Restart dev server: `npm run dev`

### Step 6: For GitHub Pages Deployment

When deploying to GitHub Pages, environment variables need to be available at build time:

1. Make sure your `.env` file is in the root directory
2. Run `npm run build` locally (this bakes the env vars into the build)
3. Deploy the `dist` folder to GitHub Pages

**OR** use GitHub Actions with secrets:
- Go to your GitHub repo → Settings → Secrets and variables → Actions
- Add secrets for each variable
- Use them in your GitHub Actions workflow

### Common Issues

1. **Service ID format wrong**: Should start with `service_`
2. **Template ID format wrong**: Should start with `template_`
3. **Service not connected**: Make sure your email service is properly connected in EmailJS
4. **Template not published**: Make sure your template is saved and published
5. **Wrong account**: Make sure you're using the correct EmailJS account

### Testing Locally

1. Make sure your `.env` file is correct
2. Run `npm run dev`
3. Open browser console (F12)
4. Try submitting the form
5. Check console for any error messages
6. Check EmailJS dashboard for sent emails

### Still Not Working?

1. Double-check all IDs in EmailJS dashboard
2. Verify the service is active and connected
3. Check if you've hit the free tier limit (200 emails/month)
4. Try creating a new service and template in EmailJS
5. Make sure you're using the correct EmailJS account

