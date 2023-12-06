// app.js

const express = require('express');
const http = require('http');
const Primus = require('primus');
const path = require('path');
const bodyParser = require('body-parser'); // Import body-parser

const app = express();
const server = http.createServer(app);

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Create a Primus instance and integrate it with the server
const primus = new Primus(server, { transformer: 'websockets' });

// Example data (replace this with your actual data-fetching logic)
const teams = [
    { name: "Team1", score: 100 },
    { name: "Team2", score: 150 },
    { name: "Team3", score: 120 },
];

// Function to broadcast updates to all connected clients
function broadcastUpdates() {
    primus.write({ event: 'updateStats', teams });
}

// Handle WebSocket connections
primus.on('connection', (spark) => {
    console.log('Client connected via WebSocket');

    // Send the initial teams data to the newly connected client
    spark.write({ event: 'updateStats', teams });

    // Handle incoming data from clients
    spark.on('data', (data) => {
        console.log('Received data from client:', data);

        // Handle form submissions
        if (data.event === 'updateStats') {
            const { team, score } = data.payload;
            console.log(`Received form submission - Team: ${team}, Score: ${score}`);

            // Update the scores in the teams array
            const foundTeam = teams.find(t => t.name === team);
            if (foundTeam) {
                foundTeam.score = parseInt(score, 10); // Parse the score as an integer
                console.log(`Updated team - ${team}: ${foundTeam.score}`);

                // Broadcast the updated teams to all connected clients
                broadcastUpdates();
            } else {
                console.log(`Team not found - ${team}`);
            }

            // Log the updated teams array
            console.log('Updated teams:', teams);
        }
    });

    // Handle disconnections
    spark.on('end', () => {
        console.log('Client disconnected');
    });
});

// Route for rendering the updatestats form
app.get('/updatestats', (_, res) => {
    res.render('updatestats');
});

// Route for handling the form submission
app.post('/updatestats', (req, res) => {
    // Handle the form data here
    const { team, score } = req.body;
    console.log(`Received form submission - Team: ${team}, Score: ${score}`);

    // Update the scores in the teams array
    const foundTeam = teams.find(t => t.name === team);
    if (foundTeam) {
        foundTeam.score = parseInt(score, 10); // Parse the score as an integer
        console.log(`Updated team - ${team}: ${foundTeam.score}`);

        // Broadcast the updated teams to all connected clients
        broadcastUpdates();
    } else {
        console.log(`Team not found - ${team}`);
    }

    // Log the updated teams array
    console.log('Updated teams:', teams);

    // Redirect back to the updatestats page or any other page
    res.redirect('/updatestats');
});

// Route for rendering the stats view
app.get('/stats', (_, res) => {
    res.render('stats', { teams });
});

// Route for rendering the home page
app.get('/', (_, res) => {
    res.render('stats', { teams });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
