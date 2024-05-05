import { Box, TextField, Button } from '@mui/material';

const MessageInput = ({ onSend }) => {
  const [text, setText] = React.useState('');

  const handleSend = () => {
    onSend(text);
    setText('');
  };

  return (
    <Box display="flex" mt={2}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type your message here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ mr: 1 }}
      />
      <Button variant="contained" color="primary" onClick={handleSend}>Send</Button>
    </Box>
  );
};

export default MessageInput;