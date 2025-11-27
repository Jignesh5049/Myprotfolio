# EmailJS Setup Instructions

To enable the contact form on your deployed portfolio, you need to set up EmailJS (free service that works with static sites like GitHub Pages).

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)

## Step 2: Create Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. Copy the **Service ID** (e.g., `service_xxxxxxx`)

## Step 3: Create Email Template

1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Use this template:

```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save and copy the **Template ID** (e.g., `template_xxxxxxx`)

## Step 4: Get Public Key

1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g., `xxxxxxxxxxxxx`)

## Step 5: Configure Environment Variables

### For Local Development:

Create a `.env` file in the root directory:

```
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### For GitHub Pages Deployment:

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Add these repository secrets:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`

4. Update your GitHub Actions workflow (if using one) or use GitHub Pages environment variables

**Important:** The application now uses environment variables from `.env` file. Make sure your `.env` file is in the root directory and contains:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

The `.env` file is already in `.gitignore` so your credentials won't be committed to version control.

## Step 6: Test

1. Start your dev server: `npm run dev`
2. Fill out the contact form
3. Check your email inbox for the test message

## Troubleshooting

- If emails aren't sending, check the browser console for errors
- Make sure all three IDs/keys are correctly set
- Verify your EmailJS service is connected properly
- Check EmailJS dashboard for usage limits (free tier: 200 emails/month)

