# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Node.js/Express backend for a quiz/trivia game application with player management. The application handles quiz questions, player registration, scoring, and color-based answers.

## Development Commands

### Running the application
```bash
npm run dev        # Start server with nodemon (auto-reload on changes)
node server.js     # Start server without auto-reload
```

The server runs on the port specified in `.env` file (PORT environment variable).

### Dependencies
```bash
npm install        # Install all dependencies
```

## Architecture

### Entry Point
- **server.js**: Main application entry point that:
  - Loads environment variables via dotenv
  - Connects to MongoDB before starting the server
  - Configures Express middleware (CORS, JSON parsing, URL encoding)
  - Registers all route handlers
  - Logs all incoming requests (path and method)

### Database Connection Pattern
The application uses a connect-then-listen pattern: MongoDB connection is established first, and only after successful connection does the Express server start listening on the configured port.

### Route Structure
Routes are organized by resource type:
- `/api/questions` - Quiz question endpoints
- `/api/players` - Player/user management endpoints
- `/api/colors/` - Color answer endpoints

### MVC Pattern
The codebase follows the Model-View-Controller pattern:

**Models** (`models/`):
- `quizData.js` - Quiz questions with text, answers array, and correct_answer index
- `userLogin.js` - Player schema with name, phone (unique), score, and questionscore array
  - Contains static method `SignUp` for player registration with duplicate phone validation
- `colorsAnswers.js` - Color answer data with colors_answers array

**Controllers** (`controllers/`):
- `authController.js` - Handles quiz question retrieval (uses MongoDB aggregation with $sample to fetch 10 random questions)
- `userAuthController.js` - Player signup and update logic
  - JWT token generation with 3-day expiration
  - Error handling with user-friendly error messages
  - Player update by ID with validation
- `colorController.js` - Color data retrieval

**Routes** (`routes/`):
- Route files use Express Router to define endpoints and map to controller methods
- Standard REST conventions for route naming

### Authentication & Middleware
- `middleware/requireAuth.js` - JWT authentication middleware (currently commented out)
- JWT tokens are generated on player signup using SECRET_STRING from environment
- Token format: Bearer token in Authorization header

### Error Handling Pattern
Controllers use a consistent error handling pattern:
- Try-catch blocks wrap async operations
- Custom error messages for validation failures
- HTTP status codes: 200 (success), 400 (bad request), 404 (not found)
- `handleErrors` function in userAuthController.js maps mongoose errors to user-friendly messages

### MongoDB Mongoose Patterns
- All models use timestamps: true for automatic createdAt/updatedAt fields
- Model names follow collection naming: "Player" model, "sample_one_trivia" collection, "colors_answer" collection
- Validation at schema level (required fields, type validation)
- Static methods on schemas for complex operations (e.g., SignUp method)

## Environment Configuration

Required environment variables in `.env`:
- `MONGODB_STRING` - MongoDB connection string
- `PORT` - Port number for Express server
- `SECRET_STRING` - JWT secret for token signing

## CORS Configuration

CORS is configured with:
- origin: '*' (Note: Comment in code suggests this should be restricted in production)
- Allowed methods: GET, POST, PATCH, DELETE, PUT
- Allowed headers: Content-Type, Authorization

## Key Implementation Notes

1. **Player Registration**: Phone numbers must be unique. The system prevents duplicate registrations by checking existing phone numbers.

2. **Random Question Selection**: Questions are fetched using MongoDB's `$sample` aggregation stage to get 10 random questions per request.

3. **JWT Token Lifecycle**: Tokens expire after 3 days and include the player's _id in the payload.

4. **Score Tracking**: Players have both a `score` (String) and `questionscore` (Array) field for detailed score tracking.

5. **Mongoose ObjectId Validation**: Controller methods validate ObjectId format before database queries to prevent cast errors.
