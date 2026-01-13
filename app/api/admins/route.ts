import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    //   const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : '';

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentUser = await getCurrentUser(token);
    if (!currentUser || !['SUPER_ADMIN', 'ADMIN'].includes(currentUser.role)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const admins = await prisma.admin.findMany({
            where: { isDeleted: false },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                profilePhoto: true,
                address: true,
                gender: true,
                createdAt: true,
                user: { select: { role: true, needPasswordChange: true } },
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(admins);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch admins' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : '';

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentUser = await getCurrentUser(token);
    if (!currentUser || !['SUPER_ADMIN', 'ADMIN'].includes(currentUser.role)) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    try {
        const body = await req.json();
        const {
            name,
            email,
            password,
            phone,
            address,
            gender,
            profilePhoto,
        } = body;

        if (!name || !email || !password || !phone || !gender) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role: 'ADMIN',
                needPasswordChange: true,
            },
        });

        const newAdmin = await prisma.admin.create({
            data: {
                name,
                email,
                phone,
                address: address || null,
                gender,
                profilePhoto: profilePhoto || null,
                user: { connect: { id: newUser.id } },
            },
        });

        return NextResponse.json(newAdmin, { status: 201 });
    } catch (error: any) {
        console.error(error);
        if (error.code === 'P2002') {
            return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
        }
        return NextResponse.json({ error: 'Failed to create admin' }, { status: 500 });
    }
}