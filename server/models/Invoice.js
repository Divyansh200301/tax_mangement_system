const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  buyer: { name: String, gstin: String, address: String },
  seller: { name: String, gstin: String, address: String },
  items: [{ description: String, qty: Number, rate: Number, amount: Number }],
  subTotal: Number,
  gstRate: Number,
  gstAmount: Number,
  total: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
