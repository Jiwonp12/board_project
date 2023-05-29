`use client`;

import React from "react";

const Item = () => {
  return (
    <section className="flex flex-col p-6">
      <div className="flex justify-between">
        <div>제목</div>
        <div>작성자</div>
      </div>
      <div>카테고리</div>
      <div>글내용</div>
      <div>댓글</div>
      <div>좋아요</div>
      <div>작성일자</div>
    </section>
  );
};

export default Item;
