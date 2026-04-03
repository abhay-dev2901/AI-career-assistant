import { prisma } from '../lib/prisma.js';
import bcryptjs from 'bcryptjs';

export class User {
  static async findByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  static async findById(id) {
    return await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
  }

  static async create({ firstName, lastName, email, password }) {
    try {
      // Hash password
      const salt = await bcryptjs.genSalt(10);
      const passwordHash = await bcryptjs.hash(password, salt);

      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          passwordHash,
        },
      });

      return user;
    } catch (error) {
      if (error.code === 'P2002') {
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
    const updateData = {};

    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (bio !== undefined) updateData.bio = bio;
    if (phone !== undefined) updateData.phone = phone;
    if (location !== undefined) updateData.location = location;
    if (skills !== undefined) updateData.skills = skills;

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    return user;
  }

  static async changePassword(id, newPassword) {
    const salt = await bcryptjs.genSalt(10);
    const passwordHash = await bcryptjs.hash(newPassword, salt);

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        passwordHash,
      },
    });

    return user;
  }

  static async getUserResponse(user) {
    // Return user without passwordHash
    const { passwordHash, ...userWithoutPassword } = user;
    return {
      _id: userWithoutPassword.id,
      firstName: userWithoutPassword.firstName,
      lastName: userWithoutPassword.lastName,
      email: userWithoutPassword.email,
      profilePicture: userWithoutPassword.profilePicture,
      bio: userWithoutPassword.bio,
      resume: userWithoutPassword.resume,
      phone: userWithoutPassword.phone,
      location: userWithoutPassword.location,
      skills: userWithoutPassword.skills,
      isVerified: userWithoutPassword.isVerified,
      createdAt: userWithoutPassword.createdAt,
      updatedAt: userWithoutPassword.updatedAt,
    };
  }
}

export default User;
