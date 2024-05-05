require('dotenv').config({ path: './.env'});
const express = require('express');
const cors = require('cors');
const pool = require('./database')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const app = express();

app.use(cors({
    origin: ['https://deeploy-test-client.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
}));

app.use(express.json());

// Retrieve and return tickets from the database
app.get('/api/tickets', async (req, res) => {
    // Check for a query string paramater email
    const { email } = req.query;
    if (email) {
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
        return;
    }

    try {
        const tickets = await prisma.ticket.findMany();
        res.json(tickets);
    } catch (error) {
        console.error('Error retrieving tickets:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Post a new ticket to the database
app.post('/api/tickets', async (req, res) => {
    const { name, email, description } = req.body;
    try {
        const ticket = await prisma.ticket.create({
            data: {
                name: name,
                email: email,
                description: description
            }
        });
        
        res.json(ticket);
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Patch update a ticket status
app.patch('/api/tickets/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const ticket = await prisma.ticket.update({
            where: {
                ticketId: parseInt(id)
            },
            data: {
                status: status
            }
        });
        res.json(ticket);
    } catch (error) {
        console.error('Error updating ticket:', error);
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

// Post a new message to the database
app.post('/api/messages', async (req, res) => {
    const { ticketId, messageText, senderId } = req.body;
    try {
        const newMessage = await prisma.message.create({
            data: {
                ticketId: ticketId,
                messageText: messageText,
                senderId: senderId
            }
        });
        res.json(newMessage);
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Start the server on port 5000
app.listen(5000, () => {
    console.log('Server is listening on port 5000');
});
