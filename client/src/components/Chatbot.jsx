import React, { useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ 
    sender: 'bot', 
    text: "Namaste! 🙏 Main TaxMitra hoon, aapka AI tax assistant.\n\n✨ Mujhse puchiye:\n• GST calculation\n• Income tax estimate\n• Tax deadlines\n• Sarkari portals\n\nExample: 'calculate gst 5000 18' ya 'tax on 800000'" 
  }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMsg = { sender: 'user', text: input }
    setMessages([...messages, userMsg])
    const currentInput = input
    setInput('')
    setLoading(true)

    try {
      const res = await axios.post(API_URL + '/chatbot/query', { message: currentInput })
      setMessages((prev) => [...prev, { sender: 'bot', text: res.data.reply }])
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'bot', text: '❌ Error connecting to chatbot. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  const quickQuestions = [
    'Calculate GST on 10000',
    'Tax on salary 1200000',
    'When is ITR due?',
    'GST rates'
  ]

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      {open && (
        <div style={{ width: '380px', height: '550px', background: 'white', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)', color: 'white', padding: '15px', borderRadius: '12px 12px 0 0', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '16px' }}>SomeUnique 🇮🇳</div>
              <div style={{ fontSize: '11px', opacity: 0.9 }}>Tax Assistant</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'transparent', color: 'white', border: 'none', fontSize: '20px', cursor: 'pointer', padding: '0', width: '30px', height: '30px' }}>✕</button>
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '15px', background: '#f8f9fa' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ marginBottom: '12px', display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ 
                  maxWidth: '80%', 
                  padding: '10px 14px', 
                  borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: msg.sender === 'user' ? '#007bff' : 'white',
                  color: msg.sender === 'user' ? 'white' : '#333',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-wrap',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ textAlign: 'center', color: '#666', fontSize: '14px' }}>
                <span style={{ animation: 'pulse 1.5s infinite' }}>Thinking...</span>
              </div>
            )}
          </div>

          {messages.length === 1 && (
            <div style={{ padding: '10px 15px', borderTop: '1px solid #e0e0e0', background: 'white' }}>
              <div style={{ fontSize: '11px', color: '#666', marginBottom: '8px', fontWeight: '500' }}>Quick questions:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {quickQuestions.map((q, idx) => (
                  <button 
                    key={idx}
                    onClick={() => { setInput(q); setTimeout(sendMessage, 100) }}
                    style={{ 
                      padding: '6px 10px', 
                      fontSize: '11px', 
                      background: '#e7f3ff', 
                      border: '1px solid #007bff',
                      color: '#007bff',
                      borderRadius: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div style={{ padding: '12px 15px', borderTop: '1px solid #e0e0e0', background: 'white', borderRadius: '0 0 12px 12px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                placeholder="Ask about tax, GST, deadlines..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !loading && sendMessage()}
                disabled={loading}
                style={{ 
                  flex: 1, 
                  padding: '10px 14px', 
                  border: '1px solid #ddd', 
                  borderRadius: '20px', 
                  fontSize: '14px',
                  marginBottom: 0,
                  outline: 'none'
                }}
              />
              <button 
                onClick={sendMessage} 
                disabled={loading || !input.trim()}
                style={{ 
                  width: '45px', 
                  height: '40px',
                  borderRadius: '50%',
                  background: loading || !input.trim() ? '#ccc' : '#007bff',
                  color: 'white',
                  border: 'none',
                  fontSize: '18px',
                  cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {loading ? '⏳' : '📤'}
              </button>
            </div>
          </div>
        </div>
      )}
      {!open && (
        <button 
          onClick={() => setOpen(true)} 
          style={{ 
            width: '65px', 
            height: '65px', 
            borderRadius: '50%', 
            fontSize: '28px',
            background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
            color: 'white',
            border: 'none',
            boxShadow: '0 4px 12px rgba(0,123,255,0.4)',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          💬
        </button>
      )}
    </div>
  )
}

export default Chatbot
