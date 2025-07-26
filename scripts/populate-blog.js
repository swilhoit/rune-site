const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '237wvc0l',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN, // You'll need to set this
  useCdn: false,
});

async function createBlogPosts() {
  try {
    console.log('Creating sample blog posts...');

    // First, create authors
    const authors = [
      {
        _type: 'author',
        name: 'Dr. Sarah Mitchell',
        slug: { current: 'dr-sarah-mitchell' },
        bio: 'Integrative medicine specialist with 15 years of experience in holistic health and biomarker optimization.',
      },
      {
        _type: 'author',
        name: 'Michael Chen',
        slug: { current: 'michael-chen' },
        bio: 'Certified nutritionist and wellness coach specializing in natural remedies and preventive health.',
      },
    ];

    const createdAuthors = await Promise.all(
      authors.map(author => client.create(author))
    );
    console.log(`Created ${createdAuthors.length} authors`);

    // Create categories
    const categories = [
      {
        _type: 'category',
        title: 'Biomarkers',
        slug: { current: 'biomarkers' },
        description: 'Understanding and optimizing your health biomarkers',
      },
      {
        _type: 'category',
        title: 'Natural Remedies',
        slug: { current: 'natural-remedies' },
        description: 'Evidence-based natural treatments and remedies',
      },
      {
        _type: 'category',
        title: 'Wellness Tips',
        slug: { current: 'wellness-tips' },
        description: 'Practical advice for optimal health and wellbeing',
      },
      {
        _type: 'category',
        title: 'Research Updates',
        slug: { current: 'research-updates' },
        description: 'Latest findings in health and wellness research',
      },
    ];

    const createdCategories = await Promise.all(
      categories.map(category => client.create(category))
    );
    console.log(`Created ${createdCategories.length} categories`);

    // Create blog posts
    const blogPosts = [
      {
        _type: 'post',
        title: 'Understanding Your Liver Function Tests: A Complete Guide',
        slug: { current: 'understanding-liver-function-tests-guide' },
        author: { _ref: createdAuthors[0]._id },
        categories: [
          { _ref: createdCategories[0]._id },
          { _ref: createdCategories[3]._id },
        ],
        publishedAt: new Date().toISOString(),
        excerpt: 'Learn what your liver function test results mean and how to naturally support liver health through diet and lifestyle changes.',
        body: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Your liver is one of the most vital organs in your body, performing over 500 essential functions. Understanding your liver function tests (LFTs) can provide crucial insights into your overall health.',
              },
            ],
          },
          {
            _type: 'block',
            style: 'h2',
            children: [
              {
                _type: 'span',
                text: 'What Are Liver Function Tests?',
              },
            ],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Liver function tests are blood tests that measure different enzymes, proteins, and substances produced by your liver. These biomarkers help assess how well your liver is working and can detect liver damage or disease early.',
              },
            ],
          },
          {
            _type: 'block',
            style: 'h3',
            children: [
              {
                _type: 'span',
                text: 'Key Liver Biomarkers',
              },
            ],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'The main biomarkers in a liver panel include:',
              },
            ],
          },
          {
            _type: 'block',
            listItem: 'bullet',
            children: [
              {
                _type: 'span',
                text: 'ALT (Alanine Aminotransferase) - Primary marker for liver cell damage',
              },
            ],
          },
          {
            _type: 'block',
            listItem: 'bullet',
            children: [
              {
                _type: 'span',
                text: 'AST (Aspartate Aminotransferase) - Indicates liver or muscle damage',
              },
            ],
          },
          {
            _type: 'block',
            listItem: 'bullet',
            children: [
              {
                _type: 'span',
                text: 'ALP (Alkaline Phosphatase) - Can indicate bile duct problems',
              },
            ],
          },
          {
            _type: 'block',
            listItem: 'bullet',
            children: [
              {
                _type: 'span',
                text: 'Bilirubin - Waste product that can build up when liver function is impaired',
              },
            ],
          },
          {
            _type: 'block',
            style: 'h2',
            children: [
              {
                _type: 'span',
                text: 'Natural Ways to Support Liver Health',
              },
            ],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Supporting your liver naturally can help optimize these biomarkers:',
              },
            ],
          },
          {
            _type: 'block',
            listItem: 'number',
            children: [
              {
                _type: 'span',
                text: 'Milk Thistle - Contains silymarin, which has hepatoprotective properties',
              },
            ],
          },
          {
            _type: 'block',
            listItem: 'number',
            children: [
              {
                _type: 'span',
                text: 'Turmeric - Anti-inflammatory properties support liver function',
              },
            ],
          },
          {
            _type: 'block',
            listItem: 'number',
            children: [
              {
                _type: 'span',
                text: 'Green Tea - Rich in catechins that support liver health',
              },
            ],
          },
          {
            _type: 'block',
            listItem: 'number',
            children: [
              {
                _type: 'span',
                text: 'Cruciferous Vegetables - Help with liver detoxification processes',
              },
            ],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Regular monitoring of your liver function tests, combined with a healthy lifestyle and natural support, can help maintain optimal liver health throughout your life.',
              },
            ],
          },
        ],
      },
      {
        _type: 'post',
        title: 'The Science Behind Turmeric: Nature\'s Anti-Inflammatory Powerhouse',
        slug: { current: 'science-behind-turmeric-anti-inflammatory' },
        author: { _ref: createdAuthors[1]._id },
        categories: [
          { _ref: createdCategories[1]._id },
          { _ref: createdCategories[3]._id },
        ],
        publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        excerpt: 'Discover the research-backed benefits of turmeric and curcumin for reducing inflammation and supporting overall health.',
        body: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Turmeric, the golden spice that gives curry its distinctive color, has been used in traditional medicine for thousands of years. Modern science is now validating what ancient healers have long known.',
              },
            ],
          },
          {
            _type: 'block',
            style: 'h2',
            children: [
              {
                _type: 'span',
                text: 'The Active Compound: Curcumin',
              },
            ],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Curcumin is the main active ingredient in turmeric, comprising about 3-5% of the spice. This polyphenol is responsible for most of turmeric\'s therapeutic properties.',
              },
            ],
          },
          {
            _type: 'block',
            style: 'h3',
            children: [
              {
                _type: 'span',
                text: 'Research-Backed Benefits',
              },
            ],
          },
          {
            _type: 'block',
            listItem: 'bullet',
            children: [
              {
                _type: 'span',
                text: 'Reduces inflammatory markers like C-reactive protein',
              },
            ],
          },
          {
            _type: 'block',
            listItem: 'bullet',
            children: [
              {
                _type: 'span',
                text: 'Supports joint health and mobility',
              },
            ],
          },
          {
            _type: 'block',
            listItem: 'bullet',
            children: [
              {
                _type: 'span',
                text: 'May improve cognitive function and memory',
              },
            ],
          },
          {
            _type: 'block',
            listItem: 'bullet',
            children: [
              {
                _type: 'span',
                text: 'Supports healthy cholesterol levels',
              },
            ],
          },
          {
            _type: 'block',
            style: 'h2',
            children: [
              {
                _type: 'span',
                text: 'Maximizing Absorption',
              },
            ],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Curcumin has poor bioavailability on its own. To enhance absorption:',
              },
            ],
          },
          {
            _type: 'block',
            listItem: 'number',
            children: [
              {
                _type: 'span',
                text: 'Combine with black pepper (piperine increases absorption by 2000%)',
              },
            ],
          },
          {
            _type: 'block',
            listItem: 'number',
            children: [
              {
                _type: 'span',
                text: 'Take with healthy fats like coconut oil or olive oil',
              },
            ],
          },
          {
            _type: 'block',
            listItem: 'number',
            children: [
              {
                _type: 'span',
                text: 'Heat activation - cooking turmeric can increase bioavailability',
              },
            ],
          },
          {
            _type: 'block',
            style: 'blockquote',
            children: [
              {
                _type: 'span',
                text: 'Studies show that regular turmeric consumption can significantly reduce inflammatory biomarkers and support overall health when combined with a balanced diet and lifestyle.',
              },
            ],
          },
        ],
      },
      {
        _type: 'post',
        title: '5 Essential Biomarkers Every Health-Conscious Person Should Track',
        slug: { current: '5-essential-biomarkers-to-track' },
        author: { _ref: createdAuthors[0]._id },
        categories: [
          { _ref: createdCategories[0]._id },
          { _ref: createdCategories[2]._id },
        ],
        publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        excerpt: 'These five biomarkers provide crucial insights into your metabolic health, inflammation levels, and overall wellness.',
        body: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Regular health monitoring goes beyond annual check-ups. By tracking key biomarkers, you can take proactive steps to optimize your health and prevent disease.',
              },
            ],
          },
          {
            _type: 'block',
            style: 'h2',
            children: [
              {
                _type: 'span',
                text: '1. High-Sensitivity C-Reactive Protein (hs-CRP)',
              },
            ],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'This marker of inflammation is one of the best predictors of cardiovascular risk. Optimal levels are below 1.0 mg/L.',
              },
            ],
          },
          {
            _type: 'block',
            style: 'h2',
            children: [
              {
                _type: 'span',
                text: '2. Hemoglobin A1c (HbA1c)',
              },
            ],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Provides a 3-month average of blood sugar levels. Aim for levels below 5.7% to maintain metabolic health.',
              },
            ],
          },
          {
            _type: 'block',
            style: 'h2',
            children: [
              {
                _type: 'span',
                text: '3. Vitamin D',
              },
            ],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Critical for immune function, bone health, and mood. Optimal levels are between 40-60 ng/mL.',
              },
            ],
          },
          {
            _type: 'block',
            style: 'h2',
            children: [
              {
                _type: 'span',
                text: '4. Thyroid Stimulating Hormone (TSH)',
              },
            ],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Screens for thyroid function. Optimal range is typically 0.5-2.5 mIU/L, though this can vary by individual.',
              },
            ],
          },
          {
            _type: 'block',
            style: 'h2',
            children: [
              {
                _type: 'span',
                text: '5. Omega-3 Index',
              },
            ],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Measures EPA and DHA levels in red blood cells. Target 8-12% for optimal cardiovascular and brain health.',
              },
            ],
          },
          {
            _type: 'block',
            style: 'h3',
            children: [
              {
                _type: 'span',
                text: 'Taking Action',
              },
            ],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Work with a healthcare provider to establish baseline levels and create a personalized plan to optimize these biomarkers through diet, lifestyle, and targeted supplementation when necessary.',
              },
            ],
          },
        ],
      },
      {
        _type: 'post',
        title: 'Natural Remedies for Better Sleep: Evidence-Based Approaches',
        slug: { current: 'natural-remedies-better-sleep' },
        author: { _ref: createdAuthors[1]._id },
        categories: [
          { _ref: createdCategories[1]._id },
          { _ref: createdCategories[2]._id },
        ],
        publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        excerpt: 'Explore scientifically-proven natural remedies that can help improve sleep quality without the side effects of prescription medications.',
        body: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Quality sleep is fundamental to health, yet millions struggle with insomnia and poor sleep quality. Before reaching for prescription sleep aids, consider these evidence-based natural remedies.',
              },
            ],
          },
          {
            _type: 'block',
            style: 'h2',
            children: [
              {
                _type: 'span',
                text: 'Herbal Remedies',
              },
            ],
          },
          {
            _type: 'block',
            style: 'h3',
            children: [
              {
                _type: 'span',
                text: 'Valerian Root',
              },
            ],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Studies show valerian can reduce the time it takes to fall asleep by 15-20 minutes. Take 300-600mg 30 minutes before bed.',
              },
            ],
          },
          {
            _type: 'block',
            style: 'h3',
            children: [
              {
                _type: 'span',
                text: 'Passionflower',
              },
            ],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'This gentle herb increases GABA levels in the brain, promoting relaxation. Try passionflower tea 1 hour before bedtime.',
              },
            ],
          },
          {
            _type: 'block',
            style: 'h3',
            children: [
              {
                _type: 'span',
                text: 'Chamomile',
              },
            ],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Contains apigenin, an antioxidant that binds to brain receptors to promote sleepiness.',
              },
            ],
          },
          {
            _type: 'block',
            style: 'h2',
            children: [
              {
                _type: 'span',
                text: 'Nutrients and Supplements',
              },
            ],
          },
          {
            _type: 'block',
            listItem: 'bullet',
            children: [
              {
                _type: 'span',
                text: 'Magnesium Glycinate - 200-400mg before bed',
              },
            ],
          },
          {
            _type: 'block',
            listItem: 'bullet',
            children: [
              {
                _type: 'span',
                text: 'L-Theanine - 100-200mg for relaxation without drowsiness',
              },
            ],
          },
          {
            _type: 'block',
            listItem: 'bullet',
            children: [
              {
                _type: 'span',
                text: 'Melatonin - 0.5-3mg, 30 minutes before desired sleep time',
              },
            ],
          },
          {
            _type: 'block',
            style: 'h2',
            children: [
              {
                _type: 'span',
                text: 'Lifestyle Practices',
              },
            ],
          },
          {
            _type: 'block',
            listItem: 'number',
            children: [
              {
                _type: 'span',
                text: 'Maintain consistent sleep-wake times',
              },
            ],
          },
          {
            _type: 'block',
            listItem: 'number',
            children: [
              {
                _type: 'span',
                text: 'Create a cool, dark sleeping environment',
              },
            ],
          },
          {
            _type: 'block',
            listItem: 'number',
            children: [
              {
                _type: 'span',
                text: 'Limit blue light exposure 2 hours before bed',
              },
            ],
          },
          {
            _type: 'block',
            listItem: 'number',
            children: [
              {
                _type: 'span',
                text: 'Practice relaxation techniques like deep breathing or meditation',
              },
            ],
          },
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Remember, improving sleep naturally often requires a combination of approaches. Be patient and consistent, as it may take several weeks to see significant improvements.',
              },
            ],
          },
        ],
      },
    ];

    const createdPosts = await Promise.all(
      blogPosts.map(post => client.create(post))
    );
    console.log(`Created ${createdPosts.length} blog posts`);

    console.log('✓ Successfully created sample blog content!');
    console.log('Visit /blog to see the posts on your site');
    console.log('Visit /studio to manage content in Sanity Studio');

  } catch (error) {
    console.error('Error creating blog posts:', error);
  }
}

// Note: To run this script, you need to:
// 1. Create a write token in your Sanity project settings
// 2. Set SANITY_WRITE_TOKEN environment variable
// 3. Run: SANITY_WRITE_TOKEN=your_token_here node scripts/populate-blog.js

console.log('\n📝 To create blog posts, you need a Sanity write token.');
console.log('Steps:');
console.log('1. Go to https://www.sanity.io/manage/project/237wvc0l/api');
console.log('2. Create a new token with Editor permissions');
console.log('3. Run this script with: SANITY_WRITE_TOKEN=your_token node scripts/populate-blog.js\n');

// Only run if token is provided
if (process.env.SANITY_WRITE_TOKEN) {
  createBlogPosts();
} else {
  console.log('⚠️  No SANITY_WRITE_TOKEN found. Please follow the steps above.');
}