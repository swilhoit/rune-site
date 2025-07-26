const { BigQuery } = require('@google-cloud/bigquery');
const fs = require('fs');
const path = require('path');

const bigquery = new BigQuery({
  projectId: 'tetrahedron-366117',
});

async function loadBiomarkers() {
  try {
    // Read the biomarkers JSON file
    const filePath = path.join(__dirname, '../../../biomarkers_300.json');
    console.log('Reading file from:', filePath);
    
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
      
      // Optional: Clear existing data
      console.log('Clearing existing data...');
      const deleteQuery = `DELETE FROM \`tetrahedron-366117.${datasetId}.${tableId}\` WHERE TRUE`;
      await bigquery.query(deleteQuery);
      console.log('Existing data cleared');
    }

    // Prepare data for insertion
    const rows = biomarkers.map((biomarker) => ({
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
      } catch (error) {
        if (error.name === 'PartialFailureError') {
          console.error(`Partial failure for batch ${Math.floor(i / batchSize) + 1}:`, error.errors);
          // Continue with next batch
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
      FROM \`tetrahedron-366117.${datasetId}.${tableId}\`
      GROUP BY category
      ORDER BY count DESC
    `;

    const [results] = await bigquery.query(query);
    console.log('\nBiomarkers by category:');
    results.forEach((row) => {
      console.log(`${row.category}: ${row.count}`);
    });

    // Show total count
    const countQuery = `SELECT COUNT(*) as total FROM \`tetrahedron-366117.${datasetId}.${tableId}\``;
    const [countResult] = await bigquery.query(countQuery);
    console.log(`\nTotal biomarkers loaded: ${countResult[0].total}`);

  } catch (error) {
    console.error('Error loading biomarkers:', error);
    process.exit(1);
  }
}

// Run the script
console.log('Loading biomarkers into BigQuery project: tetrahedron-366117');
loadBiomarkers();