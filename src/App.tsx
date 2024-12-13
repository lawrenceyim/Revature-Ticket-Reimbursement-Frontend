import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css'
import { LoginForm } from './components/login_form/LoginForm';
import { createContext, useState } from 'react';
import { Home } from './components/home/Home';
import { RegistrationForm } from './components/registration_form/RegistrationForm';

interface LoggedInProp {
  loggedIn: boolean,
  setLogIn: (loggedIn: boolean) => void;
}

export const LogInContext = createContext<LoggedInProp>({
  loggedIn: false,
  setLogIn: () => { }
})

function App() {
  const [loggedIn, setLogIn] = useState<boolean>(false);

  return (
    <>
      <LogInContext.Provider value={{ loggedIn, setLogIn }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path='/register' element={<RegistrationForm />}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
          </Routes>
        </BrowserRouter>
      </LogInContext.Provider>
    </>
  )
}

export default App
