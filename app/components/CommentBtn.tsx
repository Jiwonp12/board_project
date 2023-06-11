"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const CommentBtn = ({ postId, commentId, user, username, isCommentLiked }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `/api/comment/delete/${postId}/${commentId}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 204) {
        window.location.href = `/board`;
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
  let colorBtn = isCommentLiked.some(
    item =>
      item._id.toString() === postId && item.parentId.toString() === commentId
  );
  return (
    <>
      {user === username && (
        <div>
          <Link
            href={`/board/edit/${postId}`}
            prefetch={false}
            className="w-[16px] h-[16px] mr-2"
          >
            <FontAwesomeIcon
              icon={faPencil}
              className="fa-pencil w-[16px] h-[16px] text-yellow-400 drop-shadow-sm cursor-pointer"
            />
          </Link>
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
    </>
  );
};

export default CommentBtn;
