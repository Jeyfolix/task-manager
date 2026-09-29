TASK MANAGER

FULL-STACK REACT + NESTJS + FIREBASE APPLICATION





TECHNICAL DOCUMENTATION





1\. PROJECT DESCRIPTION



Task Manager is a full-stack web application developed as a take-home assessment.



The application allows users to create accounts, sign in securely, create personal tasks, view tasks, update tasks, mark tasks as completed, and delete tasks.



The application uses React and TypeScript for the frontend, NestJS and TypeScript for the backend, Firebase Authentication for user authentication, and Cloud Firestore for persistent data storage.



The backend implements authentication and authorization so that each user can only access their own tasks.





2\. PROJECT OBJECTIVES



The main objectives of the project are:



\- Develop a functional task management application.

\- Implement user registration and authentication.

\- Allow users to create and manage tasks.

\- Store task information persistently in a cloud database.

\- Ensure users can only access their own tasks.

\- Implement backend authorization.

\- Validate user input.

\- Provide useful loading, empty, and error states.

\- Provide a responsive interface for computers and mobile phones.

\- Protect sensitive configuration information.

\- Follow a clear and maintainable project structure.





3\. TECHNOLOGIES USED



FRONTEND



The frontend uses:



\- React

\- TypeScript

\- Vite

\- Firebase Web SDK

\- CSS3

\- ESLint





BACKEND



The backend uses:



\- Node.js

\- NestJS

\- TypeScript

\- Firebase Admin SDK

\- @nestjs/config

\- class-validator

\- class-transformer





DATABASE



The application uses:



\- Cloud Firestore





AUTHENTICATION



The application uses:



\- Firebase Authentication

\- Email/Password Authentication





4\. APPLICATION ARCHITECTURE



The application follows the following architecture:



&#x20;   React Frontend

&#x20;          |

&#x20;          | Firebase ID Token

&#x20;          v

&#x20;   NestJS Backend

&#x20;          |

&#x20;          | Firebase Admin SDK

&#x20;          v

&#x20;   Cloud Firestore





The React frontend provides the user interface.



Firebase Authentication handles user authentication.



The NestJS backend receives authenticated requests and verifies Firebase ID tokens.



The Firebase Admin SDK allows the backend to securely communicate with Firebase services.



Cloud Firestore stores the user's tasks.





5\. AUTHENTICATION FLOW



The authentication process follows these steps:



&#x20;   1. User opens the application.

&#x20;   2. User creates an account or signs in.

&#x20;   3. Firebase Authentication authenticates the user.

&#x20;   4. Firebase provides an authentication token.

&#x20;   5. React obtains the Firebase ID token.

&#x20;   6. The token is sent to the NestJS backend.

&#x20;   7. NestJS verifies the token using Firebase Admin SDK.

&#x20;   8. The backend obtains the authenticated user's Firebase UID.

&#x20;   9. The UID is used to authorize task access.

&#x20;   10. The backend communicates with Firestore.





6\. PROJECT STRUCTURE



The project is divided into two main applications:



&#x20;   task-manager/

&#x20;   |

&#x20;   +-- frontend/

&#x20;   |

&#x20;   +-- backend/

&#x20;   |

&#x20;   +-- README.md

&#x20;   |

&#x20;   +-- .gitignore





The frontend contains:



&#x20;   frontend/

&#x20;   |

&#x20;   +-- src/

&#x20;       |

&#x20;       +-- components/

&#x20;       |   +-- TaskForm.tsx

&#x20;       |   +-- TaskCard.tsx

&#x20;       |   +-- TaskList.tsx

&#x20;       |

&#x20;       +-- pages/

&#x20;       |   +-- Login.tsx

&#x20;       |   +-- Login.css

&#x20;       |   +-- Register.tsx

&#x20;       |   +-- Register.css

&#x20;       |   +-- Dashboard.tsx

&#x20;       |

&#x20;       +-- services/

&#x20;       |   +-- api.ts

&#x20;       |   +-- firebase.ts

