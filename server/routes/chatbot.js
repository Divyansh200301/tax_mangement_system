const express = require('express');
const axios = require('axios');
const router = express.Router();

// System prompt for tax assistant
const SYSTEM_CONTEXT = `You are TaxMitra, an expert Indian tax assistant chatbot. You help users with:
- GST calculations and rates
- Income tax calculations (Old & New regime)
- Tax filing deadlines and procedures
- Deductions under various sections (80C, 80D, etc.)
- Official government portal links

You can speak in Hindi-English mix (Hinglish) when appropriate for better connection with Indian users.
Provide accurate, concise answers. Always remind users to consult a CA for final decisions.
Use Indian numbering (lakhs/crores) and ₹ symbol.`;

// Chatbot endpoint: /api/chatbot/query
// Body: { message: string }
router.post('/query', async (req, res) => {
  const { message } = req.body || {};
  if (!message) return res.status(400).json({ msg: 'message required' });

  const apiKey = process.env.GEMINI_API_KEY;
  
  // Try Gemini API if key is configured
  if (apiKey && apiKey !== 'your_gemini_api_key_here') {
    try {
      // Google Gemini API - trying gemini-1.5-flash-latest
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`;
      
      const resp = await axios.post(url, {
        contents: [{
          parts: [{
            text: `${SYSTEM_CONTEXT}\n\nUser: ${message}\nTaxMitra:`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        }
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000
      });

      const reply = resp.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, no reply from Gemini';
      return res.json({ reply: reply.trim() });
    } catch (err) {
      console.error('Gemini API error:', err.response?.data || err.message);
      // Fall through to rule-based system
    }
  }

  // Enhanced rule-based fallback for Indian tax queries
  const msg = message.toLowerCase();
  let reply = "Namaste! 🙏 Main TaxMitra hoon, aapka tax assistant! 🇮🇳\n\nI can help with:\n• GST calculations: 'calculate gst 1000 18'\n• Income tax: 'tax for salary 800000'\n• Tax deadlines: 'when is income tax due'\n• Official links: 'income tax portal'\n• GST rates: 'what is gst on mobile'";

  // GST calculations
  if (msg.includes('gst') && (msg.includes('calculate') || msg.includes('compute') || /\d/.test(msg))) {
    const nums = msg.match(/\d+/g)?.map(Number) || [];
    if (nums.length >= 1) {
      const amount = nums[0];
      const rate = nums[1] || 18;
      const gst = (amount * rate) / 100;
      const cgst = gst / 2;
      const sgst = gst / 2;
      reply = `💰 GST Calculation:\n\nBase Amount: ₹${amount.toLocaleString('en-IN')}\nGST Rate: ${rate}%\n\nCGST (${rate/2}%): ₹${cgst.toFixed(2)}\nSGST (${rate/2}%): ₹${sgst.toFixed(2)}\nTotal GST: ₹${gst.toFixed(2)}\n\n✅ Final Amount: ₹${(amount+gst).toLocaleString('en-IN')}`;
    }
  }
  
  // Income tax calculations
  else if ((msg.includes('tax') || msg.includes('income')) && /\d/.test(msg)) {
    const nums = msg.match(/\d+/g)?.map(Number) || [];
    if (nums.length >= 1) {
      const salary = nums[0];
      const deductions = nums[1] || 0;
      const income = Math.max(0, salary - deductions);
      
      let tax = 0;
      if (income > 300000) {
        if (income <= 600000) tax = (income-300000)*0.05;
        else if (income <= 900000) tax = (300000)*0.05 + (income-600000)*0.1;
        else if (income <= 1200000) tax = (300000)*0.05 + (300000)*0.1 + (income-900000)*0.15;
        else if (income <= 1500000) tax = (300000)*0.05 + (300000)*0.1 + (300000)*0.15 + (income-1200000)*0.2;
        else tax = (300000)*0.05 + (300000)*0.1 + (300000)*0.15 + (300000)*0.2 + (income-1500000)*0.3;
      }
      
      const cess = tax * 0.04;
      const total = tax + cess;
      
      reply = `💰 Income Tax (New Regime - FY 2024-25):\n\nGross Income: ₹${salary.toLocaleString('en-IN')}\nDeductions: ₹${deductions.toLocaleString('en-IN')}\nTaxable Income: ₹${income.toLocaleString('en-IN')}\n\nIncome Tax: ₹${Math.round(tax).toLocaleString('en-IN')}\nCess (4%): ₹${Math.round(cess).toLocaleString('en-IN')}\n\n✅ Total Tax: ₹${Math.round(total).toLocaleString('en-IN')}\n\n💡 Tip: Use our Income Tax Calculator for regime comparison!`;
    }
  }
  
  // GST rates inquiry
  else if (msg.includes('gst') && (msg.includes('rate') || msg.includes('what') || msg.includes('how much'))) {
    if (msg.includes('mobile') || msg.includes('phone')) {
      reply = "📱 Mobile Phones GST: 12% (for phones under ₹15,000) or 18% (for premium phones)\n\nCGST: 6-9% | SGST: 6-9%";
    } else if (msg.includes('food') || msg.includes('restaurant')) {
      reply = "🍽️ Restaurant GST:\n• Non-AC: 5%\n• AC Restaurant: 18%\n• 5-star hotel: 18%";
    } else if (msg.includes('car') || msg.includes('vehicle')) {
      reply = "🚗 Automobile GST:\n• Small cars (<1200cc): 28%\n• Large cars: 28%\n• EVs: 5-12%\n• Two-wheelers: 28%";
    } else {
      reply = "📊 GST Rates in India:\n\n0%: Essential food items\n5%: Sugar, tea, coffee, edible oils\n12%: Computers, processed foods\n18%: Most goods & services (default)\n28%: Luxury items, cars, cigarettes\n\nUse our GST Calculator to search specific items!";
    }
  }
  
  // Tax deadlines
  else if (msg.includes('deadline') || msg.includes('due') || msg.includes('when')) {
    if (msg.includes('income') || msg.includes('itr')) {
      reply = "📅 Income Tax Filing Deadlines (FY 2024-25):\n\n• ITR (individuals): July 31, 2025\n• ITR (audit cases): October 31, 2025\n• Advance Tax Q4: March 15, 2025\n\n⚠️ Late filing: Penalty up to ₹5,000\n\nCheck Tax Resources page for complete list!";
    } else if (msg.includes('gst')) {
      reply = "📅 GST Filing Deadlines:\n\n• GSTR-1: 11th of next month\n• GSTR-3B: 20th of next month\n• GSTR-9 (Annual): Dec 31\n\n⚠️ Late fee: ₹50/day (CGST) + ₹50/day (SGST)\n\nVisit Tax Resources for official portal link!";
    } else {
      reply = "📅 Important Tax Deadlines:\n\n🔹 Income Tax: July 31\n🔹 GST Returns: Monthly (11th & 20th)\n🔹 Advance Tax: Quarterly\n🔹 TDS Returns: Quarterly\n\nCheck our Tax Resources page for complete calendar!";
    }
  }
  
  // Official portals
  else if (msg.includes('portal') || msg.includes('link') || msg.includes('website') || msg.includes('official')) {
    if (msg.includes('income') || msg.includes('itr')) {
      reply = "🔗 Income Tax e-Filing Portal:\nhttps://www.incometax.gov.in/iec/foportal\n\nOther useful links:\n• Form 26AS: Income tax portal\n• PAN Services: NSDL\n• Tax Payment: NSDL e-payment\n\nVisit our Tax Resources page for all official links!";
    } else if (msg.includes('gst')) {
      reply = "🔗 GST Portal:\nhttps://www.gst.gov.in/\n\nFeatures:\n• GST Registration\n• File Returns (GSTR-1, 3B)\n• Download certificates\n• Track refunds\n\nCheck Tax Resources page for more links!";
    } else {
      reply = "🔗 Official Tax Portals:\n\n✅ Income Tax: incometax.gov.in\n✅ GST: gst.gov.in\n✅ PAN: onlineservices.nsdl.com\n✅ TDS: tdscpc.gov.in\n\nVisit our Tax Resources page for complete list with descriptions!";
    }
  }
  
  // Deductions
  else if (msg.includes('deduction') || msg.includes('80c') || msg.includes('save tax')) {
    reply = "💰 Tax Saving Deductions:\n\n🔹 Section 80C (Max ₹1.5L):\nPPF, ELSS, LIC, EPF, Home Loan Principal\n\n🔹 Section 80D (Max ₹25K-50K):\nMedical Insurance\n\n🔹 Section 80CCD(1B) (Max ₹50K):\nNPS (additional)\n\n🔹 Section 80E:\nEducation Loan Interest (No limit)\n\n💡 Available in Old Regime only!\nUse our Income Tax Calculator to compare regimes.";
  }
  
  // Help/Hello
  else if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('help') || msg.includes('namaste')) {
    reply = "Namaste! 🙏 Main TaxMitra hoon, aapka AI tax assistant.\n\n✨ I can help you with:\n\n💰 GST Calculations\n📊 Income Tax Estimates\n📅 Tax Filing Deadlines\n🔗 Official Portal Links\n💡 Tax Saving Tips\n📱 GST Rate Search\n\nTry asking:\n• 'Calculate GST on ₹10,000'\n• 'Tax on salary ₹12 lakhs'\n• 'When is ITR due?'\n• 'Section 80C deductions'\n\nKaise madad kar sakta hoon? 😊";
  }

  res.json({ reply });
});

module.exports = router;
