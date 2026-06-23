require('dotenv').config();
const connectDB = require('../src/db/connection');
const Product = require('../src/models/Product');


const TOTAL_PRODUCTS = 200000;
const BATCH_SIZE = 5000;

const CATEGORIES = [
    'electronics',
    'footwear',
    'apparel',
    'home-kitchen',
    'books',
    'toys',
    'sports',
    'beauty',
    'groceries',
    'automotive',
];

const ADJECTIVES = ['Pro', 'Ultra', 'Lite', 'Max', 'Classic', 'Eco', 'Smart', 'Premium'];
const NOUNS = ['Widget', 'Gadget', 'Device', 'Kit', 'Bundle', 'Set', 'Pack', 'Unit'];


function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPrice() {
  return Math.round((Math.random() * 990 + 9.99) * 100) / 100;
}

function randomPastDate() {
  const now = Date.now();
  const twoYearsMs = 2 * 365 * 24 * 60 * 60 * 1000;
  return new Date(now - Math.random() * twoYearsMs);
}

function buildProduct() {
  const createdAt = randomPastDate();
  return {
    name: `${randomFrom(ADJECTIVES)} ${randomFrom(NOUNS)}`,
    category: randomFrom(CATEGORIES),
    price: randomPrice(),
    createdAt,
    updatedAt: createdAt,
  };
}


async function seed() {
  await connectDB();

  console.log(`Seeding ${TOTAL_PRODUCTS} products in batches of ${BATCH_SIZE}...`);
  const startTime = Date.now();

  for (let inserted = 0; inserted < TOTAL_PRODUCTS; inserted += BATCH_SIZE) {
    const batchSize = Math.min(BATCH_SIZE, TOTAL_PRODUCTS - inserted);
    const batch = Array.from({ length: batchSize }, buildProduct);

    await Product.insertMany(batch, { timestamps: false });

    console.log(`Inserted ${inserted + batchSize} / ${TOTAL_PRODUCTS}`);
  }

  const seconds = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`Done. Seeded ${TOTAL_PRODUCTS} products in ${seconds}s.`);

  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});

