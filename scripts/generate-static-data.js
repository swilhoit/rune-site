const { BigQuery } = require('@google-cloud/bigquery');
const fs = require('fs');
const path = require('path');

// Skip data generation if no credentials are available (e.g., in CI/CD)
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS && !process.env.GOOGLE_CLOUD_KEYFILE) {
  console.log('⚠️  No Google Cloud credentials found. Skipping static data generation.');
  console.log('   To generate static data, set GOOGLE_APPLICATION_CREDENTIALS or GOOGLE_CLOUD_KEYFILE');
  
  // Create empty JSON files so the build doesn't fail
  const dataDir = path.join(__dirname, '../public/data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // Check if files already exist (from previous builds)
  const files = ['biomarkers.json', 'symptoms.json', 'remedies.json'];
  let existingFiles = 0;
  
  files.forEach(file => {
    const filePath = path.join(dataDir, file);
    if (fs.existsSync(filePath)) {
      existingFiles++;
    }
  });
  
  if (existingFiles === files.length) {
    console.log('✓ Using existing static data files from repository');
  } else {
    console.log('⚠️  Creating empty data files for build to continue');
    files.forEach(file => {
      const filePath = path.join(dataDir, file);
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '[]');
      }
    });
  }
  
  process.exit(0);
}

const bigquery = new BigQuery({
  projectId: 'tetrahedron-366117',
});

async function generateStaticData() {
  try {
    console.log('Fetching data from BigQuery...');
    
    // Fetch all data in parallel
    const [biomarkers, symptoms, remedies] = await Promise.all([
      fetchBiomarkers(),
      fetchSymptoms(),
      fetchRemedies()
    ]);

    // Create public/data directory if it doesn't exist
    const dataDir = path.join(__dirname, '../public/data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write JSON files
    fs.writeFileSync(
      path.join(dataDir, 'biomarkers.json'),
      JSON.stringify(biomarkers, null, 2)
    );
    
    fs.writeFileSync(
      path.join(dataDir, 'symptoms.json'),
      JSON.stringify(symptoms, null, 2)
    );
    
    fs.writeFileSync(
      path.join(dataDir, 'remedies.json'),
      JSON.stringify(remedies, null, 2)
    );

    console.log(`✓ Generated static data files`);
    console.log(`  - Biomarkers: ${biomarkers.length}`);
    console.log(`  - Symptoms: ${symptoms.length}`);
    console.log(`  - Remedies: ${remedies.length}`);

  } catch (error) {
    console.error('Error generating static data:', error);
    process.exit(1);
  }
}

async function fetchBiomarkers() {
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
  
  const [rows] = await bigquery.query(query);
  return rows.map((row) => ({
    id: `${row.row_id}-${row.name}`.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
    name: row.name,
    category: row.category,
    type: row.type,
    use: row.use
  }));
}

async function fetchSymptoms() {
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
  
  const [rows] = await bigquery.query(query);
  return rows;
}

async function fetchRemedies() {
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
  
  const [rows] = await bigquery.query(query);
  return rows;
}

generateStaticData();