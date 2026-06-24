require('dotenv').config();
const connectDB = require('./db/connection');
const app = require('./app');

const PORT = process.env.PORT || 3000;

async function start(){
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
    
    // console.log('Ready.....');
    // process.exit(0);
}

start().catch((err) => {
    console.error('Failed to start: ', err.message);
    process.exit(1);
});