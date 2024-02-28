import { memo } from "react";
import type { FC } from "react";
import Line from "./Line";
import classes from "./Stock_page_for_users.module.css";
import CompanyInfo from "./CompanyInfo/CompanyInfo";
import TableDetail from "./TableDetail/TableDetail";
import Predict from "./Predict/Predict";
import Discuss from "./Discuss/Discuss";
import CommentBox from "./CommentBox/CommentBox";
import Header from "../../components/Header/Header";
import Candlestick from "./Candlestick/Candlestick";
import { useParams } from 'react-router-dom';
import { getAllComments } from '../../services/api/comment.api';
import React, { useEffect, useState} from "react";


interface Props {
  className?: string;
  
}

export const Stock_page_for_users: FC<Props> = memo(
  function Stock_page_for_users(props = {}) {
    const { stocks } = useParams();    
    const [comment, setComments] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getAllComments( {stocks} );
          setComments(data);
        } catch (error) {
          console.error('Error fetching company data:', error);
        }
      };
  
      fetchData();
    }, []);
    const handleEditClick = (id: string) => () => {
      setIsEditing(true);
      // Invoke a function from the parent component with the comment ID
      handleEditComment(id);
    };
    

    return (
      <div className={` ${classes.root}`}>
        <Header />
        <div className={classes.companyinfo}>
        {stocks && <CompanyInfo symbol={stocks} follow={false} />}
        </div>

        <div className={classes.container}>
          <Line />
          <div className={classes.detail}>
            <div className={classes.image13}>
            {stocks && <Candlestick symbol={stocks}  />}

            </div>
            <div className={classes.tabledetail}>
              {stocks && <TableDetail symbol={stocks}  />}
            </div>
          </div>
          <Line />
          <div className={classes.predictcontent}>
            <div className={classes.labelpredict}>
              <span>Dự đoán</span>
            </div>
            {stocks && <Predict symbol={stocks}  />}
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
            <div className={classes.discussGroup}>
              {comment.map((commentItem, index) => (
                <React.Fragment key={index}>
                  <Discuss
                    id={commentItem.commentid} // Pass id here
                    // onEditClick={handleEditClick(commentItem.commentid)} // Pass id to the handler
                    username={commentItem.name} // Access properties from commentItem
                    time={commentItem.updated_at}
                    commenttext={commentItem.comment_text}
                  />
                  <Line />
                </React.Fragment>
              ))}

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
      </div>
    );
  }
);