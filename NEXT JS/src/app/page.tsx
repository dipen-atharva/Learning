"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const [data, setData] = useState("Loading...");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/users/me");
        setData(res.data.data.email);
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    })();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">
      <h2 className="p-1 rounded bg-green-500">{data}</h2>
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
