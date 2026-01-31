import React, { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      const res = await axios.post(`${API_URL}/auth/reset-password/${token}`, { password })
      setMessage(res.data.msg)
      setTimeout(() => navigate('/login'), 3000)
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
    marginBottom: '15px',
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
    marginTop: '10px'
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
        <h1 style={titleStyle}>🔑 Reset Password</h1>
        <p style={subtitleStyle}>
          Enter your new password below.
        </p>

        {message && (
          <div style={{ ...messageStyle, background: '#d4edda', color: '#155724' }}>
            {message}
            <br />
            <small>Redirecting to login...</small>
          </div>
        )}

        {error && (
          <div style={{ ...messageStyle, background: '#f8d7da', color: '#721c24' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
            disabled={loading}
            minLength="6"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={inputStyle}
            required
            disabled={loading}
            minLength="6"
          />

          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <div style={linkStyle}>
          Remember your password? <Link to="/login" style={{ color: '#FF9933', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
