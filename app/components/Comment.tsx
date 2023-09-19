"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

interface CommentProps {
  postId?: string;
  commentId: string;
  user: string;
  username?: string | null | undefined;
  like: string;
  content: string;
  date: string;
  isCommentLiked?: { _id: string; parentId: string }[];
}
const Comment = ({
  postId,
  commentId,
  user,
  username,
  like,
  content,
  date,
  isCommentLiked,
}: CommentProps) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [commentState, setCommentState] = useState(content);

  const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentState(e.target.value);
  };

  const handleOpenEdit = () => {
    setIsEdit(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `/api/comment/delete/${postId}/${commentId}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 204) {
        window.location.href = `/board/${postId}`;
      }
    } catch (error) {
      console.error("delete error", error);
    }
  };

  const handleLike = async () => {
    if (isButtonDisabled) {
      return;
    }
    setIsButtonDisabled(true);
    try {
      const response = await fetch(`/api/comment/like/${postId}/${commentId}`, {
        method: "POST",
      });
      if (response.status === 302) {
        window.location.href = `/board/detail/${postId}`;
      }
    } catch (error) {
      console.error("like error", error);
    } finally {
      setIsButtonDisabled(false);
    }
  };
  const colorBtn = isCommentLiked?.some(
    item =>
      item._id.toString() === postId && item.parentId.toString() === commentId
  );
  return isEdit ? (
    <form className="w-[70vw] h-[50px] my-2 flex">
      <input
        onChange={handleChangeComment}
        required
        name="comment"
        value={commentState}
        className="w-full h-full mr-4 p-1 bg-gray-200 rounded-md"
      />
      <button
        onClick={() => {
          fetch("/api/comment/edit", {
            method: "POST",
            body: JSON.stringify({ comment: commentState, _id: commentId }),
          });
        }}
        type="submit"
        className="w-[100px] h-full ml-auto bg-gray-200 rounded-md"
      >
        작성
      </button>
    </form>
  ) : (
    <div className="flex flex-col">
      <div className="flex items-center">
        <div className="mr-1">{user}</div>
        {user === username && (
          <div>
            <FontAwesomeIcon
              onClick={handleOpenEdit}
              icon={faPencil}
              className="fa-pencil w-[16px] h-[16px] mr-2 text-yellow-400 drop-shadow-sm cursor-pointer"
            />
            <FontAwesomeIcon
              onClick={handleDelete}
              icon={faTrash}
              className="fa-trash w-[16px] h-[16px] mr-2 text-slate-950 drop-shadow-sm cursor-pointer"
            />
          </div>
        )}
        <FontAwesomeIcon
          onClick={handleLike}
          icon={faHeart}
          className={
            colorBtn
              ? "fa-heart w-[16px] h-[16px] mr-1 text-red-500 drop-shadow-sm cursor-pointer"
              : "fa-heart w-[16px] h-[16px] mr-1 text-gray-500 drop-shadow-sm cursor-pointer"
          }
        />
        <div>{like}</div>
      </div>
      <div>{content}</div>
      <div className="text-sm">{new Date(date).toLocaleString()}</div>
    </div>
  );
};

export default Comment;
