import { List, ListItem, ListItemText, Typography } from '@mui/material';

const MessageList = ({ messages }) => {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: 300, overflow: 'auto' }}>
      {messages.map((message, index) => (
        <ListItem key={index} alignItems="flex-start">
          <ListItemText
            primary={`${message.messageSender} (${new Date(message.date).toLocaleString()})`}
            secondary={<Typography component="span" variant="body2">{message.messageText}</Typography>}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default MessageList;