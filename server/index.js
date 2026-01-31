require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const winston = require('winston');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const gstRoutes = require('./routes/gst');
const incomeRoutes = require('./routes/incomeTax');
const chatbotRoutes = require('./routes/chatbot');
const resourceRoutes = require('./routes/resources');
const seedDatabase = require('./utils/seedDatabase');

// Validate required environment variables
if (!process.env.JWT_SECRET || !process.env.MONGO_URI) {
  console.error('❌ FATAL: JWT_SECRET and MONGO_URI must be defined in .env');
  process.exit(1);
}

// Configure Logger
const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for development, enable in production
  crossOriginEmbedderPolicy: false
}));

// Compression
app.use(compression());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per windowMs
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 auth attempts per 15 minutes
  skipSuccessfulRequests: true,
});

// CORS Configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || 'https://karsahayak.vercel.app'
    : '*',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Database Connection
connectDB().then(() => {
  // Seed database only in development and if empty
  if (process.env.NODE_ENV !== 'production') {
    const { GSTConfig } = require('./models/TaxConfig');
    GSTConfig.countDocuments().then(count => {
      if (count === 0) {
        logger.info('📦 Seeding database with initial data...');
        seedDatabase();
      }
    });
  }
});

// Apply rate limiting
app.use('/api/', limiter);

// Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/gst', gstRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/resources', resourceRoutes);

// Health Check Endpoints
app.get('/', (req, res) => res.json({ 
  status: 'healthy',
  service: 'KarSahayak Tax Management API',
  version: '1.0.0',
  timestamp: new Date().toISOString()
}));

app.get('/health', async (req, res) => {
  const mongoose = require('mongoose');
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  
  res.json({
    status: dbStatus === 'connected' ? 'healthy' : 'unhealthy',
    database: dbStatus,
    uptime: Math.floor(process.uptime()),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString()
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  logger.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method
  });
  
  res.status(err.status || 500).json({
    success: false,
    error: {
      message: process.env.NODE_ENV === 'production' 
        ? 'Internal server error' 
        : err.message
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: { message: 'Route not found' }
  });
});

app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});
