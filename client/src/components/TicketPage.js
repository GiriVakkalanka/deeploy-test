import { useState, useEffect } from 'react';
import { Container, Box } from '@mui/material';
import Ticket from './Ticket';
import useTicketsApi from '../hooks/useTicketsApi';
import { useUser } from '../contexts/UserContext';

const UserTicketPage = () => {
    const { email } = useUser();
    const [tickets, setTickets] = useState([]);
    const { getTicketsByEmail } = useTicketsApi();

    useEffect(() => {
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
    }, []);
    return (
        <Container>
            <Box display="flex" flexDirection="column" alignItems="center">
                {tickets && tickets.map((ticket, index) => (
                    <Ticket key={index} {...ticket} />
                ))}
            </Box>
        </Container>
    );
};

export default UserTicketPage;