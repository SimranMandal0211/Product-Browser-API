require('dotenv').config();
const connectDB = require('./db/connection');

const PORT = process.env.PORT || 3000;

async function start(){
    await connectDB();

    console.log('Ready.....');
    process.exit(0);
}

start().catch((err) => {
    console.error('Failed to start: ', err.message);
    process.exit(1);
});