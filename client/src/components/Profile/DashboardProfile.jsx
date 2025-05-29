import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const DashboardProfile = () => {
  const [ChangeAvatar, setChangeAvatar] = useState(null);
  const changeImage = (e) => {
    setChangeAvatar(e.target.files[0]);
  };

  const backendLink = useSelector((state) => state.prod.link);
  const [UserData, setUserData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${backendLink}/api/v1/getProfileData`, {
        withCredentials: true,
      });
      setUserData(res.data.data);
    };
    fetch();
  }, []);

  const [Passwords, setPasswords] = useState({
    password: "",
    newPass: "",
    confirmNewPass: "",
  });

  const changePass = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...Passwords, [name]: value });
  };

  const handlePass = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `${backendLink}/api/v1/changeUserPassword`,
        Passwords,
        { withCredentials: true }
      );
      // console.log(res);
      toast.success(res.data.message);
      setPasswords({ password: "", newPass: "", confirmNewPass: "" });
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const updateAvatar = async () => {
    try {
      const formData = new FormData();
      formData.append("image", ChangeAvatar);
      const res = await axios.put(
        `${backendLink}/api/v1/changeAvatar`,
        formData,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setChangeAvatar(null);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      {UserData && (
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="">
              <div className="size-[20vh] border rounded-full">
                <label
                  htmlFor="imgFile"
                  className="w-[100%] h-[100%] flex items-center justify-center"
                >
                  {UserData && UserData.avatar ? (
                    <img
                      src={
                        ChangeAvatar
                          ? URL.createObjectURL(ChangeAvatar)
                          : `${UserData.avatar}`
                      }
                      alt=""
                      className="size-[100%] rounded-full object-cover"
                    />
                  ) : (
                    <FaUser className="size-[12vh] text-zinc-600" />
                  )}
                </label>
              </div>
              <div className="mt-4 flex items-center justify-center">
                <input
                  id="imgFile"
                  type="file"
                  accept=".jpeg, .jpg, .png"
                  className="mb-4 bg-zinc-900 hidden"
                  onChange={changeImage}
                />
                <button
                  onClick={updateAvatar}
                  className="bg-blue-700 hover:bg-blue-600 transition-all duration-300 text-center px-4 py-2 text-white rounded"
                >
                  Change Avatar
                </button>
              </div>
            </div>
            <div className="">
              <p className="text-zinc-700">{UserData?.email}</p>
              <h1 className="text-2xl md:text-3xl lg:text-5xl mt-2 font-semibold">
                {UserData?.username}
              </h1>
            </div>
          </div>
          <hr className="my-8" />
          <div>
            <h1 className="text-2xl font-semibold">
              Change account's password
            </h1>
            <form onSubmit={handlePass} action="" className="my-4">
              <div className="flex flex-col">
                <label htmlFor="">Current Password</label>
                <input
                  type="password"
                  placeholder="Current Password"
                  // value=''
                  name="password"
                  className="mt-2 outline-none border px-3 py-2 rounded border-zinc-400"
                  required
                  value={Passwords.password}
                  onChange={changePass}
                />
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="">New Password</label>
                <input
                  type="password"
                  placeholder="New Password"
                  // value=''
                  name="newPass"
                  className="mt-2 outline-none border px-3 py-2 rounded border-zinc-400"
                  required
                  value={Passwords.newPass}
                  onChange={changePass}
                />
              </div>
              <div className="flex flex-col mt-4">
                <label htmlFor="">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  name="confirmNewPass"
                  className="mt-2 outline-none border px-3 py-2 rounded border-zinc-400"
                  required
                  value={Passwords.confirmNewPass}
                  onChange={changePass}
                />
              </div>
              <div className="mt-8">
                <button className="bg-blue-700 hover:bg-blue-600 transition-all duration-300 text-center px-4 py-2 text-white rounded">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardProfile;
