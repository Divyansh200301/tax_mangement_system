const express = require('express');
const { GSTConfig } = require('../models/TaxConfig');
const router = express.Router();

// Get all active GST rates
router.get('/rates', async (req, res) => {
  try {
    const rates = await GSTConfig.find({ isActive: true }).sort({ rate: 1 });
    res.json(rates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Calculate GST
router.post('/calculate', async (req, res) => {
  const { amount = 0, gstRate = 18, category } = req.body;
  
  try {
    // If category provided, get rate from database
    let rate = gstRate;
    if (category) {
      const config = await GSTConfig.findOne({ category, isActive: true });
      if (config) rate = config.rate;
    }
    
    const rateDecimal = rate / 100;
    const gst = amount * rateDecimal;
    const cgst = gst / 2;
    const sgst = gst / 2;
    const total = amount + gst;
    
    res.json({
      amount,
      gst: Number(gst.toFixed(2)),
      cgst: Number(cgst.toFixed(2)),
      sgst: Number(sgst.toFixed(2)),
      total: Number(total.toFixed(2)),
      gstRate: rate,
      category
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Search GST rate by item
router.get('/search', async (req, res) => {
  const { query } = req.query;
  
  try {
    const results = await GSTConfig.find({
      isActive: true,
      items: { $regex: query, $options: 'i' }
    });
    
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
