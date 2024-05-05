import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { Card, CardContent, Typography, Box, IconButton, Collapse, MenuItem, Menu } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChatIcon from '@mui/icons-material/Chat';

import MessageList from './MessageList';
import MessageInput from './MessageInput';

import useMessagesApi from '../hooks/useMessagesApi';
import { useUser } from '../contexts/UserContext';

// const sampleMessages = [
//     {
//       messageText: "Hi, I need help resetting my password.",
//       messageSender: "user@example.com",
//       date: "2022-05-01T14:48:00"
//     },
//     {
//       messageText: "Sure, I can help you with that. Have you tried the 'Forgot Password' link on the login page?",
//       messageSender: "admin@example.com",
//       date: "2022-05-01T15:00:00"
//     },
//     {
//       messageText: "Yes, but I haven't received any email to reset my password.",
//       messageSender: "user@example.com",
//       date: "2022-05-01T15:15:00"
//     }
//   ];

const Ticket = ({ ticketId, name, email, description, date, status: currentStatus }) => {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState('NEW');
  const [messagesExpanded, setMessagesExpanded] = useState(false);
  const { pathname } = useLocation();
  const { email: loggedInEmail } = useUser();
  const { messages, setMessages, postMessage } = useMessagesApi(ticketId);  
  console.log(messages, 'Messages')
  const open = Boolean(anchorEl);
  const descriptionThreshold = 300; // Threshold for description length before expanding

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleStatusClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleMessages = () => {
    setMessagesExpanded(!messagesExpanded);
  };

  const handleSendMessage = (messageText) => {
    const isUser = pathname === '/tickets';
    const sender = isUser ? loggedInEmail : 'Admin';
    const newMessage = {
        messageText,
        ticketId,
        senderId: sender,
        createdAt: new Date().toISOString(),
    }
    postMessage(ticketId, messageText, sender)
    setMessages(prevMessages => [...prevMessages, newMessage]);
    console.log("Message sent:", newMessage);
  };

  const handleStatusChange = (newStatus) => {
    console.log(`Status changed to: ${newStatus}`);
    setStatus(newStatus);
    handleClose();
  };

  const isLongDescription = description.length > descriptionThreshold;

  return (
    <Card sx={{
      width: '90%', 
      minHeight: 200,
      boxShadow: 3,
      '&:hover': {
        boxShadow: 6,
      },
      marginBottom: 2,
      overflow: 'hidden'
    }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h5" component="div">
            {name}
            <IconButton onClick={toggleMessages} size="small" sx={{ ml: 1 }}>
              <ChatIcon />
            </IconButton>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            onClick={handleStatusClick}
            sx={{ cursor: 'pointer', border: '1px solid', padding: '2px 8px' }}
          >
            {status}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {email}
        </Typography>
        <Typography variant="body1" noWrap={!expanded} component="div">
          {isLongDescription && !expanded ? description.substring(0, descriptionThreshold) + '...' : description}
        </Typography>
        {isLongDescription && (
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s'
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        )}
        <Typography variant="body2" color="text.secondary">
          {moment(date).format('MMMM Do, YYYY, h:mm:ss a')}
        </Typography>
        <Menu
          id="status-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: '20ch',
            },
          }}
        >
          {['NEW', 'ONGOING', 'RESOLVED'].map((option) => (
            <MenuItem key={option} onClick={() => handleStatusChange(option)}>
              {option}
            </MenuItem>
          ))}
        </Menu>
        <Collapse in={messagesExpanded} timeout="auto" unmountOnExit>
          {messages && <MessageList messages={messages} />}
          <MessageInput onSend={handleSendMessage} />
        </Collapse>
      </CardContent>
    </Card>
  );
}


export default Ticket;
