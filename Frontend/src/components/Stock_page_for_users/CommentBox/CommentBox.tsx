import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import classes from "./CommentBox.module.css";

const CommentBox = () => {
  const [comment, setComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  const slideInAnimation = useSpring({
    opacity: isCommenting ? 1 : 0,
    marginTop: isCommenting ? 0 : -50,
  });

  const handleCommentToggle = () => {
    setIsCommenting(!isCommenting);
  };

  const handleCommentSubmit = () => {
    if (comment.trim() !== "") {
      alert("Gửi bình luận ");
      setComment("");
    } else {
      alert("Vui lòng nhập nội dung bình luận trước khi gửi.");
    }
  };

  return (
    <div className={classes.wiritecomment}>
      <span className={classes.writecommentlabel} onClick={handleCommentToggle}>
        Thêm bình luận
      </span>

      <animated.div style={slideInAnimation}>
        {isCommenting && (
          <div className={classes.commentbox}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Nhập bình luận của bạn"
            ></textarea>
            <button onClick={handleCommentSubmit}>Gửi</button>
          </div>
        )}
      </animated.div>
    </div>
  );
};

export default CommentBox;
