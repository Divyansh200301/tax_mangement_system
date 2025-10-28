import React, { useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function Login({ setToken }) {
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const endpoint = isRegister ? '/auth/register' : '/auth/login'
      const payload = isRegister ? { name, email, password } : { email, password }
      const res = await axios.post(API_URL + endpoint, payload)
      localStorage.setItem('token', res.data.token)
      setToken(res.data.token)
      // Force navigation to dashboard
      window.location.href = '/dashboard'
    } catch (err) {
      setError(err.response?.data?.msg || 'Error occurred')
    } finally {
      setLoading(false)
    }
  }

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #FFF4E6 0%, #FFFFFF 50%, #E6F7E9 100%)',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden'
  }

  const ashokaChakraStyle = {
    position: 'absolute',
    width: '400px',
    height: '400px',
    opacity: 0.05,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='48' fill='none' stroke='%23000080' stroke-width='1'/%3E%3Ccircle cx='50' cy='50' r='42' fill='none' stroke='%23000080' stroke-width='0.5'/%3E%3Ccircle cx='50' cy='50' r='20' fill='none' stroke='%23000080' stroke-width='1'/%3E%3Ccircle cx='50' cy='50' r='3' fill='%23000080'/%3E%3Cg%3E%3Cline x1='50' y1='2' x2='50' y2='20' stroke='%23000080' stroke-width='1'/%3E%3Cline x1='50' y1='80' x2='50' y2='98' stroke='%23000080' stroke-width='1'/%3E%3Cline x1='2' y1='50' x2='20' y2='50' stroke='%23000080' stroke-width='1'/%3E%3Cline x1='80' y1='50' x2='98' y2='50' stroke='%23000080' stroke-width='1'/%3E%3C/g%3E%3C/svg%3E")`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  }

  const cardStyle = {
    maxWidth: '450px',
    width: '100%',
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
    overflow: 'hidden',
    animation: 'fadeIn 0.5s ease-in-out',
    zIndex: 1
  }

  const headerStyle = {
    background: 'linear-gradient(135deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)',
    padding: '40px 30px',
    textAlign: 'center'
  }

  const logoStyle = {
    fontSize: '48px',
    marginBottom: '12px'
  }

  const titleStyle = {
    color: 'white',
    fontSize: '28px',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    marginBottom: '8px'
  }

  const subtitleStyle = {
    color: 'white',
    fontSize: '14px',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
  }

  const formContainerStyle = {
    padding: '40px 30px'
  }

  return (
    <div style={containerStyle}>
      {/* Ashoka Chakra Decorative Elements */}
      <div style={{ ...ashokaChakraStyle, top: '-100px', left: '-50px', transform: 'rotate(45deg)' }}></div>
      <div style={{ ...ashokaChakraStyle, bottom: '-100px', right: '-50px', transform: 'rotate(-30deg)' }}></div>

      <div style={cardStyle}>
        <div style={headerStyle}>
          <div style={logoStyle}>🇮🇳</div>
          <h1 style={titleStyle}>KarSahayak</h1>
          <p style={subtitleStyle}>Aapka Vishwasneey Tax Saathi</p>
        </div>

        <div style={formContainerStyle}>
          <h2 style={{ 
            textAlign: 'center', 
            marginBottom: '30px', 
            color: '#000080',
            fontSize: '24px'
          }}>
            {isRegister ? '🎉 Create Account' : '👋 Welcome Back'}
          </h2>

          {error && (
            <div style={{
              background: '#ffebee',
              color: '#c62828',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '14px',
              border: '1px solid #ef5350'
            }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {isRegister && (
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#000080', fontSize: '14px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#000080', fontSize: '14px' }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#000080', fontSize: '14px' }}>
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', marginTop: '10px', fontSize: '16px', padding: '14px' }}
            >
              {loading ? '⏳ Processing...' : (isRegister ? '🚀 Register' : '🔐 Login')}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#6C757D' }}>
            {isRegister ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => {
                setIsRegister(!isRegister)
                setError('')
              }}
              style={{
                background: 'transparent',
                color: '#1A73E8',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                marginLeft: '5px',
                textDecoration: 'underline',
                padding: '0',
                boxShadow: 'none'
              }}
            >
              {isRegister ? 'Login here' : 'Register here'}
            </button>
          </p>

          {!isRegister && (
            <div style={{
              marginTop: '30px',
              padding: '16px',
              background: '#FFF4E6',
              borderRadius: '8px',
              border: '1px solid #FF9933',
              fontSize: '13px',
              color: '#6C757D'
            }}>
              <p style={{ margin: 0, fontWeight: '600', color: '#FF9933', marginBottom: '6px' }}>
                🔒 Secure Login
              </p>
              <p style={{ margin: 0 }}>
                Your data is protected with industry-standard encryption.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
