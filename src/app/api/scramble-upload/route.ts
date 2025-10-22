import { NextResponse } from 'next/server';
import WCIFProcessor from '@/lib/WCIFProcessor';
import type { Competition } from '@/lib/Structures';

export async function POST(request: Request)
{
    const formData = await request.formData();
    const rawWCIF = formData.get('wcif');
    if (!rawWCIF || typeof rawWCIF !== 'string') 
    {
        return NextResponse.json({ error: 'Missing WCIF' }, { status: 400 });
    }

    const wcif: Competition = JSON.parse(rawWCIF);

    const file = formData.get('file') as File | null;
    if (!file) 
    {
        return NextResponse.json({ error: 'Missing file' }, { status: 400 });
    }

    WCIFProcessor(wcif, file);

    return NextResponse.json({ message: 'Received successfully', name: 'Sample Competition' });
}