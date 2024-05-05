import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Box, 
    Card, 
    CardContent, 
    Typography, 
    Grid, 
    Container,
} from '@mui/material';

import NewTicketForm from './NewTicketForm';
import EmailForm from './EmailForm';



const HomePage = () => {
    const [openNewTicketForm, setOpenNewTicketForm] = useState(false)
    const [openEmailForm, setOpenEmailForm] = useState(false);

    const navigate = useNavigate();

    const handleSeeTicketsClick = () => {
        setOpenEmailForm(true)
    };

    const handleAdminClick = () => {
        navigate('/admin');
    }

    return (
            
        <React.Fragment>
            <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
                {/* Welcome Banner */}
                <Box sx={{
                width: '100%',
                backgroundColor: '#2196f3', // Bright blue to stand out
                color: 'white',
                padding: '20px 0',
                borderRadius: '12px',
                boxShadow: 1,
                marginBottom: '24px',
                textAlign: 'center'
                }}>
                <Typography variant="h3" component="div">
                    Welcome to the Help Desk
                </Typography>
                </Box>
        
                {/* Cards */}
                <Grid container spacing={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    height: 300,
                    backgroundColor: '#e3f2fd',
                    borderRadius: '12px',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.3s',
                    cursor: 'pointer',
                    '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: 6,
                        backgroundColor: '#bbdefb',
                    }
                    }}
                    onClick={() => setOpenNewTicketForm(true)}>
                    <CardContent>
                        <Typography variant="h4" component="div" gutterBottom align="center" color="primary">
                        Submit a New Ticket
                        </Typography>
                        <Typography variant="body1" align="center">
                        Click here to open a new support ticket and get help from our support team.
                        </Typography>
                    </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    height: 300,
                    backgroundColor: '#ffe0b2',
                    borderRadius: '12px',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.3s',
                    cursor: 'pointer',
                    '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: 6,
                        backgroundColor: '#ffcc80',
                    }
                    }}
                    onClick={handleSeeTicketsClick}>
                    <CardContent>
                        <Typography variant="h4" component="div" gutterBottom align="center" color="secondary">
                        See Your Tickets
                        </Typography>
                        <Typography variant="body1" align="center">
                        Click here to track all your tickets and chat with an Agent.
                        </Typography>
                    </CardContent>
                    </Card>
                </Grid>
                </Grid>
            </Container>
            <EmailForm open={openEmailForm} onClose={() => setOpenEmailForm(false)} />
            <NewTicketForm open={openNewTicketForm} handleClose={() => setOpenNewTicketForm(false)} />
        </React.Fragment>     
    );
}

export default HomePage;