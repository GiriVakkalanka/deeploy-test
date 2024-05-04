import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import NewTicketPage from './components/NewTicketPage';
import UserTicketPage from './components/UserTicketPage';
import AdminPage from './components/AdminPage';

function App() {
  return (
    <div>
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