&#x20;       |

&#x20;       +-- auth.ts

&#x20;       +-- App.tsx

&#x20;       +-- App.css

&#x20;       +-- main.tsx





The backend contains:



&#x20;   backend/

&#x20;   |

&#x20;   +-- src/

&#x20;       |

&#x20;       +-- auth/

&#x20;       |   +-- auth.guard.ts

&#x20;       |   +-- auth.module.ts

&#x20;       |

&#x20;       +-- firebase/

&#x20;       |   +-- firebase.service.ts

&#x20;       |   +-- firebase.module.ts

&#x20;       |

&#x20;       +-- tasks/

&#x20;           |

&#x20;           +-- dto/

&#x20;           |   +-- create-task.dto.ts

&#x20;           |   +-- update-task.dto.ts

&#x20;           |

&#x20;           +-- tasks.controller.ts

&#x20;           +-- tasks.service.ts

&#x20;           +-- tasks.module.ts

&#x20;           |

&#x20;           +-- app.module.ts

&#x20;           +-- main.ts





7\. SOFTWARE REQUIREMENTS



Before installing the application, the following software is required:



1\. Node.js

2\. npm

3\. Git

4\. Firebase account

5\. Modern web browser





8\. VERIFY NODE.JS



Open Command Prompt.



Check the installed Node.js version:



&#x20;   node --version



Check npm:



&#x20;   npm --version



Example:



&#x20;   v24.x.x

&#x20;   11.x.x



The exact version may be different depending on the developer's installed version.





9\. VERIFY GIT



Check Git installation:



&#x20;   git --version



If Git is installed correctly, a Git version will be displayed.





10\. GETTING THE PROJECT



If the project is available on GitHub, clone it using:



&#x20;   git clone <YOUR\_GITHUB\_REPOSITORY\_URL>



Enter the project directory:



&#x20;   cd task-manager



If the project is provided as a ZIP file, extract the ZIP file and open Command Prompt in the extracted project directory.





11\. FRONTEND SETUP



Navigate to the project root:



&#x20;   cd "C:\\Users\\Sikutwa\\OneDrive\\Documents\\task-manager"



The frontend was created using Vite.



The command used to create the frontend was:



&#x20;   npm create vite@latest frontend -- --template react-ts



Enter the frontend directory:



&#x20;   cd frontend



Install the frontend dependencies:



&#x20;   npm install





12\. FRONTEND LIBRARIES INSTALLED



The frontend uses React.



React was installed as part of the Vite React TypeScript project.



Purpose:



\- Build the user interface.

\- Create reusable components.

\- Manage application state.

\- Build interactive pages.





The frontend uses TypeScript.



Purpose:



\- Provide static typing.

\- Improve code reliability.

\- Reduce type-related programming errors.





The frontend uses Vite.



Purpose:



\- Run the development server.

\- Provide fast development.

\- Build the application for production.





Firebase Web SDK was installed using:



&#x20;   npm install firebase



Firebase is used for:



\- User registration.

\- User login.

\- User logout.

\- Authentication state.

\- Obtaining Firebase ID tokens.





ESLint is used for:



\- Detecting code problems.

\- Maintaining code quality.

\- Checking coding standards.





13\. BACKEND SETUP



Return to the project root:



&#x20;   cd "C:\\Users\\Sikutwa\\OneDrive\\Documents\\task-manager"



The NestJS backend was created using:



&#x20;   npx @nestjs/cli new backend --package-manager npm --language TS



Enter the backend directory:



&#x20;   cd backend



Install the Firebase Admin SDK:



&#x20;   npm install firebase-admin



Install NestJS configuration support:



&#x20;   npm install @nestjs/config



Install validation libraries:



&#x20;   npm install class-validator class-transformer





14\. BACKEND LIBRARIES INSTALLED



NestJS



NestJS is the main backend framework.



It provides:



\- Controllers.

\- Services.

\- Modules.

\- Dependency injection.

\- HTTP API functionality.

\- Application structure.





Firebase Admin SDK



