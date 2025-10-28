import React from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    animation: 'fadeIn 0.5s ease-in-out'
  }

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '50px'
  }

  const titleStyle = {
    fontSize: '42px',
    background: 'linear-gradient(135deg, #FF9933 0%, #138808 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '12px'
  }

  const subtitleStyle = {
    fontSize: '18px',
    color: '#6C757D',
    fontWeight: '400'
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    marginTop: '40px'
  }

  const cardStyle = {
    background: 'white',
    padding: '36px 28px',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    textAlign: 'center',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    border: '2px solid transparent',
    position: 'relative',
    overflow: 'hidden',
    display: 'block'
  }

  const iconStyle = {
    fontSize: '64px',
    marginBottom: '16px',
    display: 'block'
  }

  const cardTitleStyle = {
    color: '#000080',
    marginBottom: '12px',
    fontSize: '22px',
    fontWeight: '700'
  }

  const cardTextStyle = {
    color: '#6C757D',
    fontSize: '15px',
    lineHeight: '1.6'
  }

  const statsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    marginTop: '50px'
  }

  const statCardStyle = {
    background: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    borderTop: '4px solid',
    textAlign: 'center'
  }

  const features = [
    {
      icon: '🧾',
      title: 'GST Calculator',
      description: 'Calculate GST with dynamic rates for 100+ items. Instant CGST/SGST breakdown.',
      link: '/gst',
      color: '#FF9933'
    },
    {
      icon: '💰',
      title: 'Income Tax Calculator',
      description: 'Compare Old vs New tax regimes. All deductions included (80C, 80D, HRA).',
      link: '/income-tax',
      color: '#1A73E8'
    },
    {
      icon: '📚',
      title: 'Tax Resources',
      description: 'Access official government portals, tax deadlines, and filing guidelines.',
      link: '/resources',
      color: '#138808'
    }
  ]

  const stats = [
    { label: 'Tax Regimes', value: '2', icon: '⚖️', color: '#FF9933' },
    { label: 'GST Rates', value: '5', icon: '📊', color: '#1A73E8' },
    { label: 'Deductions', value: '10+', icon: '💼', color: '#138808' },
    { label: 'Official Portals', value: '11', icon: '🔗', color: '#FF9933' }
  ]

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>🇮🇳 KarSahayak Dashboard</h1>
        <p style={subtitleStyle}>
          Aapka Vishwasneey Tax Saathi | Automated Tax Management
        </p>
      </div>

      {/* Quick Actions for Tax Automation */}
      <div style={{
        marginBottom: '40px',
        padding: '24px',
        background: 'linear-gradient(135deg, #FFF4E6 0%, #E6F7E9 100%)',
        borderRadius: '16px',
        border: '2px solid #FF9933'
      }}>
        <h3 style={{ color: '#000080', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>⚡</span> Quick Tax Actions - Automate Your Filing
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <button
            onClick={() => window.location.href = '/income-tax'}
            style={{
              padding: '14px',
              background: 'linear-gradient(135deg, #FF9933, #FF7B00)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              boxShadow: '0 4px 12px rgba(255,153,51,0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-3px)'
              e.target.style.boxShadow = '0 6px 20px rgba(255,153,51,0.4)'
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 12px rgba(255,153,51,0.3)'
            }}
          >
            📊 Auto Tax Calculate
          </button>
          <button
            onClick={() => alert('Coming Soon: Pre-fill your ITR with salary data!')}
            style={{
              padding: '14px',
              background: 'linear-gradient(135deg, #1A73E8, #1557B0)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              boxShadow: '0 4px 12px rgba(26,115,232,0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-3px)'
              e.target.style.boxShadow = '0 6px 20px rgba(26,115,232,0.4)'
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 12px rgba(26,115,232,0.3)'
            }}
          >
            📄 Pre-fill ITR Data
          </button>
          <button
            onClick={() => window.location.href = '/gst'}
            style={{
              padding: '14px',
              background: 'linear-gradient(135deg, #138808, #0F6906)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              boxShadow: '0 4px 12px rgba(19,136,8,0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-3px)'
              e.target.style.boxShadow = '0 6px 20px rgba(19,136,8,0.4)'
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 12px rgba(19,136,8,0.3)'
            }}
          >
            🧾 Auto GST Filing
          </button>
          <button
            onClick={() => window.location.href = '/resources'}
            style={{
              padding: '14px',
              background: 'linear-gradient(135deg, #FF9933, #FF7B00)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              boxShadow: '0 4px 12px rgba(255,153,51,0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-3px)'
              e.target.style.boxShadow = '0 6px 20px rgba(255,153,51,0.4)'
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 12px rgba(255,153,51,0.3)'
            }}
          >
            ⏰ View Deadlines
          </button>
        </div>
        <p style={{ marginTop: '16px', fontSize: '13px', color: '#6C757D', textAlign: 'center' }}>
          💡 <strong>Automation Features:</strong> Upload Form-16, auto-calculate deductions, generate ITR JSON, and more!
        </p>
      </div>

      <div style={gridStyle}>
        {features.map((feature, idx) => (
          <Link 
            key={idx}
            to={feature.link} 
            style={cardStyle}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)'
              e.currentTarget.style.borderColor = feature.color
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'
              e.currentTarget.style.borderColor = 'transparent'
            }}
          >
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(90deg, ${feature.color}, transparent)`
              }}
            ></div>
            <span style={iconStyle}>{feature.icon}</span>
            <h3 style={cardTitleStyle}>{feature.title}</h3>
            <p style={cardTextStyle}>{feature.description}</p>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: '60px' }}>
        <h2 style={{ 
          textAlign: 'center', 
          color: '#000080', 
          marginBottom: '30px',
          fontSize: '28px'
        }}>
          📈 Platform Statistics
        </h2>
        <div style={statsContainerStyle}>
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              style={{ ...statCardStyle, borderTopColor: stat.color }}
              className="fade-in"
            >
              <div style={{ fontSize: '36px', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: stat.color, marginBottom: '4px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '15px', color: '#6C757D', fontWeight: '600' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        marginTop: '60px',
        padding: '32px',
        background: 'linear-gradient(135deg, #FFF4E6 0%, #E6F7E9 100%)',
        borderRadius: '16px',
        border: '2px solid #FF9933',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
        <h3 style={{ color: '#000080', marginBottom: '12px', fontSize: '24px' }}>
          Need Help? Chat with TaxMitra AI
        </h3>
        <p style={{ color: '#6C757D', fontSize: '16px', maxWidth: '600px', margin: '0 auto 20px' }}>
          Humare AI assistant se puchiye GST calculations, income tax queries, deadlines, aur bahut kuch. 
          Bilkul free! Right corner mein chat button click karein!
        </p>
        <div style={{ 
          display: 'inline-block',
          padding: '12px 24px',
          background: 'linear-gradient(135deg, #FF9933, #FF7B00)',
          color: 'white',
          borderRadius: '8px',
          fontWeight: '600',
          fontSize: '15px',
          cursor: 'pointer'
        }}>
          💬 Start Chatting Now
        </div>
      </div>
    </div>
  )
}

export default Dashboard
