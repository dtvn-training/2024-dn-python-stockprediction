import { memo } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import { ChevronRight } from './ChevronRight/ChevronRight';
import { EnvelopeLightSolid } from './EnvelopeLightSolid/EnvelopeLightSolid';
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
      <div className={classes.frame2}>
        <div className={classes.AngNhap}>Đăng nhập</div>
      </div>
      <div className={classes.frame3}></div>
      <div className={classes.rectangle1}></div>
      <div className={classes.frame4}>
        <div className={classes.matKhau}>Mật khẩu</div>
      </div>
      <div className={classes.next_BTN}>
        <div className={classes.next_Icon}>
          <div className={classes.next}>
            <div className={classes.AngNhap2}>Đăng nhập</div>
            <div className={classes.icon3}>
              <ChevronRight />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.frame8}>
        <div className={classes.banChuaCoTaiKhoan}>Bạn chưa có tài khoản?</div>
      </div>
      <div className={classes.frame9}>
        <div className={classes.AngKi}>Đăng kí </div>
      </div>
      <div className={classes.line2}></div>
      <div className={classes.rectangle3}></div>
      <div className={classes.frame7}>
        <div className={classes.maXacThuc}>Mã xác thực</div>
      </div>
      <EnvelopeLightSolid
        className={classes.envelopeLightSolid}
        swap={{
          shape: <ShapeIcon className={classes.icon} />,
        }}
      />
      <InterfaceEssentialLock_StyleFi className={classes.interfaceEssentialLock} />
      <div className={classes.guiMa}>Gửi mã</div>
      <div className={classes.frame12}></div>
    </div>
  );
});
