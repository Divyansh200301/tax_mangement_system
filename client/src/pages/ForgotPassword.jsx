import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resetUrl, setResetUrl] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')
    setResetUrl('')

    try {
      const res = await axios.post(`${API_URL}/auth/forgot-password`, { email })
      setMessage(res.data.msg)
      // In development, show the reset URL
      if (res.data.resetUrl) {
        setResetUrl(res.data.resetUrl)
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #FF9933 0%, #FFFFFF 50%, #138808 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px'
  }

  const formBoxStyle = {
    background: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    maxWidth: '450px',
    width: '100%'
  }

  const titleStyle = {
    color: '#000080',
    fontSize: '28px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '10px'
  }

  const subtitleStyle = {
    color: '#666',
    fontSize: '14px',
    textAlign: 'center',
    marginBottom: '30px'
  }

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    marginBottom: '20px',
    outline: 'none',
    transition: 'border-color 0.3s'
  }

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    background: loading ? '#ccc' : 'linear-gradient(135deg, #FF9933, #FF6633)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s',
    marginBottom: '15px'
  }

  const linkStyle = {
    textAlign: 'center',
    color: '#000080',
    fontSize: '14px',
    marginTop: '15px'
  }

  const messageStyle = {
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center'
  }

  return (
    <div style={containerStyle}>
      <div style={formBoxStyle}>
        <h1 style={titleStyle}>🔐 Forgot Password</h1>
        <p style={subtitleStyle}>
          Enter your email address and we'll send you a link to reset your password.
        </p>

        {message && (
          <div style={{ ...messageStyle, background: '#d4edda', color: '#155724' }}>
            {message}
          </div>
        )}

        {error && (
          <div style={{ ...messageStyle, background: '#f8d7da', color: '#721c24' }}>
            {error}
          </div>
        )}

        {resetUrl && (
          <div style={{ 
            ...messageStyle, 
            background: '#fff3cd', 
            color: '#856404',
            fontSize: '12px',
            wordBreak: 'break-all'
          }}>
            <strong>Dev Mode:</strong> <a href={resetUrl} style={{ color: '#000080' }}>Click here to reset</a>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
            disabled={loading}
          />

          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div style={linkStyle}>
          Remember your password? <Link to="/login" style={{ color: '#FF9933', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
