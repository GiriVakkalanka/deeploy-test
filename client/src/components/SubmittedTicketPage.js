import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Box, Container } from '@mui/material';

function SubmittedTicketPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#f7f7f7'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#2e1534' }}>
          Thank you for submitting a ticket.
        </Typography>
        <Typography variant="h5" align="center" sx={{ color: '#2e1534' }}>
          Our Agents will take a look and get back to you shortly!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 4, borderRadius: 4, padding: '10px 30px', backgroundColor: '#5c6bc0' }}
          onClick={() => navigate('/')}
        >
          Navigate Home
        </Button>
      </Box>
    </Container>
  );
}

export default SubmittedTicketPage;
