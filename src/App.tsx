import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css'
import { LoginForm } from './components/login_form/LoginForm';
import { useState } from 'react';
import { Home } from './components/home/Home';
import { RegistrationForm } from './components/registration_form/RegistrationForm';
import { Account } from './interfaces/Account';
import { AccountContext, LogInContext } from './contexts/Contexts';

function App() {
  const [loggedIn, setLogIn] = useState<boolean>(false);
  const [account, setAccount] = useState<Account>({} as Account);

  function Content() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path='/register' element={<RegistrationForm />}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
          </Routes>
        </BrowserRouter>
      </>
    );
  }

  return (
    <>
      <LogInContext.Provider value={{ loggedIn, setLogIn }}>
        <AccountContext.Provider value={{ account, setAccount }}>
          <Content />
        </AccountContext.Provider>
      </LogInContext.Provider>
    </>
  )
}

export default App
