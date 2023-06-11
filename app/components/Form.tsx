const Form = ({ data }) => {
  return (
    <form
      action={data ? "/api/post/edit" : "/api/post/newPost"}
      method="POST"
      className="mt-4 p-2 flex flex-col w-full"
    >
      <div className="flex">
        <input
          required
          name="title"
          placeholder="제목을 입력하세요"
          className="w-3/4 h-12 rounded-md border border-gray-500"
          defaultValue={data ? data.title : ""}
        />
        <select
          name="category"
          className="ml-auto rounded-md border border-gray-500"
          defaultValue={data ? data.category : "front"}
        >
          <option value="front">프론트엔드</option>
          <option value="back">백엔드</option>
        </select>
      </div>
      <textarea
        required
        name="content"
        placeholder="내용을 입력하세요"
        className="h-3/4 mt-8 rounded-md border border-gray-500"
        defaultValue={data ? data.content : ""}
      />
      <button
        type="submit"
        className="mt-2 rounded-md border border-gray-500 flex-grow"
      >
        작성
      </button>
      {data && (
        <input
          name="_id"
          className="hidden"
          defaultValue={data._id.toString()}
        />
      )}
    </form>
  );
};

export default Form;
