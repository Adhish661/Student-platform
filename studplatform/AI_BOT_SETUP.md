# AI Bot Setup Guide

## Overview
The AI bot in StuD Platform uses OpenAI's GPT-4o-mini model to provide intelligent responses to student questions.

## Setup Instructions

### 1. Get OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in to your account
3. Create a new API key
4. Copy the API key (it starts with `sk-`)

### 2. Configure Backend
1. Create a `.env` file in the `backend` directory
2. Add the following content:

```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/stud-platform

# JWT Secret (generate a strong secret key)
JWT_SECRET=your-super-secret-jwt-key-here

# OpenAI API Key
OPENAI_API_KEY=sk-your-actual-api-key-here

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 3. Restart the Backend Server
After adding the API key, restart your backend server:
```bash
cd backend
npm start
```

## Features

### With API Key Configured:
- Real AI responses using GPT-4o-mini
- Intelligent study assistance
- Context-aware conversations
- Subject-specific help

### Without API Key (Demo Mode):
- Pre-programmed responses for common questions
- Basic study tips and guidance
- Fallback functionality
- Still provides helpful information

## Troubleshooting

### Common Issues:

1. **"AI service is not configured"**
   - Make sure you've added the `OPENAI_API_KEY` to your `.env` file
   - Restart the backend server after adding the key

2. **"API key not configured"**
   - Check that your API key is correct
   - Ensure the key starts with `sk-`

3. **"Quota exceeded"**
   - Your OpenAI account may have reached its usage limit
   - Check your OpenAI dashboard for usage and billing

4. **Connection errors**
   - Ensure the backend server is running on port 5000
   - Check your internet connection

## Cost Considerations

- GPT-4o-mini is very cost-effective
- Typical usage: $0.15 per 1M input tokens, $0.60 per 1M output tokens
- For a study platform, costs are usually very low
- Monitor usage in your OpenAI dashboard

## Security Notes

- Never commit your `.env` file to version control
- Keep your API key secure
- Consider using environment variables in production
- The API key is only used server-side for security




