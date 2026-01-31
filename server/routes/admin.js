const express = require('express');
const { IncomeTaxConfig, GSTConfig, TaxResource, TaxDeadline } = require('../models/TaxConfig');
const router = express.Router();

// ========== INCOME TAX CONFIG MANAGEMENT ==========

// Get all income tax configurations
router.get('/income-tax-config', async (req, res) => {
  try {
    const configs = await IncomeTaxConfig.find().sort({ financialYear: -1, regime: 1 });
    res.json(configs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create new income tax configuration
router.post('/income-tax-config', async (req, res) => {
  try {
    const config = new IncomeTaxConfig(req.body);
    await config.save();
    res.json({ msg: 'Income tax configuration created successfully', config });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Update income tax configuration
router.put('/income-tax-config/:id', async (req, res) => {
  try {
    const config = await IncomeTaxConfig.findByIdAndUpdate(
      req.params.id,
      { ...req.body, lastUpdated: Date.now() },
      { new: true }
    );
    res.json({ msg: 'Income tax configuration updated successfully', config });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Toggle active status
router.patch('/income-tax-config/:id/toggle', async (req, res) => {
  try {
    const config = await IncomeTaxConfig.findById(req.params.id);
    config.isActive = !config.isActive;
    await config.save();
    res.json({ msg: 'Status toggled successfully', config });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete income tax configuration
router.delete('/income-tax-config/:id', async (req, res) => {
  try {
    await IncomeTaxConfig.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Configuration deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// ========== GST CONFIG MANAGEMENT ==========

// Get all GST configurations
router.get('/gst-config', async (req, res) => {
  try {
    const configs = await GSTConfig.find().sort({ rate: 1 });
    res.json(configs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Create new GST rate
router.post('/gst-config', async (req, res) => {
  try {
    const config = new GSTConfig(req.body);
    await config.save();
    res.json({ msg: 'GST configuration created successfully', config });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update GST configuration
router.put('/gst-config/:id', async (req, res) => {
  try {
    const config = await GSTConfig.findByIdAndUpdate(
      req.params.id,
      { ...req.body, lastUpdated: Date.now() },
      { new: true }
    );
    res.json({ msg: 'GST configuration updated successfully', config });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// ========== TAX RESOURCES MANAGEMENT ==========

// Create new tax resource
router.post('/resources', async (req, res) => {
  try {
    const resource = new TaxResource(req.body);
    await resource.save();
    res.json({ msg: 'Resource created successfully', resource });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update tax resource
router.put('/resources/:id', async (req, res) => {
  try {
    const resource = await TaxResource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ msg: 'Resource updated successfully', resource });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete tax resource
router.delete('/resources/:id', async (req, res) => {
  try {
    await TaxResource.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Resource deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// ========== TAX DEADLINES MANAGEMENT ==========

// Create new deadline
router.post('/deadlines', async (req, res) => {
  try {
    const deadline = new TaxDeadline(req.body);
    await deadline.save();
    res.json({ msg: 'Deadline created successfully', deadline });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update deadline
router.put('/deadlines/:id', async (req, res) => {
  try {
    const deadline = await TaxDeadline.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ msg: 'Deadline updated successfully', deadline });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete deadline
router.delete('/deadlines/:id', async (req, res) => {
  try {
    await TaxDeadline.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deadline deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
