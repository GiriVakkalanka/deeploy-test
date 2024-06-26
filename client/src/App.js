import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

import { useUser } from './contexts/UserContext';

import HomePage from './components/HomePage';
import NewTicketPage from './components/NewTicketPage';
import UserTicketPage from './components/TicketPage';
import AdminPage from './components/AdminPage';
import SubmittedTicketPage from './components/SubmittedTicketPage';


function App() {
  const navigate = useNavigate();
  const { email, saveEmail } = useUser();

  const handleAdminClick = () => {
    navigate('/admin');
  };

  return (
    <div>
      <React.Fragment>
          <AppBar position="static" sx={{
              backgroundColor: '#546e7a',
              color: 'white'
            }}>
              <Toolbar sx={{ justifyContent: 'flex-end' }}>
                <IconButton edge="start" color="inherit" aria-label="home" onClick={() => navigate('/')} sx={{ marginRight: 'auto' }}>
                  <HomeIcon />
                </IconButton>
                <Button color="secondary" onClick={handleAdminClick} variant="contained" sx={{ marginRight: 2 }}>
                  Admin
                </Button>
              </Toolbar>
          </AppBar>
      </React.Fragment>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/new" element={<NewTicketPage />} />
        <Route exact path="/tickets" element={<UserTicketPage />} />
        <Route exact path="/admin" element={<AdminPage />} />
        <Route exact path="/completed" element={<SubmittedTicketPage />} />
      </Routes>
    </div>
  )
}

export default App;