Installation command:



&#x20;   npm install firebase-admin



Purpose:



\- Verify Firebase authentication tokens.

\- Access Firestore from the backend.

\- Perform server-side Firebase operations.

\- Support backend authorization.





@nestjs/config



Installation command:



&#x20;   npm install @nestjs/config



Purpose:



\- Load environment variables.

\- Manage application configuration.

\- Keep configuration separate from source code.





class-validator



Installation command:



&#x20;   npm install class-validator



Purpose:



\- Validate incoming requests.

\- Validate task titles.

\- Validate descriptions.

\- Validate task status.

\- Validate due dates.





class-transformer



Installation command:



&#x20;   npm install class-transformer



Purpose:



\- Transform incoming request data.

\- Work together with NestJS ValidationPipe.





15\. COMPLETE INSTALLATION COMMANDS



FRONTEND CREATION



&#x20;   npm create vite@latest frontend -- --template react-ts



FRONTEND DEPENDENCIES



&#x20;   cd frontend



&#x20;   npm install



&#x20;   npm install firebase





BACKEND CREATION



&#x20;   npx @nestjs/cli new backend --package-manager npm --language TS





BACKEND DEPENDENCIES



&#x20;   cd backend



&#x20;   npm install firebase-admin



&#x20;   npm install @nestjs/config



&#x20;   npm install class-validator class-transformer





16\. FIREBASE DATABASE SETUP



The application uses Cloud Firestore.



Cloud Firestore is a cloud-hosted NoSQL database provided by Firebase.



No separate database server needs to be installed on the computer.





17\. CREATE FIREBASE PROJECT



Open the Firebase Console:



&#x20;   https://console.firebase.google.com/



Sign in using a Google account.



Create a new Firebase project.



Example project name:



&#x20;   Task Manager





18\. ENABLE FIREBASE AUTHENTICATION



Inside the Firebase Console:



&#x20;   Firebase Console

&#x20;         |

&#x20;         +-- Authentication

&#x20;               |

&#x20;               +-- Sign-in method

&#x20;                     |

&#x20;                     +-- Email/Password



Enable:



&#x20;   Email/Password



Save the configuration.



Firebase Authentication is responsible for registering and authenticating users.





19\. CREATE FIRESTORE DATABASE



Inside the Firebase Console:



&#x20;   Firebase Console

&#x20;         |

&#x20;         +-- Firestore Database

&#x20;               |

&#x20;               +-- Create database



Create the Firestore database.



The application uses a collection named:



&#x20;   tasks





20\. DATABASE STRUCTURE



The Firestore database uses the following structure:



&#x20;   tasks/

&#x20;       taskId/

&#x20;           userId

&#x20;           title

&#x20;           description

&#x20;           status

&#x20;           dueDate

&#x20;           createdAt

&#x20;           updatedAt





Example:



&#x20;   tasks/

&#x20;       abc123/

&#x20;           userId: "firebase-user-id"

&#x20;           title: "Complete assessment"

&#x20;           description: "Finish the task manager application"

&#x20;           status: "pending"

&#x20;           dueDate: "2026-09-30"

&#x20;           createdAt: timestamp

&#x20;           updatedAt: timestamp





21\. FIREBASE WEB APPLICATION SETUP



Inside Firebase Console:



&#x20;   Project Settings

&#x20;         |

&#x20;         +-- Your apps

&#x20;               |

&#x20;               +-- Add app

&#x20;                     |

&#x20;                     +-- Web



Register the web application.



Firebase provides configuration values including:



&#x20;   apiKey

&#x20;   authDomain

&#x20;   projectId

&#x20;   storageBucket

&#x20;   messagingSenderId

&#x20;   appId





22\. FRONTEND ENVIRONMENT VARIABLES



Create the following file:



&#x20;   frontend/.env



Add the Firebase configuration:



&#x20;   VITE\_FIREBASE\_API\_KEY=your\_firebase\_api\_key

&#x20;   VITE\_FIREBASE\_AUTH\_DOMAIN=your\_project.firebaseapp.com

