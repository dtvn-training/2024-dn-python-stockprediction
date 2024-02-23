import React, { useState, useEffect } from "react";
import classes from "./Predict.module.css";
import { PostPredictText, getPredictText } from "./PredictReq";

const Predict = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState<string>("");
  const [PredictText, setPredictText] = useState<any | null>(null);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedContent(PredictText?.textPrediction || ""); // Gán giá trị từ textPrediction khi bấm chỉnh sửa
  };

  const handleSaveClick = async () => {
    const stockCode = "BID";
    const userId = "123";

    await PostPredictText(userId, stockCode, editedContent);
    setIsEditing(false);
    
    alert("Nhận định về cổ phiếu đã được cập nhật");
    fetchData();

  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(event.target.value);
  };

  const fetchData = async () => {
    try {
      const data = await getPredictText("BID");
      setPredictText(data);
      setEditedContent(data?.textPrediction || "");
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          <span className={classes.content}>{PredictText?.textPrediction}</span>
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
