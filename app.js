// app.js
const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@mongo:27017`;
const client = new MongoClient(uri);

app.get('/', (req, res) => {
    res.send(`Hello, World! Running on port ${PORT}`);
});

app.get('/data', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('test');
        const collection = database.collection('testCollection');

        const data = await collection.find({}).toArray();
        res.json(data);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        res.status(500).send('Error connecting to MongoDB');
    } finally {
        await client.close();
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