&#x20;   VITE\_FIREBASE\_PROJECT\_ID=your\_project\_id

&#x20;   VITE\_FIREBASE\_STORAGE\_BUCKET=your\_storage\_bucket

&#x20;   VITE\_FIREBASE\_MESSAGING\_SENDER\_ID=your\_messaging\_sender\_id

&#x20;   VITE\_FIREBASE\_APP\_ID=your\_firebase\_app\_id



&#x20;   VITE\_API\_URL=http://localhost:3000





Replace the placeholder values with the actual Firebase configuration values.





23\. FIREBASE ADMIN SDK SETUP



The backend requires Firebase Admin SDK credentials.



Inside Firebase Console:



&#x20;   Project Settings

&#x20;         |

&#x20;         +-- Service Accounts

&#x20;               |

&#x20;               +-- Firebase Admin SDK

&#x20;                     |

&#x20;                     +-- Generate new private key



Download the service account credentials securely.



The private key must never be uploaded to GitHub.



The backend uses environment variables such as:



&#x20;   PORT=3000



&#x20;   FIREBASE\_PROJECT\_ID=your\_project\_id

&#x20;   FIREBASE\_CLIENT\_EMAIL=your\_service\_account\_email

&#x20;   FIREBASE\_PRIVATE\_KEY="your\_private\_key"





24\. ENVIRONMENT VARIABLE SECURITY



The following files contain private configuration:



&#x20;   frontend/.env



&#x20;   backend/.env



These files must not be committed to GitHub.



The .gitignore files are configured to exclude environment files.



Private Firebase service account credentials must never be placed directly into source code.





25\. FIRESTORE SECURITY RULES



The frontend does not directly read or write task documents.



Task operations are performed through the NestJS backend.



The Firestore rules can therefore prevent direct client access:



&#x20;   rules\_version = '2';



&#x20;   service cloud.firestore {

&#x20;     match /databases/{database}/documents {

&#x20;       match /{document=\*\*} {

&#x20;         allow read, write: if false;

&#x20;       }

&#x20;     }

&#x20;   }





26\. BACKEND AUTHENTICATION



Every protected task request requires a Firebase authentication token.



The frontend sends the token using:



&#x20;   Authorization: Bearer <Firebase ID Token>



The NestJS AuthGuard performs the following:



1\. Reads the Authorization header.

2\. Extracts the Bearer token.

3\. Verifies the Firebase ID token.

4\. Obtains the authenticated Firebase UID.

5\. Attaches the authenticated user to the request.

6\. Allows the request to continue.



If no valid token is provided, the API returns:



&#x20;   401 Unauthorized





27\. USER-LEVEL AUTHORIZATION



The application does not trust a user ID supplied by the frontend.



The backend obtains the user's UID from the verified Firebase ID token.



For example:



&#x20;   User A

&#x20;      |

&#x20;      v

&#x20;   Firebase UID A

&#x20;      |

&#x20;      v

&#x20;   Tasks belonging to UID A





Another user:



&#x20;   User B

&#x20;      |

&#x20;      v

&#x20;   Firebase UID B

&#x20;      |

&#x20;      v

&#x20;   Tasks belonging to UID B





This ensures that users only access their own tasks.





28\. TASK API ENDPOINTS



GET /tasks



Purpose:



Retrieve tasks belonging to the authenticated user.



Authentication:



Required.





POST /tasks



Purpose:



Create a new task.



Example request:



&#x20;   {

&#x20;     "title": "Complete assessment",

&#x20;     "description": "Finish the task manager application",

&#x20;     "dueDate": "2026-09-30"

&#x20;   }





PATCH /tasks/:id



Purpose:



Update an existing task.



Example request:



&#x20;   {

&#x20;     "title": "Complete assessment",

&#x20;     "status": "completed"

&#x20;   }





DELETE /tasks/:id



Purpose:



Delete an existing task.



Authentication:



Required.



Only the owner of the task can delete it.





