require('dotenv').config();
const connectDB = require('../src/db/connection');
const Product = require('../src/models/Product');

async function simulate() {
  await connectDB();

  const newDocs = Array.from({ length: 50 }, (_, i) => ({
    name: `Concurrent Insert ${i}`,
    category: 'electronics',
    price: 19.99,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
  await Product.insertMany(newDocs);
  console.log('Inserted 50 new products.');

  const existing = await Product.find().limit(5);
  for (const doc of existing) {
    doc.price = doc.price + 1;
    await doc.save(); 
  }
  console.log('Updated 5 existing products (price +1, updatedAt changed, createdAt unchanged).');

  process.exit(0);
}

simulate().catch((err) => {
  console.error('Simulation failed:', err);
  process.exit(1);
});