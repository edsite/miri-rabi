# Miri Rabi - Kallah Teacher Website

A professional, fully-featured website for Miri Rabi's Kallah teaching and marriage education services.

## Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Credentials & trust section (Mindy Wiesner training)
- ✅ Transparent pricing breakdown
- ✅ Blog/Resources section for free content
- ✅ Calendly booking integration
- ✅ Email contact form (FormSubmit.co)
- ✅ FAQ accordion
- ✅ WhatsApp integration
- ✅ Professional typography and design

## Project Structure

```
miri-rabi-website/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── App.jsx             # Main component
│   └── index.js            # React entry point
├── package.json            # Dependencies
├── .gitignore              # Files to ignore in Git
└── README.md               # This file
```

## Installation & Deployment

### Option 1: Deploy with Netlify (Recommended)

1. **Push files to GitHub** (already done)
2. **Connect Netlify to GitHub:**
   - Go to netlify.com → "Add new site" → "Connect to Git"
   - Select GitHub and authorize
   - Choose your Miri repository
   - Netlify auto-detects React → Auto-builds and deploys

3. **Done!** Your site will be live at `yoursite.netlify.app`

### Option 2: Deploy with Vercel

1. **Go to vercel.com** → "New Project"
2. **Import from Git** → Select your Miri repository
3. **Vercel auto-detects React** → Click Deploy
4. **Done!** Site is live in ~30 seconds

## Customization

### Update Calendly Link
In `src/App.jsx`, find this line:
```javascript
const CALENDLY_URL = "https://calendly.com/mirirabi18/15min";
```
Update with your Calendly URL.

### Update Email Address
The form sends to `mirirabi18@gmail.com` via FormSubmit. To change:
1. Go to `src/App.jsx`
2. Find: `action="https://formsubmit.co/mirirabi18@gmail.com"`
3. Replace with your email

### Update Pricing
In `src/App.jsx`, find the Services section and update prices:
- Comprehensive Course: $1,400
- Post-Wedding Support: $420
- Refresher Classes: $150/session

### Update Blog Resources
In `src/App.jsx`, find the `blogResources` array and update titles/descriptions.

## Technologies

- **React 18** - UI framework
- **Tailwind CSS** - Styling (via className utilities)
- **Lucide React** - Icons
- **FormSubmit.co** - Email form handling
- **Calendly** - Booking system

## Support

- **Netlify Docs:** netlify.com/docs
- **Vercel Docs:** vercel.com/docs
- **React Docs:** react.dev
- **Tailwind CSS:** tailwindcss.com

## Live Site

Once deployed, your site will be available at:
- Netlify: `yoursite.netlify.app`
- Vercel: `yoursite.vercel.app`

You can also connect a custom domain (e.g., `miri-rabi.com`) through your domain registrar's DNS settings.
