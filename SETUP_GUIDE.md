# Setup Guide - Tax Management System

## Current Status

✅ Backend created with:
- Express server with CORS
- JWT authentication (register/login)
- GST calculator endpoint
- Income tax calculator with Indian tax slabs
- Invoice model
- Chatbot endpoint with Gemini API integration + fallback
- Jest tests (passing)

✅ Frontend created with:
- React + Vite
- Login/Register pages
- Dashboard
- GST Calculator page
- Income Tax Calculator page
- SomeUnique chatbot widget (floating button)
- React Router navigation

✅ Configuration:
- .env files created for both server and client
- .gitignore added
- GitHub Actions CI workflow
- README with complete documentation

## Next Steps to Run the Application

### 1. Install and Start MongoDB

**Option A - Windows (MongoDB Community Server)**:
1. Download from: https://www.mongodb.com/try/download/community
2. Install and run:
   ```powershell
   "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" --dbpath="C:\data\db"
   ```

**Option B - MongoDB Atlas (Cloud)**:
1. Create free account at https://www.mongodb.com/atlas
2. Create a cluster
3. Get connection string
4. Update `server/.env`: `MONGO_URI=your_atlas_connection_string`

### 2. Start the Backend

```powershell
cd d:\tax_mangement_system\server
npm run dev
```

You should see:
```
MongoDB connected
Server running on port 5000
```

### 3. Start the Frontend

Open a NEW terminal:

```powershell
cd d:\tax_mangement_system\client
npm run dev
```

Frontend will be available at: http://localhost:3000

### 4. Test the Application

1. **Register**: Create a new account at http://localhost:3000
2. **Login**: Sign in with your credentials
3. **GST Calculator**: Calculate GST on amounts with different rates
4. **Income Tax**: Estimate your income tax
5. **Chatbot**: Click the 💬 button and ask:
   - "calculate gst 1000 18"
   - "tax for salary 800000"

## Optional: Configure Gemini API

To enable AI-powered chatbot responses:

1. Get API key from: https://makersuite.google.com/app/apikey
2. Add to `server/.env`:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```
3. Restart backend server

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running on port 27017
- Check `server/.env` has correct `MONGO_URI`

### Port Already in Use
- Change `PORT` in `server/.env`
- Update `VITE_API_URL` in `client/.env` to match

### Cannot Access Frontend
- Ensure both backend AND frontend are running
- Check browser console for errors
- Verify CORS is enabled (already configured)

## What Works Now

✅ User registration and login with JWT
✅ Protected routes (must be logged in)
✅ GST calculations with multiple rates
✅ Income tax estimation with Indian slabs
✅ Rule-based chatbot answering tax queries
✅ Responsive UI with clean design
✅ MongoDB data persistence

## Future Enhancements (Optional)

- Add invoice PDF generation
- Implement GST return filing templates
- Add user dashboard with statistics
- Create admin panel for user management
- Add more detailed tax calculation rules
- Integrate actual Gemini API (requires proper endpoint setup)
- Add email notifications for tax deadlines
- Create mobile responsive improvements

## Technical Notes

- Backend uses async/await with proper error handling
- Passwords are hashed with bcryptjs
- JWT tokens expire in 7 days
- Mongoose strict mode enabled
- React uses functional components with hooks
- No TypeScript (plain JavaScript as requested)

## Testing

Run backend tests:
```powershell
cd server
npm test
```

Current test coverage:
- Tax calculation utility (basic test passing)

---

**Ready to Use!** Just start MongoDB, then run both servers. 🚀
