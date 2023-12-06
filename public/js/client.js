document.addEventListener('DOMContentLoaded', function () {
    // Update the server URL accordingly
    const socket = new Primus('wss://dev5-lab6-git-main-brendvandeneyndes-projects.vercel.app/primus');



    // Handle incoming updates from the server
    socket.on('data', function (data) {
        console.log('Received update from server:', data);

        // Handle the update (e.g., update statistics on the client)
        // For now, let's log it to the console
    });

    // Add any additional client-side functionality as needed
});
