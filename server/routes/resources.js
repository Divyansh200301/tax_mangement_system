const express = require('express');
const { TaxResource, TaxDeadline } = require('../models/TaxConfig');
const router = express.Router();

// Get all tax resources
router.get('/resources', async (req, res) => {
  const { type } = req.query;
  
  try {
    const filter = { isActive: true };
    if (type) filter.type = type;
    
    const resources = await TaxResource.find(filter).sort({ priority: -1 });
    res.json(resources);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get upcoming deadlines
router.get('/deadlines', async (req, res) => {
  try {
    const now = new Date();
    const deadlines = await TaxDeadline.find({
      deadline: { $gte: now }
    }).sort({ deadline: 1 }).limit(10);
    
    res.json(deadlines);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
