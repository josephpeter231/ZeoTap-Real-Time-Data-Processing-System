const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://josephpeterjece2021:AJ9Hg6xTtQBUCoGr@cluster1.xaacunv.mongodb.net/Zeotap?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Define Alert Schema
const alertSchema = new mongoose.Schema({
  city: String,
  date: String,
  threshold: Number,
  
}, { timestamps: true }); // Adding timestamps for createdAt and updatedAt

// Alert model
const Alert = mongoose.model('Alert', alertSchema);

// Store new alert in the database
app.post('/api/alerts', async (req, res) => {
  const { city, date, threshold} = req.body;
  console.log(req.body)
  
  try {
    const newAlert = new Alert({ city, date, threshold });
    await newAlert.save();
    res.status(201).json({ success: true, message: 'Alert saved successfully', alert: newAlert });
  } catch (error) {
    console.error('Error saving alert:', error);
    res.status(500).json({ success: false, message: 'Error saving alert' });
  }
});

// Fetch all alerts
app.get('/api/alerts', async (req, res) => {
  try {
    const alerts = await Alert.find();
    res.status(200).json(alerts);

  } catch (error) {
    console.error('Error fetching alerts:', error);
    res.status(500).json({ success: false, message: 'Error fetching alerts' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
