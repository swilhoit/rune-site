import { BigQuery } from '@google-cloud/bigquery';

// Initialize BigQuery client
const bigquery = new BigQuery({
  projectId: 'tetrahedron-366117',
  // If you have a service account key file, uncomment and update the path:
  // keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

export interface Symptom {
  id: string;
  name: string;
  description?: string;
  category?: string;
  causes?: string;
  remedies?: string;
}

export interface Remedy {
  id: string;
  name: string;
  description?: string;
  type?: string;
  dosage?: string;
  alternateNames?: string;
  imageUrl?: string;
}

export interface SymptomRemedy {
  symptom_id: string;
  remedy_id: string;
  effectiveness?: number;
  notes?: string;
}

export interface Biomarker {
  id: string;
  name: string;
  category?: string;
  type?: string;
  use?: string;
}

// Fetch all symptoms from the remedies_symptoms table
export async function getSymptoms(): Promise<Symptom[]> {
  const query = `
    SELECT DISTINCT 
      Name as id,
      Name as name,
      Overview as description,
      Cause as causes,
      Remedies as remedies,
      Category as category
    FROM \`tetrahedron-366117.health.remedies_symptoms\`
    WHERE Category = 'Symptom'
    ORDER BY Name
  `;

  try {
    const [rows] = await bigquery.query(query);
    return rows as Symptom[];
  } catch (error) {
    console.error('Error fetching symptoms:', error);
    return [];
  }
}

// Fetch all remedies
export async function getRemedies(): Promise<Remedy[]> {
  const query = `
    SELECT 
      string_field_1 as id,
      string_field_1 as name,
      string_field_3 as description,
      string_field_2 as alternateNames,
      string_field_7 as imageUrl
    FROM \`tetrahedron-366117.health.remedies\`
    WHERE string_field_1 IS NOT NULL
    ORDER BY string_field_1
  `;

  try {
    const [rows] = await bigquery.query(query);
    return rows as Remedy[];
  } catch (error) {
    console.error('Error fetching remedies:', error);
    return [];
  }
}

// Fetch symptom-remedy relationships (for now, return empty array as we need to parse the remedies text)
export async function getSymptomRemedies(): Promise<SymptomRemedy[]> {
  // This would need to parse the Remedies column from remedies_symptoms table
  // which contains text descriptions of remedies for each symptom
  return [];
}

// Get remedies for a specific symptom
export async function getRemediesForSymptom(symptomId: string): Promise<(Remedy & { effectiveness?: number; notes?: string })[]> {
  // For now, we'd need to parse the Remedies text field from the symptoms table
  // In a production system, this would ideally be a proper relational table
  const query = `
    SELECT 
      Remedies as remedies_text
    FROM \`tetrahedron-366117.health.remedies_symptoms\`
    WHERE Name = @symptomId
    AND Category = 'Symptom'
    LIMIT 1
  `;

  const options = {
    query: query,
    params: { symptomId },
  };

  try {
    await bigquery.query(options);
    // Here you would parse the remedies_text to extract individual remedies
    // For now, returning empty array
    return [];
  } catch (error) {
    console.error('Error fetching remedies for symptom:', error);
    return [];
  }
}

// Get symptoms for a specific remedy
export async function getSymptomsForRemedy(): Promise<(Symptom & { effectiveness?: number; notes?: string })[]> {
  // This would need to search through all symptoms' Remedies text to find mentions of this remedy
  // In a production system, this would ideally be a proper relational table
  return [];
}

// Fetch all biomarkers
export async function getBiomarkers(): Promise<Biomarker[]> {
  const query = `
    SELECT 
      ROW_NUMBER() OVER (ORDER BY name, category) as row_id,
      name,
      category,
      type,
      use
    FROM \`tetrahedron-366117.health.biomarkers\`
    ORDER BY name, category
  `;

  try {
    const [rows] = await bigquery.query(query);
    // Create unique IDs by combining row_id with name
    return rows.map((row: { row_id: number; name: string; category?: string; type?: string; use?: string }) => ({
      id: `${row.row_id}-${row.name}`.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      name: row.name,
      category: row.category,
      type: row.type,
      use: row.use
    }));
  } catch (error) {
    console.error('Error fetching biomarkers:', error);
    return [];
  }
}

// Get a specific biomarker
export async function getBiomarkerById(biomarkerId: string): Promise<Biomarker | null> {
  // Extract the name from the ID (format: "rownum-biomarker-name")
  const namePart = biomarkerId.split('-').slice(1).join(' ');
  
  // First, try to get all biomarkers and find the matching one
  const allBiomarkers = await getBiomarkers();
  const biomarker = allBiomarkers.find(b => b.id === biomarkerId);
  
  if (biomarker) {
    return biomarker;
  }
  
  // Fallback: try to find by name similarity
  const query = `
    SELECT 
      name,
      category,
      type,
      use
    FROM \`tetrahedron-366117.health.biomarkers\`
    WHERE LOWER(REPLACE(name, ' ', '-')) LIKE @searchPattern
    LIMIT 1
  `;

  const options = {
    query: query,
    params: { searchPattern: `%${namePart.toLowerCase().replace(/[^a-z0-9-]/g, '-')}%` },
  };

  try {
    const [rows] = await bigquery.query(options);
    if (rows.length > 0) {
      const row = rows[0];
      return {
        id: biomarkerId,
        name: row.name,
        category: row.category,
        type: row.type,
        use: row.use
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching biomarker:', error);
    return null;
  }
}