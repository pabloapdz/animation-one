# 🚀 Portfolio - Development & Digital Innovation

A modern and interactive portfolio developed with Next.js, focused on demonstrating web development skills through advanced animations and responsive design.

## ✨ Features

- **Modern Design**: Clean and professional interface focused on user experience
- **Advanced Animations**: Implemented with GSAP and Framer Motion for smooth transitions
- **Responsive**: Fully adaptable for different devices and screen sizes
- **Optimized Performance**: Built with Next.js 16 and React 19 for maximum performance
- **Reusable Components**: Modular architecture with well-structured components

## 🛠️ Technologies Used

- **Framework**: Next.js 16.0.1
- **Frontend**: React 19.2.0, TypeScript
- **Styling**: TailwindCSS 4, Radix UI
- **Animations**: GSAP 3.13.0, Framer Motion 12.23.24
- **Icons**: Lucide React
- **Linting**: ESLint with Next.js configuration

## 🎯 Project Sections

### 1. Video Hero Section
- Interactive background video
- Custom playback modal
- Smooth entrance animations

### 2. Vision and Team Section
- Mission and values presentation
- Team cards with GSAP animations
- Responsive layout with grid system

### 3. Development Process
- Visual workflow of work process
- Sequential card animations
- Custom SVG icons

### 4. Interactive Parallax
- Parallax effect with ScrollTrigger
- Dynamic text animations
- Continuous element rotation

### 5. Professional Footer
- Social media links
- Contact information
- Call-to-action for projects

## 🚀 How to Run

### Prerequisites
- Node.js 18+ installed
- npm, yarn, pnpm or bun

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd animation-one
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
animation-one/
├── app/
│   ├── components/
│   │   ├── VideoHeroSection.tsx    # Video hero
│   │   ├── MissionLeadershipSection.tsx # Vision and team
│   │   ├── ProcessSection.tsx      # Work process
│   │   ├── PinnedParallax.tsx     # Parallax section
│   │   └── Footer.tsx             # Footer
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Main layout
│   └── page.tsx                   # Home page
├── public/                        # Static files
└── package.json                   # Dependencies
```

## 🎨 Customization

### Colors and Theme
Main colors can be adjusted in the `globals.css` file through custom CSS variables.

### Animations
- **GSAP**: Settings in each individual component
- **Framer Motion**: Variants defined in components

### Content
All texts and data are centralized in respective components for easy maintenance.

## 📱 Responsiveness

The project uses TailwindCSS with standard breakpoints:
- **sm**: 640px+
- **md**: 768px+
- **lg**: 1024px+
- **xl**: 1280px+

## 🔧 Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates the production build
- `npm run start` - Starts the production server
- `npm run lint` - Runs the linter

## 📈 Performance

- **Core Web Vitals** optimized
- **Lazy loading** of components
- **Automatic image optimization** from Next.js
- **Automatic code splitting**

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are always welcome!

## 📄 License

This project is under the MIT license. See the LICENSE file for more details.

## 📞 Contact

- **Email**: contact@devportfolio.com
- **LinkedIn**: [Your LinkedIn]
- **GitHub**: [Your GitHub]

---

Developed with ❤️ and lots of ☕ by [Your Name]
