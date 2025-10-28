import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function GSTCalculator() {
  const [amount, setAmount] = useState('')
  const [gstRate, setGstRate] = useState('18')
  const [gstRates, setGstRates] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchGSTRates()
  }, [])

  const fetchGSTRates = async () => {
    try {
      const res = await axios.get(API_URL + '/gst/rates')
      setGstRates(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const calculate = async () => {
    if (!amount) {
      alert('Please enter an amount')
      return
    }
    setLoading(true)
    try {
      const res = await axios.post(API_URL + '/gst/calculate', { 
        amount: Number(amount), 
        gstRate: Number(gstRate) 
      })
      setResult(res.data)
    } catch (err) {
      console.error(err)
      alert('Error calculating GST')
    } finally {
      setLoading(false)
    }
  }

  const searchItem = async () => {
    if (!searchTerm) return
    setLoading(true)
    try {
      const res = await axios.get(API_URL + `/gst/search?query=${searchTerm}`)
      if (res.data.length > 0) {
        setGstRate(res.data[0].rate.toString())
        alert(`Found! GST Rate: ${res.data[0].rate}% for ${res.data[0].category}`)
      } else {
        alert('Item not found. Please select rate manually.')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const containerStyle = {
    maxWidth: '1000px',
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
    borderTop: '4px solid #FF9933',
    marginBottom: '24px'
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '24px'
  }

  const rateButtonStyle = (rate) => ({
    padding: '16px',
    background: gstRate === rate.toString() ? 'linear-gradient(135deg, #1A73E8, #1557B0)' : 'white',
    color: gstRate === rate.toString() ? 'white' : '#000080',
    border: `2px solid ${gstRate === rate.toString() ? '#1A73E8' : '#E0E0E0'}`,
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '600',
    fontSize: '16px',
    boxShadow: gstRate === rate.toString() ? '0 4px 12px rgba(26, 115, 232, 0.3)' : '0 2px 6px rgba(0,0,0,0.05)'
  })

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>🧾 GST Calculator</h1>
        <p style={{ fontSize: '16px', color: '#6C757D' }}>
          Calculate GST with dynamic rates for 100+ items
        </p>
      </div>

      {/* Quick Search */}
      <div style={cardStyle}>
        <h3 style={{ color: '#000080', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🔍</span> Search Item for GST Rate
        </h3>
        <div style={{ display: 'flex', gap: '12px' }}>
          <input
            type="text"
            placeholder="Search (e.g., mobile phone, rice, medicine...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchItem()}
            style={{ flex: 1, marginBottom: 0 }}
          />
          <button 
            onClick={searchItem}
            disabled={loading || !searchTerm}
            className="btn-info"
            style={{ minWidth: '120px', marginBottom: 0 }}
          >
            {loading ? '⏳ Searching...' : '🔍 Search'}
          </button>
        </div>
      </div>

      {/* Rate Selection */}
      <div style={cardStyle}>
        <h3 style={{ color: '#000080', marginBottom: '20px' }}>Select GST Rate</h3>
        <div style={gridStyle}>
          {[0, 5, 12, 18, 28].map(rate => {
            const category = gstRates.find(r => r.rate === rate)
            return (
              <button
                key={rate}
                onClick={() => setGstRate(rate.toString())}
                style={rateButtonStyle(rate)}
                onMouseOver={(e) => {
                  if (gstRate !== rate.toString()) {
                    e.target.style.borderColor = '#1A73E8'
                    e.target.style.transform = 'translateY(-2px)'
                  }
                }}
                onMouseOut={(e) => {
                  if (gstRate !== rate.toString()) {
                    e.target.style.borderColor = '#E0E0E0'
                    e.target.style.transform = 'translateY(0)'
                  }
                }}
              >
                <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
                  {rate}%
                </div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>
                  {category ? category.category : `${rate}% GST`}
                </div>
              </button>
            )
          })}
        </div>

        {gstRates.length > 0 && (
          <div style={{ 
            marginTop: '20px', 
            padding: '16px', 
            background: '#FFF4E6', 
            borderRadius: '8px',
            fontSize: '13px'
          }}>
            <strong style={{ color: '#FF9933' }}>Examples:</strong>
            {gstRates.filter(r => r.rate === Number(gstRate)).map((rate, idx) => (
              <div key={idx} style={{ marginTop: '8px', color: '#6C757D' }}>
                • <strong>{rate.rate}%</strong>: {rate.items.slice(0, 5).join(', ')}
                {rate.items.length > 5 && `... (+${rate.items.length - 5} more)`}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Calculator */}
      <div style={cardStyle}>
        <h3 style={{ color: '#000080', marginBottom: '20px' }}>💰 Calculate GST Amount</h3>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#000080' }}>
            Base Amount (₹)
          </label>
          <input
            type="number"
            placeholder="Enter base amount (e.g., 10000)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ width: '100%', fontSize: '18px', padding: '16px' }}
          />
        </div>

        <button 
          onClick={calculate}
          disabled={loading || !amount}
          className="btn-primary"
          style={{ width: '100%', fontSize: '18px', padding: '16px', marginTop: '20px' }}
        >
          {loading ? '⏳ Calculating...' : '🧮 Calculate GST'}
        </button>
      </div>

      {/* Result */}
      {result && (
        <div style={{
          ...cardStyle,
          borderTop: '4px solid #138808',
          background: 'linear-gradient(135deg, #E6F7E9 0%, #FFFFFF 100%)'
        }}>
          <h3 style={{ color: '#138808', marginBottom: '24px', fontSize: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>✅</span> GST Calculation Result
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{ 
              background: 'white', 
              padding: '20px', 
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              borderLeft: '4px solid #FF9933'
            }}>
              <div style={{ fontSize: '13px', color: '#6C757D', marginBottom: '8px' }}>Base Amount</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#000080' }}>
                ₹{result.baseAmount?.toLocaleString()}
              </div>
            </div>

            <div style={{ 
              background: 'white', 
              padding: '20px', 
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              borderLeft: '4px solid #1A73E8'
            }}>
              <div style={{ fontSize: '13px', color: '#6C757D', marginBottom: '8px' }}>CGST ({result.gstRate / 2}%)</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1A73E8' }}>
                ₹{result.cgst?.toLocaleString()}
              </div>
            </div>

            <div style={{ 
              background: 'white', 
              padding: '20px', 
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              borderLeft: '4px solid #1A73E8'
            }}>
              <div style={{ fontSize: '13px', color: '#6C757D', marginBottom: '8px' }}>SGST ({result.gstRate / 2}%)</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1A73E8' }}>
                ₹{result.sgst?.toLocaleString()}
              </div>
            </div>

            <div style={{ 
              background: 'white', 
              padding: '20px', 
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              borderLeft: '4px solid #138808'
            }}>
              <div style={{ fontSize: '13px', color: '#6C757D', marginBottom: '8px' }}>Total Amount</div>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#138808' }}>
                ₹{result.totalAmount?.toLocaleString()}
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '24px',
            padding: '20px',
            background: 'white',
            borderRadius: '12px',
            fontSize: '15px',
            color: '#6C757D',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <strong style={{ color: '#000080' }}>📝 Breakdown:</strong><br/>
            Base Amount: ₹{result.baseAmount?.toLocaleString()} + CGST: ₹{result.cgst?.toLocaleString()} + SGST: ₹{result.sgst?.toLocaleString()} = <strong style={{ color: '#138808' }}>Total: ₹{result.totalAmount?.toLocaleString()}</strong>
          </div>
        </div>
      )}
    </div>
  )
}

export default GSTCalculator
