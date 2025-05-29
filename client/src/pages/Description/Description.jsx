import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Description = () => {
  const [Favorites,setFavorites] = useState(false)
  
  const { id } = useParams();
  const [Data, setData] = useState([]);
  const backendLink = useSelector((state) => state.prod.link);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${backendLink}/api/v1/getBlodById/${id}`, {
        withCredentials: true,
      });
        setFavorites(res.data.favourite)
      setData(res.data.blog);
    };
    fetch();
  }, [id]);

  const FavoriteHandler = async () => {
    if(!Favorites){
      const res = await axios.put(`${backendLink}/api/v1/addBlogsToFavourite/${id}`,{}, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      console.log(res);
      
    }else{
      const res = await axios.put(`${backendLink}/api/v1/removeBlogsFromFavourite/${id}`,{}, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      console.log(res);
      
    }
    setFavorites(!Favorites)
  }
  return (
    <div>
      {Data && (
        <>
          <div className="w-full flex items-center justify-center">
            <h1 className="text-2xl font-semibold w-5/6">{Data.title}</h1>
            <div className="w-1/6 text-2xl lg:text-3xl flex justify-end">
              <button onClick={FavoriteHandler}>
                {Favorites ? <FaHeart className="hover:cursor-pointer text-yellow-400" /> : <FaRegHeart className="hover:cursor-pointer" />}
              </button>
            </div>
          </div>
          <img
            className="mt-4 w-full h-[400px] object-cover rounded"
            src={Data.image}
            alt="blog-image"
          />
          <p className="mt-4">{Data.description}</p>
        </>
      )}
    </div>
  );
};

export default Description;
