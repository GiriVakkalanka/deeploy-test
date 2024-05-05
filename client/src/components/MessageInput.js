import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    // Prevent sending empty messages
    if (text.trim()) {
        onSend(text);
        setText('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {  
        event.preventDefault();
        handleSend();
    }
  };

  return (
    <Box display="flex" mt={2}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type your message here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        sx={{ mr: 1 }}
      />
      <Button variant="contained" color="primary" onClick={handleSend}>Send</Button>
    </Box>
  );
};

export default MessageInput;