import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';

import HomePage from './components/HomePage';
import NewTicketPage from './components/NewTicketPage';
import UserTicketPage from './components/TicketPage';
import AdminPage from './components/AdminPage';

import {
  AppBar,
  Toolbar,
  Button
} from '@mui/material';

function App() {
  const navigate = useNavigate();
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
      </Routes>
    </div>
  )
}

export default App;
