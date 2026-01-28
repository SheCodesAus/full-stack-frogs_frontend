# TeamPulse Frontend

A modern React application for team wellness and engagement tracking. TeamPulse enables team members to check in with their mood and workload status, while managers gain insights into team dynamics through interactive dashboards and analytics.

## 📋 Project Overview

TeamPulse is a full-stack application designed to foster team wellbeing by allowing employees to log regular check-ins about their emotional state and workload. Managers can view team trends, identify patterns, and proactively support their teams. The application features role-based access with distinct interfaces for team members and managers.

### Key Features

- **User Check-ins**: Team members can submit weekly check-ins tracking mood (Angry → Empowered) and workload (Overwhelmed → Light)
- **Manager Dashboard**: View team-wide analytics including mood trends, workload distribution, and historical comparisons
- **Individual Dashboards**: Users can track their own check-in history and personal wellness metrics
- **Weekly Trend Analysis**: Compare current week data against previous periods with interactive line charts
- **Real-time Data Visualization**: Dynamic charts powered by Recharts for immediate insights
- **Role-Based Access Control**: Distinct views and permissions for team members vs. managers
- **User Authentication**: Secure login and signup system with token-based authentication
- **Responsive Design**: Fully responsive interface that works on desktop and mobile devices

## 🛠️ Tech Stack

**Frontend Framework & Build**
- React 19.2.0 - UI library
- Vite 7.2.2 - Fast build tool and dev server
- React Router DOM 7.9.6 - Client-side routing

**Data Visualization**
- Recharts 3.5.0 - Interactive charts and graphs
- Chart.js 4.5.1 - Additional charting capabilities
- React-ChartJS-2 5.3.1 - React bindings for Chart.js

**UI & Animation**
- Framer Motion 12.23.24 - Smooth animations and transitions
- FontAwesome 7.1.0 - Icon library
- Lucide React 0.556.0 - Modern icon set

**HTTP & State Management**
- Axios 1.13.2 - API client for HTTP requests
- React Hooks - Built-in state management

**Developer Tools**
- ESLint 9.39.1 - Code linting
- Vite plugin React - Fast refresh for development

## 📁 Project Structure

```
src/
├── api/                 # API endpoint functions
│   ├── get-checkins-by-week.js
│   ├── get-moods.js
│   ├── get-teams.js
│   ├── get-user-by-id.js
│   ├── get-workloads.js
│   ├── post-createcheckin.js
│   └── post-signup.js
├── components/          # Reusable React components
│   ├── AllCheckinView.jsx     # View all check-ins
│   ├── AuthProvider.jsx       # Authentication context
│   ├── ButtonComponent.jsx    # Reusable button
│   ├── CardIcon.jsx
│   ├── CheckInForm.jsx        # Check-in submission form
│   ├── DashboardButton.jsx    # Dashboard navigation
│   ├── DashboardCard.jsx      # Dashboard card display
│   ├── DashboardView.jsx      # Manager dashboard view
│   ├── LandingAnimation.jsx   # Landing page animations
│   ├── Loader.jsx             # Loading spinner
│   ├── LoginForm.jsx          # Login form
│   ├── Logo.jsx               # Logo component
│   ├── Logout.jsx
│   ├── ManagerOnly.jsx        # Manager access guard
│   ├── NavBar.jsx             # Navigation bar
│   ├── NeedsAttention.jsx     # Alert component
│   ├── PieChart.jsx           # Pie chart visualization
│   ├── WeeklyComparison.jsx   # Weekly trend charts
│   └── user/                  # User-specific components
│       ├── UserCheckins.jsx       # User check-in history
│       ├── UserDashboard.jsx      # User dashboard
│       ├── UserQuote.jsx
│       ├── UserStats.jsx
│       └── UserWeeklyComparison.jsx
├── pages/               # Page components
│   ├── 404Page.jsx
│   ├── CheckInPage.jsx        # Check-in form page
│   ├── HomePage.jsx           # Landing page
│   ├── LoginPage.jsx
│   ├── ManagerDashboardPage.jsx
│   ├── PermissionDeniedPage.jsx
│   ├── SignupPage.jsx
│   └── UserDashboardPage.jsx
├── hooks/               # Custom React hooks
│   ├── use-auth.js
│   ├── use-checkins.js
│   ├── use-moods.js
│   ├── use-teams.js
│   ├── use-user.js
│   └── use-workloads.js
├── data/                # Mock data for development
│   ├── mockForTeamMood.js
│   ├── mockForTeamWorkflow.js
│   ├── mockPulseLogs.js
│   └── mockTeams.js
├── styles/              # Global styles
│   └── global.css
├── assets/              # Static assets
├── main.jsx             # Application entry point
└── App.jsx              # Root component

public/
└── _redirects           # Netlify routing configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd teampulse-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (if needed for API endpoints):
```bash
# Create a .env file with your backend API URL
VITE_API_URL=http://localhost:8000
```

### Development

Start the development server with hot module replacement:
```bash
npm run dev
```

The application will open at `http://localhost:5173`

### Build for Production

Create an optimized production build:
```bash
npm run build
```

Build artifacts will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## 🔐 Authentication & Authorization

The application uses token-based authentication with two user roles:

- **Team Members**: Can submit check-ins, view personal dashboards and history
- **Managers** (`is_staff=true`): Have access to all team data, manager dashboard, and analytics

Authentication is managed through the `AuthProvider` context and persisted via custom hooks.

## 📊 Key Components

### Check-in System
- `CheckInForm.jsx` - Allows users to submit mood and workload ratings
- `CheckInPage.jsx` - Full-page check-in interface
- Data flows through `use-checkins.js` hook

### Dashboard Views
- **Manager Dashboard**: `ManagerDashboardPage.jsx` - Overview of all teams and their metrics
- **User Dashboard**: `UserDashboardPage.jsx` - Personal wellness tracking
- Team and individual insights displayed through `DashboardView.jsx` and `DashboardCard.jsx`

### Analytics & Visualization
- `WeeklyComparison.jsx` - Line charts comparing current vs. previous period trends
- `PieChart.jsx` - Mood/workload distribution visualization
- `AllCheckinView.jsx` - Historical check-in data table/list

### Navigation & Routing
- `NavBar.jsx` - Main navigation
- Role-based route protection with `ManagerOnly.jsx`

## 🎨 Styling

Component-specific styles are co-located with their respective components:
- Each component has a corresponding `.css` file
- Global styles in `src/styles/global.css`
- Responsive design using CSS media queries

## 🔄 Data Flow

1. User submits check-in through `CheckInForm`
2. Data sent to backend via `post-createcheckin.js`
3. Custom hooks (`use-checkins`, `use-moods`, `use-workloads`) fetch data from API
4. Components receive data as props or via context
5. Charts and dashboards render real-time data

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first CSS approach
- Custom `useIsDesktop()` hook for responsive layout decisions
- Adaptive chart sizing and component layouts

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:
1. Create a feature branch from `main`
2. Make your changes with clear commit messages
3. Test thoroughly in development mode
4. Submit a pull request with a detailed description

## 📝 Notes

- Mock data in `src/data/` is used for development/testing
- Some components reference undefined variables (e.g., `moodLabels`, `labels`) that should be imported from configuration
- Consider migrating to TypeScript for improved type safety in production

## 🔗 Backend Integration

This frontend connects to a Django/DRF backend for:
- User authentication and profile management
- Team data management
- Check-in submission and retrieval
- Mood and workload analytics

Ensure the backend server is running before testing API functionality.
