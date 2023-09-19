const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Configure ejs as the view engine
app.set('view engine', 'ejs');

app.set('views', __dirname + '/views'); // Corrected views directory path

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb://mongo:c3SItJ815fV9LD0psnkA@containers-us-west-42.railway.app:7475", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

// Middleware for handling CORS and other headers (if needed)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api', productRoutes , (req, res) => {
  res.render('main'); // Render the index template

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
