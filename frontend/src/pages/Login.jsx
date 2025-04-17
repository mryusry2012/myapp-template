import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async ({ email, password }) => {
    try {
      const { data, error } = await supabase
        .from("users_clean_reset")
        .select("*")
        .eq("email", email)
        .single();

      if (error || !data) {
        alert("Invalid email or account not found.");
        return;
      }

      const res = await fetch("http://localhost:5050/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.error || "Login failed");
        return;
      }

      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("An error occurred while logging in. Please try again later.");
    }
  };

  return (
    <div className="text-gray-800 flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div
        className="w-[470px] h-[420px] bg-[#D5E5D5] shadow-lg rounded-xl p-8 flex flex-col justify-center space-y-6"
        // ✅ Ubah sini kalau nak adjust width/height form login
      >
        <h1 className="text-2xl font-bold text-center">Login to Your Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-2 border rounded-md bg-white"
              placeholder="you@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-2 border rounded-md bg-white"
              placeholder="******"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