29\. TASK VALIDATION



The application validates task information on both the frontend and backend.



TITLE



The title:



\- Is required.

\- Must contain text.

\- Has a maximum length of 120 characters.





DESCRIPTION



The description:



\- Is optional.

\- Has a maximum length of 2,000 characters.





STATUS



The accepted status values are:



&#x20;   pending



&#x20;   completed





DUE DATE



The due date:



\- Is optional.

\- Must be a valid date.

\- Cannot be in the past.





30\. RUNNING THE BACKEND



Open Command Prompt.



Navigate to the backend:



&#x20;   cd "C:\\Users\\Sikutwa\\OneDrive\\Documents\\task-manager\\backend"



Start the NestJS development server:



&#x20;   npm run start:dev



The backend runs on:



&#x20;   http://localhost:3000





31\. RUNNING THE FRONTEND



Open a second Command Prompt window.



Navigate to the frontend:



&#x20;   cd "C:\\Users\\Sikutwa\\OneDrive\\Documents\\task-manager\\frontend"



Start the Vite development server:



&#x20;   npm run dev



The frontend normally runs on:



&#x20;   http://localhost:5173





32\. COMPLETE FIRST-TIME SETUP PROCEDURE



A new developer should follow these steps in order.



STEP 1



Install Node.js.



Verify:



&#x20;   node --version



&#x20;   npm --version





STEP 2



Install Git.



Verify:



&#x20;   git --version





STEP 3



Obtain the project.



If using GitHub:



&#x20;   git clone <YOUR\_GITHUB\_REPOSITORY\_URL>





STEP 4



Enter the project:



&#x20;   cd task-manager





STEP 5



Install frontend dependencies:



&#x20;   cd frontend



&#x20;   npm install



&#x20;   npm install firebase





STEP 6



Return to the project root:



&#x20;   cd ..





STEP 7



Install backend dependencies:



&#x20;   cd backend



&#x20;   npm install



&#x20;   npm install firebase-admin



&#x20;   npm install @nestjs/config



&#x20;   npm install class-validator class-transformer





STEP 8



Create a Firebase project.





STEP 9



Enable Firebase Authentication with Email/Password.





STEP 10



Create the Cloud Firestore database.





STEP 11



Create a Firebase Web App.





STEP 12



Create:



&#x20;   frontend/.env



Add the Firebase web configuration.





STEP 13



Generate Firebase Admin SDK credentials.





STEP 14



Create:



&#x20;   backend/.env



Add the backend Firebase configuration.





STEP 15



Confirm that environment files are excluded by .gitignore.





STEP 16



Start the backend:



&#x20;   cd backend



&#x20;   npm run start:dev





STEP 17



Open another Command Prompt window.





STEP 18



Start the frontend:



&#x20;   cd frontend



&#x20;   npm run dev





STEP 19



Open the application in a browser:



&#x20;   http://localhost:5173





33\. USER WORKFLOW



The normal user workflow is:



&#x20;   1. Open the application.

&#x20;   2. Create an account.

&#x20;   3. Sign in.

&#x20;   4. Open the dashboard.

&#x20;   5. Create a task.

&#x20;   6. View the task.

&#x20;   7. Edit the task if required.

&#x20;   8. Mark the task as completed.

&#x20;   9. Delete the task when required.

&#x20;   10. Sign out.





34\. DASHBOARD FEATURES



The dashboard contains:



\- All Tasks

\- Pending Tasks

\- Completed Tasks

\- Task statistics

\- Create Task button

\- Edit task functionality

\- Complete task functionality

\- Delete task functionality

\- Sign out functionality





35\. TASK CREATION



A user can create a task using:



\- Title

\- Description

\- Due date



The task is sent to the NestJS backend.



The backend associates the task with the authenticated user's Firebase UID.



The task is then stored in Firestore.





36\. TASK EDITING



Users can edit their existing tasks.



The editable information includes:



\- Title

\- Description

\- Due date

\- Status





37\. TASK COMPLETION



Users can mark a task as completed.



The status changes from:



&#x20;   pending



to:



&#x20;   completed





A completed task can also be changed back to:



&#x20;   pending





38\. TASK DELETION



Users can delete their tasks.



Before deletion, the application displays a confirmation dialog.



This reduces the possibility of accidental deletion.





39\. ERROR HANDLING



The application handles errors including:



\- Invalid login credentials.

\- Failed registration.

\- Password mismatch.

\- Password shorter than six characters.

\- Missing task title.

\- Invalid task information.

\- Past due dates.

\- Unauthorized API requests.

\- Unauthorized task access.

\- Failed task creation.

\- Failed task update.

\- Failed task deletion.

\- Failed task loading.





40\. USER INTERFACE



The application was designed to be user-friendly and responsive.



The interface supports:



\- Desktop computers

\- Laptops

\- Tablets

\- Mobile phones





The dashboard contains:



\- Navigation sidebar

\- Task statistics

\- Task filtering

\- Task cards

\- Create task form

\- Edit task form

\- Delete confirmation

\- Sign-out controls





The login and registration pages have separate CSS files:



&#x20;   Login.css



&#x20;   Register.css





41\. SECURITY IMPLEMENTATION



Security is implemented at several levels.



AUTHENTICATION



Firebase Authentication is responsible for verifying user identity.



BACKEND TOKEN VERIFICATION



The NestJS backend verifies Firebase ID tokens using Firebase Admin SDK.



AUTHORIZATION



The authenticated Firebase UID determines which tasks the user can access.



DATABASE SECURITY



Firestore direct client access is disabled through Firestore security rules.



ENVIRONMENT SECURITY



Sensitive configuration is stored in environment variables.



USER DATA ISOLATION



The backend ensures that each user can only access tasks associated with their own Firebase UID.





42\. SECURITY TESTING



The application was tested using multiple user accounts.



TEST 1



Create User A.



User A creates a task.



&#x20;   User A

&#x20;      |

&#x20;      +-- Task A





TEST 2



Create User B.



User B creates a different task.



&#x20;   User B

&#x20;      |

&#x20;      +-- Task B





TEST 3



Sign in as User A.



User A should only see Task A.



User A should not see Task B.





TEST 4



Sign in as User B.



User B should only see Task B.



User B should not see Task A.





TEST 5



Attempt to access the task API without authentication.



Command:



&#x20;   curl -i http://localhost:3000/tasks



Expected result:



&#x20;   401 Unauthorized





This confirms that protected task endpoints require authentication.





43\. BUILDING THE FRONTEND



To create a production build:



&#x20;   cd frontend



&#x20;   npm run build





A successful build confirms that the frontend can be compiled for production.





44\. BUILDING THE BACKEND



To build the NestJS backend:



&#x20;   cd backend



&#x20;   npm run build





A successful build confirms that the backend TypeScript code compiles successfully.





45\. USEFUL FRONTEND COMMANDS



Install dependencies:



&#x20;   npm install



Start development server:



&#x20;   npm run dev



Build production version:



&#x20;   npm run build



Run linting:



&#x20;   npm run lint





46\. USEFUL BACKEND COMMANDS



Install dependencies:



&#x20;   npm install



Start development server:



&#x20;   npm run start:dev



Build backend:



&#x20;   npm run build



Start production server:



&#x20;   npm run start:prod





47\. DATABASE SUMMARY



Database technology:



&#x20;   Cloud Firestore



Database type:



&#x20;   NoSQL document database



Main collection:



&#x20;   tasks



Main task fields:



&#x20;   userId

&#x20;   title

&#x20;   description

&#x20;   status

&#x20;   dueDate

&#x20;   createdAt

&#x20;   updatedAt





48\. WHY FIREBASE WAS USED



Firebase was selected because it provides several services required by the application.



These include:



\- Firebase Authentication

\- Cloud Firestore

\- Firebase Admin SDK

\- Cloud-based infrastructure



Firebase reduces the amount of authentication and database infrastructure that needs to be implemented manually.



