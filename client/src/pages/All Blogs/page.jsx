import React, { useEffect, useState } from "react";
import BlogCard from "../../components/Blog Card/BlogCard";
import { useSelector } from "react-redux";
import axios from "axios";
import AllBlogsComponent from "../../components/All Blogs/AllBlogsComponent";

const AllBlogs = () => {
  const [Data, setData] = useState([]);
  const backendLink = useSelector((state) => state.prod.link);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${backendLink}/api/v1/fetchAllBlogs`, {
        withCredentials: true,
      });
      setData(res.data.blogs);
    };
    fetch();
  }, []);

  return (
    <div className="mb-4 py-4">
      {Data && (
        <>
          <h3 className="text-xl font-semibold mb-4">All Blogs</h3>
          <AllBlogsComponent data={Data} />
        </>
      )}
    </div>
  );
};

export default AllBlogs;
