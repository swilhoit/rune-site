import { NextResponse } from 'next/server';
import { BigQuery } from '@google-cloud/bigquery';

const bigquery = new BigQuery({
  projectId: 'tetrahedron-366117',
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const symptomId = decodeURIComponent(params.id);
    
    const query = `
      SELECT 
        Name as id,
        Name as name,
        Overview as description,
        Cause as causes,
        Remedies as remedies,
        Category as category
      FROM \`tetrahedron-366117.health.remedies_symptoms\`
      WHERE Name = @symptomId
      AND Category = 'Symptom'
      LIMIT 1
    `;

    const options = {
      query: query,
      params: { symptomId },
    };

    const [rows] = await bigquery.query(options);
    
    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Symptom not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ symptom: rows[0] });
  } catch (error) {
    console.error('Error fetching symptom:', error);
    return NextResponse.json(
      { error: 'Failed to fetch symptom' },
      { status: 500 }
    );
  }
}