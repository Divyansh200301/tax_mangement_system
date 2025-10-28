require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const gstRoutes = require('./routes/gst');
const incomeRoutes = require('./routes/incomeTax');
const chatbotRoutes = require('./routes/chatbot');
const resourceRoutes = require('./routes/resources');
const seedDatabase = require('./utils/seedDatabase');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  // Seed database on first run (check if data exists first)
  const { GSTConfig } = require('./models/TaxConfig');
  GSTConfig.countDocuments().then(count => {
    if (count === 0) {
      console.log('📦 Seeding database...');
      seedDatabase();
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/gst', gstRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/resources', resourceRoutes);

app.get('/', (req, res) => res.send({ status: 'ok', service: 'tax-management-server' }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
