import React, { memo, useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import { getAllComments } from '../../services/api/comment.api';
import CommentBox from "../../components/StockDetail/CommentBox/CommentBox";
import Discuss from "../../components/StockDetail/Discuss/Discuss";
import Header from "../../components/Header/Header";
import Candlestick from "../../components/StockDetail/Candlestick/Candlestick";
import CompanyInfo from "../../components/StockDetail/CompanyInfo/CompanyInfo";
import Line from "./Line";
import Predict from "../../components/StockDetail/Predict/Predict";
import TableDetail from "../../components/StockDetail/TableDetail/TableDetail";
import classes from "./Stock_page_for_users.module.css";

interface Props {
  className?: string;
}

export const Stock_page_for_users: FC<Props> = memo(
  function Stock_page_for_users(props = {}) {
    const { stocks } = useParams();    
    const [comments, setComments] = useState([]);
    const [updateTrigger, setUpdateTrigger] = useState(false); // State to trigger update

    useEffect(() => {
      fetchData();
    }, [updateTrigger]); // Trigger useEffect when updateTrigger state changes

    const fetchData = async () => {
      try {
        const data = await getAllComments({ stocks });
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    const handleCommentUpdate = async () => {
      try {
        await fetchData(); // Fetch updated comments
        setUpdateTrigger(prevState => !prevState);
        console.log(updateTrigger,"updateTrigger");
         // Toggle updateTrigger to trigger update
      } catch (error) {
        console.error('Error updating comments:', error);
      }
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
                <CommentBox onUpdateComments ={handleCommentUpdate} />
              </div>
            </div>
            <Line />
            <div className={classes.discussGroup}>
              {comments.map((commentItem, index) => (
                <React.Fragment key={index}>
                  <Discuss
                    id={commentItem.commentid}
                    username={commentItem.name}
                    time={commentItem.updated_at}
                    commenttext={commentItem.comment_text}
                    tokenUser={commentItem.userToken}
                    onUpdate={handleCommentUpdate}
                  />
                  <Line />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Stock_page_for_users;
