const express = require('express');

const app = express();

// Define a route for /api
app.get('/api', (req, res) => {
    // Array of generic users
    const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Bob Johnson' }
    ];

    // Send the users as a response
    res.json(users);
});

// Start the server on port 5000
app.listen(5000, () => {
    console.log('Server is listening on port 5000');
});