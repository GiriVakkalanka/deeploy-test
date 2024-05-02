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

app.get('/api/posts', (req, res) => {
    // Array of generic posts
    const posts = [
        { id: 1, post: 'This app is awesome' },
        { id: 2, post: 'This app sucks' },
        { id: 3, post: 'I like turtles' }
    ];

    // Send the posts as a response
    res.json(posts);
});

// Start the server on port 5000
app.listen(5000, () => {
    console.log('Server is listening on port 5000');
});