TASK MANAGER 

FULL-STACK REACT + NESTJS + FIREBASE 

TECHNICAL DOCUMENTATION 

PROJECT OVERVIEW 

Task Manager is a full-stack task-management application built as a take-home assessment. 

Users can: 

• Register and sign in. 

• Create tasks with a title, description, status, and due date. 

• View their own tasks. 

• Edit and complete tasks. 

• Delete tasks. 

• Filter tasks by status. 

• Sign out. 

The frontend is built with React and TypeScript. The backend is built with NestJS and TypeScript. Firebase Authentication provides authentication, while Cloud Firestore provides persistent data storage. 

The NestJS backend enforces user-level authorization so that users can only access their own tasks. 

TECHNOLOGY STACK 

Frontend: 

• React 

• TypeScript 

• Vite 

• Firebase Web SDK 

• CSS 

Backend: 

• NestJS 

• TypeScript 

• Firebase Admin SDK 

• class-validator 

• class-transformer 

Cloud services: 

• Firebase Authentication 

• Cloud Firestore 

• Vercel 

• Render 

ARCHITECTURE 

The application follows this architecture: 

User 

React + TypeScript 

 Firebase ID Token 

NestJS + TypeScript 

|Firebase Admin SDK 

Cloud Firestore 

Firebase Authentication verifies user identity. 

The React frontend obtains a Firebase ID token after login and sends it with requests to the NestJS API. 

The NestJS backend verifies the token, obtains the authenticated user's Firebase UID, performs authorization checks, and accesses Firestore. 

The frontend does not directly access task documents in Firestore. 

PROJECT STRUCTURE 

Frontend: 

frontend/src/ 

 components/ 

TaskForm.tsx 

TaskCard.tsx 

 TaskList.tsx 

 pages/ 

 Login.tsx 

 Register.tsx 

 Dashboard.tsx 

services/ 

 api.ts 

firebase.ts 

 types/ 

 task.ts 

Backend: 

backend/src/ 

 auth/ 

 auth.guard.ts 

 auth.module.ts 

 firebase/ 

 firebase.service.ts 

 firebase.module.ts 

 tasks/ 

 dto/ 

 tasks.controller.ts 

 tasks.service.ts 

 tasks.module.ts 

AUTHENTICATION AND AUTHORIZATION 

Authentication is handled by Firebase Authentication using Email/Password. 

The authentication flow is: 

User registers or signs in. 

Firebase authenticates the user. 

The frontend obtains a Firebase ID token. 

The token is sent to the NestJS backend. 

The NestJS AuthGuard verifies the token using Firebase Admin SDK. 

The backend obtains the authenticated Firebase UID. 

The UID is used to control access to tasks. 

Protected API requests use: 

Authorization: Bearer 

Requests without valid authentication receive HTTP 401 Unauthorized. 

USER DATA SECURITY 

The backend does not trust a user ID supplied by the frontend. 

Instead, the authenticated Firebase UID is obtained from the verified token. 

When retrieving tasks, the backend only returns tasks belonging to that UID. 

Before updating or deleting a task, the backend verifies that the task belongs to the authenticated user. 

This prevents one user from accessing or modifying another user's tasks. 

Firestore client access is disabled using: 

rules_version = '2'; 

service cloud.firestore { 

match /databases/{database}/documents { 

match /{document=**} { 

allow read, write: if false; 

} 

} 

} 

All task database operations are therefore performed through the authorized NestJS backend. 

DATABASE STRUCTURE 

Cloud Firestore is used for persistent storage. 

Collection: 

tasks 

Document structure: 

tasks/{taskId} 

Fields: 

• userId 

• title 

• description 

• status 

• dueDate 

• createdAt 

• updatedAt 

Status values: 

• pending 

• completed 

The Firestore database is hosted in the africa-south1 region. 

API ENDPOINTS 

GET /tasks 

Returns tasks belonging to the authenticated user. 

POST /tasks 

Creates a new task. 

PATCH /tasks/:id 

Updates an existing task. 

DELETE /tasks/:id 

Deletes a task. 

All task endpoints require authentication, and update/delete operations include ownership verification. 

VALIDATION AND ERROR HANDLING 

Validation is performed on both the frontend and backend. 

Task validation includes: 

• Title is required and limited to 120 characters. 

• Description is optional and limited to 2,000 characters. 

• Status must be pending or completed. 

• Due date is optional but cannot be in the past. 

The backend uses NestJS ValidationPipe with whitelisting and rejection of unexpected properties. 

The frontend provides validation and handles expected API and authentication failures. 

