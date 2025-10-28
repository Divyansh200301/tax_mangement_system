const mongoose = require('mongoose');

// Dynamic GST Configuration Schema
const GSTConfigSchema = new mongoose.Schema({
  category: { 
    type: String, 
    required: true,
    enum: ['essential', 'standard', 'luxury', 'sin']
  },
  rate: { 
    type: Number, 
    required: true,
    min: 0,
    max: 28
  },
  items: [String],
  description: String,
  effectiveFrom: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  lastUpdated: { type: Date, default: Date.now }
});

// Tax Filing Resources Schema
const TaxResourceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['income_tax', 'gst', 'tds', 'pan', 'aadhaar', 'challan', 'refund', 'compliance'],
    required: true
  },
  title: { type: String, required: true },
  description: String,
  officialUrl: { type: String, required: true },
  category: String,
  isActive: { type: Boolean, default: true },
  priority: { type: Number, default: 0 }
});

// Tax Deadlines Schema
const TaxDeadlineSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['income_tax', 'gst', 'tds', 'advance_tax'],
    required: true
  },
  deadline: { type: Date, required: true },
  description: { type: String, required: true },
  applicableTo: [String],
  penalty: String,
  fiscalYear: String,
  isRecurring: { type: Boolean, default: false },
  reminderSent: { type: Boolean, default: false }
});

const GSTConfig = mongoose.model('GSTConfig', GSTConfigSchema);
const TaxResource = mongoose.model('TaxResource', TaxResourceSchema);
const TaxDeadline = mongoose.model('TaxDeadline', TaxDeadlineSchema);

module.exports = { GSTConfig, TaxResource, TaxDeadline };
