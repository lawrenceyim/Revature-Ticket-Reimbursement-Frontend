import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { LoginForm } from './components/login_form/LoginForm';
import { Home } from './components/home/Home';
import { RegistrationForm } from './components/registration_form/RegistrationForm';
import { NavBar } from './components/nav_bar/NavBar';
import { LOGIN_URL, MENU_URL, REGISTRATION_URL, ROOT_URL } from './consts/PageUrls';

function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path={ROOT_URL} element={<LoginForm />}></Route>
        <Route path={REGISTRATION_URL} element={<RegistrationForm />}></Route>
        <Route path={LOGIN_URL} element={<LoginForm />}></Route>
        <Route path={MENU_URL} element={<NavBar />}></Route>
      </Routes>
    </BrowserRouter>
  </>);
}

export default App
