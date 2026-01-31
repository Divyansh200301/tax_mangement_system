const express = require('express');
const { calculateComprehensiveIncomeTax, compareTaxRegimes } = require('../utils/taxUtils');
const { IncomeTaxConfig } = require('../models/TaxConfig');
const router = express.Router();

// Get current tax configuration
router.get('/config', async (req, res) => {
  try {
    const configs = await IncomeTaxConfig.find({ isActive: true }).sort({ financialYear: -1 });
    res.json(configs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get specific regime configuration
router.get('/config/:regime', async (req, res) => {
  try {
    const config = await IncomeTaxConfig.findOne({ 
      regime: req.params.regime.toUpperCase(),
      isActive: true 
    }).sort({ financialYear: -1 });
    res.json(config || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Simple calculation (backward compatible)
router.post('/calculate', (req, res) => {
  try {
    const result = calculateComprehensiveIncomeTax(req.body);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Advanced calculation with all factors
router.post('/calculate-advanced', (req, res) => {
  try {
    const result = calculateComprehensiveIncomeTax(req.body);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Compare old vs new regime
router.post('/compare-regimes', (req, res) => {
  try {
    const comparison = compareTaxRegimes(req.body);
    res.json(comparison);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
