import pool from '../config/db.js';
import bcryptjs from 'bcryptjs';

export class User {
  static async findByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create({ firstName, lastName, email, password }) {
    try {
      // Hash password
      const salt = await bcryptjs.genSalt(10);
      const passwordHash = await bcryptjs.hash(password, salt);

      const result = await pool.query(
        `INSERT INTO users (first_name, last_name, email, password_hash)
         VALUES ($1, $2, $3, $4)
         RETURNING id, first_name, last_name, email, profile_picture, bio, phone, location, skills, is_verified, created_at`,
        [firstName, lastName, email, passwordHash]
      );

      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') {
        // Unique constraint violation
        throw new Error('Email already exists');
      }
      throw error;
    }
  }

  static async comparePassword(plainPassword, hashedPassword) {
    return await bcryptjs.compare(plainPassword, hashedPassword);
  }

  static async updateProfile(id, { firstName, lastName, bio, phone, location, skills }) {
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (firstName !== undefined) {
      updates.push(`first_name = $${paramCount}`);
      values.push(firstName);
      paramCount++;
    }
    if (lastName !== undefined) {
      updates.push(`last_name = $${paramCount}`);
      values.push(lastName);
      paramCount++;
    }
    if (bio !== undefined) {
      updates.push(`bio = $${paramCount}`);
      values.push(bio);
      paramCount++;
    }
    if (phone !== undefined) {
      updates.push(`phone = $${paramCount}`);
      values.push(phone);
      paramCount++;
    }
    if (location !== undefined) {
      updates.push(`location = $${paramCount}`);
      values.push(location);
      paramCount++;
    }
    if (skills !== undefined) {
      updates.push(`skills = $${paramCount}`);
      values.push(skills);
      paramCount++;
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);

    if (updates.length === 1) {
      // Only updated_at
      const result = await pool.query(
        `UPDATE users SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
        [...values, id]
      );
      return result.rows[0];
    }

    const result = await pool.query(
      `UPDATE users SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING id, first_name, last_name, email, profile_picture, bio, phone, location, skills, is_verified, created_at, updated_at`,
      [...values, id]
    );

    return result.rows[0];
  }

  static async changePassword(id, newPassword) {
    const salt = await bcryptjs.genSalt(10);
    const passwordHash = await bcryptjs.hash(newPassword, salt);

    const result = await pool.query(
      `UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id, first_name, last_name, email, profile_picture, bio, phone, location, skills, is_verified, created_at, updated_at`,
      [passwordHash, id]
    );

    return result.rows[0];
  }

  static async getUserResponse(user) {
    // Return user without password_hash
    const { password_hash, ...userWithoutPassword } = user;
    return {
      id: userWithoutPassword.id,
      firstName: userWithoutPassword.first_name,
      lastName: userWithoutPassword.last_name,
      email: userWithoutPassword.email,
      profilePicture: userWithoutPassword.profile_picture,
      bio: userWithoutPassword.bio,
      resume: userWithoutPassword.resume,
      phone: userWithoutPassword.phone,
      location: userWithoutPassword.location,
      skills: userWithoutPassword.skills,
      isVerified: userWithoutPassword.is_verified,
      createdAt: userWithoutPassword.created_at,
      updatedAt: userWithoutPassword.updated_at,
    };
  }
}

export default User;
