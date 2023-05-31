"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const Button = ({ dataId }) => {
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

  return (
    <>
      <FontAwesomeIcon
        icon={faPencil}
        className="fa-pencil w-[20px] h-[20px] mr-2 text-yellow-400 drop-shadow-sm cursor-pointer"
      />
      <FontAwesomeIcon
        onClick={handleDelete}
        icon={faTrash}
        className="fa-trash w-[20px] h-[20px] mr-2 text-slate-950 drop-shadow-sm cursor-pointer"
      />
      <FontAwesomeIcon
        icon={faHeart}
        className="fa-heart w-[20px] h-[20px] mr-1 text-red-500 drop-shadow-sm cursor-pointer"
      />
    </>
  );
};

export default Button;
