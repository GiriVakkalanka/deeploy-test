import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const NewTicketForm = ({ open, handleClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();  // Setup navigate for redirection

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.name = name ? "" : "This field is required.";
    tempErrors.email = (/^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/.test(email)) ? "" : "Email is not valid.";
    tempErrors.description = description ? "" : "This field is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log({ name, email, description }); // Logging the data to console
      // Resetting the form fields
      setName('');
      setEmail('');
      setDescription('');
      handleClose();  // Close the dialog
      navigate('/tickets');  // Redirect to view tickets page
    }
  };

  return (
    <Dialog open={open} onClose={() => {
      setName('');  // Clear the state when the dialog is closed
      setEmail('');
      setDescription('');
      handleClose();
    }}>
      <DialogTitle>Submit a New Ticket</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          margin="dense"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Email"
          fullWidth
          margin="dense"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          margin="dense"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={!!errors.description}
          helperText={errors.description}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          setName('');  // Clear the state when the dialog is closed
          setEmail('');
          setDescription('');
          handleClose();
        }}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewTicketForm;