# Jignesh Prajapati Portfolio

Modern portfolio built with React and Vite (Rolldown), featuring project case studies, skills timeline, and contact form support.

Live site: https://jigneshprotfolio.vercel.app/

## Highlights

- Dark/light theme toggle
- Project listing + project details pages
- Mobile screenshot-friendly galleries
- Skills and experience sections with modal details
- Contact form with EmailJS integration

## Tech Stack

- React 19
- React Router
- Framer Motion
- Lucide React
- Vite (via `rolldown-vite`)
- Express (optional local server in `server/`)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

Copy `.env.example` to `.env` and set your EmailJS credentials.

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Detailed setup: see `EMAILJS_SETUP.md`.

3. Run development server:

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Production build
- `npm run preview` - Preview built app locally
- `npm run lint` - Run ESLint
- `npm run server` - Start local Express server with nodemon

## Project Structure

```text
.
├── src/                  # Frontend source
├── public/               # Static assets
├── server/               # Optional backend endpoint(s)
├── docs/                 # Static docs/deploy assets
├── EMAILJS_SETUP.md
├── TROUBLESHOOTING.md
└── vite.config.js
```

## Notes

- `dist/` is generated during build and is not committed.
- Keep `.env` private. Use `.env.example` for shared config keys.

## License

For personal portfolio use.
