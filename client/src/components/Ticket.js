import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, IconButton, Collapse, MenuItem, Menu } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Ticket = ({ name, email, description, date, status }) => {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const descriptionThreshold = 300; // Threshold for description length

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleStatusClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (newStatus) => {
    console.log(`Status changed to: ${newStatus}`);
    handleClose();
  };

  const isLongDescription = description.length > descriptionThreshold;

  return (
    <Card sx={{
      width: '90%', // Stretching width to 90% of its container
      minHeight: 200, // minimum height
      boxShadow: 3,
      '&:hover': {
        boxShadow: 6,
      },
      marginBottom: 2,
      overflow: 'hidden' // hide overflow, control visibility with Collapse
    }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h5" component="div">
            {name}
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
          {new Date(date).toLocaleDateString()}
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
      </CardContent>
    </Card>
  );
};

export default Ticket;