The Firebase Admin SDK also integrates with the NestJS backend.





49\. WHY REACT WAS USED



React was selected for the frontend because it supports component-based development.



The application can therefore be divided into reusable components such as:



\- TaskForm

\- TaskCard

\- TaskList

\- Login

\- Register

\- Dashboard





50\. WHY NESTJS WAS USED



NestJS was selected for the backend because it provides a structured architecture.



The backend is organized using:



\- Modules

\- Controllers

\- Services

\- DTOs

\- Guards



This makes the application easier to maintain and extend.





51\. WHY TYPESCRIPT WAS USED



TypeScript was used for both frontend and backend development.



Benefits include:



\- Static typing.

\- Better code maintainability.

\- Improved development experience.

\- Reduced type-related errors.

\- Better code organization.





52\. SECURITY DESIGN DECISION



The backend was intentionally used as the authorization boundary.



The frontend cannot be trusted to determine which tasks a user is allowed to access.



The backend obtains the authenticated user's UID from the verified Firebase token.



The backend then uses that UID when querying or modifying tasks.



This design prevents users from simply changing a user ID in the browser to access another user's information.





53\. TRADE-OFFS AND LIMITATIONS



The application depends on Firebase for authentication and database services.



This simplifies development but creates a dependency on the Firebase platform.



Firestore is a NoSQL database, so its data model differs from traditional relational SQL databases.



The current project is primarily configured for local development.



A production deployment would require:



\- Production environment variables.

\- HTTPS.

\- Production CORS configuration.

\- Backend hosting.

\- Frontend hosting.

\- Secure production Firebase configuration.

\- Production monitoring.





54\. POSSIBLE FUTURE IMPROVEMENTS



If more development time were available, the following features could be added:



\- Task search.

\- Task sorting.

\- Task priority.

\- Task categories.

\- Pagination.

\- Password reset.

\- Email verification.

\- Automated unit tests.

\- End-to-end testing.

\- CI/CD pipeline.

\- Production deployment.

\- Improved accessibility testing.

\- Task activity history.

\- More advanced filtering.





55\. TESTING CHECKLIST



Before submission, verify the following:



&#x20;   \[ ] Application starts successfully.



&#x20;   \[ ] Frontend loads successfully.



&#x20;   \[ ] Backend starts successfully.



&#x20;   \[ ] New user can register.



&#x20;   \[ ] Existing user can sign in.



&#x20;   \[ ] Incorrect credentials are rejected.



&#x20;   \[ ] User can sign out.



&#x20;   \[ ] User can create a task.



&#x20;   \[ ] User can view their tasks.



&#x20;   \[ ] User can edit a task.



&#x20;   \[ ] User can complete a task.



&#x20;   \[ ] User can return a completed task to pending.



&#x20;   \[ ] User can delete a task.



&#x20;   \[ ] Delete confirmation is displayed.



&#x20;   \[ ] Past due dates are rejected.



&#x20;   \[ ] Empty task state works.



&#x20;   \[ ] Loading state works.



&#x20;   \[ ] Error state works.



&#x20;   \[ ] User A cannot see User B's tasks.



&#x20;   \[ ] Unauthenticated API requests are rejected.



&#x20;   \[ ] Frontend production build succeeds.



&#x20;   \[ ] Backend production build succeeds.



&#x20;   \[ ] Private environment files are not committed.





56\. FINAL RUN PROCEDURE



After installation and configuration, use two Command Prompt windows.



WINDOW 1 - BACKEND



&#x20;   cd "C:\\Users\\Sikutwa\\OneDrive\\Documents\\task-manager\\backend"



&#x20;   npm run start:dev





WINDOW 2 - FRONTEND



&#x20;   cd "C:\\Users\\Sikutwa\\OneDrive\\Documents\\task-manager\\frontend"



&#x20;   npm run dev





Then open:



&#x20;   http://localhost:5173





57\. CONCLUSION



Task Manager is a full-stack task management application developed using modern web technologies.



