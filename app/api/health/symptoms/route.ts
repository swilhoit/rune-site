import { NextResponse } from 'next/server';
import { getSymptoms } from '@/lib/bigquery';

export async function GET() {
  try {
    const symptoms = await getSymptoms();
    return NextResponse.json({ symptoms });
  } catch (error) {
    console.error('Error fetching symptoms:', error);
    return NextResponse.json(
      { error: 'Failed to fetch symptoms' },
      { status: 500 }
    );
  }
}