# 🚀 ProRecruit - Advanced Recruitment Management System

## 📋 Overview
ProRecruit is a comprehensive recruitment management system built with Next.js 15, TypeScript, and Tailwind CSS. It provides a complete solution for managing candidates, jobs, clients, vendors, and the entire recruitment process.

## ✨ Features

### 🎯 Core Modules
- **👥 Candidate Management** - Complete candidate lifecycle tracking
- **💼 Job Management** - Advanced job requisition system with alerts
- **🏢 Client Management** - Client relationships and purchase orders
- **🤝 Vendor Management** - Supplier and contractor management
- **📋 Contract & Employee Management** - HR operations
- **📊 Executive Dashboard** - Real-time analytics and insights
- **💾 CV Database** - Centralized resume management

### 🔥 Advanced Job Management System
- **Enhanced Job Cards** with visual status indicators
- **Candidate Management Integration** with interview tracking
- **Smart Alert System** for performance monitoring
- **Dual View Modes** - Cards and Table view
- **Advanced Filtering** with 8+ filter types
- **Real-time Status Updates** and workflow management

### 🎨 User Experience
- **Modern RTL Interface** optimized for Hebrew
- **Responsive Design** for all device types
- **Dark Mode Support** throughout the application
- **Real-time Notifications** and alert system
- **Advanced Search & Filtering** capabilities

## 🛠 Tech Stack
- **Frontend**: Next.js 15 with Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React hooks and Context API

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/asaf-cyber/ProRecruit.git

# Navigate to project directory
cd ProRecruit

# Install dependencies for main project
npm install

# Navigate to prorecruit folder and install dependencies
cd prorecruit
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 🏗 Project Structure
```
ProRecruitmentSystem/
├── prorecruit/                 # Main Next.js application
│   ├── src/
│   │   ├── app/               # App router pages
│   │   │   ├── jobs/          # Job management system
│   │   │   ├── candidates/    # Candidate management
│   │   │   ├── clients/       # Client management
│   │   │   ├── vendors/       # Vendor management
│   │   │   └── ...
│   │   ├── components/        # Reusable components
│   │   │   ├── jobs/          # Job-related components
│   │   │   ├── candidates/    # Candidate components
│   │   │   ├── layout/        # Layout components
│   │   │   └── ...
│   │   └── contexts/          # React contexts
├── database/                  # Mock data files
├── docs/                      # Documentation
└── legacy/                    # Legacy components
```

## 🎯 Key Features Deep Dive

### Job Management System
- **Enhanced Job Cards**: Visual priority indicators, performance metrics
- **Candidate Integration**: Direct candidate management from job view
- **Smart Alerts**: Automatic detection of issues and opportunities
- **Status Workflow**: Draft → Published → On Hold/Closed
- **Advanced Actions**: Duplicate, Share, Export capabilities

### Candidate Management
- **Complete Profile Management**: Personal details, skills, documents
- **Interview Tracking**: Schedule, track, and manage interviews
- **Timeline View**: Complete candidate journey visualization
- **Status Pipeline**: From application to hiring
- **Communication Tools**: Integrated messaging and notifications

### Alert System
- **Performance Monitoring**: Track job and candidate metrics
- **Deadline Alerts**: Identify stagnant jobs or processes
- **Budget Tracking**: Monitor purchase order budgets
- **Security Compliance**: Alert for security clearance requirements

## 🚀 Usage

### Running the Development Server
```bash
cd prorecruit
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

### Available Scripts
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Screenshots & Demo
The system includes:
- Modern dashboard with real-time metrics
- Advanced job cards with status indicators
- Comprehensive candidate management interface
- Client and vendor portals
- Executive dashboard with analytics

## 🔧 Configuration
The system supports various configuration options through environment variables and configuration files. Check the docs folder for detailed setup instructions.

## 📚 Documentation
Detailed documentation is available in the `docs/` folder:
- Project Structure Guide
- Component Documentation
- API Integration Guide
- Deployment Instructions

## 🤝 Contributing
This is a private project. For questions or issues, please contact the development team.

## 📄 License
Private - All rights reserved

## 👥 Team
Developed by the ProRecruit development team with advanced AI assistance.

---

## 🌟 Recent Updates
- ✅ Complete job management system overhaul
- ✅ Advanced candidate management integration
- ✅ Smart alert system implementation
- ✅ Enhanced user interface with dual view modes
- ✅ Real-time status updates and workflow management

**Version**: 2.0.0  
**Last Updated**: January 2025