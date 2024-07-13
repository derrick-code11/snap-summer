# SnapSummer

SnapSummer is a social media application where users can capture and share their summer moments with friends. The application allows users to create posts, like posts, comment on posts, and manage their accounts. This README provides a detailed overview of the project, including installation, features, and usage.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Backend API Endpoints](#backend-api-endpoints)
- [Frontend Components](#frontend-components)
- [License](#license)

## Features

- User authentication (Sign up, Login, Logout)
- Google authentication
- Create, read, update, and delete (CRUD) posts
- Like and unlike posts
- Comment on posts
- Responsive design using Material UI
- Real-time updates with Redux and React-Redux

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/snap-summer.git
   cd snap-summer

   ```

2. **Install dependencies for the backend:**

   ```bash
   cd server
   npm install

   ```

3. **Install dependencies for the frontend:**
   ```bash
   cd client
   npm install
   ```

## Environment Variables

Create a `.env` file in the root of your server directory and add the following environment variables:

```env
CONNECTION_URL=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```
