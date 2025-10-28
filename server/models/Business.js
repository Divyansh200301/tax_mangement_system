const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // Business details
  businessName: { type: String, required: true },
  gstin: { type: String, unique: true, sparse: true },
  pan: { type: String, required: true },
  
  // Business type
  businessType: {
    type: String,
    enum: ['proprietorship', 'partnership', 'llp', 'private_limited', 'public_limited', 'other'],
    required: true
  },
  
  // Address
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: { type: String, default: 'India' }
  },
  
  // Contact
  email: String,
  phone: String,
  
  // Tax details
  gstRegistrationDate: Date,
  composition: { type: Boolean, default: false },
  turnover: Number,
  
  // Status
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const GSTReturnSchema = new mongoose.Schema({
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  
  // Return details
  returnType: {
    type: String,
    enum: ['GSTR1', 'GSTR3B', 'GSTR4', 'GSTR9', 'GSTR9C'],
    required: true
  },
  period: { type: String, required: true }, // MM-YYYY
  financialYear: { type: String, required: true },
  
  // Sales
  totalSales: Number,
  taxableSales: Number,
  exemptedSales: Number,
  
  // GST collected
  cgst: Number,
  sgst: Number,
  igst: Number,
  cess: Number,
  
  // Purchases (for input credit)
  totalPurchases: Number,
  inputCGST: Number,
  inputSGST: Number,
  inputIGST: Number,
  
  // ITC
  itcAvailed: Number,
  itcReversed: Number,
  
  // Net liability
  netGST: Number,
  interestPaid: Number,
  lateFee: Number,
  
  // Filing details
  filingDate: Date,
  status: {
    type: String,
    enum: ['draft', 'filed', 'revised', 'late_filed'],
    default: 'draft'
  },
  
  createdAt: { type: Date, default: Date.now }
});

const TaxFilingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  // Filing details
  assessmentYear: { type: String, required: true },
  financialYear: { type: String, required: true },
  returnType: {
    type: String,
    enum: ['ITR1', 'ITR2', 'ITR3', 'ITR4'],
    required: true
  },
  
  // Income
  salary: Number,
  houseProperty: Number,
  businessIncome: Number,
  capitalGains: Number,
  otherSources: Number,
  totalIncome: Number,
  
  // Deductions
  section80C: Number,
  section80D: Number,
  otherDeductions: Number,
  totalDeductions: Number,
  
  // Tax
  taxableIncome: Number,
  taxPayable: Number,
  tdsDeducted: Number,
  advanceTax: Number,
  selfAssessmentTax: Number,
  refund: Number,
  
  // Filing
  filingDate: Date,
  acknowledgmentNumber: String,
  status: {
    type: String,
    enum: ['draft', 'filed', 'processed', 'refund_issued'],
    default: 'draft'
  },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = {
  Business: mongoose.model('Business', BusinessSchema),
  GSTReturn: mongoose.model('GSTReturn', GSTReturnSchema),
  TaxFiling: mongoose.model('TaxFiling', TaxFilingSchema)
};
