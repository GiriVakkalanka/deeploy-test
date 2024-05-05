import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@mui/material';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const EmailForm = ({ open, onClose }) => {
    const [email, setEmail] = useState('');
    const { saveEmail } = useUser();
    const navigate = useNavigate();

    const handleSubmit = () => {
        saveEmail(email);
        onClose(); // Close the dialog
        navigate('/tickets'); // Navigate to tickets page
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {  
            event.preventDefault();
            handleSubmit();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Enter Your Email</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    sx={{ '& .MuiInputBase-input': { fontSize: '1.25rem' } }}  // Larger text field styling
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">Submit</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EmailForm;
