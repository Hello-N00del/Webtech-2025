import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

console.log('🔄 Loading app.ts...');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

console.log('✅ Middleware loaded');

// Test Route
app.get('/api/test', (req, res) => {
  console.log('✅ Test route hit!');
  res.json({ message: 'Server works!' });
});

console.log('✅ Test route registered');

// Auth Routes
app.use('/api/auth', authRoutes);

console.log('✅ Auth routes registered');

// 404 Handler
app.use((req, res) => {
  console.log('❌ 404:', req.method, req.path);
  res.status(404).json({ error: 'Not Found', path: req.path });
});

// Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => { 
  console.error('❌ Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

console.log('✅ App.ts complete');

export default app;