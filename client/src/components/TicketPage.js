import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';
import Ticket from './Ticket';
import useTicketsApi from '../hooks/useTicketsApi';
import { useUser } from '../contexts/UserContext';
import EmailForm from './EmailForm';

const UserTicketPage = () => {
    const { email } = useUser();
    const [tickets, setTickets] = useState([]);
    const [openEmailForm, setOpenEmailForm] = useState(!email);
    const { getTicketsByEmail } = useTicketsApi();
    const navigate = useNavigate();

    useEffect(() => {
        if(!email) {
            navigate('/')
        }    
        const fetchData = async () => {
            try {
                const response = await getTicketsByEmail(email);
                console.log(response, 'Response')
                setTickets(response);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchData();
    }, [email]);
    return (
        <Container>
            <Box display="flex" flexDirection="column" alignItems="center" marginTop={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    My Tickets
                </Typography>
                {tickets && tickets.map((ticket, index) => (
                    <Ticket key={index} {...ticket} />
                ))}
            </Box>
        </Container>
    );
};

export default UserTicketPage;