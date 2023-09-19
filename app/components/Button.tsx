"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Button = ({
  dataId,
  author,
  username,
  isLiked,
}: {
  dataId?: string;
  author?: string;
  username?: string | null | undefined;
  isLiked?: string;
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/delete/${dataId}`, {
        method: "DELETE",
      });
      if (response.status === 204) {
        window.location.href = "/board";
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
      const response = await fetch(`/api/like/${dataId}`, {
        method: "POST",
      });
      if (response.status === 302) {
        window.location.href = `/board/detail/${dataId}`;
      }
    } catch (error) {
      console.error("like error", error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <>
      {author === username && (
        <>
          <Link
            href={`/board/edit/${dataId}`}
            prefetch={false}
            className="w-[20px] h-[20px] mr-2"
          >
            <FontAwesomeIcon
              icon={faPencil}
              className="fa-pencil w-[20px] h-[20px] text-yellow-400 drop-shadow-sm cursor-pointer"
            />
          </Link>
          <FontAwesomeIcon
            onClick={handleDelete}
            icon={faTrash}
            className="fa-trash w-[20px] h-[20px] mr-2 text-slate-950 drop-shadow-sm cursor-pointer"
          />
        </>
      )}
      <FontAwesomeIcon
        onClick={handleLike}
        icon={faHeart}
        className={
          isLiked !== "-1"
            ? "fa-heart w-[20px] h-[20px] mr-1 text-red-500 drop-shadow-sm cursor-pointer"
            : "fa-heart w-[20px] h-[20px] mr-1 text-gray-500 drop-shadow-sm cursor-pointer"
        }
      />
    </>
  );
};

export default Button;
