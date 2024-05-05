import { useEffect, useRef } from 'react';
import moment from 'moment';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <List 
      sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: 300, overflow: 'auto' }}
      ref={messagesEndRef}
    >
      {messages.map((message, index) => (
        <ListItem key={index} alignItems="flex-start">
          <ListItemText
            primary={`${message.senderId} (${moment(message.createdAt).format('MMMM Do YYYY, h:mm:ss a')})`}
            secondary={<Typography component="span" variant="body2">{message.messageText}</Typography>}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default MessageList;