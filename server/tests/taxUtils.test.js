const { calculateIncomeTax } = require('../utils/taxUtils');

test('calculateIncomeTax basic', () => {
  const res = calculateIncomeTax({ salary: 600000, otherIncome: 0, deductions: 100000 });
  expect(res.income).toBe(500000);
  expect(res.tax).toBeGreaterThan(0);
});
