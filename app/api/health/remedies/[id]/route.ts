import { NextResponse } from 'next/server';
import { BigQuery } from '@google-cloud/bigquery';

const bigquery = new BigQuery({
  projectId: 'tetrahedron-366117',
  ...(process.env.GOOGLE_CLOUD_KEYFILE && {
    credentials: JSON.parse(process.env.GOOGLE_CLOUD_KEYFILE)
  }),
  ...(process.env.GOOGLE_APPLICATION_CREDENTIALS && {
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
  }),
});

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const remedyId = decodeURIComponent(params.id);
    
    const query = `
      SELECT 
        string_field_1 as id,
        string_field_1 as name,
        string_field_3 as description,
        string_field_4 as details,
        string_field_2 as alternateNames,
        string_field_7 as imageUrl
      FROM \`tetrahedron-366117.health.remedies\`
      WHERE string_field_1 = @remedyId
      LIMIT 1
    `;

    const options = {
      query: query,
      params: { remedyId },
    };

    const [rows] = await bigquery.query(options);
    
    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Remedy not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ remedy: rows[0] });
  } catch (error) {
    console.error('Error fetching remedy:', error);
    return NextResponse.json(
      { error: 'Failed to fetch remedy' },
      { status: 500 }
    );
  }
}