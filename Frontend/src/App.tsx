import { memo } from 'react';
import type { FC } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import classes from './App.module.css';
import resets from './components/_resets.module.css';
import { Password_Login } from './pages/Password_Login/Password_Login';
import { SignUp } from './pages/SignUp/SignUp';
import { Stock_page_for_users } from './components/Stock_page_for_users/Stock_page_for_users';
import { Dashboard } from './pages/Dashboard/Dashboard';

interface Props {
  className?: string;
}
export const App: FC<Props> = memo(function App(props = {}) {
  return (
    <div className={`${resets.storybrainResets} ${classes.root}`}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Dashboard />}
          />
          <Route
            path="/about"
            element={<Stock_page_for_users />}
          />
          <Route
            path="/signup"
            element={<SignUp />}
          />
          <Route
            path="/login"
            element={<Password_Login />}
          />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
});




