import { memo } from 'react';
import type { FC } from 'react';
import React, { useState } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import resets from '../_resets.module.css';
import { ChevronRight } from './ChevronRight/ChevronRight';
import { EnvelopeLightSolid } from './EnvelopeLightSolid/EnvelopeLightSolid';
import { IconlyBoldProfileIcon } from './IconlyBoldProfileIcon.js';
import { Line20Icon } from './Line20Icon.js';
import { MobileLightSolid } from './MobileLightSolid/MobileLightSolid';
import { ShapeIcon2 } from './ShapeIcon2.js';
import { ShapeIcon } from './ShapeIcon.js';
import classes from './SignUp.module.css';

interface Props {
  className?: string;
}
/* @figmaId 2333:220 */
export const SignUp: FC<Props> = memo(function SignUp(props = {}) {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  return (
    <div className={`${resets.storybrainResets} ${classes.root}`}>
      <div className={classes.line20}>
        <Line20Icon className={classes.icon3} />
      </div>
      <div className={classes.image10}></div>
      <div className={classes.frame2}>
        <div className={classes.AngKi}>Đăng kí</div>
      </div>
      <div className={classes.frame3}></div>
      <div className={classes.rectangle1}></div>
      <div className={classes.iconlyBoldProfile}>
        <IconlyBoldProfileIcon className={classes.icon4} />
      </div>
      <div className={classes.frame4}>
        <input className={classes.ten} type="text" id="name" name="myInput" placeholder='Tên'/>
        {/* <div className={classes.ten}>Tên</div> */}
      </div>
      <div className={classes.rectangle12}></div>
      <div className={classes.frame8}>
        {/* <div className={classes.soIenThoai}>Số điện thoại</div> */}
        <input className={classes.soIenThoai} type="password" name="myInput" placeholder='Mật khẩu'/>
      </div>
      <MobileLightSolid
        className={classes.mobileLightSolid}
        swap={{
          shape: <ShapeIcon className={classes.icon} />,
        }}
      />
      <button className={classes.next_BTN}>
        <div className={classes.next_Icon}>
          <div className={classes.next}>
            <div className={classes.tiepTuc}>Tiếp tục</div>
            <div className={classes.icon5}>
              <ChevronRight />
            </div>
          </div>
        </div>
      </button>
      <a className={classes.frame82}>
        <span className={classes.banACoTaiKhoan}>Bạn đã có tài khoản?</span>
      </a>
      <a className={classes.frame9}>
        <span className={classes.AngNhap}>Đăng nhập </span>
      </a>
      <div className={classes.line2}></div>
      <div className={classes.rectangle3}></div>
      <div className={classes.frame7}>
        {/* <div className={classes.email}>Email</div> */}
        <input className={classes.email} type="text" value={email} placeholder='Email'/>
      </div>
      <EnvelopeLightSolid
        className={classes.envelopeLightSolid}
        swap={{
          shape: <ShapeIcon2 className={classes.icon2} />,
        }}
      />
    </div>
  );
});
