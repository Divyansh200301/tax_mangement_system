import React, { useState, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'

// Lazy load components for better performance
const Login = lazy(() => import('./pages/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const GSTCalculator = lazy(() => import('./pages/GSTCalculator'))
const IncomeTaxCalculator = lazy(() => import('./pages/IncomeTaxCalculator'))
const TaxResources = lazy(() => import('./pages/TaxResources'))
const Chatbot = lazy(() => import('./components/Chatbot'))

// Loading component
function LoadingFallback() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)',
    }}>
      <div style={{
        textAlign: 'center',
        color: '#000080',
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
        🇮🇳 Loading KarSahayak...
      </div>
    </div>
  )
}

function Navigation({ onLogout }) {
  const location = useLocation()

  const navStyle = {
    background: '#FF9933',
    padding: '0',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    borderBottom: '1px solid rgba(255,255,255,0.2)'
  }

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px'
  }

  const logoStyle = {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 0'
  }

  const linksStyle = {
    display: 'flex',
    gap: '0',
    listStyle: 'none',
    margin: 0,
    padding: 0
  }

  const linkItemStyle = (isActive) => ({
    color: 'white',
    textDecoration: 'none',
    padding: '20px 20px',
    fontWeight: '600',
    fontSize: '15px',
    transition: 'all 0.3s ease',
    borderBottom: isActive ? '3px solid white' : '3px solid transparent',
    background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
    display: 'block'
  })

  const logoutStyle = {
    background: 'white',
    color: '#FF9933',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: '14px',
    boxShadow: 'none'
  }

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        <Link to="/dashboard" style={logoStyle}>
          <span style={{ fontSize: '28px' }}>🇮🇳</span>
          <span>KarSahayak</span>
        </Link>
        <ul style={linksStyle}>
          <li>
            <Link to="/dashboard" style={linkItemStyle(location.pathname === '/dashboard')}>
              📊 Dashboard
            </Link>
          </li>
          <li>
            <Link to="/gst" style={linkItemStyle(location.pathname === '/gst')}>
              🧾 GST Calculator
            </Link>
          </li>
          <li>
            <Link to="/income-tax" style={linkItemStyle(location.pathname === '/income-tax')}>
              💰 Income Tax
            </Link>
          </li>
          <li>
            <Link to="/resources" style={linkItemStyle(location.pathname === '/resources')}>
              📚 Resources
            </Link>
          </li>
        </ul>
        <button 
          onClick={onLogout}
          style={logoutStyle}
          onMouseOver={(e) => {
            e.target.style.background = '#138808'
            e.target.style.color = 'white'
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'white'
            e.target.style.color = '#FF9933'
          }}
        >
          Logout 🚪
        </button>
      </div>
    </nav>
  )
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <BrowserRouter>
      <div className="chakra-watermark"></div>
      <div style={{ minHeight: '100vh' }}>
        {token && <Navigation onLogout={handleLogout} />}
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/gst" element={token ? <GSTCalculator /> : <Navigate to="/login" />} />
            <Route path="/income-tax" element={token ? <IncomeTaxCalculator /> : <Navigate to="/login" />} />
            <Route path="/resources" element={token ? <TaxResources /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
          </Routes>
        </Suspense>
        {token && (
          <Suspense fallback={null}>
            <Chatbot />
          </Suspense>
        )}
      </div>
      <footer style={{
        background: '#138808',
        color: 'white',
        textAlign: 'center',
        padding: '24px 20px',
        marginTop: '60px',
        borderTop: '3px solid #FF9933'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ fontSize: '16px', marginBottom: '8px', fontWeight: '600' }}>
            🇮🇳 KarSahayak - Aapka Vishwasneey Tax Saathi
          </p>
          <p style={{ fontSize: '13px', opacity: 0.9 }}>
            © 2025 | For informational purposes only. Professional tax advice recommended.
          </p>
        </div>
      </footer>
    </BrowserRouter>
  )
}

export default App
