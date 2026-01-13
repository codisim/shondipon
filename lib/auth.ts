import { JWTPayload, SignJWT, jwtVerify } from 'jose';
import { prisma } from '@/lib/prisma'; // adjust path
import bcrypt from 'bcryptjs';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-super-secret-32-chars-minimum!!!!'
);

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export async function signToken(payload: TokenPayload): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7; // 7 days

  return new SignJWT({ ...payload, iat, exp })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .sign(secret);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as JWTPayload;
  } catch (err) {
    return null;
  }
}

export async function getCurrentUser(token?: string) {
  if (!token) return null;
  const payload = await verifyToken(token);
  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      email: true,
      role: true,
      needPasswordChange: true,
      isDeleted: true,
      admin: true,
      student: true,
      teacher: true,
    },
  });

  if (!user || user.isDeleted) return null;
  return user;
}