# StuD Platform

A comprehensive educational platform for collaborative learning, resource sharing, and AI-powered study assistance.

## Features

- **Group Study**: Virtual study rooms with video meetings and collaborative note-taking
- **Resources**: Upload and share study materials in PDF format
- **Video Notes**: AI-generated summaries and organized notes from educational videos
- **AI Chatbot**: Instant help with study questions
- **Previous Year Papers**: Access to past exam papers

## Tech Stack

### Backend
- Node.js with Express
- MongoDB with Mongoose
- Socket.io for real-time communication
- OpenAI API for AI features
- Multer for file uploads
- JWT for authentication

### Frontend
- React 19 with Vite
- Framer Motion for animations
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- OpenAI API key

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```env
MONGO_URI=mongodb://localhost:27017/stud-platform
JWT_SECRET=your-super-secret-jwt-key-here
OPENAI_API_KEY=your-openai-api-key-here
PORT=5000
NODE_ENV=development
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Files
- `POST /api/files/upload` - Upload multiple files
- `GET /api/files` - Get files by subject
- `GET /api/files/download/:id` - Download a file
- `DELETE /api/files/:id` - Delete a file

### Chat
- `POST /api/chat` - Send message to AI chatbot

### Video
- `POST /api/video/upload` - Upload video for transcription
- `POST /api/video/process` - Generate notes from video text

## Project Structure

```
stud-platform/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── videoController.js
│   │   └── videoNotesController.js
│   ├── middleware/
│   │   └── upload.js
│   ├── models/
│   │   ├── File.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── chat.js
│   │   ├── files.js
│   │   └── video.js
│   ├── uploads/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Common/
│   │   │   ├── Layout/
│   │   │   ├── Pages/
│   │   │   └── UI/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── assets/
│   └── package.json
└── README.md
```

## Features in Detail

### Group Study
- Create or join study rooms
- Video conferencing capabilities
- Collaborative note-taking
- Save and retrieve session notes

### Resources Management
- Upload PDF files by subject
- Organize files by categories (Math, Physics, Chemistry, etc.)
- Download and delete files
- File preview and management

### Video Notes Generator
- Upload educational videos
- AI-powered transcription
- Generate structured notes based on subject type
- Save and manage generated notes

### AI Chatbot
- Interactive chat interface
- Context-aware responses
- Study assistance and tips
- Subject-specific help

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.

