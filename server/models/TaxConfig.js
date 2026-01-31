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

// Dynamic Income Tax Configuration Schema
const IncomeTaxConfigSchema = new mongoose.Schema({
  regime: {
    type: String,
    enum: ['OLD', 'NEW'],
    required: true
  },
  financialYear: {
    type: String,
    required: true,
    default: '2024-25'
  },
  slabs: [{
    upTo: { type: Number, required: true },
    rate: { type: Number, required: true, min: 0, max: 1 }
  }],
  seniorCitizenSlabs: [{
    upTo: { type: Number },
    rate: { type: Number, min: 0, max: 1 }
  }],
  superSeniorSlabs: [{
    upTo: { type: Number },
    rate: { type: Number, min: 0, max: 1 }
  }],
  standardDeduction: { type: Number, default: 0 },
  allowsDeductions: { type: Boolean, default: true },
  maxDeductions: {
    section80C: { type: Number, default: 150000 },
    section80CCD1B: { type: Number, default: 50000 },
    section80D: { 
      maxSelf: { type: Number, default: 25000 },
      maxSelfSenior: { type: Number, default: 50000 },
      maxParents: { type: Number, default: 25000 },
      maxParentsSenior: { type: Number, default: 50000 }
    },
    section80E: { type: Number, default: Infinity },
    section80G: { type: Number, default: Infinity },
    section80TTA: { type: Number, default: 10000 },
    section80TTB: { type: Number, default: 50000 }
  },
  rebate87A: {
    maxIncome: { type: Number, default: 500000 },
    rebateAmount: { type: Number, default: 12500 }
  },
  surcharge: [{
    minIncome: { type: Number },
    rate: { type: Number }
  }],
  cess: { type: Number, default: 0.04 },
  isActive: { type: Boolean, default: true },
  effectiveFrom: { type: Date, default: Date.now },
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
const IncomeTaxConfig = mongoose.model('IncomeTaxConfig', IncomeTaxConfigSchema);
const TaxResource = mongoose.model('TaxResource', TaxResourceSchema);
const TaxDeadline = mongoose.model('TaxDeadline', TaxDeadlineSchema);

module.exports = { GSTConfig, IncomeTaxConfig, TaxResource, TaxDeadline };
