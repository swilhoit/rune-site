import { NextResponse } from 'next/server';
import { getRemedies } from '@/lib/bigquery';

export async function GET() {
  try {
    const remedies = await getRemedies();
    return NextResponse.json({ remedies });
  } catch (error) {
    console.error('Error fetching remedies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch remedies' },
      { status: 500 }
    );
  }
}