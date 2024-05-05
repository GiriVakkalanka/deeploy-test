import { useState, useEffect } from 'react';
import { Container, Box } from '@mui/material';
import Ticket from './Ticket';
import useTicketsApi from '../hooks/useTicketsApi';
import { useUser } from '../contexts/UserContext';

const UserTicketPage = ({ tickets }) => {
  const { email } = useUser();
  if (email) {
    console.log(email, 'Email')
  }
  return (
    <div>
      Ticket Page
    </div>
  );
};

export default UserTicketPage;