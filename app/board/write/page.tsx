import React from "react";

const Write = () => {
  return (
    <div>
      <div>글쓰기페이지</div>
      <form action="/api/post/newPost" method="POST">
        <select name="category">
          <option>프론트엔드</option>
          <option>백엔드</option>
        </select>
        <input required name="title" placeholder="제목" />
        <input name="content" placeholder="내용" />
        <button type="submit">작성완료</button>
      </form>
    </div>
  );
};

export default Write;
