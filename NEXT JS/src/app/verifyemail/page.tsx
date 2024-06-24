"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Verifyemail = () => {
  const [token, setToken] = useState("");
  const navigate = useRouter();

  const onVerify = async () => {
    try {
      console.log(token);
      const response = await axios.post("/api/users/verifyemail", { token });
      toast.success(response.data.message);
      navigate.push("/login");
    } catch (error: any) {
      console.log(error.response);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    setToken(window.location.search.split("=")[1]);
  }, []);

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>

      <button className="bg-blue-400 p-4 rounded-md" onClick={onVerify}>
        Click
      </button>
    </div>
  );
};

export default Verifyemail;
