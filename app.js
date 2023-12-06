// app.js

const express = require('express');
const http = require('http');
const Primus = require('primus');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Create a Primus instance and integrate it with the server
const primus = new Primus(server, { transformer: 'websockets' });

// Example data (replace this with your actual data-fetching logic)
const teams = [
    { name: "Team1", score: 100 },
    { name: "Team2", score: 150 },
    { name: "Team3", score: 120 },
];

// Handle WebSocket connections
primus.on('connection', (spark) => {
    console.log('Client connected via WebSocket');

    // Handle incoming data from clients
    spark.on('data', (data) => {
        console.log('Received data from client:', data);

        // Broadcast the data to all connected clients
        primus.write(data);
    });

    // Handle disconnections
    spark.on('end', () => {
        console.log('Client disconnected');
    });
});

// Route for rendering the updatestats form
app.get('/updatestats', (req, res) => {
    res.render('updatestats');
});

// Route for rendering the stats view
app.get('/stats', (req, res) => {
    res.render('stats', { teams });
});

// Your other routes...

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
