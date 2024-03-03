import React, { useEffect, useState } from "react";
import classes from "./Discuss.module.css";
import { Button } from "@mui/material";

interface CommentProps {
  id: string;
  username: string;
  time: string;
  commenttext: string;
  tokenUser: string;
  onUpdate: () => void; // Add onUpdate prop
}

const Discuss: React.FC<CommentProps> = ({
  id,
  username,
  time,
  commenttext,
  tokenUser,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(commenttext);
  const API_BASE_URL = "http://127.0.0.1:5000";
  const [isComment, setIsComment] = useState(false);
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    if (userToken === tokenUser) {
      setIsComment(true);
    } else {
      setIsComment(false);
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveCommentEdit = () => {
    if (userToken) {
      fetch(`${API_BASE_URL}/comment/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ commentid: id, commenttext: editedComment, token: userToken }),
      })
        .then((response) => {
          if (response.ok) {
            alert("Bình luận thành công!");
            setEditedComment("");
            setIsEditing(false); 
            onUpdate(); 
          } else {
            alert("Lỗi bình luận.");
          }
        })
        .catch((error) => {
          console.error("Error sending comment:", error);
          alert("Lỗi.");
        });
    } else {
      alert("Vui lòng đăng nhập.");
    }
  };

  const handleCancelClick = () => {
    setEditedComment(commenttext);
    setIsEditing(false);
  };

  const handleDelClick = () => {
    if (userToken) {
      fetch(`${API_BASE_URL}/comment/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            alert("Xóa bình luận thành công!");
            onUpdate(); // Gọi hàm onUpdate để cập nhật danh sách bình luận
          } else {
            alert("Lỗi khi xóa bình luận a.");
          }
        })
        .catch((error) => {
          console.error("Error deleting comment:", error);
          alert("Lỗi khi xóa bình luận.");
        });
    } else {
      alert("Vui lòng đăng nhập để xóa bình luận.");
    }
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
            onChange={(event) => setEditedComment(event.target.value)}
            placeholder="Nhập bình luận của bạn"
          />
        ) : (
          <div>{commenttext}</div>
        )}
      </div>
      <div className={classes.feature}>
        {isEditing ? (
          <>
            <Button className={classes.save} onClick={handleSaveCommentEdit}>
              Lưu
            </Button>
            <Button className={classes.cancel} onClick={handleCancelClick}>
              Hủy
            </Button>
          </>
        ) : (
          <Button className={classes.edit} onClick={handleEditClick}>
            <span>Sửa</span>
          </Button>
        )}
        <Button className={classes.delete} onClick={handleDelClick}>
          <span>Xóa</span>
        </Button>
      </div>
    </div>
  );
};

export default Discuss;
