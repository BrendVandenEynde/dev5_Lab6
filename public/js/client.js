document.addEventListener('DOMContentLoaded', function () {
    // Update the server URL accordingly
    const socket = new Primus('https://dev5-lab6-brendvandeneyndes-projects.vercel.app/');


    // Handle incoming updates from the server
    socket.on('data', function (data) {
        console.log('Received update from server:', data);

        // Handle the update (e.g., update statistics on the client)
        // For now, let's log it to the console
    });

    // Add any additional client-side functionality as needed
});
