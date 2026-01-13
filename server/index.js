import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { requestQuoteHandler } from './routes/requestQuote.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Routes
app.get('/health', (req, res) => {
  res.json({ ok: true, message: 'Server is running' });
});

app.post('/api/request-quote', requestQuoteHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ ok: false, error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ ok: false, error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🎙️ Helou Sound server running on http://localhost:${PORT}`);
});
