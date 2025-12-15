# Problem Service

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/MongoDB-6.0+-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/License-ISC-blue?style=for-the-badge" alt="License">
</p>

<p align="center">
  <b>RESTful API for managing coding challenges in the AlgoForge platform</b>
</p>

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Markdown Sanitization](#markdown-sanitization)
- [Error Handling](#error-handling)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## Overview

The Problem Service manages coding challenges for the AlgoForge platform. It handles CRUD operations for problems, stores test cases with input/output pairs, manages language-specific code stubs, and sanitizes markdown content to prevent XSS attacks.

**Key Features:**
- 📝 Complete CRUD operations for coding problems
- 🧪 Test case management with input/output validation
- 🔐 Three-stage markdown sanitization for XSS prevention
- 📚 Language-specific code templates (stubs)
- 📊 Winston logging with MongoDB transport

---

## Architecture

**Service Type:** REST API (CRUD Operations)

**Data Flow:**
```
Admin/Frontend → Problem Service → MongoDB
                        ↓
              Submission Service (fetch problem + test cases)
```

**Responsibilities:**
- Maintain problem repository with test cases
- Provide language-specific code stub injection points
- Sanitize markdown descriptions for security
- Supply test case data to evaluation pipeline

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Runtime** | Node.js 18+ |
| **Framework** | Express.js 5.x |
| **Database** | MongoDB 6.0+ (Mongoose ODM) |
| **Markdown** | Marked, sanitize-html, Turndown |
| **Logging** | Winston with MongoDB transport |

**Project Structure:**
```
src/
├── config/         # DB connection, logger, environment
├── models/         # Mongoose problem schema
├── repository/     # Data access layer
├── services/       # Business logic
├── controllers/    # HTTP request handlers
├── routes/         # API routing (v1)
├── errors/         # Custom error classes
└── utils/          # Markdown sanitizer, helpers
```

---

## Prerequisites

- **Node.js** >= 18.0.0
- **MongoDB** >= 6.0

**Quick Verification:**
```bash
node --version && mongosh --eval "db.adminCommand('ping')"
```

---

## Installation

```bash
# Clone and install
git clone <repository-url>
cd Problem-Service
npm install

# Start the service
npm run dev  # Development with hot reload
npm start    # Production
```

---

## Configuration

Create `.env` file:

```env
PORT=3000
NODE_ENV=development

# Database
MONGODB_URL=mongodb://localhost:27017/algoforge

# Logging
LOG_DB_URL=mongodb://localhost:27017/algoforge_logs
```

**Verify Service:**
```bash
curl http://localhost:3000/ping
# Response: {"message":"Problem Service is alive"}
```

---

## API Reference

### Health Check
```http
GET /ping
```

### Create Problem
```http
POST /api/v1/problems
Content-Type: application/json

{
  "title": "Two Sum",
  "description": "# Problem\nFind two numbers that add up to target",
  "difficulty": "easy",
  "testCases": [
    {"input": "2 7 11 15\n9", "output": "0 1"}
  ],
  "codeStubs": [{
    "language": "python",
    "startSnippet": "def solution():\n",
    "endSnippet": "\nprint(solution())",
    "userSnippet": "    # Write your code here"
  }]
}
```

### Get All Problems
```http
GET /api/v1/problems
```

### Get Problem by ID
```http
GET /api/v1/problems/:id
```

### Update Problem
```http
PUT /api/v1/problems/:id
Content-Type: application/json

{
  "difficulty": "medium"
}
```

### Delete Problem
```http
DELETE /api/v1/problems/:id
```

**Response Format:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

---

## Database Schema

```javascript
{
  title: String (required),
  description: String (required, sanitized markdown),
  difficulty: Enum ['easy', 'medium', 'hard'] (default: 'easy'),
  testCases: [{
    input: String,   // Test input data
    output: String   // Expected output
  }],
  codeStubs: [{
    language: String,      // python, java, cpp, javascript
    startSnippet: String,  // Code before user's solution
    endSnippet: String,    // Code after user's solution
    userSnippet: String    // Template for user to start with
  }],
  editorial: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `_id` (primary key)
- `difficulty` (for filtering)
- `title` (text search, future enhancement)

---

## Markdown Sanitization

Three-stage sanitization prevents XSS attacks while preserving formatting:

### Sanitization Pipeline

```
Raw Markdown → Marked (HTML) → sanitize-html → Turndown (Markdown) → Stored
```

**Stage 1:** Convert markdown to HTML using `marked`  
**Stage 2:** Remove dangerous tags/attributes with `sanitize-html`  
**Stage 3:** Convert back to clean markdown with `Turndown`

**Allowed Elements:**
- Headings (`h1-h6`)
- Code blocks (`` ` `` and ` ``` `)
- Lists (`ul`, `ol`, `li`)
- Text formatting (`strong`, `em`, `code`)
- Links (`a` with `href`)

**Blocked Elements:**
- `<script>` tags
- Event handlers (`onclick`, `onerror`, etc.)
- Inline styles with `javascript:`
- `<iframe>`, `<object>`, `<embed>`

**Example:**
```javascript
// Input (malicious)
"<script>alert('XSS')</script># Problem\n**Safe bold text**"

// Output (sanitized)
"# Problem\n**Safe bold text**"
```

---

## Error Handling

### HTTP Status Codes

| Code | Error Class | Description |
|------|-------------|-------------|
| 200 | - | Success |
| 201 | - | Resource created |
| 400 | BadRequestError | Invalid request data |
| 404 | NotFoundError | Problem not found |
| 500 | InternalServerError | Database/server error |

### Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

**Custom Error Classes:**
- `BaseError` - Parent class with status code
- `BadRequestError` - Validation failures
- `NotFoundError` - Resource not found
- `InternalServerError` - Unexpected errors

---

## Troubleshooting

**Service won't start:**
```bash
# Check port availability
lsof -i :3000

# Verify MongoDB connection
mongosh --eval "db.adminCommand('ping')"
```

**MongoDB connection failed:**
```bash
# Check connection string
echo $MONGODB_URL

# Test manual connection
mongosh mongodb://localhost:27017/algoforge
```

**Problem not found (404):**
```bash
# Verify problem exists
mongosh algoforge
db.problems.find({ _id: ObjectId("problem_id") })
```

**Markdown sanitization issues:**
```bash
# Check logs for sanitization errors
tail -f logs/combined.log

# Test sanitization manually
curl -X POST http://localhost:3000/api/v1/problems \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"<script>alert(1)</script>Test"}'
```

---

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## License

ISC License

---

<p align="center">
  Made with ❤️ by <b>Krrish Kumar</b>
</p>
