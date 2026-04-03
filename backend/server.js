import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { prisma } from './lib/prisma.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database on startup
async function startServer() {
  try {
    // Test Prisma connection
    await prisma.$queryRaw`SELECT NOW()`;
    console.log('✓ Database connection successful');

    // Mount routes
    app.use('/api/auth', authRoutes);

    // Health check endpoint
    app.get('/api/health', (req, res) => {
      res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });

    // 404 handler
    app.all('*', (req, res) => {
      res.status(404).json({ error: 'Route not found' });
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err);
      res.status(err.status || 500).json({
        error: err.message || 'Internal server error',
      });
    });

    app.listen(PORT, () => {
      console.log('\n' + '='.repeat(50));
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📊 Frontend URL: ${process.env.FRONTEND_URL}`);
      console.log(`🔗 Database: Neon PostgreSQL (${process.env.NODE_ENV})`);
      console.log('='.repeat(50) + '\n');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\n\nShutting down gracefully...');
      await prisma.$disconnect();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.log('\n\nShutting down gracefully...');
      await prisma.$disconnect();
      process.exit(0);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
