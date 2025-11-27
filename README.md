# Jignesh Prajapati's Portfolio

A modern, responsive portfolio website built with React and Vite, featuring UI/UX projects, skills showcase, and a contact form.

🌐 **Live Site:** [https://jignesh5049.github.io/protfolio/](https://jignesh5049.github.io/protfolio/)

## Features

- ✨ Modern, responsive design with dark/light theme toggle
- 🎨 Showcase of UI/UX projects with interactive modals
- 📱 Mobile-optimized with smooth scrolling galleries
- 📧 Contact form integration with EmailJS
- 🎓 Education and skills sections
- 🖼️ Project screenshots with mobile-friendly viewing

## Setup

### Install Dependencies

```bash
npm install
```

### Configure Contact Form (EmailJS)

The contact form uses EmailJS to send emails. Follow the detailed instructions in [EMAILJS_SETUP.md](./EMAILJS_SETUP.md) to set up your EmailJS account and configure the environment variables.

Quick setup:
1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Create a service and template
3. Add your credentials to `.env` file:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Deploy to GitHub Pages

1. Build the project: `npm run build`
2. Push the `dist` folder to your `gh-pages` branch
3. Or use GitHub Actions for automatic deployment

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool
- **EmailJS** - Contact form service
- **CSS3** - Styling with custom properties

## Project Structure

```
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Styles
│   └── assets/          # Images and logos
├── server/               # Backend API (optional, for local dev)
├── public/              # Static assets
└── dist/                # Build output
```

## License

© 2025 Jignesh Prajapati. All rights reserved.
