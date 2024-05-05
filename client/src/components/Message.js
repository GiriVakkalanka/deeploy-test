import React from 'react';
import { Typography, Box } from '@mui/material';

const Message = ({ messageText, userId, adminId }) => {
  const isFromAdmin = userId === adminId;

  return (
    <Box sx={{
      textAlign: isFromAdmin ? 'right' : 'left',
      margin: '8px',
      padding: '10px',
      backgroundColor: isFromAdmin ? '#e0f2f1' : '#bbdefb',
      borderRadius: '10px',
      maxWidth: '80%',
      marginLeft: isFromAdmin ? 'auto' : 'inherit',
      marginRight: isFromAdmin ? 'inherit' : 'auto',
    }}>
      <Typography variant="body2" component="p" sx={{ wordWrap: 'break-word' }}>
        {messageText}
      </Typography>
    </Box>
  );
};

export default Message;