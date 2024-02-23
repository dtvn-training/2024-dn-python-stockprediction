import React, { useState } from "react";
import classes from "./Discuss.module.css";

interface CommentProps {
  username: string;
  time: string;
  commenttext: string;
}

const Discuss: React.FC<CommentProps> = ({ username, time, commenttext }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(commenttext);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Thêm logic xử lý khi lưu bình luận sau khi sửa
    alert("Nội dung đã được cập nhật");
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    // Hủy bỏ việc sửa và khôi phục nội dung ban đầu
    setEditedComment(commenttext);
    setIsEditing(false);
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditedComment(event.target.value);
  };

  return (
    <div className={classes.discuss}>
      <div className={classes.commentinfo}>
        <div className={classes.username}>{username}</div>
        <div className={classes.time}>{time}</div>
      </div>
      <div className={classes.commenttext}>
        {isEditing ? (
          <textarea
            value={editedComment}
            onChange={handleTextareaChange}
            spellCheck={false}
          />
        ) : (
          <div>{commenttext}</div>
        )}
      </div>
      <div className={classes.feature}>
        {isEditing ? (
          <>
            <div className={classes.save} onClick={handleSaveClick}>
              Lưu
            </div>
            <div className={classes.cancel} onClick={handleCancelClick}>
              Hủy
            </div>
          </>
        ) : (
          <div className={classes.edit} onClick={handleEditClick}>
            <span>Sửa</span>
          </div>
        )}
        <div className={classes.delete}>
          <span>Xóa</span>
        </div>
      </div>
    </div>
  );
};

export default Discuss;
