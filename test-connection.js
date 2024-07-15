const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/dragdrop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 50000 // Increase timeout to 50 seconds
})
.then(() => {
  console.log('MongoDB connected');
  mongoose.connection.close();
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
