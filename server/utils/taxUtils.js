// Advanced Indian Income Tax Calculator with all factors

// Tax Regimes for FY 2024-25
const TAX_REGIMES = {
  OLD: {
    name: 'Old Regime',
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
    allowsDeductions: true
  },
  NEW: {
    name: 'New Regime (2023)',
    slabs: [
      { upTo: 300000, rate: 0 },
      { upTo: 600000, rate: 0.05 },
      { upTo: 900000, rate: 0.10 },
      { upTo: 1200000, rate: 0.15 },
      { upTo: 1500000, rate: 0.20 },
      { upTo: Infinity, rate: 0.30 }
    ],
    standardDeduction: 50000,
    allowsDeductions: false
  }
};

// Deductions under various sections
const DEDUCTIONS = {
  '80C': { max: 150000, name: 'PPF, ELSS, Life Insurance, EPF, Home Loan Principal' },
  '80CCD(1B)': { max: 50000, name: 'NPS (additional)' },
  '80D': { 
    maxSelf: 25000, 
    maxSelfSenior: 50000,
    maxParents: 25000,
    maxParentsSenior: 50000,
    name: 'Medical Insurance Premium'
  },
  '80E': { unlimited: true, name: 'Education Loan Interest' },
  '80G': { name: 'Donations' },
  '80TTA': { max: 10000, name: 'Savings Account Interest' },
  '80TTB': { max: 50000, name: 'Interest Income (Senior Citizens)' }
};

function calculateSlabTax(income, slabs) {
  let remaining = income;
  let tax = 0;
  let lower = 0;

  for (const slab of slabs) {
    const taxableInThisSlab = Math.max(0, Math.min(remaining, slab.upTo - lower));
    tax += taxableInThisSlab * slab.rate;
    remaining -= taxableInThisSlab;
    lower = slab.upTo;
    if (remaining <= 0) break;
  }

  return tax;
}

function calculateComprehensiveIncomeTax(inputs) {
  const {
    salary = 0,
    houseRentAllowance = 0,
    rentPaid = 0,
    otherIncome = 0,
    businessIncome = 0,
    capitalGains = 0,
    section80C = 0,
    section80CCD1B = 0,
    section80D = 0,
    section80E = 0,
    section80G = 0,
    section80TTA = 0,
    age = 25,
    regime = 'NEW',
    professionalTax = 2400
  } = inputs;

  const taxRegime = TAX_REGIMES[regime];
  const isSenior = age >= 60;
  const isSuperSenior = age >= 80;
  
  let slabs = taxRegime.slabs;
  if (regime === 'OLD') {
    if (isSuperSenior) slabs = taxRegime.superSeniorSlabs;
    else if (isSenior) slabs = taxRegime.seniorCitizenSlabs;
  }

  let grossIncome = salary + otherIncome + businessIncome + capitalGains;

  let hraExemption = 0;
  if (houseRentAllowance > 0 && rentPaid > 0) {
    const basicSalary = salary * 0.5;
    const exempt1 = houseRentAllowance;
    const exempt2 = rentPaid - (basicSalary * 0.1);
    const exempt3 = salary * 0.4;
    hraExemption = Math.max(0, Math.min(exempt1, exempt2, exempt3));
  }

  let standardDeduction = 50000;
  let totalDeductions = standardDeduction + professionalTax;
  
  if (taxRegime.allowsDeductions) {
    totalDeductions += Math.min(section80C, DEDUCTIONS['80C'].max);
    totalDeductions += Math.min(section80CCD1B, DEDUCTIONS['80CCD(1B)'].max);
    totalDeductions += section80D;
    totalDeductions += section80E;
    totalDeductions += section80G;
    totalDeductions += Math.min(section80TTA, isSenior ? DEDUCTIONS['80TTB'].max : DEDUCTIONS['80TTA'].max);
  }

  const netIncome = Math.max(0, grossIncome - hraExemption - totalDeductions);
  let incomeTax = calculateSlabTax(netIncome, slabs);

  let rebate = 0;
  if (regime === 'NEW' && netIncome <= 700000) {
    rebate = Math.min(incomeTax, 25000);
  } else if (regime === 'OLD' && netIncome <= 500000) {
    rebate = Math.min(incomeTax, 12500);
  }
  incomeTax -= rebate;

  let surcharge = 0;
  if (netIncome > 5000000 && netIncome <= 10000000) {
    surcharge = incomeTax * 0.10;
  } else if (netIncome > 10000000 && netIncome <= 20000000) {
    surcharge = incomeTax * 0.15;
  } else if (netIncome > 20000000 && netIncome <= 50000000) {
    surcharge = incomeTax * 0.25;
  } else if (netIncome > 50000000) {
    surcharge = incomeTax * 0.37;
  }

  const cess = (incomeTax + surcharge) * 0.04;
  const totalTax = Math.round(incomeTax + surcharge + cess);

  return {
    regime: taxRegime.name,
    grossIncome: Math.round(grossIncome),
    hraExemption: Math.round(hraExemption),
    standardDeduction: Math.round(standardDeduction),
    totalDeductions: Math.round(totalDeductions),
    taxableIncome: Math.round(netIncome),
    incomeTax: Math.round(incomeTax),
    rebate: Math.round(rebate),
    surcharge: Math.round(surcharge),
    cess: Math.round(cess),
    totalTax,
    effectiveRate: grossIncome > 0 ? ((totalTax / grossIncome) * 100).toFixed(2) : 0
  };
}

function compareTaxRegimes(inputs) {
  const oldRegime = calculateComprehensiveIncomeTax({ ...inputs, regime: 'OLD' });
  const newRegime = calculateComprehensiveIncomeTax({ ...inputs, regime: 'NEW' });
  
  return {
    old: oldRegime,
    new: newRegime,
    recommendation: oldRegime.totalTax < newRegime.totalTax ? 'OLD' : 'NEW',
    savings: Math.abs(oldRegime.totalTax - newRegime.totalTax)
  };
}

function calculateIncomeTax({ salary = 0, otherIncome = 0, deductions = 0 }) {
  return calculateComprehensiveIncomeTax({
    salary,
    otherIncome,
    section80C: deductions,
    regime: 'NEW'
  });
}

module.exports = { 
  calculateIncomeTax,
  calculateComprehensiveIncomeTax,
  compareTaxRegimes,
  TAX_REGIMES,
  DEDUCTIONS
};
