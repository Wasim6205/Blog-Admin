import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddBlogs = () => {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Image, setImage] = useState(null);
  const [NewCategory,setNewCategory] = useState("")
  const [ActualCategories,setActualCategories] = useState([])
  const [CategoryId,setCategoryId] = useState("")
  

  const [Loading, setLoading] = useState(false);

  const backendLink = useSelector((state) => state.prod.link);

  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const form = new FormData();
      form.append("title", Title);
      form.append("description", Description);
      form.append("category",CategoryId)
      form.append("image", Image);
      const res = await axios.post(`${backendLink}/api/v1/addBlog`, form, {
        withCredentials: true,
      });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setTitle("");
      setDescription("");
      setImage(null);
      setLoading(false);
      setCategoryId("")
    }
  };

  const addCategoryHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendLink}/api/v1/addCategory`, {title:NewCategory}, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setNewCategory("")
    } catch (error) {
      toast.error(error.response.data.error)
    }
  }

  useEffect(()=>{
    const fetch = async () => {
      const res = await axios.get(`${backendLink}/api/v1/getCategory`, {
        withCredentials: true,
      });
      setActualCategories(res.data.categories);
    }
    fetch()
  },[backendLink])

  return (
    <div className="p-4 h-screen">
      <h1 className="text-2xl font-semibold">Add Blog</h1>
      <form
        action=""
        className="my-4 flex flex-col gap-4"
        onSubmit={handleAddBlog}
      >
        <input
          type="text"
          placeholder="Title"
          className="outline-none p-4 bg-transparent text-3xl border-b border-zinc-400 font-semibold w-full"
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="Description"
          className="outline-none p-4 bg-transparent text-xl border-b border-zinc-400 font-semibold w-full"
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <input
            type="file"
            className="bg-zinc-900 rounded text-white"
            accept=".jpeg, .png, .jpg"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <select name="title" id="" className="px-4 py-2 rounded shadow outline-none bg-white" onChange={(e)=>setCategoryId(e.target.value)}>
            <option value="">Select Category</option>
            {ActualCategories && ActualCategories.map((items,i)=><option value={items.title} key={i}>{items.title}</option>)}
          </select>
        </div>
        <div>
          {Loading ? (
            <div className="bg-blue-400 w-fit rounded text-white px-4 py-2 shadow-xl transition-all duration-300">
              Adding Blogs...
            </div>
          ) : (
            <button className="bg-blue-600 rounded text-white px-4 py-2 shadow-xl hover:bg-blue-700 transition-all duration-300">
              Add Blog
            </button>
          )}
        </div>
      </form>

      <h1 className="text-2xl font-semibold mt-8">Add New Category</h1>
      <form action="" className="mt-4" onSubmit={addCategoryHandler}>
        <input
          type="text"
          placeholder="Your new category"
          className="bg-none border outline-none px-4 py-2 rounded bg-gray-50"
          required
          value={NewCategory}
          onChange={(e)=>setNewCategory(e.target.value)}
        />
        <button className="ms-4 bg-blue-600 px-4 py-2 rounded text-white">Add Category</button>
      </form>
    </div>
  );
};

export default AddBlogs;
