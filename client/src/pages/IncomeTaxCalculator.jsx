import React, { useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function IncomeTaxCalculator() {
  const [inputs, setInputs] = useState({
    salary: '',
    otherIncome: '',
    houseRentAllowance: '',
    rentPaid: '',
    section80C: '',
    section80D: '',
    section80E: '',
    age: '25',
    regime: 'NEW'
  })
  const [result, setResult] = useState(null)
  const [comparison, setComparison] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const calculate = async () => {
    if (!inputs.salary) {
      alert('Please enter salary')
      return
    }
    setLoading(true)
    try {
      const payload = {
        salary: Number(inputs.salary),
        otherIncome: Number(inputs.otherIncome) || 0,
        houseRentAllowance: Number(inputs.houseRentAllowance) || 0,
        rentPaid: Number(inputs.rentPaid) || 0,
        section80C: Number(inputs.section80C) || 0,
        section80D: Number(inputs.section80D) || 0,
        section80E: Number(inputs.section80E) || 0,
        age: Number(inputs.age),
        regime: inputs.regime
      }
      const res = await axios.post(API_URL + '/income/calculate', payload)
      setResult(res.data)
      setComparison(null)
    } catch (err) {
      console.error(err)
      alert('Error calculating tax')
    } finally {
      setLoading(false)
    }
  }

  const compareRegimes = async () => {
    if (!inputs.salary) {
      alert('Please enter salary')
      return
    }
    setLoading(true)
    try {
      const payload = {
        salary: Number(inputs.salary),
        otherIncome: Number(inputs.otherIncome) || 0,
        houseRentAllowance: Number(inputs.houseRentAllowance) || 0,
        rentPaid: Number(inputs.rentPaid) || 0,
        section80C: Number(inputs.section80C) || 0,
        section80D: Number(inputs.section80D) || 0,
        section80E: Number(inputs.section80E) || 0,
        age: Number(inputs.age)
      }
      const res = await axios.post(API_URL + '/income/compare-regimes', payload)
      setComparison(res.data)
      setResult(null)
    } catch (err) {
      console.error(err)
      alert('Error comparing regimes')
    } finally {
      setLoading(false)
    }
  }

  const containerStyle = {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '40px 20px',
    animation: 'fadeIn 0.5s ease-in-out'
  }

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '40px'
  }

  const titleStyle = {
    fontSize: '38px',
    background: 'linear-gradient(135deg, #FF9933 0%, #138808 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '12px'
  }

  const cardStyle = {
    background: 'white',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    borderTop: '4px solid #1A73E8',
    marginBottom: '24px'
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginBottom: '20px'
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>💰 Income Tax Calculator</h1>
        <p style={{ fontSize: '16px', color: '#6C757D' }}>
          Calculate income tax with all deductions | Compare Old vs New Regime
        </p>
      </div>

      {/* Basic Info */}
      <div style={cardStyle}>
        <h3 style={{ color: '#000080', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>💼</span> Basic Information
        </h3>
        <div style={gridStyle}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#000080', fontSize: '14px' }}>
              Annual Salary (₹) *
            </label>
            <input
              type="number"
              name="salary"
              placeholder="e.g., 1200000"
              value={inputs.salary}
              onChange={handleChange}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#000080', fontSize: '14px' }}>
              Other Income (₹)
            </label>
            <input
              type="number"
              name="otherIncome"
              placeholder="e.g., 50000"
              value={inputs.otherIncome}
              onChange={handleChange}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#000080', fontSize: '14px' }}>
              Age
            </label>
            <select name="age" value={inputs.age} onChange={handleChange}>
              <option value="25">Below 60</option>
              <option value="65">60-80 (Senior)</option>
              <option value="85">Above 80 (Super Senior)</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#000080', fontSize: '14px' }}>
              Tax Regime
            </label>
            <select name="regime" value={inputs.regime} onChange={handleChange}>
              <option value="NEW">New Regime</option>
              <option value="OLD">Old Regime</option>
            </select>
          </div>
        </div>
      </div>

      {/* HRA */}
      <div style={cardStyle}>
        <h3 style={{ color: '#000080', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🏠</span> House Rent Allowance (HRA)
        </h3>
        <div style={gridStyle}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#000080', fontSize: '14px' }}>
              HRA Received (₹)
            </label>
            <input
              type="number"
              name="houseRentAllowance"
              placeholder="e.g., 120000"
              value={inputs.houseRentAllowance}
              onChange={handleChange}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#000080', fontSize: '14px' }}>
              Rent Paid (₹)
            </label>
            <input
              type="number"
              name="rentPaid"
              placeholder="e.g., 180000"
              value={inputs.rentPaid}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Deductions */}
      <div style={cardStyle}>
        <h3 style={{ color: '#000080', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>💎</span> Tax Deductions (Applicable only in Old Regime)
        </h3>
        <div style={gridStyle}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#000080', fontSize: '14px' }}>
              Section 80C (Max ₹1.5L)
            </label>
            <input
              type="number"
              name="section80C"
              placeholder="PPF, LIC, ELSS etc."
              value={inputs.section80C}
              onChange={handleChange}
            />
            <div style={{ fontSize: '12px', color: '#6C757D', marginTop: '4px' }}>
              PPF, LIC, ELSS, Home Loan Principal
            </div>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#000080', fontSize: '14px' }}>
              Section 80D (Max ₹25K-50K)
            </label>
            <input
              type="number"
              name="section80D"
              placeholder="Health insurance"
              value={inputs.section80D}
              onChange={handleChange}
            />
            <div style={{ fontSize: '12px', color: '#6C757D', marginTop: '4px' }}>
              Health Insurance Premium
            </div>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#000080', fontSize: '14px' }}>
              Section 80E (No limit)
            </label>
            <input
              type="number"
              name="section80E"
              placeholder="Education loan interest"
              value={inputs.section80E}
              onChange={handleChange}
            />
            <div style={{ fontSize: '12px', color: '#6C757D', marginTop: '4px' }}>
              Education Loan Interest
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <button 
          onClick={calculate}
          disabled={loading}
          className="btn-primary"
          style={{ flex: 1, fontSize: '16px', padding: '16px' }}
        >
          {loading ? '⏳ Calculating...' : '🧮 Calculate Tax'}
        </button>
        <button 
          onClick={compareRegimes}
          disabled={loading}
          className="btn-info"
          style={{ flex: 1, fontSize: '16px', padding: '16px' }}
        >
          {loading ? '⏳ Comparing...' : '⚖️ Compare Regimes'}
        </button>
      </div>

      {/* Single Result */}
      {result && (
        <div style={{
          ...cardStyle,
          borderTop: '4px solid #138808',
          background: 'linear-gradient(135deg, #E6F7E9 0%, #FFFFFF 100%)'
        }}>
          <h3 style={{ color: '#138808', marginBottom: '24px', fontSize: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>✅</span> Tax Calculation - {result.regime} Regime
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderLeft: '4px solid #FF9933' }}>
              <div style={{ fontSize: '13px', color: '#6C757D', marginBottom: '8px' }}>Gross Income</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#000080' }}>
                ₹{result.grossIncome?.toLocaleString()}
              </div>
            </div>
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderLeft: '4px solid #1A73E8' }}>
              <div style={{ fontSize: '13px', color: '#6C757D', marginBottom: '8px' }}>Taxable Income</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1A73E8' }}>
                ₹{result.taxableIncome?.toLocaleString()}
              </div>
            </div>
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderLeft: '4px solid #138808' }}>
              <div style={{ fontSize: '13px', color: '#6C757D', marginBottom: '8px' }}>Total Tax</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#138808' }}>
                ₹{result.totalTax?.toLocaleString()}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '24px', padding: '20px', background: 'white', borderRadius: '12px', fontSize: '14px', color: '#6C757D', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <strong style={{ color: '#000080' }}>📝 Tax Breakdown:</strong><br/>
            Slab Tax: ₹{result.slabTax?.toLocaleString()} + Surcharge: ₹{(result.surcharge || 0).toLocaleString()} + Cess: ₹{(result.cess || 0).toLocaleString()} - Rebate: ₹{(result.rebate || 0).toLocaleString()} = <strong style={{ color: '#138808' }}>Total: ₹{result.totalTax?.toLocaleString()}</strong>
          </div>
        </div>
      )}

      {/* Comparison Result */}
      {comparison && (
        <div style={{
          ...cardStyle,
          borderTop: '4px solid #FF9933',
          background: 'linear-gradient(135deg, #FFF4E6 0%, #FFFFFF 100%)'
        }}>
          <h3 style={{ color: '#FF9933', marginBottom: '24px', fontSize: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>⚖️</span> Regime Comparison
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: '2px solid #1A73E8' }}>
              <h4 style={{ color: '#1A73E8', marginBottom: '16px', fontSize: '20px' }}>🆕 New Regime</h4>
              <div style={{ fontSize: '14px', color: '#6C757D', marginBottom: '8px' }}>Total Tax</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1A73E8', marginBottom: '16px' }}>
                ₹{comparison.newRegime?.totalTax?.toLocaleString()}
              </div>
              <div style={{ fontSize: '13px', color: '#6C757D' }}>
                Taxable: ₹{comparison.newRegime?.taxableIncome?.toLocaleString()}
              </div>
            </div>

            <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: '2px solid #FF9933' }}>
              <h4 style={{ color: '#FF9933', marginBottom: '16px', fontSize: '20px' }}>📋 Old Regime</h4>
              <div style={{ fontSize: '14px', color: '#6C757D', marginBottom: '8px' }}>Total Tax</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#FF9933', marginBottom: '16px' }}>
                ₹{comparison.oldRegime?.totalTax?.toLocaleString()}
              </div>
              <div style={{ fontSize: '13px', color: '#6C757D' }}>
                Taxable: ₹{comparison.oldRegime?.taxableIncome?.toLocaleString()}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '24px', padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '16px', color: '#138808', fontWeight: 'bold', marginBottom: '8px' }}>
              💡 Recommendation: {comparison.recommendation}
            </div>
            <div style={{ fontSize: '14px', color: '#6C757D' }}>
              You save ₹{Math.abs(comparison.newRegime.totalTax - comparison.oldRegime.totalTax).toLocaleString()} with {comparison.recommendation.includes('New') ? 'New' : 'Old'} Regime
            </div>
          </div>
        </div>
      )}

      {/* Info Card */}
      <div style={{
        marginTop: '24px',
        padding: '24px',
        background: 'linear-gradient(135deg, #E6F7E9 0%, #FFF4E6 100%)',
        borderRadius: '12px',
        border: '2px solid #138808',
        fontSize: '14px',
        color: '#6C757D'
      }}>
        <strong style={{ color: '#138808', fontSize: '16px', display: 'block', marginBottom: '12px' }}>
          ℹ️ Important Notes:
        </strong>
        <ul style={{ margin: '0', paddingLeft: '20px' }}>
          <li>New Regime: Lower tax rates but no deductions (80C, 80D, HRA etc.)</li>
          <li>Old Regime: Higher tax rates but allows all deductions</li>
          <li>Rebate u/s 87A: Up to ₹12,500 for income below ₹7 lakhs</li>
          <li>Surcharge: 10-37% on high incomes (&gt;₹50 lakhs)</li>
          <li>All calculations are estimates. Consult a CA for accurate filing.</li>
        </ul>
      </div>
    </div>
  )
}

export default IncomeTaxCalculator
