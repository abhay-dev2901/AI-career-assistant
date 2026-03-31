import pool from './db.js';

export async function initializeDatabase() {
  try {
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        profile_picture VARCHAR(500),
        bio TEXT,
        resume VARCHAR(500),
        phone VARCHAR(20),
        location VARCHAR(100),
        skills TEXT[] DEFAULT '{}',
        is_verified BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✓ Users table created successfully');

    // Create index on email for faster lookups
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `);

    console.log('✓ Email index created successfully');

  } catch (error) {
    // Ignore error if table already exists
    if (!error.message.includes('already exists')) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }
}

export default initializeDatabase;
