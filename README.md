# Maha Ganapati Committee - Bandarupally Village Portal

A premium, production-ready, fully responsive React + TypeScript Single Page Application (SPA) built for the **Maha Ganapati Committee in Bandarupally Village**. This website serves as a digital bridge connecting villagers, devotees, sponsors, and committee members under the spiritual glory of Lord Ganesha celebrations.

---

## 🌟 Features

### 1. Public Portal
* **Devotional Premium Aesthetics**: Handcrafted design tokens combining clean modern layouts (glassmorphism, subtle micro-animations) with traditional saffron and golden color schemes.
* **Dual Theme Engine**: Fast, seamless dark/light mode toggle with persistent preferences stored in `localStorage`.
* **Sticky Glassmorphic Navbar**: Dynamic backdrop blur that reduces padding and highlights the active route on scroll.
* **Animated Home Page**:
  * Majestic Ganesha Hero section.
  * Live-counting statistics (Celebrating years, photo archives, volunteer counts).
  * Announcement Board tracking live notices.
  * Carousel showcasing recent festival highlights (via Swiper.js).
  * Mirror grid simulating the official Instagram feed with hover action badges and metrics.
* **Vertical Timeline (About Page)**: A vertical milestone chart mapping festival details, themes, and clay idol specifications from 2018 (inception) to 2026.
* **Year-Wise Gallery (2021 - 2026)**: Grid of year directories opening custom subpages with search filters, paginated photos, embedded video playlists, daily pooja timings, prasadam lists, and sponsor indices.
* **High-Fidelity Lightbox**: Custom media overlay featuring download anchors and share triggers (copies links directly to clipboard).
* **Ganesh Chaturthi Countdown**: Live ticking clock calculating days, hours, minutes, and seconds remaining until the next Chaturthi Sthapana.
* **Village Help Portal**: A public dashboard where villagers can submit road, street light, water leakage, or medical emergency issues. It supports status tracking, discussion comments, and real-time synchronization.
* **Contact & Maps**: Responsive email/phone forms and an embedded interactive Google Map of Bandarupally Village.

### 2. Admin CMS Dashboard
* **Protected Login Route**: Restricts access via authentication checkers (Username: `admin`, Password: `mgc_bandarupally`).
* **Realtime Counters**: Displays active volunteer registrations, open complaints, and announcements.
* **Grievance Resolution Desk**: Lets administrators approve, reject, or mark issues as solved, and write official responses displayed on the public portal.
* **Announcement Publisher**: Form to append important notices to the live alerts board.
* **Sponsors & Photo Manager**: Controls to register new sponsors and upload gallery items.

---

## 🛠️ Tech Stack

* **Core**: React 19 + TypeScript + Vite
* **Routing**: React Router (v7)
* **Styling**: Tailwind CSS (v3.4) + PostCSS + Autoprefixer
* **Animations**: Framer Motion
* **Iconography**: React Icons (Lucide, Feather)
* **Sliders**: Swiper.js
* **Backend Services**: Firebase Core (Firestore, Storage, Authentication placeholders)
* **Hosting Redirects**: Vercel Routing Configuration

---

## 📁 Folder Structure

```text
MGC/
├── public/
│   └── favicon.svg           # Application icon
├── src/
│   ├── assets/               # Local images & media
│   ├── components/
│   │   ├── common/
│   │   │   ├── ImageLightbox.tsx  # Media viewer overlays
│   │   │   ├── LoadingScreen.tsx  # Ganesha SVG progress screen
│   │   │   ├── ScrollToTop.tsx    # Scroll-to-top floating button
│   │   │   └── ThemeToggle.tsx    # Theme toggler button
│   │   └── layout/
│   │       ├── Footer.tsx         # Quick links & info footer
│   │       ├── Layout.tsx         # Page layout outlet container
│   │       └── Navbar.tsx         # Glassmorphism header menu
│   ├── context/
│   │   └── ThemeContext.tsx  # Persisted light/dark mode context
│   ├── firebase/
│   │   └── config.ts         # Firebase SDK initializations
│   ├── hooks/
│   │   └── useSEO.ts         # Page tab metadata updater
│   ├── pages/
│   │   ├── About.tsx         # Mission, History, & Timeline
│   │   ├── AdminDashboard.tsx# CMS Board Control desk
│   │   ├── AdminLogin.tsx    # Administrator access gate
│   │   ├── Committee.tsx     # Meet the organizers
│   │   ├── Contact.tsx       # Message inputs & Google maps
│   │   ├── Events.tsx        # Live countdown timer & volunteer form
│   │   ├── Gallery.tsx       # Years folder selection (2021-2026)
│   │   ├── Home.tsx          # Hero page, stats, alerts, Swiper carousel
│   │   ├── Sponsors.tsx      # Contributor log
│   │   ├── Videos.tsx        # Video playlist grid
│   │   ├── VillageHelp.tsx   # Public grievance portal
│   │   └── YearGallery.tsx   # Detailed subpages for each year
│   ├── routes/
│   │   └── AppRoutes.tsx     # Router configuration
│   ├── styles/
│   │   └── index.css         # Global Tailwind directives & glow effects
│   ├── utils/
│   │   └── mockData.ts       # Central data structures & constants
│   ├── App.tsx               # Main routing shell
│   └── main.tsx              # Application entry point
├── .env.example              # Key templates file
├── .env                      # Local key configuration parameters
├── .gitignore                # Git exclusions config
├── eslint.config.js          # ESLint rules configuration
├── tailwind.config.js        # Tailwind style engine extends
├── postcss.config.js         # PostCSS plugins config
├── tsconfig.json             # Root TypeScript config
├── vite.config.ts            # Vite bundler parameters
├── vercel.json               # Vercel SPA routing redirects
├── LICENSE                   # MIT License parameters
└── README.md                 # Project document guide
```

---

## 🚀 Installation & Local Development

### 1. Prerequisite
Ensure you have [Node.js](https://nodejs.org) (v18+) installed.

### 2. Setup
1. Clone this repository or download the files.
2. Navigate to the project root directory:
   ```bash
   cd MGC
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Copy the environment template:
   ```bash
   cp .env.example .env
   ```
5. Run the local development server:
   ```bash
   npm run dev
   ```
6. Open `http://localhost:5173` in your browser.

---

## 🔥 Firebase Configuration Setup

This project is pre-configured with Firebase Firestore and Storage integration. To connect your active Firebase instance:

1. Create a project at [Firebase Console](https://console.firebase.google.com).
2. Register a new Web App under the project settings to acquire the SDK credentials object.
3. Enable **Cloud Firestore** and **Cloud Storage** under the console build tab.
4. Fill in your `.env` parameters:
   ```env
   VITE_FIREBASE_API_KEY=your_actual_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_actual_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_actual_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_actual_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_actual_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_actual_app_id
   ```

*Note: If no Firebase configurations are provided, the portal operates seamlessly using robust local storage mock databases.*

---

## ⚡ Deployment Instructions

### Deploying to Vercel
This project includes a `vercel.json` configuration specifying URL rewrite rules to ensure client-side routing works on refresh.
1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel` in the project root folder.
3. Follow the CLI login prompts to host your site live instantly.

---

## 🛡️ License

This project is open-source and licensed under the [MIT License](LICENSE).

---

## 📸 Screenshots & Visual Aesthetics
The project uses elegant fonts (`Cinzel` for devotional titles, `Inter` for clean interfaces), glassmorphic card boundaries, custom scrollbars, and dynamic Framer Motion spring sliders.
