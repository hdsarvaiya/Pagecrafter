const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;




// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.12/dragdrop', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
  

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Schema and Model
const itemSchema = new mongoose.Schema({
  name: String,
  position: {
    x: Number,
    y: Number
  }
});

const Item = mongoose.model('Item', itemSchema);

const formSchema = new mongoose.Schema({
  email: String,
  password: String,
  checked: Boolean
});

const FormData = mongoose.model('FormData', formSchema);

// Routes
app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post('/items', async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.json(newItem);
});

app.delete('/items', async (req, res) => {
  await Item.deleteMany();
  res.json({ message: 'All items deleted' });
});

// Import necessary modules (already imported in your code)

// MongoDB connection (already defined in your code)

// Middleware (already defined in your code)

// Schema and Model (already defined in your code)

// Routes (update or add new route for form data)
app.post('/formdata', async (req, res) => {
    const { email, password, checked } = req.body;
    try {
      const newFormData = new FormData({ email, password, checked });
      await newFormData.save();
      res.status(201).json(newFormData);
    } catch (error) {
      console.error('Error saving form data:', error);
      res.status(500).json({ error: 'Failed to save form data' });
    }
  });
  
  // Server listening (already defined in your code)
  

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
