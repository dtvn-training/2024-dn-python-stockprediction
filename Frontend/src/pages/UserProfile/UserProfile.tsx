import React, { useEffect, useState } from 'react';
import { memo } from 'react';
import type { FC } from 'react';
import classes from './UserProfile.module.css';
import { Avatar, Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import resets from '../../components/_resets.module.css';
import { IconlyBoldProfileIcon } from './IconlyBoldProfileIcon.js';
import { Line20Icon } from './Line20Icon.js';
import { InterfaceEssentialLock_StyleFi } from '../Password_Login/InterfaceEssentialLock_StyleFi/InterfaceEssentialLock_StyleFi';
import { ShapeIcon2 } from './ShapeIcon2.js';
import { ShapeIcon } from './ShapeIcon.js';
import { EnvelopeLightSolid } from '../../components/EnvelopeLightSolid/EnvelopeLightSolid';
import { ChevronRight } from '../../components/ChevronRight/ChevronRight';
import {Link, useNavigate}from "react-router-dom";
import Header from '../../components/Header/Header';
import { useParams } from 'react-router';
import { getUserByEmail } from '../../services/api/user.api'
interface Props {
  className?: string;
}

export const UserProfile: FC<Props> = memo(function UserProfile(props = {}) {
  const [user, setUser] = useState({
    fullname: '',
    email: '',
    password: ''
  });
  useEffect(() => {
    getUserByEmail()
        .then(data => {
            setUser(data);
        })
        .catch(error => {
            console.log('Error fetching user:', error);
        });
  }, []);
  
  return (
    <div className={`${resets.storybrainResets} ${classes.root}`}>
      <div className={classes.userprofile}>
        <Header/>
        <div className={classes.main}>
          <div className={classes.line20}>
            <Line20Icon className={classes.icon3} />
          </div>
          <div className={classes.registerForm}>
            <div className={classes.frame2}>
              <div className={classes.profile}>Thông tin cá nhân</div>
            </div>
            <div className={classes.frame3}>
              <label className={classes.labelRegister}>Họ và tên</label>
              <div className={`${classes.rectangle} ${classes.rectangleName}`}>
                <div className={classes.iconlyBoldProfile}>
                  <IconlyBoldProfileIcon className={`${classes.icon4} ${classes.iconName}`} />
                </div>
                <input className={`${classes.input} ${classes.inputEmail}`}placeholder={user.fullname} readOnly/>
                <Button className={classes.outlined} variant="outlined">Update</Button>
              </div>
              <label className={classes.labelRegister}>Email</label>
              <div className={`${classes.rectangle} ${classes.rectangleEmail}`}>
                <EnvelopeLightSolid
                  className={classes.envelopeLightSolid}
                  swap={{
                    shape: <ShapeIcon className={classes.icon} />,
                  }}
                />
                <input className={`${classes.input} ${classes.inputEmail}`} placeholder={user.email} readOnly/>
              </div>
              <label className={classes.labelRegister}>Mật khẩu</label>
              <div className={`${classes.rectangle} ${classes.rectanglePassword}`}>
                <InterfaceEssentialLock_StyleFi className={classes.interfaceEssentialLock} />
                <input className={`${classes.input} ${classes.inputPassword}`} placeholder='Mật khẩu' value={user.password} type='password' readOnly/>
                <Button className={classes.outlined} variant="outlined">Update</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>   
  );
});
