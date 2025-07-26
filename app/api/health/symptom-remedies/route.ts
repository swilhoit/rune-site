import { NextResponse } from 'next/server';
import { getSymptomRemedies } from '@/lib/bigquery';

export async function GET() {
  try {
    const relationships = await getSymptomRemedies();
    return NextResponse.json({ relationships });
  } catch (error) {
    console.error('Error fetching symptom-remedy relationships:', error);
    return NextResponse.json(
      { error: 'Failed to fetch relationships' },
      { status: 500 }
    );
  }
}