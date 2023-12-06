// app.js

const express = require('express');
const app = express();

// Set up your other middleware and configurations

// Your other routes...

// Route for rendering the updatestats form
app.get('/updatestats', (req, res) => {
    res.render('updatestats');
});

// Your other routes...

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
