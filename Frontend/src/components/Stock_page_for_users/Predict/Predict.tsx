import React, { useState } from "react";
import classes from "./Predict.module.css";

interface PredictProps {
  content: string;
}

const Predict: React.FC<PredictProps> = ({ content }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    alert("Nhận định về cổ phiếu đã được cập nhật");
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditedContent(event.target.value);
  };

  return (
    <div className={classes.predict}>
      <div className={classes.chartpredict}>
        <img src="..\assets\trend.png" alt="" />
      </div>
      <div className={classes.contentpredict}>
        {isEditing ? (
          <textarea
            className={classes.contentbox}
            value={editedContent}
            onChange={handleTextareaChange}
            spellCheck={false}
          />
        ) : (
          <span className={classes.content}>{content}</span>
        )}
        <div className={classes.updatecontent}>
          {isEditing ? (
            <>
              <span className={classes.save} onClick={handleSaveClick}>
                Lưu
              </span>
              <span className={classes.cancel} onClick={handleCancelClick}>
                Hủy
              </span>
            </>
          ) : (
            <span className={classes.update} onClick={handleEditClick}>
              Sửa nhận định
            </span>
          )}
          <span className={classes.delete}>Xóa</span>
        </div>
      </div>
    </div>
  );
};

export default Predict;
