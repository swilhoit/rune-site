import { BigQuery } from '@google-cloud/bigquery';
import * as fs from 'fs';
import * as path from 'path';

const bigquery = new BigQuery({
  projectId: 'tetrahedron-366117',
});

async function loadBiomarkers() {
  try {
    // Read the biomarkers JSON file
    const filePath = path.join(process.cwd(), '../../biomarkers_300.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const biomarkers = JSON.parse(fileContent);

    console.log(`Found ${biomarkers.length} biomarkers to load`);

    // Define the schema for the biomarkers table
    const schema = [
      { name: 'name', type: 'STRING', mode: 'REQUIRED' },
      { name: 'category', type: 'STRING', mode: 'NULLABLE' },
      { name: 'type', type: 'STRING', mode: 'NULLABLE' },
      { name: 'use', type: 'STRING', mode: 'NULLABLE' },
    ];

    const datasetId = 'health';
    const tableId = 'biomarkers';

    // Get a reference to the dataset and table
    const dataset = bigquery.dataset(datasetId);
    const table = dataset.table(tableId);

    // Check if table exists
    const [exists] = await table.exists();
    
    if (!exists) {
      // Create the table if it doesn't exist
      console.log('Creating biomarkers table...');
      await table.create({
        schema: schema,
      });
      console.log('Table created successfully');
    } else {
      console.log('Table already exists');
    }

    // Prepare data for insertion
    const rows = biomarkers.map((biomarker: any) => ({
      name: biomarker.name,
      category: biomarker.category || null,
      type: biomarker.type || null,
      use: biomarker.use || null,
    }));

    // Insert data in batches
    const batchSize = 100;
    for (let i = 0; i < rows.length; i += batchSize) {
      const batch = rows.slice(i, i + batchSize);
      
      try {
        await table.insert(batch);
        console.log(`Inserted batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(rows.length / batchSize)}`);
      } catch (error: any) {
        if (error.name === 'PartialFailureError') {
          console.error(`Partial failure for batch ${Math.floor(i / batchSize) + 1}:`, error.errors);
        } else {
          throw error;
        }
      }
    }

    console.log('Successfully loaded all biomarkers into BigQuery');

    // Query to verify the data
    const query = `
      SELECT 
        category,
        COUNT(*) as count
      FROM \`${projectId}.${datasetId}.${tableId}\`
      GROUP BY category
      ORDER BY count DESC
    `;

    const [results] = await bigquery.query(query);
    console.log('\nBiomarkers by category:');
    results.forEach((row: any) => {
      console.log(`${row.category}: ${row.count}`);
    });

  } catch (error) {
    console.error('Error loading biomarkers:', error);
    process.exit(1);
  }
}

// Run the script
const projectId = 'tetrahedron-366117';
console.log(`Loading biomarkers into BigQuery project: ${projectId}`);
loadBiomarkers();