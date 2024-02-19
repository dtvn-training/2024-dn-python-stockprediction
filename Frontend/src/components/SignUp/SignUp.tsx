import { memo } from 'react';
import type { FC } from 'react';
import React, { useState } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import resets from '../_resets.module.css';
import { ChevronRight } from '../ChevronRight/ChevronRight';
import { EnvelopeLightSolid } from '../EnvelopeLightSolid/EnvelopeLightSolid';
import { IconlyBoldProfileIcon } from './IconlyBoldProfileIcon.js';
import { Line20Icon } from './Line20Icon.js';
import { InterfaceEssentialLock_StyleFi } from '../Password_Login/InterfaceEssentialLock_StyleFi/InterfaceEssentialLock_StyleFi';
import { ShapeIcon2 } from './ShapeIcon2.js';
import { ShapeIcon } from './ShapeIcon.js';
import classes from './SignUp.module.css';

interface Props {
  className?: string;
}
/* @figmaId 2333:220 */
export const SignUp: FC<Props> = memo(function SignUp(props = {}) {

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
        <div className={classes.frame3}>
          <label className={classes.labelRegister}>Họ và tên</label>
          <div className={`${classes.rectangle} ${classes.rectangleName}`}>
            <div className={classes.iconlyBoldProfile}>
              <IconlyBoldProfileIcon className={`${classes.icon4} ${classes.iconName}`} />
            </div>
            <input className={`${classes.input} ${classes.inputEmail}`} placeholder='Email'/>
          </div>
          <label className={classes.labelRegister}>Email</label>
          <div className={`${classes.rectangle} ${classes.rectangleEmail}`}>
            <EnvelopeLightSolid
              className={classes.envelopeLightSolid}
              swap={{
                shape: <ShapeIcon className={classes.icon} />,
              }}
            />
            <input className={`${classes.input} ${classes.inputEmail}`} placeholder='Email'/>
          </div>
          <label className={classes.labelRegister}>Mật khẩu</label>
          <div className={`${classes.rectangle} ${classes.rectanglePassword}`}>
            <InterfaceEssentialLock_StyleFi className={classes.interfaceEssentialLock} />
            <input className={`${classes.input} ${classes.inputPassword}`} placeholder='Mật khẩu'/>
          </div>
          <button className={classes.next_BTN}>
            <div className={classes.next_Icon}>
              <div className={classes.next}>
                <div className={classes.signIn}>Đăng ký</div>
                <div className={classes.icon5}>
                  <ChevronRight />
                </div>
              </div>
            </div>
          </button>
        </div>
        <div className={classes.loginGroup}>
          <div className={classes.line2}></div>
          <div className={classes.loginAction}>
            <a href='#' className={classes.banACoTaiKhoan}>Bạn đã có tài khoản?</a>
            <a href='#' className={classes.AngNhap}>Đăng nhập </a>
          </div>
        </div>
      </div>

    </div>
  );
});
