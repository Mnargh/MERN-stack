//bringing in express from dependencies
const express = require('express')
const connectDB = require('./config/db')
const path = require('path')

const app = express();

// creating endpoint to test. Makes get request to / with callback request response
// res.send sends data to the browser
// app.get('/', (req, res) => res.send(`API Running`));

// connect to DB
connectDB();

// init middleware
app.use(express.json({ extended: false }));

// Define Routes
// makes '/api/*' pertain to the '/'
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => 
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}

// if no port set then use 5000
const PORT = process.env.PORT || 5000;

// listening on a port. Callback for if it connects
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

