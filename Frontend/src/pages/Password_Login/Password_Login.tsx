import { memo, useState } from "react";
import { Link } from "react-router-dom";
import type { FC } from "react";
import axios from "axios";
import resets from "../../components/_resets.module.css";
import { ChevronRight } from "../../components/ChevronRight/ChevronRight";
import { EnvelopeLightSolid } from "../../components/EnvelopeLightSolid/EnvelopeLightSolid";
import { InterfaceEssentialLock_StyleFi } from "./InterfaceEssentialLock_StyleFi/InterfaceEssentialLock_StyleFi";
import { Line20Icon } from "./Line20Icon";
import classes from "./Password_Login.module.css";
import { ShapeIcon } from "./ShapeIcon";
import { useLoginForm } from "../../services/api/authencication.api";
interface Props {
  className?: string;
}

export const Password_Login: FC<Props> = memo(function Password_Login(
  props: Props = {}
) {
  const { loginForm, handleChange, logmeIn } = useLoginForm();

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

        <form className={classes.frame3} onSubmit={logmeIn}>
          <label className={classes.labelLogin}>Email</label>
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
              placeholder="Email"
              name="email"
              value={loginForm.email}
              type="email"
            />
          </div>
          <label className={classes.labelLogin}>Mật khẩu</label>
          <div className={`${classes.rectangle} ${classes.rectanglePassword}`}>
            <InterfaceEssentialLock_StyleFi
              className={classes.interfaceEssentialLock}
            />
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={loginForm.password}
              className={`${classes.input} ${classes.inputPassword}`}
              placeholder="Mật khẩu"
            />
          </div>
          <div className={classes.next_BTN}>
            <button className={classes.next_Icon}>
              <div className={classes.next}>
                <div className={classes.AngNhap2}>Đăng nhập</div>
                <div className={classes.icon3}>
                  <ChevronRight />
                </div>
              </div>
            </button>
          </div>
        </form>
        <div className={classes.register}>
          <div className={classes.frame8}>
            <Link to="/signup" className={classes.banChuaCoTaiKhoan}>
              Bạn chưa có tài khoản?
            </Link>
          </div>
          <div className={classes.frame9}>
            <Link to="/signup" className={classes.AngKi}>
              Đăng kí
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});
