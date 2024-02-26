import { memo } from 'react';
import type { FC } from 'react';

import classes from './App.module.css';
import resets from './components/_resets.module.css';
import { Password_Login } from './components/Password_Login/Password_Login';
import { SignUp } from './components/SignUp/SignUp';
import { Stock_page_for_users } from './components/Stock_page_for_users/Stock_page_for_users';


interface Props {
  className?: string;
}
export const App: FC<Props> = memo(function App(props = {}) {
  return (
    <div className={`${resets.storybrainResets} ${classes.root}`}>
      <SignUp/>
    </div>
  );
});
