# Task Manager

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing tasks and projects with a modern, responsive user interface.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Frontend Routes](#frontend-routes)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)

## Overview

Task Manager is a productivity application that allows users to organize their work into projects and manage individual tasks. Each task can have priority levels, due dates, descriptions, and completion status. The application features a clean, intuitive UI built with React and styled with Tailwind CSS.

## Features

### Task Management
- Create, read, update, and delete tasks
- Set due dates and times for tasks
- Assign priority levels (Low, Medium, High)
- Mark tasks as important/starred
-  Mark tasks as completed
-  Add detailed descriptions to tasks
- Organize tasks within projects

### Project Organization
- Create and manage multiple projects
- View all tasks associated with a project
- Default "My Tasks" project for ungrouped tasks
- Update project names


### View Options
- View all tasks
- View completed tasks
- View starred/important tasks

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js v5.1.0
- **Database**: MongoDB with Mongoose v8.20.0
- **Authentication**: bcrypt v6.0.0
- **CORS**: cors v2.8.5
- **Environment**: dotenv v17.2.3
- **Testing**: Jest, Supertest, mongodb-memory-server
- **Dev Tools**: Nodemon

### Frontend
- **Library**: React v19.2.0
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4.1.17
- **UI Components**: Radix UI
- **Form Handling**: React Hook Form v7.66.1
- **Validation**: Zod v4.1.12
- **HTTP Client**: Axios v1.13.2
- **Routing**: React Router DOM v7.9.6
- **Notifications**: Sonner v2.0.7
- **Icons**: Lucide React v0.554.0
- **Theme**: next-themes v0.4.6

## Project Structure

```
Task-Manager/
├── backend/
│   ├── src/
│   │   ├── server.js           # Express server entry point
│   │   ├── config/
│   │   │   └── db.js           # MongoDB connection config
│   │   ├── models/
│   │   │   ├── tasks.js        # Task schema
│   │   │   └── projects.js     # Project schema
│   │   └── routes/
│   │       ├── taskRoutes.js   # Task API endpoints
│   │       └── projectRoutes.js # Project API endpoints
│   ├── package.json
│   └── pnpm-lock.yaml
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx            # React entry point
│   │   ├── App.jsx             # Main app component with routes
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── components/
│   │   │   ├── Layouts/        # Layout components
│   │   │   │   ├── mainLayout.jsx
│   │   │   │   ├── navbar.jsx
│   │   │   │   └── sidebar.jsx
│   │   │   └── ui/             # Reusable UI components
│   │   │       ├── accordion.jsx
│   │   │       ├── avatar.jsx
│   │   │       ├── button.jsx
│   │   │       ├── card.jsx
│   │   │       ├── taskCard.jsx
│   │   │       ├── taskModal.jsx
│   │   │       ├── projectModal.jsx
│   │   │       ├── projectAccordion.jsx
│   │   │       └── ... (other UI components)
│   │   ├── hooks/
│   │   │   └── use-mobile.js   # Mobile detection hook
│   │   ├── lib/
│   │   │   ├── utils.js        # Utility functions
│   │   │   └── APIs/           # API integration
│   │   │       ├── projectAPI.js
│   │   │       ├── tasksAPI.js
│   │   │       └── userAPI.js
│   │   ├── pages/
│   │   │   ├── AllTasks.jsx    # All tasks view
│   │   │   ├── Completed.jsx   # Completed tasks view
│   │   │   ├── Starred.jsx     # Starred tasks view
│   │   │   ├── Login.jsx       # Login page (in progress)
│   │   │   ├── Signup.jsx      # Signup page (in progress)
│   │   │   ├── ResetPassword.jsx # Password reset (in progress)
│   │   │   └── schema.js       # Zod schemas for validation
│   │   └── assets/
│   ├── public/
│   ├── vite.config.js
│   ├── package.json
│   └── pnpm-lock.yaml
│
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or pnpm package manager
- MongoDB (local or MongoDB Atlas)

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd Task-Manager
```

### Step 2: Backend Setup

```bash
cd backend

# Install dependencies
pnpm install
# or
npm install

# Create .env file
cat > .env << EOF
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/task-manager
ALLOWED_ORIGINS=http://localhost:5173
EOF

# Start the development server
pnpm dev
```

The backend will run on `http://localhost:5000`

### Step 3: Frontend Setup

```bash
# In a new terminal, from project root
cd frontend

# Install dependencies
pnpm install
# or
npm install

# Start the development server
pnpm dev
```

The frontend will run on `http://localhost:5173`

## Running the Application

### Development Mode

**Backend** (from `backend/` directory):
```bash
pnpm dev        # Uses nodemon for auto-reload
```

**Frontend** (from `frontend/` directory):
```bash
pnpm dev        # Vite development server
```

### Production Build

**Frontend** (from `frontend/` directory):
```bash
pnpm build      # Creates optimized production build
pnpm preview    # Preview the production build locally
```

**Backend** (from `backend/` directory):
```bash
pnpm start      # Run production server
```

## API Endpoints

### Tasks API

#### Get All Tasks
```
GET /api/tasks
```
Response:
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Task Title",
      "description": "Task description",
      "dueDate": "2026-01-25",
      "dueTime": "10:00",
      "priority": "High",
      "status": "Active",
      "importance": false,
      "projectId": "507f1f77bcf86cd799439012",
      "createdAt": "2026-01-20T10:00:00Z",
      "updatedAt": "2026-01-20T10:00:00Z"
    }
  ]
}
```

#### Get Tasks by Project
```
GET /api/tasks/project/:projectId
```

#### Get Task by ID
```
GET /api/tasks/:id
```

#### Create Task
```
POST /api/tasks
Content-Type: application/json

