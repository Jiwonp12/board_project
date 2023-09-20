const Form = ({ data }: { data: any }) => {
  return (
    <form
      action={data ? "/api/post/edit" : "/api/post/newPost"}
      method="POST"
      className="mt-4 p-2 flex flex-col w-[70vw]"
    >
      <div className="flex">
        <input
          required
          name="title"
          placeholder="제목을 입력하세요"
          className="w-3/4 h-12 px-2 rounded-md border bg-indigo-100 outline-white"
          defaultValue={data ? data.title : ""}
        />
        <select
          name="category"
          className="ml-auto rounded-md border bg-indigo-100 cursor-pointer hover:bg-indigo-50"
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
        className="h-3/4 mt-8 p-2 rounded-md border flex-grow bg-indigo-100 outline-white"
        defaultValue={data ? data.content : ""}
      />
      <button
        type="submit"
        className="w-[80px] h-[40px] mt-2 ml-auto rounded-md text-white bg-emerald-500 hover:text-black hover:bg-emerald-400 transition duration-200"
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
