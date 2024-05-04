require('dotenv').config({ path: './.env'});
const express = require('express');
const cors = require('cors');
const pool = require('./database')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express();

app.use(cors({
    origin: ['https://deeploy-test-client.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));



// Define a route for /api
app.get('/api', (req, res) => {
    // Array of generic users
    console.log('API CALLED')
    const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Bob Johnson' }
    ];

    // Send the users as a response
    res.json(users);
});

app.get('/api/posts', async (req, res) => {
    // Array of generic posts
    // const posts = [
    //     { id: 1, post: 'This app is awesome' },
    //     { id: 2, post: 'This app sucks' },
    //     { id: 3, post: 'I like turtles' }
    // ];
    const posts = await prisma.post.findMany()
    console.log(posts, 'POSTS')
    // Send the posts as a response
    res.json(posts);
});

// Retrieve and return all tickets from the database
app.get('/api/tickets', async (req, res) => {
    try {
        const tickets = await prisma.ticket.findMany();
        res.json(tickets);
    } catch (error) {
        console.error('Error retrieving tickets:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Retrieve and return all tickets submitted by the email address
app.get('/api/tickets/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const tickets = await prisma.ticket.findMany({
            where: {
                email: email
            }
        });
        res.json(tickets);
    } catch (error) {
        console.error('Error retrieving tickets:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Retrieve and return all messages associated with the ticket
app.get('/api/messages/:ticket_id', async (req, res) => {
    const { ticket_id: ticketId } = req.params;
    try {
        const messages = await prisma.message.findMany({
            where: {
                ticketId: parseInt(ticketId)
            }
        });
        res.json(messages);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Start the server on port 5000
app.listen(5000, () => {
    console.log('Server is listening on port 5000');
    console.log(process.env.POSTGRES_URL);
});

//"postgres://default:PWsB8Ur6hcFA@ep-lively-night-a4iab1g4.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"