import { NextResponse } from 'next/server';
import { getBiomarkers } from '@/lib/bigquery';

export async function GET() {
  try {
    const biomarkers = await getBiomarkers();
    return NextResponse.json({ biomarkers });
  } catch (error) {
    console.error('Error fetching biomarkers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch biomarkers' },
      { status: 500 }
    );
  }
}