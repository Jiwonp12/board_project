"use client";

import { useState } from "react";

export default function CommentInput({ postId }) {
  let [commentState, setCommentState] = useState("");

  const handleChangeComment = e => {
    setCommentState(e.target.value);
  };

  return (
    <form className="w-[70vw] h-[50px] my-2 flex">
      <input
        onChange={handleChangeComment}
        required
        name="comment"
        placeholder="댓글을 입력하세요"
        className="w-full h-full mr-4 p-1 bg-gray-200 rounded-md"
      />
      <button
        onClick={() => {
          fetch("/api/comment/new", {
            method: "POST",
            body: JSON.stringify({ comment: commentState, _id: postId }),
          });
        }}
        type="submit"
        className="w-[100px] h-full ml-auto bg-gray-200 rounded-md"
      >
        작성
      </button>
    </form>
  );
}
