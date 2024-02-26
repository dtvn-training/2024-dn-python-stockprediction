import { memo } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import { ChevronRight } from '../ChevronRight/ChevronRight';
import { EnvelopeLightSolid } from '../EnvelopeLightSolid/EnvelopeLightSolid';
import { InterfaceEssentialLock_StyleFi } from './InterfaceEssentialLock_StyleFi/InterfaceEssentialLock_StyleFi';
import { Line20Icon } from './Line20Icon.js';
import classes from './Password_Login.module.css';
import { ShapeIcon } from './ShapeIcon.js';

interface Props {
  className?: string;
}
/* @figmaId 2388:53 */
export const Password_Login: FC<Props> = memo(function Password_Login(props = {}) {
  return (
    <div className={`${resets.storybrainResets} ${classes.root}`}>
      <div className={classes.line20}>
        <Line20Icon className={classes.icon2} />
      </div>
      <div className={classes.image10}></div>

      <div className={classes.loginForm}>
        <div className={classes.frame2}>
          <div className={classes.AngNhap}>Đăng nhập</div>
        </div>

        <div className={classes.frame3}>
          <label className={classes.labelLogin}>Email</label>
          <div className={`${classes.rectangle} ${classes.rectangleEmail}`}>
            <EnvelopeLightSolid
              className={classes.envelopeLightSolid}
              swap={{
                shape: <ShapeIcon className={classes.icon} />,
              }}
            />
            <input className={`${classes.input} ${classes.inputEmail}`} placeholder='Email'/>
          </div>
          <label className={classes.labelLogin}>Mật khẩu</label>
          <div className={`${classes.rectangle} ${classes.rectanglePassword}`}>
            <InterfaceEssentialLock_StyleFi className={classes.interfaceEssentialLock} />
            <input className={`${classes.input} ${classes.inputPassword}`} placeholder='Mật khẩu' type="password"/>
          </div>
          <div className={classes.next_BTN}>
            <a className={classes.next_Icon} href='#'>
              <div className={classes.next}>
                <div className={classes.AngNhap2}>Đăng nhập</div>
                <div className={classes.icon3}>
                  <ChevronRight />
                </div>
              </div>
            </a>
          </div>
        </div>
        <div className={classes.registerGroup}>
          <div className={classes.line2}></div>
          <div className={classes.registerAction}>
            <a href='#' className={classes.banChuaCoTaiKhoan}>Bạn chưa có tài khoản?</a>
            <a href='#' className={classes.AngKi}>Đăng kí </a>
          </div>  
        </div>
      </div>
    </div>
  );
});