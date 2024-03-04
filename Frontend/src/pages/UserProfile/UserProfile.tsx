import React, { useEffect, useState } from 'react';
import { memo } from 'react';
import type { FC } from 'react';
import classes from './UserProfile.module.css';
import Button from '@mui/material/Button';
import resets from '../../components/_resets.module.css';
import { IconlyBoldProfileIcon } from './IconlyBoldProfileIcon.js';
import { Line20Icon } from './Line20Icon.js';
import { InterfaceEssentialLock_StyleFi } from '../Password_Login/InterfaceEssentialLock_StyleFi/InterfaceEssentialLock_StyleFi';
import { ShapeIcon } from './ShapeIcon.js';
import { EnvelopeLightSolid } from '../../components/EnvelopeLightSolid/EnvelopeLightSolid';
import Header from '../../components/Header/Header';
interface Props {
  className?: string;
}

export const UserProfile: FC<Props> = memo(function UserProfile(props = {}) {
  const [fullnameError, setFullnameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [user, setUser] = useState({
    fullname: '',
    email: '',
    password: ''
  });
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPasswordError(false)
    setUser(prevUser => ({
      ...prevUser,
      password: value
    }));
  };
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFullnameError(false)
    setUser(prevUser => ({
      ...prevUser,
      fullname: value
    }));
  };
  const userToken = localStorage.getItem('token');
  console.log(userToken,'token');
  const [isEditing, setIsEditing] = useState(false);
  const handleUpdate = () => {
    if (!isValidFullname(user.fullname)) {
      setFullnameError(true);
      return;
    } else {
      setFullnameError(false)
    }
    if (!isValidPassword(user.password)) {
      setPasswordError(true);
      return; 
    } else {
      setPasswordError(false)
    } 
    setIsEditing(false);
    fetch('http://localhost:5000/userprofile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        fullname: user.fullname,
        email: user.email,
        password: user.password
      }),
    })
    .then(response => {
      if (response.ok) {
        alert('Cập nhật thông tin thành công!');
      } else {
        alert('Cập nhật thông tin thất bại. Vui lòng thử lại.');
      }
    })
    .catch(error => {
      console.error('Lỗi khi cập nhật thông tin:', error);
      alert('Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại.');
    });
  };

  function isValidFullname(fullname: string) {
    return !/\d/.test(fullname);
  }
  
  function isValidPassword(password: string) {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  }

  useEffect(() => {
    if (userToken) {
      fetch('http://localhost:5000/userprofile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json(); 
        } else {
          throw new Error('Failed to fetch user profile.');
        }
      })
      .then(data => {
        setUser(data);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        alert('Failed to fetch user profile. Please try again.');
      });
    }
  }, [userToken]); // Chỉ gọi fetch khi userToken thay đổi
  
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
              <div className={`${classes.rectangle} ${classes.rectangleName} ${fullnameError ? classes.inputerror : ''}`}>
                <div className={classes.iconlyBoldProfile}>
                  <IconlyBoldProfileIcon className={`${classes.icon4} ${classes.iconName} `} />
                </div>
                <input 
                  id="fullname" 
                  className={`${classes.input} ${classes.inputEmail}`}
                  placeholder=""
                  defaultValue={user.fullname}
                  readOnly={!isEditing}
                  onChange={handleFullNameChange}
                />
                {fullnameError && <span className={classes.errorMessage}>Họ và tên không chứa kí tự số</span>}
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
                  placeholder={user.email} 
                  readOnly
                />
              </div>
              <label className={classes.labelRegister}>Mật khẩu</label>
              <div className={`${classes.rectangle} ${classes.rectanglePassword} ${passwordError ? classes.inputerror : ''}`}>
                <InterfaceEssentialLock_StyleFi className={classes.interfaceEssentialLock} />
                <input 
                  id="passwordInput" 
                  className={`${classes.input} ${classes.inputPassword}`} 
                  placeholder=""
                  defaultValue={user.password}
                  type='password' 
                  readOnly={!isEditing}
                  onChange={handlePasswordChange}
                />
                {passwordError && <span className={classes.errorMessage}>Mật khẩu ít nhất 8 ký tự, có ít nhất một kí tự hoa, số và ký tự đặc biệt</span>}
              </div>
              {isEditing ? (
                <Button className={classes.outlined} variant="outlined" onClick={handleUpdate}>Update</Button>
              ) : (
                <Button className={classes.outlined} variant="outlined" onClick={() => setIsEditing(true)}>Edit</Button>
              )}
              {/* <Button className={classes.outlined} variant="outlined">Update</Button> */}
            </div>
          </div>
        </div>
      </div>
    </div>   
  );
});
