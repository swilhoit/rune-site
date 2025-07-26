import { NextResponse } from 'next/server';
import { getBiomarkerById } from '@/lib/bigquery';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const biomarkerId = decodeURIComponent(params.id);
    const biomarker = await getBiomarkerById(biomarkerId);
    
    if (!biomarker) {
      return NextResponse.json(
        { error: 'Biomarker not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ biomarker });
  } catch (error) {
    console.error('Error fetching biomarker:', error);
    return NextResponse.json(
      { error: 'Failed to fetch biomarker' },
      { status: 500 }
    );
  }
}