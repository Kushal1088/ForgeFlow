import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { authenticateUser } from './middleware/auth.js';
import { resolveTenant } from './middleware/tenant.js';
import apiRouter from './routes/api.js';

dotenv.config();

// Connect to MongoDB Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'ForgeFlow Workflow Engine & SaaS API', timestamp: new Date().toISOString() });
});

// Middleware stack
app.use(authenticateUser);
app.use(resolveTenant);

// Mount API routes
app.use('/api/v1', apiRouter);

const server = app.listen(PORT, () => {
  console.log(`🚀 ForgeFlow Server running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const FALLBACK_PORT = Number(PORT) + 1;
    console.log(`⚠️ Port ${PORT} is already in use. Retrying on http://localhost:${FALLBACK_PORT}...`);
    app.listen(FALLBACK_PORT, () => {
      console.log(`🚀 ForgeFlow Server running on http://localhost:${FALLBACK_PORT}`);
    });
  } else {
    console.error('Server error:', err);
  }
});
