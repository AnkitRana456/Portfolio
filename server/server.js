import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', contactRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'Dev Console API v1.0',
    dbState: mongoose.connection.readyState === 1 ? 'CONNECTED' : 'DISCONNECTED',
    time: new Date().toISOString()
  });
});

// Database Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('[SYS_OK] Connected to MongoDB at', MONGODB_URI);
  })
  .catch((err) => {
    console.warn('[SYS_WARN] MongoDB connection deferred:', err.message);
    console.warn('[SYS_WARN] Server running in standalone fallback mode for API routes.');
  });

app.listen(PORT, () => {
  console.log(`[SYS_OK] Dev Console API Server running on port ${PORT}`);
});
