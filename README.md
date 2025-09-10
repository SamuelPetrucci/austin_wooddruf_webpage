# Jordan Health Solutions Website

A modern, professional website for Jordan Smith's insurance services, built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Live Demo

[Deploy to Vercel](https://vercel.com) - Ready for production deployment

## 📋 Features

### ✨ Modern Design
- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Smooth Animations** - Professional fade-in transitions and hover effects
- **Custom Favicon** - Shield with check mark branding
- **Gradient Backgrounds** - Modern visual appeal

### 🎯 Key Sections
- **Hero Section** - Compelling call-to-action with Jordan's stats
- **Services** - Life, Health, and Additional Protection insurance
- **Carriers Banner** - Animated scrolling display of insurance partners
- **Why Choose Us** - Jordan's unique value propositions
- **About Jordan** - Personal story and professional background
- **States Served** - Interactive display of 30 licensed states
- **Quote & Booking** - Tabbed interface for contact form and Calendly
- **Footer** - Contact information and quick links

### 🛠 Technical Features
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for utility-first styling
- **Intersection Observer** for scroll animations
- **Custom Components** with reusable animations
- **SEO Optimized** with proper meta tags
- **Performance Optimized** with Next.js Image component

## 🏗 Project Structure

```
jordan_smith_webpage/
├── public/
│   ├── favicon.svg          # Custom shield favicon
│   ├── jordan-headshot.png  # Professional headshot
│   └── logos/               # Insurance carrier logos
│       ├── aetna.webp
│       ├── bcbs.webp
│       ├── allstate.webp
│       ├── cigna.avif
│       └── anthem.avif
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles and animations
│   │   ├── layout.tsx       # Root layout with metadata
│   │   └── page.tsx         # Main page component
│   └── components/
│       ├── AnimatedSection.tsx    # Reusable animation wrapper
│       └── sections/
│           ├── Navigation.tsx           # Header navigation
│           ├── HeroSection.tsx          # Hero with CTA buttons
│           ├── ServicesSection.tsx      # Insurance services
│           ├── InsuranceCarriersWheel.tsx # Animated carrier banner
│           ├── WhyChooseUsSection.tsx   # Value propositions
│           ├── AboutSection.tsx         # Jordan's story
│           ├── StatesSection.tsx        # 30 states display
│           ├── QuoteAndBookingSection.tsx # Contact & booking
│           └── Footer.tsx               # Footer with contact info
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jordan_smith_webpage
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx tsc --noEmit` - Type check without building

## 🎨 Customization

### Adding New Sections
1. Create component in `src/components/sections/`
2. Import and add to `src/app/page.tsx`
3. Add navigation link in `Navigation.tsx`

### Updating Content
- **Jordan's Info**: Update `AboutSection.tsx`
- **Services**: Modify `ServicesSection.tsx`
- **States**: Edit the `states` array in `StatesSection.tsx`
- **Contact Info**: Update `Footer.tsx` and `QuoteAndBookingSection.tsx`

### Styling
- **Colors**: Modify Tailwind classes or update `tailwind.config.js`
- **Animations**: Adjust delays in `AnimatedSection.tsx` or add custom CSS
- **Layout**: Update grid classes and spacing utilities

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🔧 Technical Details

### Animation System
- **Intersection Observer** for scroll-triggered animations
- **Staggered Delays** for sequential element reveals
- **Hover Effects** with transform and scale
- **Smooth Scrolling** for navigation

### Performance
- **Next.js Image Optimization** for all images
- **Static Generation** for fast loading
- **Code Splitting** for optimal bundle sizes
- **SEO Optimization** with proper meta tags

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push

### Other Platforms
- **Netlify**: Compatible with static export
- **AWS S3**: Upload build files
- **Custom Server**: Use `npm run build` and `npm run start`

## 📞 Contact Information

**Jordan Smith - Insurance Professional**
- Phone: (860) 941-7770
- Email: insuredwithjordann@gmail.com
- Service Area: Tampa, FL (Serving 30 States)

## 📄 License

This project is proprietary to Jordan Health Solutions.

## 🤝 Contributing

For updates or modifications, please contact the development team.

---

**Built with ❤️ for Jordan Health Solutions**