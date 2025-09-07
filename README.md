# Jobs API

A secure RESTful API for job management with user authentication, built with Node.js, Express, and MongoDB.

## Features

- **User Authentication**: JWT-based registration and login system
- **Job Management**: Full CRUD operations for jobs (Create, Read, Update, Delete)
- **Security**: Comprehensive security measures including:
  - Helmet.js for security headers
  - CORS enabled
  - XSS protection
  - Rate limiting
  - Password hashing with bcrypt
- **Error Handling**: Custom error handling middleware
- **Data Validation**: Input validation and sanitization

## Tech Stack

- **Backend Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: Helmet, CORS, xss-clean, express-rate-limit
- **Password Hashing**: bcryptjs

## API Endpoints

### Authentication Routes

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user

### Job Routes (Protected)

- `GET /api/v1/jobs` - Get all jobs for authenticated user
- `GET /api/v1/jobs/:id` - Get a single job
- `POST /api/v1/jobs` - Create a new job
- `PATCH /api/v1/jobs/:id` - Update a job
- `DELETE /api/v1/jobs/:id` - Delete a job

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd jobs-api
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_LIFETIME=1d
PORT=3000
```

4. Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

## Project Structure

```
├── controllers/          # Route controllers
│   ├── auth.js          # Authentication logic
│   └── jobs.js          # Job CRUD operations
├── models/              # MongoDB models
│   ├── User.js          # User schema and methods
│   └── Job.js           # Job schema
├── middleware/          # Custom middleware
│   ├── authentication.js # JWT authentication
│   ├── error-handler.js # Error handling
│   └── not-found.js     # 404 handler
├── routes/              # Express routers
│   ├── auth.js          # Authentication routes
│   └── jobs.js          # Job routes
├── errors/              # Custom error classes
└── app.js              # Main application file
```

## Usage

### User Registration

```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ELFRAIHI Souhail",
    "email": "souhail@example.com",
    "password": "securepassword"
  }'
```

### User Login

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "souhail@example.com",
    "password": "securepassword"
  }'
```

### Creating a Job (Protected)

```bash
curl -X POST http://localhost:3000/api/v1/jobs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_jwt_token>" \
  -d '{
    "company": "Tech Corp",
    "position": "Software Developer"
  }'
```

## Security Features

- Passwords are hashed using bcrypt before storage
- JWT tokens for stateless authentication
- Rate limiting to prevent brute force attacks
- XSS protection to prevent cross-site scripting attacks
- CORS enabled for cross-origin requests
- Security headers with Helmet.js

## Error Handling

The API includes comprehensive error handling for:
- Authentication errors
- Validation errors
- Database errors
- Not found routes
- Duplicate key errors

## Dependencies

### Production Dependencies
- express: Web framework
- mongoose: MongoDB ODM
- jsonwebtoken: JWT authentication
- bcryptjs: Password hashing
- helmet: Security headers
- cors: Cross-origin resource sharing
- xss-clean: XSS protection
- express-rate-limit: Rate limiting
- dotenv: Environment variables

### Development Dependencies
- express-async-handler: Async error handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request