The project demonstrates:



\- React frontend development.

\- TypeScript development.

\- NestJS backend development.

\- Firebase Authentication.

\- Firebase Admin SDK.

\- Cloud Firestore database integration.

\- REST API development.

\- Input validation.

\- Authentication.

\- Authorization.

\- User-level data isolation.

\- Responsive interface design.

\- Error handling.

\- Secure environment configuration.



The application uses the NestJS backend as the main security boundary for task access.



The authenticated Firebase UID is used to ensure that users can only access and manage their own tasks.





58\. AUTHOR



Task Manager



Full-Stack React + NestJS + Firebase Take-Home Assessment



Technologies:



React

TypeScript

Vite

NestJS

Firebase Authentication

Firebase Admin SDK

Cloud Firestore

CSS3

ESLint



DEPLOYMENT

The Task Manager application is deployed using the following services:

1. Frontend Deployment

The React + TypeScript frontend is deployed on Vercel.

Production URL:
https://task-manager-frontend-topaz-ten.vercel.app/

Frontend deployment configuration:

* Platform: Vercel
* Framework: Vite
* Root directory: frontend
* Build command: npm run build
* Output directory: dist

The frontend uses Vite environment variables for the Firebase Web SDK configuration and the production NestJS API URL.

2. Backend Deployment

The NestJS + TypeScript backend is deployed on Render.

Production API URL:
https://task-manager-backend-2e4g.onrender.com

Backend deployment configuration:

* Platform: Render
* Service type: Web Service
* Runtime: Node.js
* Root directory: backend
* Build command: npm install && npm run build
* Start command: npm run start:prod

The backend uses environment variables for Firebase Admin SDK credentials and the production frontend origin. Firebase Admin credentials are not stored in the Git repository.

3. Database and Authentication

Firebase is used for authentication and database services.

Firebase services used:

* Firebase Authentication with Email/Password authentication
* Cloud Firestore

The Firestore database is hosted in the africa-south1 region.

Firestore client-side access is disabled. Task data is accessed through the NestJS backend using the Firebase Admin SDK.

4. Production Authentication and Authorization

Users authenticate through Firebase Authentication in the React frontend.

After authentication, the frontend obtains a Firebase ID token and sends it to the NestJS backend using the Authorization header:

Authorization: Bearer <Firebase ID token>

The NestJS AuthGuard verifies the token using the Firebase Admin SDK.

The authenticated Firebase user ID is then used to authorize access to tasks. Users can only retrieve, update, and delete tasks belonging to their own account.

5. CORS Configuration

The production backend is configured to accept requests from the deployed Vercel frontend.

The FRONTEND_URL environment variable is configured on Render as:

https://task-manager-frontend-topaz-ten.vercel.app

This prevents the production API from relying on the localhost development frontend origin.

6. Environment Variables

Development and production secrets are kept outside the Git repository using environment variables.

Frontend environment variables include:

* VITE_FIREBASE_API_KEY
* VITE_FIREBASE_AUTH_DOMAIN
* VITE_FIREBASE_PROJECT_ID
* VITE_FIREBASE_STORAGE_BUCKET
* VITE_FIREBASE_MESSAGING_SENDER_ID
* VITE_FIREBASE_APP_ID
* VITE_API_URL

Backend environment variables include:

* PORT
* FIREBASE_PROJECT_ID
* FIREBASE_CLIENT_EMAIL
* FIREBASE_PRIVATE_KEY
* FRONTEND_URL

Actual secret values are not included in the repository.

7. Deployment Architecture

The production application follows this architecture:

User
|
v
Vercel React Frontend
|
| Firebase ID Token
v
Render NestJS Backend
|
| Firebase Admin SDK
v
Firebase Authentication / Cloud Firestore

8. Deployment Limitations

The project uses free hosting services for the assessment.

The Render free service may temporarily spin down after periods of inactivity. The first request after inactivity may therefore take longer while the backend service starts again.

The deployment is intended for assessment and demonstration purposes rather than high-volume production traffic.


