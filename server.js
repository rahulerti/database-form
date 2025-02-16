const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Schema
const DataSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const DataModel = mongoose.model('Data', DataSchema); //data is name in mongodb 

// Routes
app.post('/admin', async (req, res) => { // admin is collection name in mongodb
    try {
        const newData = new DataModel(req.body);
        await newData.save();
        res.status(201).json({ message: 'Data stored successfully', data: newData });
    } catch (error) {
        res.status(500).json({ message: 'Error storing data', error });
    }
});

app.get('/data', async (req, res) => {
    try {
        const allData = await DataModel.find({}, `name email age`);
        res.status(200).json(allData);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving data', error });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
