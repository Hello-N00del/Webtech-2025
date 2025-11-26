import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════
║ 🚀 Backend Server Running
╠════════════════════════════════════════════════════════════
║ Port: ${PORT}
║ URL:  http://localhost:${PORT}
╚════════════════════════════════════════════════════════════
  `);
  
  console.log('✅ Routes registered:');
  console.log('   GET  /api/test');
  console.log('   POST /api/auth/register');
  console.log('   GET  /api/auth/verify-email/:token');
  console.log('   POST /api/auth/login');
});