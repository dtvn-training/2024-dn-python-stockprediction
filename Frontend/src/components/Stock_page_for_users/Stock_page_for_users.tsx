import { memo } from "react";
import type { FC } from "react";

import resets from "../_resets.module.css";
import { AvatarGoesHere } from "./AvatarGoesHere/AvatarGoesHere";
import { InterfaceEssentialTrash_StyleF } from "./InterfaceEssentialTrash_StyleF/InterfaceEssentialTrash_StyleF";
import { InterfaceEssentialTrashIcon2 } from "./InterfaceEssentialTrashIcon2.js";
import { InterfaceEssentialTrashIcon3 } from "./InterfaceEssentialTrashIcon3.js";
import { InterfaceEssentialTrashIcon } from "./InterfaceEssentialTrashIcon.js";
import { Line } from "./Line.js";
import { ReacticonIcon2 } from "./ReacticonIcon2.js";
import { ReacticonIcon3 } from "./ReacticonIcon3.js";
import { ReacticonIcon } from "./ReacticonIcon.js";
import classes from "./Stock_page_for_users.module.css";
import { UserCircle } from "./UserCircle/UserCircle";
import SearchBox from "./SearchBox/SearchBox";
import CompanyInfo from "./CompanyInfo/CompanyInfo";
import TableDetail from "./TableDetail/TableDetail";
import Predict from "./Predict/Predict";
interface Props {
  className?: string;
}
/* @figmaId 2347:216 */
export const Stock_page_for_users: FC<Props> = memo(function Stock_page_for_users(
  props = {}
) {
  return (
    <div className={`${resets.storybrainResets} ${classes.root}`}>
      <div className={classes.header}>
        <div className={classes.logo}></div>
        <div className={classes.homepage}>Trang chủ</div>
        <div className={classes.darkmode}></div>
        <div className={classes.search}>
          <SearchBox />
        </div>
        <div className={classes.line20}>
          <Line className={classes.icon9} />
        </div>
      </div>
      <div className={classes.companyinfo}>
        <CompanyInfo
          companyname="Ngân hàng Thương Mại Cổ Phần Á Châu"
          symbol="ACB"
        />
      </div>
      <div className={classes.line}>
        <Line className={classes.icon4} />
      </div>

      {/* <div className={classes._891}>8.91</div>
        <div className={classes._00}>0.00/0.00%</div> */}
      <div className={classes.line22}>
        <Line className={classes.icon5} />
      </div>
      <div className={classes.image13}></div>
      <div className={classes.tabledetail}>
        <TableDetail
          open="27500"
          high="28000"
          low="26000"
          close="27000"
          volume="78500"
          avgvol10day="96500"
        />
      </div>

      <div className={classes.predictcontent}>
        <Predict content="Xu hướng là hướng đi chung của thị trường hoặc giá của tài sản. Trong phân tích kĩ thuật, xu hướng được xác định bởi đường xu hướng hoặc hành động giá nổi bật khi giá đang tạo ra mức dao động tăng cao hơn, thể hiện xu hướng tăng, hoặc các mức dao động giảm thấp hơn, thể hiện xu hướng giảm." />
      </div>
      <div className={classes.duOan}>Dự đoán</div>
      <div className={classes.themBinhLuan}>Thêm bình luận</div>
      <div className={classes.thaoLuan}>Thảo luận</div>
      <div className={classes.rectangle1362}></div>
      <div className={classes.rectangle1363}></div>
      <InterfaceEssentialTrash_StyleF
        className={classes.interfaceEssentialTrash}
        swap={{
          icon: <InterfaceEssentialTrashIcon className={classes.icon} />,
        }}
      />
      <div className={classes.edit}>Edit</div>
      <div className={classes.borderBottom}></div>
      <div className={classes.comment}>Comment</div>
      <div className={classes.reactIcon}>
        <ReacticonIcon className={classes.icon6} />
      </div>
      <div className={classes.highlight}></div>
      <div className={classes.unnamed}></div>
      <div className={classes.text}>Mình dự đoán mã cổ phiếu sẽ tăng </div>
      <div className={classes.michaelBusch}>Michael Busch</div>
      <div className={classes._1HourAgo}>1 hour ago</div>
      <AvatarGoesHere className={classes.avatarGoesHere} />
      <div className={classes.rectangle13622}></div>
      <div className={classes.rectangle13632}></div>
      <InterfaceEssentialTrash_StyleF
        className={classes.interfaceEssentialTrash2}
        swap={{
          icon: <InterfaceEssentialTrashIcon2 className={classes.icon2} />,
        }}
      />
      <div className={classes.edit2}>Edit</div>
      <div className={classes.borderBottom2}></div>
      <div className={classes.comment2}>Comment</div>
      <div className={classes.reactIcon2}>
        <ReacticonIcon2 className={classes.icon7} />
      </div>
      <div className={classes.highlight2}></div>
      <div className={classes.unnamed2}></div>
      <div className={classes.text2}>Mình dự đoán mã cổ phiếu sẽ tăng </div>
      <div className={classes.michaelBusch2}>Michael Busch</div>
      <div className={classes._1HourAgo2}>1 hour ago</div>
      <AvatarGoesHere className={classes.avatarGoesHere2} />
      <div className={classes.rectangle13623}></div>
      <div className={classes.rectangle13633}></div>
      <div className={classes.edit3}>Edit</div>
      <div className={classes.borderBottom3}></div>
      <div className={classes.comment3}>Comment</div>
      <div className={classes.reactIcon3}>
        <ReacticonIcon3 className={classes.icon8} />
      </div>
      <div className={classes.highlight3}></div>
      <div className={classes.unnamed3}></div>
      <div className={classes.text3}>Mình dự đoán mã cổ phiếu sẽ tăng </div>
      <div className={classes.michaelBusch3}>Michael Busch</div>
      <div className={classes._1HourAgo3}>1 hour ago</div>
      <AvatarGoesHere className={classes.avatarGoesHere3} />
      <InterfaceEssentialTrash_StyleF
        className={classes.interfaceEssentialTrash3}
        swap={{
          icon: <InterfaceEssentialTrashIcon3 className={classes.icon3} />,
        }}
      />

      <UserCircle className={classes.userCircle} />
    </div>
  );
});
