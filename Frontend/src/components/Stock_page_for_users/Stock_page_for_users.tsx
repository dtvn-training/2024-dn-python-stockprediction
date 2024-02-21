import { memo } from "react";
import type { FC } from "react";
import Line from "./Line";
import classes from "./Stock_page_for_users.module.css";
import CompanyInfo from "./CompanyInfo/CompanyInfo";
import TableDetail from "./TableDetail/TableDetail";
import Predict from "./Predict/Predict";
import Discuss from "./Discuss/Discuss";
import CommentBox from "./CommentBox/CommentBox";
import Header from "./Header/Header";

interface Props {
  className?: string;
}

export const Stock_page_for_users: FC<Props> = memo(
  function Stock_page_for_users(props = {}) {
    return (
      <div className={` ${classes.root}`}>
        <Header />
        <div className={classes.companyinfo}>
          <CompanyInfo
            symbol="BID"
            follow={false}
          />
        </div>

        <div className={classes.container}>
          <Line />
          <div className={classes.detail}>
            <div className={classes.image13}>
              <img src="../assets/image13.jpg" alt="" />
            </div>
            <div className={classes.tabledetail}>
              <TableDetail
                symbol="BID"
                open="27500"
                high="28000"
                low="26000"
                close="27000"
                volume="78500"
                avgvol10day="96500"
              />
            </div>
          </div>
          <Line />
          <div className={classes.predictcontent}>
            <div className={classes.labelpredict}>
              <span>Dự đoán</span>
            </div>
            <Predict content="Xu hướng là hướng đi chung của thị trường hoặc giá của tài sản. Trong phân tích kĩ thuật, xu hướng được xác định bởi đường xu hướng hoặc hành động giá nổi bật khi giá đang tạo ra mức dao động tăng cao hơn, thể hiện xu hướng tăng, hoặc các mức dao động giảm thấp hơn, thể hiện xu hướng giảm." />
          </div>
          <div className={classes.discusscomment}>
            <Line />
            <div className={classes.text}>Thảo luận</div>
            <div className={classes.wiritecomment}>
              <div className={classes.commentbox}>
                <CommentBox />
              </div>
            </div>
            <Line />
            <Discuss
              username="Michael Busch"
              time="1 hour ago"
              commenttext="mình dự đoán mã cổ phiếu sẽ tăng Xu hướng là hướng đi chung của thị trường hoặc giá của tài sản. Trong phân tích kĩ thuật, xu hướng được xác định bởi đường xu hướng hoặc hành động giá nổi bật khi giá đang tạo ra mức dao động tăng cao hơn, thể hiện xu hướng tăng, hoặc các mức dao động giảm thấp hơn, thể hiện xu hướng giảm."
            />
            <Line />
            <Discuss
              username="Michael Busch"
              time="1 hour ago"
              commenttext="mình dự đoán mã cổ phiếu sẽ tăng"
            />
            <Line />
            <Discuss
              username="Michael Busch"
              time="1 hour ago"
              commenttext="mình dự đoán mã cổ phiếu sẽ tăng"
            />
            <Line />
          </div>
        </div>
      </div>
    );
  }
);
