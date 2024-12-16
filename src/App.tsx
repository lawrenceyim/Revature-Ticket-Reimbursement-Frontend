import './App.css'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { LoginForm } from './components/login_form/LoginForm';
import { RegistrationForm } from './components/registration_form/RegistrationForm';
import { CREATE_TICKET_URL, LOGIN_URL, MENU_URL, REGISTRATION_URL, ROOT_URL, VIEW_TICKETS_URL } from './consts/PageUrls';
import { MainMenu } from './components/menu/MainMenu';
import { TicketCreator } from './components/tickets/create_ticket/TicketCreator';
import { TicketViewer } from './components/tickets/view_tickets/TicketViewer';

function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path={CREATE_TICKET_URL} element={<TicketCreator />}></Route>
        <Route path={LOGIN_URL} element={<LoginForm />}></Route>
        <Route path={MENU_URL} element={<MainMenu />}></Route>
        <Route path={REGISTRATION_URL} element={<RegistrationForm />}></Route>
        <Route path={ROOT_URL} element={<Navigate to={LOGIN_URL} />}></Route>
        <Route path={VIEW_TICKETS_URL} element={<TicketViewer />}></Route>
      </Routes>
    </BrowserRouter>
  </>);
}

export default App
