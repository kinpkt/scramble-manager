import { NextResponse } from 'next/server';
import { WCIFProcessor } from '@/lib/WCIFProcessor';

export async function POST(request)
{
    const formData = await request.formData();
    const wcif = formData.get('wcif');
    const file = formData.get('file');

    WCIFProcessor(JSON.parse(wcif));

    console.log('Received WCIF:', wcif);
    console.log('Received file:', file);

    return NextResponse.json({ message: 'Received successfully', name: 'Sample Competition' });
}