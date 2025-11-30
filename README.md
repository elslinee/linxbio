# LinxBio - Smart Link-in-Bio Platform

**One Smart Link for Everything**

LinxBio is a modern, full-stack link-in-bio platform that allows users to create customizable profile pages with social links, content blocks, and beautiful templates. Built with Next.js 16, React 19, MongoDB, and a comprehensive design system.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Database Schema](#database-schema)
- [API Routes](#api-routes)
- [State Management](#state-management)
- [Authentication & Authorization](#authentication--authorization)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Key Components](#key-components)
- [Customization System](#customization-system)
- [Deployment](#deployment)

---

## 🎯 Overview

LinxBio is a **link-in-bio** platform similar to Linktree, but with enhanced customization features. Users can:

- Create personalized bio pages with custom domains/usernames
- Add multiple types of content blocks (buttons, galleries, email forms)
- Customize appearance with templates, colors, fonts, and button styles
- Manage social media links with drag-and-drop ordering
- Preview changes in real-time with a mobile phone mockup
- Publish and share their link-in-bio page

The application features a **dual-view dashboard** where users edit on the left panel and see a live preview on the right in a phone mockup.

---

## 🛠 Tech Stack

### Frontend

- **Next.js 16.0.3** - React framework with App Router
- **React 19.2.0** - UI library
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion 12.23** - Animation library
- **Zustand 5.0** - State management
- **Font Awesome 7.1** - Icon library
- **Zod 4.1** - Schema validation

### Backend

- **Next.js API Routes** - Serverless API endpoints
- **MongoDB 7.0** with **Mongoose 9.0** - Database and ODM
- **bcryptjs 3.0** - Password hashing
- **jsonwebtoken 9.0** - JWT authentication
- **Axios 1.13** - HTTP client

### Development Tools

- **Prettier 3.6** - Code formatting
- **babel-plugin-react-compiler 1.0.0** - React compilation optimization

---

## 📁 Project Structure

```
linxbio/
├── app/
│   ├── (routes)/           # Route groups
│   │   ├── (auth)/         # Authentication pages
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (user)/         # User-protected routes
│   │   │   ├── dashboard/  # Main dashboard with editor
│   │   │   └── get_started/ # Onboarding flow
│   │   └── [username]/     # Public profile pages
│   ├── api/                # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── linkbio/        # LinkBio CRUD operations
│   │   ├── users/          # User management
│   │   ├── admin/          # Admin-only endpoints
│   │   └── upload/         # File upload (Cloudinary)
│   ├── globals.css         # Global styles
│   ├── layout.js           # Root layout with fonts
│   └── page.js             # Landing page
├── components/             # Shared components
│   ├── AlertDialogProvider.jsx
│   ├── AuthInit.jsx
│   ├── Button.jsx
│   ├── PhonePreview.jsx
│   ├── ToggleSwitch.jsx
│   └── VerifiedIcon.jsx
├── stores/                 # Zustand state stores
│   ├── useAuthStore.js
│   ├── useBlocksStore.js
│   ├── useSideBarTabsStore.js
│   ├── useTemplateStore.js
│   └── useUserInfoStore.js
├── utils/
│   ├── client/             # Client-side utilities
│   │   ├── user/           # User API calls
│   │   └── admin/          # Admin API calls
│   └── server/             # Server-side utilities
│       ├── auth/           # JWT, session management
│       ├── db/             # Database connection
│       ├── schemas/        # Mongoose models
│       ├── validation/     # Zod validation schemas
│       └── responses/      # API response formatters
├── public/                 # Static assets
├── next.config.mjs         # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json
```

---

## ✨ Features

### 🎨 Customization System

- **5 Header Styles** - Different profile header layouts
- **10 Color Schemes** - Predefined color palettes (bg, text, accent)
- **12 Font Options** - Google Fonts integration
- **5 Button Styles** - Different button appearances

### 🔗 Content Blocks

- **Button Blocks** - Link to external URLs
- **Gallery Blocks** - Image galleries
- **Email Blocks** - Contact forms
- Drag-and-drop reordering
- Add, edit, delete functionality

### 📱 Social Media Integration

- 16 supported platforms (Instagram, TikTok, X/Twitter, YouTube, Facebook, GitHub, LinkedIn, Pinterest, Behance, Twitch, Discord, Telegram, WhatsApp, Threads, Email, Website)
- Drag-and-drop ordering
- Show/hide individual links
- Icon-based display

### 👤 Profile Management

- Avatar upload (Cloudinary integration)
- Cover image
- Display name
- Bio/description
- Username/custom domain
- Verified badge system
- Language selection

### 🔐 Authentication

- Email/password registration and login
- Google OAuth integration
- JWT-based sessions (HTTP-only cookies)
- Password hashing with bcrypt
- Role-based access (user/admin)

### 🎯 User Journey

1. **Landing Page** - Marketing page with demo
2. **Registration/Login** - Create account or sign in
3. **Get Started** - Onboarding flow (username selection)
4. **Dashboard** - Main editing interface with live preview
5. **Publish** - Save changes to database
6. **Public Page** - Shareable link-in-bio page (`/[username]`)

### 👨‍💼 Admin Features

- View all users (paginated)
- View user details
- View all linkbio profiles
- Admin-only API routes with role verification

---

## 🗄 Database Schema

### User Schema

```javascript
{
  fullName: String (required, 3-50 chars)
  username: String (unique, lowercase, 3-30 chars)
  email: String (required, unique, lowercase)
  password: String (hashed, required for local auth)
  provider: "local" | "google" | "facebook" | "instagram"
  picture: String (profile image URL)
  role: "user" | "admin"
  isGetStartedDone: Boolean (onboarding completion flag)
  createdAt: Date
  updatedAt: Date
}
```

### LinkBio Schema

```javascript
{
  userId: ObjectId (ref: User)

  profile: {
    verifiedBadge: Boolean
    keyEntered: Boolean
    displayName: String
    showName: Boolean
    username: String (unique)
    language: String (default: "en")
    avatar: String
    backgroundColor: String
    cover: String
    bio: String
    showBio: Boolean
  }

  blocks: [{
    type: "button" | "Gallery" | "Email"
    title: String
    subtitle: String
    data: Object
  }]

  socials: {
    instagram: String
    tiktok: String
    x: String
    threads: String
    twitch: String
    facebook: String
    github: String
    linkedin: String
    pinterest: String
    behance: String
    youtube: String
    discord: String
    telegram: String
    whatsapp: String
    email: String
    website: String
  }

  socialsOrder: [String] (array of social platform names)

  template: {
    colors: { bg, text, accent }
    font: String
    buttons: String
    header: String
  }

  createdAt: Date
  updatedAt: Date
}
```

---

## 🛣 API Routes

### Authentication (`/api/auth`)

- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/logout` - Clear authentication session
- `GET /api/auth/me` - Get current authenticated user
- `GET /api/auth/google` - Initiate Google OAuth flow
- `GET /api/auth/google/callback` - Google OAuth callback

### LinkBio (`/api/linkbio`)

- `GET /api/linkbio/me` - Get current user's linkbio data
- `PUT /api/linkbio/me` - Update current user's linkbio
- `POST /api/linkbio/me/social-order` - Update social links order
- `GET /api/linkbio/[username]` - Get public linkbio by username

### Users (`/api/users`)

- `POST /api/users/check-username` - Check username availability
- `POST /api/users/get-started` - Complete onboarding (set username)

### Admin (`/api/admin`) - Requires admin role

- `GET /api/admin/users` - List all users (paginated)
- `GET /api/admin/users/[user_id]` - Get user by ID
- `GET /api/admin/linkbio` - List all linkbios
- `GET /api/admin/linkbio/[id]` - Get linkbio by ID

### Upload (`/api/upload`)

- `POST /api/upload` - Upload images to Cloudinary

---

## 🔄 State Management

The application uses **Zustand** for global state with persistence:

### `useAuthStore.js`

- Current user data
- Loading state
- Login/logout actions

### `useTemplateStore.js` (Persisted to localStorage)

- Selected template options (header, colors, font, buttons)
- Template customization state
- Reset functionality

### `useUserInfoStore.js` (Persisted to localStorage)

- Profile information
- Social links
- Socials order
- Image upload state

### `useBlocksStore.js` (Persisted to localStorage)

- Content blocks array
- Add/update/delete/reorder blocks

### `useSideBarTabsStore.js`

- Active tab in dashboard sidebar
- Tab navigation state

---

## 🔐 Authentication & Authorization

### JWT-based Authentication

- JWTs stored in **HTTP-only cookies** (secure, not accessible via JavaScript)
- Token verification middleware for protected routes
- Token expiration and refresh handling

### Password Security

- Passwords hashed with **bcrypt** (salt rounds: 10)
- Passwords never included in API responses (excluded via Mongoose `select: false`)

### Authorization Levels

1. **Public** - Landing page, public profiles
2. **Authenticated** - Dashboard, profile editing
3. **Admin** - User management, analytics

### Route Protection

- Client-side: `useAuthStore` + `useEffect` redirects
- Server-side: JWT verification in API routes

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB database (local or Atlas)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd linxbio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Database
   MONGO_URI=mongodb://localhost:27017/linxbio
   # or MongoDB Atlas:
   # MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>

   # JWT Secret (generate a strong random string)
   JWT_SECRET=<your-secret-key-min-32-characters>

   # Cloudinary (for image uploads) - Sign up at https://cloudinary.com
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>

   # Google OAuth (optional) - Get credentials from Google Cloud Console
   GOOGLE_CLIENT_ID=<your-google-client-id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

   # Application URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

   **⚠️ Security Warning**: Never commit your `.env.local` file to version control. All values above are placeholders - replace them with your actual credentials.

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open the application**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 💻 Development

### Available Scripts

```bash
# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm start
```

### Code Quality

- **Prettier** is configured with Tailwind CSS plugin
- Components follow React 19 best practices
- Server/client separation in utils folder

### Adding New Features

#### 1. New Block Type

1. Update `link.bio.schema.js` to add new type to enum
2. Create block component in dashboard `_components`
3. Add to `blocks` rendering logic
4. Update block form in Panel component

#### 2. New Social Platform

1. Add to `socials` object in `link.bio.schema.js`
2. Add to `socialsOrder` default array
3. Add icon mapping in social link components
4. Update social links UI

#### 3. New Template Option

1. Add to respective options array in `useTemplateStore.js`
2. Create corresponding styles/components
3. Update template rendering logic

---

## 🧩 Key Components

### Landing Page (`app/page.js`)

- Marketing homepage with hero section
- Animated phone mockup demo
- Call-to-action buttons
- Conditional navigation (logged in vs. logged out)

### Dashboard (`app/(routes)/(user)/dashboard/page.jsx`)

- **Layout**: Navbar + Sidebar + Panel + PhonePreview
- **Sidebar**: Tab navigation (Page, Social Links, Design, Header, Settings)
- **Panel**: Dynamic content based on selected tab
- **PhonePreview**: Real-time preview of changes
- **Publish Button**: Saves all changes to database

### Dashboard Components

- `Navbar.jsx` - Top navigation with publish button
- `Sidebar.jsx` - Left sidebar with animated tabs
- `Panel.jsx` - Main editing panel (switches between tabs)
- `PhonePreviewDashboard.jsx` - Live mobile preview
- `SocialLinksSortable.jsx` - Drag-and-drop social links
- `CustomBtn.jsx` - Reusable button with dialog support
- Tab components (PageTab, SocialLinksTab, DesignTab, HeaderTab, SettingsTab)

### Public Profile Page (`app/(routes)/[username]/page.js`)

- Fetches linkbio data by username
- Renders profile with selected template
- Public-facing, shareable page
- SEO-optimized with metadata

### Authentication Components

- `AuthInit.jsx` - Auto-fetch user on app load
- Login/Register pages with form validation

### Shared Components

- `PhonePreview.jsx` - Generic phone mockup
- `Button.jsx` - Custom button with variants
- `ToggleSwitch.jsx` - Styled toggle input
- `VerifiedIcon.jsx` - Verified badge icon
- `AlertDialogProvider.jsx` - Global confirmation dialogs

---

## 🎨 Customization System

### Template Structure

Users can customize four main aspects:

1. **Header Style** (1-5)
   - Different layouts for profile header
   - Controls avatar placement, name display, bio layout

2. **Color Scheme** (10 options)
   - Background color
   - Text color
   - Accent color (for buttons, highlights)

3. **Font Family** (12 options)
   - All from Google Fonts
   - Applied via Tailwind CSS variables
   - Loaded in `app/layout.js`

4. **Button Style** (5 options)
   - Different border radius, shadows, hover effects
   - Applied via className patterns (`btns_style_1`, etc.)

### How Templates Work

1. User selects options in Dashboard > Design tab
2. Selections stored in `useTemplateStore` (persisted to localStorage)
3. On publish, template data sent to `/api/linkbio/me`
4. Public page fetches template and applies CSS classes dynamically
5. PhonePreview updates in real-time during editing

---

## 📦 Deployment

### Vercel (Recommended)

1. **Connect your repository**
   - Import project to Vercel
   - Vercel auto-detects Next.js

2. **Configure environment variables**
   - Add all required variables from the Environment Variables section to Vercel dashboard
   - Never use example/placeholder values in production

3. **Deploy**
   ```bash
   vercel deploy
   ```

### Environment Setup

- **Database**: Use MongoDB Atlas (cloud)
- **Images**: Cloudinary (already configured)
- **Domain**: Configure custom domain in Vercel

### Build Settings

- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

---

## 🔍 Code Review Summary

### ✅ Strengths

- **Modern Stack**: Next.js 16, React 19, latest libraries
- **Clean Architecture**: Well-organized folder structure
- **State Persistence**: Zustand with localStorage for better UX
- **Real-time Preview**: Excellent user experience with live phone mockup
- **Scalable Backend**: RESTful API design with proper error handling
- **Security**: HTTP-only cookies, password hashing, JWT verification
- **Responsive Design**: Tailwind CSS with mobile-first approach
- **Type Safety**: TypeScript configuration in place
- **Template System**: Flexible and extensible customization

### 🔧 Areas for Potential Enhancement

1. **Error Handling**: Add global error boundaries
2. **Loading States**: More consistent loading indicators
3. **API Response Caching**: Consider React Query or SWR
4. **Analytics**: Track page views, clicks on public pages
5. **SEO**: Add more meta tags, Open Graph, Twitter Cards for public profiles
6. **Image Optimization**: Better compression and lazy loading
7. **Accessibility**: ARIA labels, keyboard navigation improvements
8. **Testing**: Add unit tests (Jest) and E2E tests (Playwright)
9. **Performance**: Code splitting for larger components
10. **Documentation**: Add JSDoc comments to complex functions

### 🎯 Recommended Next Steps

1. Implement comprehensive error handling and user feedback
2. Add analytics and tracking
3. Create admin dashboard for user management
4. Add more block types (video, music, podcast)
5. Implement domain custom mapping
6. Add A/B testing for templates
7. Create email notifications (new followers, analytics)
8. Add QR code generation for profiles
9. Implement profile scheduling (show/hide blocks by date/time)
10. Add team collaboration features

---

## 📄 License

MIT License - feel free to use this project for learning or personal use.

---

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## � Security

- Never commit `.env.local` or any files containing sensitive credentials
- Always use strong, randomly generated JWT secrets in production
- Enable 2FA on all third-party services (MongoDB Atlas, Cloudinary, Google Cloud)
- Regularly update dependencies to patch security vulnerabilities

If you discover a security vulnerability, please report it responsibly.

---

## 🎉 Acknowledgments

Built with:

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Framer Motion](https://www.framer.com/motion/)
- [Font Awesome](https://fontawesome.com/)
- [Cloudinary](https://cloudinary.com/)

---

**LinxBio** - Transform your link-in-bio into a smart hub for your work, products, and presence. 🚀
