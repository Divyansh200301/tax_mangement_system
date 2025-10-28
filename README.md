# Tax Management System (MERN)

A full-stack MERN application for Indian tax management with GST calculator, income tax estimator, and an AI chatbot assistant named **SomeUnique**.

## ⚠️ Important Legal Disclaimer

**This software is for educational and demonstration purposes only.** It is NOT a substitute for professional tax advice. Tax laws in India change frequently, and calculations provided by this system are indicative only. Always consult a qualified Chartered Accountant or tax professional before making any tax-related decisions or filing returns.

## Features

- **Authentication**: JWT-based user registration and login with role support (admin/accountant/user)
- **GST Calculator**: Calculate GST at various tax slabs (5%, 12%, 18%, 28%)
- **Income Tax Calculator**: Estimate income tax based on Indian tax slabs with deductions (80C, 80D)
- **Invoice Management**: Create and store invoices with GST details
- **AI Chatbot (SomeUnique)**: Ask questions about GST and income tax, get instant calculations
  - Integrates with Google Gemini Flash One API (optional)
  - Falls back to rule-based responses if API is unavailable
- **Responsive UI**: React-based frontend with clean, modern design

## Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (installed and running locally on port 27017)
- **npm** or **yarn**

## Quick Start

### 1. Clone and Setup

```powershell
cd d:\tax_mangement_system
```

### 2. Configure Environment

Create `.env` files from examples:

**Backend** (`server/.env`):
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/tax_management
JWT_SECRET=your_secure_jwt_secret_here
GEMINI_API_KEY=your_gemini_api_key_here
```

**Frontend** (`client/.env`):
```bash
VITE_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB

Make sure MongoDB is running:
```powershell
mongod
```

### 4. Run Backend

```powershell
cd server
npm install
npm run dev
```

Backend will start on http://localhost:5000

### 5. Run Frontend

Open a new terminal:

```powershell
cd client
npm install
npm run dev
```

Frontend will start on http://localhost:3000

### 6. Access the Application

Open your browser and navigate to: http://localhost:3000

## Getting Gemini API Key (Optional)

The chatbot **SomeUnique** can use Google's Gemini Flash One API for enhanced responses:

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key and paste it in `server/.env` as `GEMINI_API_KEY`

**Note**: If you don't provide an API key, the chatbot will use a built-in rule-based system that can still answer basic GST and income tax questions.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### GST
- `POST /api/gst/calculate` - Calculate GST

### Income Tax
- `POST /api/income/calculate` - Calculate income tax

### Chatbot
- `POST /api/chatbot/query` - Send message to SomeUnique chatbot

## Testing

Run backend tests:

```powershell
cd server
npm test
```

## Project Structure

```
tax_management_system/
├── server/               # Backend (Node.js + Express)
│   ├── config/          # Database configuration
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions (tax calculations)
│   ├── tests/           # Jest tests
│   └── index.js         # Server entry point
├── client/              # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/  # Chatbot widget
│   │   ├── pages/       # Login, Dashboard, Calculators
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   └── index.html
├── .github/
│   └── workflows/       # CI/CD workflows
└── README.md
```

## Technologies Used

**Backend**:
- Node.js & Express
- MongoDB & Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Axios for API calls
- Jest for testing

**Frontend**:
- React 18
- Vite
- React Router
- Axios

## Contributing

This is an educational project. Feel free to fork and modify according to your needs.

## License

MIT License - Use at your own risk.

## Support

For issues or questions, please open an issue on the repository.

---

**Remember**: Always consult professional tax advisors for actual tax filing and compliance.
