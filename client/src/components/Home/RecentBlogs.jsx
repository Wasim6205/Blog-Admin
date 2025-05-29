import React, { useEffect, useState } from "react";
import BlogCard from "../Blog Card/BlogCard";
import { useSelector } from "react-redux";
import axios from "axios";

const RecentBlogs = () => {
  const [Data, setData] = useState([]);
  const backendLink = useSelector((state) => state.prod.link);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${backendLink}/api/v1/fetchRecentBlogs`, {
        withCredentials: true,
      });
      setData(res.data.blogs);
    };
    fetch();
  }, []);
  return (
    <div className="mb-4 py-4">
      <h1 className="text-xl font-semibold mb-4">Recent Blogs</h1>
      <div className="flex flex-col gap-8 lg:gap-8">
        {Data && Data.map((items, i) => (
          <div key={i} className="flex flex-col lg:flex-row gap-2 lg:gap-4">
            <BlogCard items={items} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBlogs;
