import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import infoletterRoutes from './routes/infoletterRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🔄 Loading app.ts...');

const app = express();

// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:4173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 3600,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving for uploads
app.use('/uploads', express.static(path.join(__dirname, '../../public/uploads')));
console.log('✅ Static files serving enabled');

// Log requests
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.path}`);
  next();
});

console.log('✅ Middleware loaded');

// Test Route
app.get('/api/test', (req, res) => {
  console.log('✅ Test route hit!');
  res.json({ message: 'Server works!', timestamp: new Date().toISOString() });
});

console.log('✅ Test route registered');

// Auth Routes
app.use('/api/auth', authRoutes);
console.log('✅ Auth routes registered');

// Infoletter Routes
app.use('/api/infoletters', infoletterRoutes);
console.log('✅ Infoletter routes registered');

// 404 Handler
app.use((req, res) => {
  console.log('❌ 404:', req.method, req.path);
  res.status(404).json({ error: 'Not Found', path: req.path });
});

// Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Error:', err.message || err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

console.log('✅ App.ts complete');

export default app;
