// public/js/client.js

document.addEventListener('DOMContentLoaded', function () {
    const primus = new Primus();

    // Set up WebSocket connection to the server
    const socket = primus.connect();

    // Handle incoming updates from the server
    socket.on('data', function (data) {
        console.log('Received update from server:', data);

        // Handle the update (e.g., update statistics on the client)
        // For now, let's log it to the console
    });

    // Add any additional client-side functionality as needed
});
