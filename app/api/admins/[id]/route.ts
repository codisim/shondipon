import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
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
        const admin = await prisma.admin.findUnique({
            where: { id: params.id, isDeleted: false },
            include: {
                user: { select: { role: true, needPasswordChange: true } },
            },
        });

        if (!admin) {
            return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
        }

        return NextResponse.json(admin);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch admin' }, { status: 500 });
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
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
        const { name, phone, address, gender, profilePhoto } = body;

        const updated = await prisma.admin.update({
            where: { id: params.id },
            data: {
                name: name ?? undefined,
                phone: phone ?? undefined,
                address: address ?? undefined,
                gender: gender ?? undefined,
                profilePhoto: profilePhoto ?? undefined,
            },
        });

        return NextResponse.json(updated);
    } catch (error: any) {
        if (error.code === 'P2025') {
            return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : '';

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const currentUser = await getCurrentUser(token);
    if (!currentUser || currentUser.role !== 'SUPER_ADMIN') {
        return NextResponse.json({ error: 'Forbidden - Super Admin only' }, { status: 403 });
    }

    try {
        await prisma.admin.update({
            where: { id: params.id },
            data: { isDeleted: true },
        });

        // Optional: also soft-delete the linked User
        // await prisma.user.update({ where: { admin: { id: params.id } }, data: { isDeleted: true } });

        return NextResponse.json({ message: 'Admin deleted' });
    } catch (error: any) {
        if (error.code === 'P2025') {
            return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}