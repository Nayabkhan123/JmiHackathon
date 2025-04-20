# Alumni Portal

## Project Overview
The Alumni Portal is a full-stack web application designed to connect alumni of an institution. It provides a platform for alumni to register, login, view and edit their profiles, search and connect with other alumni, and engage in community discussions through posts.

The project consists of two main parts:
- **Frontend:** A React-based single-page application that provides the user interface and client-side functionality.
- **Backend:** An Express.js server that handles API requests, user authentication, data storage, and business logic.

## Features

### Frontend
- User registration and login with authentication.
- View and edit user profile.
- Alumni directory to search and browse alumni.
- Community feed to create, view, edit, and delete posts.
- Responsive UI with navigation and notifications.

### Backend
- RESTful API built with Express.js.
- User authentication with session management and OTP verification.
- CRUD operations for user profiles and posts.
- Alumni search functionality.
- Secure routes with authentication middleware.
- Database connection and data models for users and posts.

## Technologies Used
- Frontend:
  - React
  - Redux for state management
  - React Router for routing
  - React Toastify for notifications
  - Tailwind CSS for styling

- Backend:
  - Node.js
  - Express.js
  - MongoDB 
  - Middleware for authentication and session management

## Installation and Setup

### Prerequisites
- Node.js and npm installed
- MongoDB instance running (local or cloud)

### Frontend Setup
1. Navigate to the `alumni` directory:
   ```bash
   cd alumni
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. The frontend will be available at `http://localhost:3000`.

### Backend Setup
1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` directory with the following variables:
   ```
   FRONTEND_URL=http://localhost:3000
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   ```
4. Start the backend server:
   ```bash
   node index.js
   ```
5. The backend API will be available at `http://localhost:8000/api`.

## API Endpoints Overview

- `POST /api/register` - Register a new user.
- `POST /api/otpverify` - Verify OTP for user registration.
- `POST /api/login` - User login.
- `GET /api/user-details` - Get details of the logged-in user (requires auth).
- `GET /api/logout` - Logout the user.
- `POST /api/search-alumini` - Search alumni by criteria.
- `GET /api/all-alumni` - Get a list of all alumni.
- `PUT /api/edit-profile` - Edit user profile (requires auth).
- `POST /api/create-post` - Create a new post.
- `GET /api/all-posts` - Get all posts.
- `PUT /api/edit-post/:id` - Edit a post by ID.
- `DELETE /api/delete-post/:id` - Delete a post by ID.

## License
This project is licensed under the MIT License.
