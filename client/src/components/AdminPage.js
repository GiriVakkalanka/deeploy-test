import { useState, useEffect } from 'react';
import { Container, Box } from '@mui/material';
import Ticket from './Ticket';
import useTicketsApi from '../hooks/useTicketsApi';

const AdminPage = () => {
    const [tickets, setTickets] = useState([]);
    const { getAllTickets } = useTicketsApi();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllTickets();
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

export default AdminPage;


//