{
  "title": "New Task",
  "description": "Task description",
  "dueDate": "2026-01-25",
  "dueTime": "10:00",
  "priority": "Medium",
  "projectId": "507f1f77bcf86cd799439012"  // Optional, defaults to "My Tasks"
}
```

#### Update Task
```
PUT /api/tasks/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description",
  "priority": "High",
  "status": "Completed",
  "importance": true
}
```

#### Delete Task
```
DELETE /api/tasks/:id
```

### Projects API

#### Get All Projects
```
GET /api/projects
```

#### Get Project by ID
```
GET /api/projects/:id
```

#### Create Project
```
POST /api/projects
Content-Type: application/json

{
  "name": "Project Name"
}
```

#### Get or Create Default Project
```
POST /api/projects/default
```
Creates "My Tasks" project if it doesn't exist.

#### Update Project
```
PUT /api/projects/:id
Content-Type: application/json

{
  "name": "Updated Project Name"
}
```

#### Delete Project
```
DELETE /api/projects/:id
```

## 🗄️ Database Schema

### Task Schema
```javascript
{
  title: String (max 100 chars, default: 'task'),
  description: String (max 250 chars),
  dueDate: String,
  dueTime: String,
  priority: String (enum: 'Low', 'Medium', 'High', default: 'Medium'),
  status: String (enum: 'Active', 'Completed', default: 'Active'),
  importance: Boolean (default: false),
  projectId: ObjectId (ref: 'Project'),
  createdAt: DateTime (auto),
  updatedAt: DateTime (auto)
}
```

### Project Schema
```javascript
{
  title: String (max 100 chars, default: 'project'),
  createdAt: DateTime (auto),
  updatedAt: DateTime (auto)
}
```

## Frontend Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | AllTasks | Display all active tasks |
| `/completed` | Completed | Display completed tasks |
| `/starred` | Starred | Display starred/important tasks |
| `/login` | Login | User login (in progress) |
| `/signup` | Signup | User registration (in progress) |
| `/reset-password` | ResetPassword | Password reset (in progress) |

## ⚙️ Environment Variables

### Backend `.env`
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/task-manager

# CORS
ALLOWED_ORIGINS=http://localhost:5173
```

### Frontend `.env` (if needed)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Scripts

### Backend
```bash
pnpm dev        # Start development server with auto-reload
pnpm start      # Start production server
pnpm test       # Run tests with Jest
```

### Frontend
```bash
pnpm dev        # Start Vite dev server
pnpm build      # Build for production
pnpm preview    # Preview production build
pnpm lint       # Run ESLint
```

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Drag-and-drop task management
- [ ] Task filtering and search
- [ ] Task dependencies
- [ ] Recurring tasks
- [ ] Task attachments
- [ ] Team collaboration features
- [ ] Task comments and notes
- [ ] Calendar view
- [ ] Export/Import functionality

## Notes

- The application automatically creates a "My Tasks" default project for ungrouped tasks
- Tasks accept `projectId` on creation; if not provided, they default to the "My Tasks" project
- The frontend uses Vite for fast development and optimized builds
- All UI components are built with Radix UI for accessibility

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC
