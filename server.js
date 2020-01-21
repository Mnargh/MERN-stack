//bringing in express from dependencies
const express = require('express')

const app = express();

// creating endpoint to test. Makes get request to / with callback request response
// res.send sends data to the browser
app.get('/', (req, res) => res.send(`API Running`))

// if no port set then use 5000
const PORT = process.env.PORT || 5000;

// listening on a port. Callback for if it connects
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

