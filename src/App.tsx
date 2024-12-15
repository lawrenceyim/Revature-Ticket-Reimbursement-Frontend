import './App.css'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { LoginForm } from './components/login_form/LoginForm';
import { RegistrationForm } from './components/registration_form/RegistrationForm';
import { CREATE_TICKET_URL, LOGIN_URL, MENU_URL, REGISTRATION_URL, ROOT_URL, VIEW_TICKETS_URL } from './consts/PageUrls';
import { MainMenu } from './components/menu/MainMenu';

function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path={CREATE_TICKET_URL} element={<>CREATE TICKET PAGE</>}></Route>
        <Route path={LOGIN_URL} element={<LoginForm />}></Route>
        <Route path={MENU_URL} element={<MainMenu />}></Route>
        <Route path={REGISTRATION_URL} element={<RegistrationForm />}></Route>
        <Route path={ROOT_URL} element={<Navigate to={LOGIN_URL} />}></Route>
        <Route path={VIEW_TICKETS_URL} element={<>VIEW TICKETS PAGE</>}></Route>
      </Routes>
    </BrowserRouter>
  </>);
}

export default App
