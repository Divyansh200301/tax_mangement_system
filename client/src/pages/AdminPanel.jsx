import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function AdminPanel() {
  const [incomeTaxConfigs, setIncomeTaxConfigs] = useState([])
  const [gstConfigs, setGstConfigs] = useState([])
  const [activeTab, setActiveTab] = useState('income-tax')
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    fetchConfigs()
  }, [])

  const fetchConfigs = async () => {
    try {
      const [incomeTax, gst] = await Promise.all([
        axios.get(`${API_URL}/admin/income-tax-config`),
        axios.get(`${API_URL}/admin/gst-config`)
      ])
      setIncomeTaxConfigs(incomeTax.data)
      setGstConfigs(gst.data)
    } catch (err) {
      console.error(err)
      alert('Error loading configurations')
    } finally {
      setLoading(false)
    }
  }

  const toggleActive = async (id) => {
    try {
      await axios.patch(`${API_URL}/admin/income-tax-config/${id}/toggle`)
      fetchConfigs()
    } catch (err) {
      alert('Error toggling status')
    }
  }

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px'
  }

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '40px'
  }

  const titleStyle = {
    fontSize: '36px',
    background: 'linear-gradient(135deg, #FF9933 0%, #138808 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '8px'
  }

  const tabStyle = (isActive) => ({
    padding: '12px 24px',
    background: isActive ? 'linear-gradient(135deg, #FF9933, #138808)' : 'white',
    color: isActive ? 'white' : '#000080',
    border: isActive ? 'none' : '2px solid #FF9933',
    borderRadius: '8px',
    cursor: 'pointer',
    marginRight: '10px',
    fontWeight: '600',
    fontSize: '16px'
  })

  const cardStyle = {
    background: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    marginBottom: '20px',
    border: '2px solid #f0f0f0'
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>⚙️ Admin Panel</h1>
        <p style={{ fontSize: '16px', color: '#6C757D' }}>
          Manage dynamic tax configurations
        </p>
      </div>

      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <button onClick={() => setActiveTab('income-tax')} style={tabStyle(activeTab === 'income-tax')}>
          💰 Income Tax Config
        </button>
        <button onClick={() => setActiveTab('gst')} style={tabStyle(activeTab === 'gst')}>
          🧾 GST Config
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#6C757D' }}>
          Loading configurations...
        </div>
      ) : (
        <>
          {activeTab === 'income-tax' && (
            <div>
              <h2 style={{ color: '#000080', marginBottom: '20px' }}>Income Tax Configurations</h2>
              {incomeTaxConfigs.map((config) => (
                <div key={config._id} style={cardStyle}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <div>
                      <h3 style={{ color: '#FF9933', marginBottom: '5px' }}>
                        {config.regime} Regime - FY {config.financialYear}
                      </h3>
                      <span style={{
                        padding: '4px 12px',
                        background: config.isActive ? '#d4edda' : '#f8d7da',
                        color: config.isActive ? '#155724' : '#721c24',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {config.isActive ? '✓ Active' : '✗ Inactive'}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleActive(config._id)}
                      style={{
                        padding: '8px 16px',
                        background: config.isActive ? '#dc3545' : '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      {config.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>

                  <div style={{ fontSize: '14px', color: '#6C757D' }}>
                    <p><strong>Standard Deduction:</strong> ₹{config.standardDeduction?.toLocaleString('en-IN') || 0}</p>
                    <p><strong>Allows Deductions:</strong> {config.allowsDeductions ? 'Yes' : 'No'}</p>
                    <p><strong>Tax Slabs:</strong></p>
                    <ul style={{ marginLeft: '20px' }}>
                      {config.slabs?.map((slab, idx) => (
                        <li key={idx}>
                          Up to ₹{slab.upTo === Infinity ? '∞' : slab.upTo.toLocaleString('en-IN')} - {(slab.rate * 100)}%
                        </li>
                      ))}
                    </ul>
                    {config.rebate87A && (
                      <p><strong>Rebate u/s 87A:</strong> ₹{config.rebate87A.rebateAmount?.toLocaleString('en-IN')} (up to ₹{config.rebate87A.maxIncome?.toLocaleString('en-IN')})</p>
                    )}
                    <p style={{ fontSize: '12px', marginTop: '10px', color: '#999' }}>
                      Last Updated: {new Date(config.lastUpdated).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'gst' && (
            <div>
              <h2 style={{ color: '#000080', marginBottom: '20px' }}>GST Rate Configurations</h2>
              {gstConfigs.map((config) => (
                <div key={config._id} style={cardStyle}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ color: '#138808', margin: 0 }}>
                      {config.rate}% GST - {config.category}
                    </h3>
                    <span style={{
                      padding: '4px 12px',
                      background: config.isActive ? '#d4edda' : '#f8d7da',
                      color: config.isActive ? '#155724' : '#721c24',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {config.isActive ? '✓ Active' : '✗ Inactive'}
                    </span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#6C757D', marginBottom: '10px' }}>
                    {config.description}
                  </p>
                  <div style={{ fontSize: '13px', color: '#6C757D' }}>
                    <strong>Items:</strong> {config.items?.join(', ')}
                  </div>
                  <p style={{ fontSize: '12px', marginTop: '10px', color: '#999' }}>
                    Effective From: {new Date(config.effectiveFrom).toLocaleDateString('en-IN')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <div style={{
        marginTop: '40px',
        padding: '20px',
        background: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: '8px',
        fontSize: '14px',
        color: '#856404'
      }}>
        <strong>💡 Pro Tip:</strong> Tax configurations are now dynamic! Update them via API endpoints:
        <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
          <li>POST /api/admin/income-tax-config - Create new config</li>
          <li>PUT /api/admin/income-tax-config/:id - Update config</li>
          <li>PATCH /api/admin/income-tax-config/:id/toggle - Toggle active status</li>
        </ul>
      </div>
    </div>
  )
}

export default AdminPanel