The interface includes: 

• Loading states. 

• Empty states. 

• Error states. 

• Delete confirmation. 

• Authentication error handling. 

USER EXPERIENCE 

The application provides a responsive interface for desktop and mobile screens. 

The dashboard includes: 

• All Tasks 

• Pending Tasks 

• Completed Tasks 

• Task statistics 

• Create Task 

• Edit Task 

• Complete Task 

• Delete Task 

• Sign Out 

The interface uses reusable React components and separates pages, services, and task types. 

ENVIRONMENT VARIABLES AND SECURITY 

Sensitive configuration is stored outside the source code. 

Frontend: 

frontend/.env 

VITE_FIREBASE_API_KEY 

VITE_FIREBASE_AUTH_DOMAIN 

VITE_FIREBASE_PROJECT_ID 

VITE_FIREBASE_STORAGE_BUCKET 

VITE_FIREBASE_MESSAGING_SENDER_ID 

VITE_FIREBASE_APP_ID 

VITE_API_URL 

Backend: 

backend/.env 

PORT 

FIREBASE_PROJECT_ID 

FIREBASE_CLIENT_EMAIL 

FIREBASE_PRIVATE_KEY 

FRONTEND_URL 

Actual secret values are not included in the Git repository. 

Firebase Admin credentials are kept in environment variables and are never committed to GitHub. 

LOCAL SETUP 

Requirements: 

• Node.js 

• npm 

• Git 

• Firebase account 

Clone the repository: 

git clone https://github.com/Jeyfolix/task-manager.git 

Install frontend dependencies: 

cd task-manager/frontend 

npm install 

Install backend dependencies: 

cd ../backend 

npm install 

Configure frontend/.env and backend/.env using the required Firebase values. 

Start the backend: 

npm run start:dev 

Start the frontend in a second terminal: 

cd frontend 

npm run dev 

Local application: 

http://localhost:5173 

TESTING 

The application was tested for the main required user flows: 

• User registration. 

• User login. 

• User logout. 

• Task creation. 

• Task retrieval. 

• Task editing. 

• Task completion. 

• Task deletion. 

• Validation. 

• Loading and empty states. 

• Error handling. 

• Unauthenticated API access. 

• Cross-user task isolation. 

Cross-user testing confirmed that separate users cannot see or modify each other's tasks. 

An unauthenticated request to: 

curl -i http://localhost:3000/tasks 

returns: 

401 Unauthorized 

Frontend and backend production builds were also successfully verified. 

PRODUCTION DEPLOYMENT 

Frontend: 

Vercel 

https://task-manager-frontend-topaz-ten.vercel.app/ 

Backend: 

Render 

https://task-manager-backend-2e4g.onrender.com 

Database and authentication: 

Firebase 

Production architecture: 

User 

Vercel React Frontend 

 Firebase ID Token 

Render NestJS Backend 

Firebase Admin SDK 

Firebase Authentication 

Cloud Firestore 

The Render backend is configured to accept requests from the deployed Vercel frontend through the FRONTEND_URL environment variable. 

GIT REPOSITORY 

Public repository: 

https://github.com/Jeyfolix/task-manager 

The project uses meaningful Git commits to document development progress. 

Sensitive environment files and Firebase service-account credentials are excluded from the repository. 

TRADE-OFFS AND LIMITATIONS 

Firebase provides authentication and database services with minimal infrastructure, but it creates a dependency on the Firebase platform. 

The application uses free hosting services for the assessment. The Render free service may temporarily spin down after inactivity, which can make the first request slower. 

The application is intended for assessment and demonstration rather than high-volume production traffic. 

IF I HAD MORE TIME 

Potential improvements include: 

• Automated unit and integration tests. 

• End-to-end testing. 

• Task search and sorting. 

• Task priority and categories. 

• Password reset and email verification. 

• Improved accessibility testing. 

• CI/CD automation. 

• Real-time task updates. 

 

SUBMISSION LINKS 

GitHub Repository: 

https://github.com/Jeyfolix/task-manager 

Live Application: 

https://task-manager-frontend-topaz-ten.vercel.app/ 

Backend API: 

https://task-manager-backend-2e4g.onrender.com 

 

CONCLUSION 

Task Manager demonstrates a complete full-stack implementation using React, TypeScript, NestJS, Firebase Authentication, and Cloud Firestore. 

The application satisfies the core task-management requirements while implementing backend authentication, authorization, validation, persistent storage, responsive user experience, and user-level data isolation. 

The application is publicly available through GitHub and deployed using Vercel and Render. 

 