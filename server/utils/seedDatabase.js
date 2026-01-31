const mongoose = require('mongoose');
const { GSTConfig, IncomeTaxConfig, TaxResource, TaxDeadline } = require('../models/TaxConfig');

async function seedDatabase() {
  try {
    // Seed Income Tax Configs
    const incomeTaxConfigs = [
      {
        regime: 'OLD',
        financialYear: '2024-25',
        slabs: [
          { upTo: 250000, rate: 0 },
          { upTo: 500000, rate: 0.05 },
          { upTo: 1000000, rate: 0.2 },
          { upTo: Infinity, rate: 0.3 }
        ],
        seniorCitizenSlabs: [
          { upTo: 300000, rate: 0 },
          { upTo: 500000, rate: 0.05 },
          { upTo: 1000000, rate: 0.2 },
          { upTo: Infinity, rate: 0.3 }
        ],
        superSeniorSlabs: [
          { upTo: 500000, rate: 0 },
          { upTo: 1000000, rate: 0.2 },
          { upTo: Infinity, rate: 0.3 }
        ],
        standardDeduction: 0,
        allowsDeductions: true,
        maxDeductions: {
          section80C: 150000,
          section80CCD1B: 50000,
          section80D: {
            maxSelf: 25000,
            maxSelfSenior: 50000,
            maxParents: 25000,
            maxParentsSenior: 50000
          },
          section80E: Infinity,
          section80G: Infinity,
          section80TTA: 10000,
          section80TTB: 50000
        },
        rebate87A: {
          maxIncome: 500000,
          rebateAmount: 12500
        },
        surcharge: [
          { minIncome: 5000000, rate: 0.10 },
          { minIncome: 10000000, rate: 0.15 },
          { minIncome: 20000000, rate: 0.25 },
          { minIncome: 50000000, rate: 0.37 }
        ],
        cess: 0.04,
        isActive: true
      },
      {
        regime: 'NEW',
        financialYear: '2024-25',
        slabs: [
          { upTo: 300000, rate: 0 },
          { upTo: 600000, rate: 0.05 },
          { upTo: 900000, rate: 0.10 },
          { upTo: 1200000, rate: 0.15 },
          { upTo: 1500000, rate: 0.20 },
          { upTo: Infinity, rate: 0.30 }
        ],
        standardDeduction: 50000,
        allowsDeductions: false,
        rebate87A: {
          maxIncome: 700000,
          rebateAmount: 25000
        },
        surcharge: [
          { minIncome: 5000000, rate: 0.10 },
          { minIncome: 10000000, rate: 0.15 },
          { minIncome: 20000000, rate: 0.25 },
          { minIncome: 50000000, rate: 0.37 }
        ],
        cess: 0.04,
        isActive: true
      }
    ];

    await IncomeTaxConfig.deleteMany({});
    await IncomeTaxConfig.insertMany(incomeTaxConfigs);
    console.log('✅ Income Tax configs seeded');

    // Seed GST Rates
    const gstRates = [
      {
        category: 'essential',
        rate: 0,
        items: ['Fresh vegetables', 'Fresh fruits', 'Fresh milk', 'Eggs', 'Curd', 'Bread', 'Salt', 'Jaggery'],
        description: 'Essential food items - Nil rated'
      },
      {
        category: 'essential',
        rate: 5,
        items: ['Sugar', 'Tea', 'Coffee', 'Edible oils', 'Coal', 'Domestic LPG', 'Life-saving drugs', 'Kerosene'],
        description: 'Essential commodities - 5% GST'
      },
      {
        category: 'standard',
        rate: 12,
        items: ['Processed food', 'Computers', 'Mobile phones under ₹15,000', 'Butter', 'Cheese', 'Ghee', 'Ayurvedic medicines'],
        description: 'Standard rate goods - 12% GST'
      },
      {
        category: 'standard',
        rate: 18,
        items: ['Most goods and services', 'IT services', 'Telecom services', 'Financial services', 'Restaurants (non-AC)', 'Soap', 'Toothpaste'],
        description: 'Default rate for most items - 18% GST'
      },
      {
        category: 'luxury',
        rate: 28,
        items: ['Luxury cars', 'Two-wheelers above 350cc', 'AC restaurants', 'Hotels (₹7,500+)', 'Cinema tickets (₹100+)', 'Cigarettes', 'Aerated drinks'],
        description: 'Luxury and sin goods - 28% GST'
      }
    ];

    await GSTConfig.deleteMany({});
    await GSTConfig.insertMany(gstRates);
    console.log('✅ GST rates seeded');

    // Seed Tax Resources
    const taxResources = [
      {
        type: 'income_tax',
        title: 'Income Tax e-Filing Portal',
        description: 'Official portal for filing income tax returns',
        officialUrl: 'https://www.incometax.gov.in/iec/foportal',
        priority: 10
      },
      {
        type: 'income_tax',
        title: 'Download Form 26AS',
        description: 'Tax credit statement showing TDS/TCS',
        officialUrl: 'https://www.incometax.gov.in/iec/foportal',
        priority: 9
      },
      {
        type: 'pan',
        title: 'Apply for PAN Card',
        description: 'NSDL PAN application portal',
        officialUrl: 'https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html',
        priority: 8
      },
      {
        type: 'gst',
        title: 'GST Portal',
        description: 'Official GST registration and filing portal',
        officialUrl: 'https://www.gst.gov.in/',
        priority: 10
      },
      {
        type: 'gst',
        title: 'GST Rate Finder',
        description: 'Find applicable GST rates for goods/services',
        officialUrl: 'https://cbic-gst.gov.in/gst-goods-services-rates.html',
        priority: 9
      },
      {
        type: 'tds',
        title: 'TDS Return Filing',
        description: 'TRACES - TDS Reconciliation Analysis and Correction Enabling System',
        officialUrl: 'https://www.tdscpc.gov.in/',
        priority: 8
      },
      {
        type: 'challan',
        title: 'Pay Tax Online - Income Tax',
        description: 'Pay advance tax, self-assessment tax',
        officialUrl: 'https://onlineservices.tin.egov-nsdl.com/etaxnew/tdsnontds.jsp',
        priority: 7
      },
      {
        type: 'challan',
        title: 'Pay GST Online',
        description: 'GST payment portal',
        officialUrl: 'https://www.gst.gov.in/',
        priority: 7
      },
      {
        type: 'aadhaar',
        title: 'Link Aadhaar with PAN',
        description: 'Mandatory linking of Aadhaar with PAN',
        officialUrl: 'https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-1',
        priority: 6
      },
      {
        type: 'refund',
        title: 'Track Income Tax Refund',
        description: 'Check status of your tax refund',
        officialUrl: 'https://tin.tin.nsdl.com/oltas/refundstatuslogin.html',
        priority: 8
      },
      {
        type: 'compliance',
        title: 'MCA Portal',
        description: 'Ministry of Corporate Affairs - Company filings',
        officialUrl: 'https://www.mca.gov.in/',
        priority: 5
      }
    ];

    await TaxResource.deleteMany({});
    await TaxResource.insertMany(taxResources);
    console.log('✅ Tax resources seeded');

    // Seed Tax Deadlines (FY 2024-25)
    const deadlines = [
      {
        type: 'advance_tax',
        deadline: new Date('2024-06-15'),
        description: 'First installment of Advance Tax (15% of tax liability)',
        applicableTo: ['Business', 'Professionals', 'High earners'],
        penalty: 'Interest under section 234B & 234C',
        fiscalYear: '2024-25',
        isRecurring: true
      },
      {
        type: 'advance_tax',
        deadline: new Date('2024-09-15'),
        description: 'Second installment of Advance Tax (45% cumulative)',
        applicableTo: ['Business', 'Professionals', 'High earners'],
        penalty: 'Interest under section 234B & 234C',
        fiscalYear: '2024-25',
        isRecurring: true
      },
      {
        type: 'advance_tax',
        deadline: new Date('2024-12-15'),
        description: 'Third installment of Advance Tax (75% cumulative)',
        applicableTo: ['Business', 'Professionals', 'High earners'],
        penalty: 'Interest under section 234B & 234C',
        fiscalYear: '2024-25',
        isRecurring: true
      },
      {
        type: 'advance_tax',
        deadline: new Date('2025-03-15'),
        description: 'Fourth installment of Advance Tax (100%)',
        applicableTo: ['Business', 'Professionals', 'High earners'],
        penalty: 'Interest under section 234B & 234C',
        fiscalYear: '2024-25',
        isRecurring: true
      },
      {
        type: 'income_tax',
        deadline: new Date('2025-07-31'),
        description: 'ITR filing for individuals (non-audit cases)',
        applicableTo: ['Salaried', 'Individuals', 'HUF'],
        penalty: 'Late fee up to ₹5,000',
        fiscalYear: '2024-25',
        isRecurring: true
      },
      {
        type: 'gst',
        deadline: new Date('2025-11-10'),
        description: 'GSTR-1 (Outward supplies) - October 2024',
        applicableTo: ['GST registered businesses'],
        penalty: 'Late fee ₹50/day (CGST) + ₹50/day (SGST)',
        fiscalYear: '2024-25',
        isRecurring: true
      },
      {
        type: 'gst',
        deadline: new Date('2025-11-20'),
        description: 'GSTR-3B (Summary return) - October 2024',
        applicableTo: ['GST registered businesses'],
        penalty: 'Late fee + Interest',
        fiscalYear: '2024-25',
        isRecurring: true
      }
    ];

    await TaxDeadline.deleteMany({});
    await TaxDeadline.insertMany(deadlines);
    console.log('✅ Tax deadlines seeded');

    console.log('🎉 Database seeded successfully!');
  } catch (err) {
    console.error('❌ Seed error:', err);
  }
}

module.exports = seedDatabase;
