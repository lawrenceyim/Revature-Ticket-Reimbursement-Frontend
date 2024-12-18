import './App.css'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { LoginForm } from './components/login_form/LoginForm';
import { RegistrationForm } from './components/registration_form/RegistrationForm';
import { CREATE_TICKET_URL, LOGIN_URL, MANAGE_USERS_URL, MENU_URL, REGISTRATION_URL, ROOT_URL, VIEW_TICKETS_URL } from './consts/PageUrls';
import { MainMenu } from './components/menu/MainMenu';
import { TicketCreator } from './components/tickets/create_ticket/TicketCreator';
import { TicketViewer } from './components/tickets/view_tickets/TicketViewer';
import { PrivateRoute } from './components/route/PrivateRoute';
import { UnathenticatedRoute } from './components/route/UnauthenticatedRoute';
import { UserManagement } from './components/user_management/UserManagement';

function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path={CREATE_TICKET_URL} element={<PrivateRoute reactNode={<TicketCreator />} />} />
        <Route path={LOGIN_URL} element={<UnathenticatedRoute reactNode={<LoginForm />} />} />
        <Route path={MANAGE_USERS_URL} element={<PrivateRoute reactNode={<UserManagement />} />} />
        <Route path={MENU_URL} element={<PrivateRoute reactNode={<MainMenu />} />} />
        <Route path={REGISTRATION_URL} element={<UnathenticatedRoute reactNode={<RegistrationForm />} />} />
        <Route path={ROOT_URL} element={<Navigate to={LOGIN_URL} />} />
        <Route path={VIEW_TICKETS_URL} element={<PrivateRoute reactNode={<TicketViewer />} />} />
      </Routes>
    </BrowserRouter>
  </>);
}

export default App
