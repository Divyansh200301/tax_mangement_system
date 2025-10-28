const express = require('express');
const { calculateComprehensiveIncomeTax, compareTaxRegimes } = require('../utils/taxUtils');
const router = express.Router();

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
