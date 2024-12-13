import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css'
import { LoginForm } from './components/login_form/LoginForm';
import { createContext, useState } from 'react';
import { Home } from './components/home/Home';

export interface LoggedInProp {
  loggedIn: boolean,
  setLogIn: (loggedIn: boolean) => void;
}

export const LoggedInContext = createContext<{
  loggedIn: boolean;
  setLogIn: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  loggedIn: false,
  setLogIn: () => { }
});

// interface LogginInProp {
//   loggedIn: boolean,
//   setLogIn: React.SetStateAction<boolean>;
// }

// export const LogInContext = createContext<LoggedInProp>({
//   loggedIn: false,
//   setLogIn: () => {}
// })

function App() {
  const [loggedIn, setLogIn] = useState<boolean>(false);

  return (
    <LoggedInContext.Provider value={{ loggedIn, setLogIn }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          {/* <Route path="/login" element={<LoginForm />}></Route> */}
        </Routes>
      </BrowserRouter>
    </LoggedInContext.Provider>
  )
}

export default App
