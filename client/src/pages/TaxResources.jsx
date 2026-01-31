import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function TaxResources() {
  const [resources, setResources] = useState([])
  const [deadlines, setDeadlines] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [filter])

  const fetchData = async () => {
    setLoading(true)
    try {
      const resUrl = filter === 'all' ? '/resources/resources' : `/resources/resources?type=${filter}`
      const [resData, deadData] = await Promise.all([
        axios.get(API_URL + resUrl),
        axios.get(API_URL + '/resources/deadlines')
      ])
      setResources(resData.data)
      setDeadlines(deadData.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const types = [
    { value: 'all', label: '📚 All', color: '#1A73E8' },
    { value: 'income_tax', label: '💰 Income Tax', color: '#FF9933' },
    { value: 'gst', label: '🧾 GST', color: '#138808' },
    { value: 'tds', label: '📊 TDS', color: '#1A73E8' },
    { value: 'pan', label: '🆔 PAN', color: '#FF9933' },
    { value: 'challan', label: '💳 Challan', color: '#138808' },
    { value: 'refund', label: '💵 Refund', color: '#1A73E8' }
  ]

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
    borderTop: '4px solid #138808',
    marginBottom: '24px'
  }

  const filterButtonStyle = (type) => ({
    padding: '10px 20px',
    marginRight: '10px',
    marginBottom: '10px',
    background: filter === type.value ? `linear-gradient(135deg, ${type.color}, ${type.color}DD)` : 'white',
    color: filter === type.value ? 'white' : type.color,
    border: `2px solid ${type.color}`,
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '600',
    fontSize: '14px',
    boxShadow: filter === type.value ? `0 4px 12px ${type.color}40` : '0 2px 6px rgba(0,0,0,0.05)'
  })

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>📚 Tax Resources & Deadlines</h1>
        <p style={{ fontSize: '16px', color: '#6C757D' }}>
          Official government portals and important tax deadlines
        </p>
      </div>

      {/* Filters */}
      <div style={cardStyle}>
        <h3 style={{ color: '#000080', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🔍</span> Filter by Category
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {types.map(type => (
            <button
              key={type.value}
              onClick={() => setFilter(type.value)}
              style={filterButtonStyle(type)}
              onMouseOver={(e) => {
                if (filter !== type.value) {
                  e.target.style.background = type.color
                  e.target.style.color = 'white'
                }
              }}
              onMouseOut={(e) => {
                if (filter !== type.value) {
                  e.target.style.background = 'white'
                  e.target.style.color = type.color
                }
              }}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#6C757D' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
          <div>Loading resources...</div>
        </div>
      )}

      {/* Resources */}
      {!loading && (
        <div style={cardStyle}>
          <h3 style={{ color: '#000080', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🔗</span> Official Government Portals ({resources.length})
          </h3>
          
          {resources.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6C757D' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
              <div>No resources found for this category</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              {resources.map((resource, idx) => {
                const typeInfo = types.find(t => t.value === resource.type) || types[0]
                return (
                  <a
                    key={idx}
                    href={resource.officialUrl || resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'white',
                      padding: '24px',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      textDecoration: 'none',
                      border: `2px solid ${typeInfo.color}20`,
                      borderLeft: `4px solid ${typeInfo.color}`,
                      transition: 'all 0.3s ease',
                      display: 'block'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)'
                      e.currentTarget.style.boxShadow = `0 8px 16px ${typeInfo.color}30`
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)'
                    }}
                  >
                    <div style={{
                      display: 'inline-block',
                      padding: '6px 12px',
                      background: `${typeInfo.color}15`,
                      color: typeInfo.color,
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      marginBottom: '12px'
                    }}>
                      {typeInfo.label}
                    </div>
                    <h4 style={{ color: '#000080', marginBottom: '8px', fontSize: '18px' }}>
                      {resource.title}
                    </h4>
                    <p style={{ color: '#6C757D', fontSize: '14px', lineHeight: '1.6', marginBottom: '12px' }}>
                      {resource.description}
                    </p>
                    <div style={{ color: typeInfo.color, fontSize: '13px', fontWeight: '600' }}>
                      Visit Portal →
                    </div>
                  </a>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Deadlines */}
      {!loading && deadlines.length > 0 && (
        <div style={{ ...cardStyle, borderTop: '4px solid #FF9933' }}>
          <h3 style={{ color: '#FF9933', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📅</span> Upcoming Tax Deadlines
          </h3>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'separate',
              borderSpacing: '0 12px'
            }}>
              <thead>
                <tr style={{ background: '#F8F9FA' }}>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#000080', fontWeight: '700', fontSize: '14px', borderRadius: '8px 0 0 8px' }}>
                    Date
                  </th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#000080', fontWeight: '700', fontSize: '14px' }}>
                    Type
                  </th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#000080', fontWeight: '700', fontSize: '14px' }}>
                    Description
                  </th>
                  <th style={{ padding: '16px', textAlign: 'left', color: '#000080', fontWeight: '700', fontSize: '14px', borderRadius: '0 8px 8px 0' }}>
                    Penalty
                  </th>
                </tr>
              </thead>
              <tbody>
                {deadlines.map((deadline, idx) => (
                  <tr key={idx} style={{
                    background: 'white',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateX(4px)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)'
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.05)'
                  }}
                  >
                    <td style={{ padding: '16px', fontWeight: '600', color: '#FF9933', borderRadius: '8px 0 0 8px' }}>
                      📆 {new Date(deadline.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        padding: '4px 12px',
                        background: '#E6F7E9',
                        color: '#138808',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {deadline.type}
                      </span>
                    </td>
                    <td style={{ padding: '16px', color: '#212529' }}>
                      {deadline.description}
                    </td>
                    <td style={{ padding: '16px', color: '#c62828', fontSize: '14px', borderRadius: '0 8px 8px 0' }}>
                      {deadline.penalty || 'Late fee applicable'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Info Card */}
      <div style={{
        padding: '24px',
        background: 'linear-gradient(135deg, #FFF4E6 0%, #E6F7E9 100%)',
        borderRadius: '12px',
        border: '2px solid #FF9933',
        fontSize: '14px',
        color: '#6C757D'
      }}>
        <strong style={{ color: '#138808', fontSize: '16px', display: 'block', marginBottom: '12px' }}>
          ℹ️ Important Information:
        </strong>
        <ul style={{ margin: '0', paddingLeft: '20px' }}>
          <li>All links direct to official government websites</li>
          <li>Bookmark important portals for quick access during tax filing</li>
          <li>Deadlines are for FY 2024-25 (AY 2025-26)</li>
          <li>Always verify the latest due dates on official portals</li>
          <li>Late filing may result in penalties and interest charges</li>
        </ul>
      </div>
    </div>
  )
}

export default TaxResources
