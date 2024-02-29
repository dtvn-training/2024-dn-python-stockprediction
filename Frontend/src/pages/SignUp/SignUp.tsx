import { memo } from 'react';
import type { FC } from 'react';
import React, { useState } from "react";
import axios from 'axios';
import {useNavigate, Link} from "react-router-dom";
import resets from '../../components/_resets.module.css';
import { ChevronRight } from '../../components/ChevronRight/ChevronRight';
import { EnvelopeLightSolid } from '../../components/EnvelopeLightSolid/EnvelopeLightSolid';
import { IconlyBoldProfileIcon } from './IconlyBoldProfileIcon.js';
import { Line20Icon } from './Line20Icon.js';
import { InterfaceEssentialLock_StyleFi } from '../Password_Login/InterfaceEssentialLock_StyleFi/InterfaceEssentialLock_StyleFi';
import { ShapeIcon2 } from './ShapeIcon2.js';
import { ShapeIcon } from './ShapeIcon.js';
import classes from './SignUp.module.css';
import {useSignUpForm} from '../../services/api/authencication.api'

interface Props {
  className?: string;
}
/* @figmaId 2333:220 */
export const SignUp: FC<Props> = memo(function SignUp(props: Props = {}) {
  const { signUpForm, handleChange, signUp } = useSignUpForm();
  // const [email,setEmail] = useState('');
  // const [password,setPassword] = useState('');

  return (
    <div className={`${resets.storybrainResets} ${classes.root}`}>
      <div className={classes.line20}>
        <Line20Icon className={classes.icon3} />
      </div>
      <div className={classes.image10}></div>

      <div className={classes.registerForm}>
        <div className={classes.frame2}>
          <div className={classes.AngKi}>Đăng kí</div>
        </div>
        <form className={classes.frame3} onSubmit={signUp}>
          <label className={classes.labelRegister}>Họ và tên</label>
          <div className={`${classes.rectangle} ${classes.rectangleName}`}>
            <div className={classes.iconlyBoldProfile}>
              <IconlyBoldProfileIcon className={`${classes.icon4} ${classes.iconName}`} />
            </div>
            <input
              className={`${classes.input} ${classes.inputFullname}`}
              onChange={handleChange}
              placeholder='Họ và tên'
              name='fullname'
              value={signUpForm.fullname}
              // text={signUpForm.fullname}
            />
          </div>

          <label className={classes.labelRegister}>Email</label>
          <div className={`${classes.rectangle} ${classes.rectangleEmail}`}>
            <EnvelopeLightSolid
              className={classes.envelopeLightSolid}
              swap={{
                shape: <ShapeIcon className={classes.icon} />,
              }}
            />
            <input
              className={`${classes.input} ${classes.inputEmail}`}
              onChange={handleChange}
              placeholder='Email'
              name='email'
              value={signUpForm.email}
              // text={signUpForm.email}
              type='email'
            />
          </div>

          <label className={classes.labelRegister}>Mật khẩu</label>
          <div className={`${classes.rectangle} ${classes.rectanglePassword}`}>
            <InterfaceEssentialLock_StyleFi className={classes.interfaceEssentialLock} />
            <input
              onChange={handleChange}
              type="password"
              // text={signUpForm.password}
              name="password"
              value={signUpForm.password}
              className={`${classes.input} ${classes.inputPassword}`}
              placeholder='Mật khẩu'
            />
          </div>

          <div className={classes.next_BTN}>
            <button className={classes.next_Icon} type='submit'>
              <div className={classes.next}>
                <div className={classes.AngNhap2}>Đăng kí</div>
                <div className={classes.icon3}>
                  <ChevronRight />
                </div>
              </div>
            </button>
          </div>
        </form>

        <div className={classes.loginGroup}>
          <div className={classes.line2}></div>
          <div className={classes.loginAction}>
            <Link to="/login" className={classes.banACoTaiKhoan} >Bạn đã có tài khoản?</Link>
            <Link to="/login" className={classes.AngNhap}>Đăng nhập </Link>
          </div>
        </div>
      </div>

    </div>
  );
});