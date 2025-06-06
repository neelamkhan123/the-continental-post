import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const isFormValid = form.email && form.password;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;
      navigate("/user/" + user.uid);
    } catch (error: any) {
      setErrors(
        "We couldn’t find an account with those credentials. Please check your email and password."
      );
      setErrors("Cannot process this action. Please try again later.");
      console.error("Login error:", error.code, error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-[90vh]">
      <div className="flex flex-col justify-center items-center bg-white p-4 shadow-lg rounded-lg w-1/3">
        <h1 className="text-xl font-bold text-center my-6">Welcome Back!</h1>
        <div className="w-10 h-[1px] bg-gray-200 mb-6"></div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center w-full"
        >
          <div className="flex flex-col justify-center space-y-2 w-full mb-6">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="shadow-sm p-2 text-sm rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-center space-y-2 w-full mb-6">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="shadow-sm p-2 text-sm rounded-lg"
            />
          </div>

          <span className="text-red-600 text-xs font-bold mb-4">{errors}</span>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`py-2 rounded-lg shadow-sm transition duration-300 ease-in-out font-medium ${
              isFormValid
                ? "bg-blue-600 text-white hover:bg-blue-500"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {loading ? <div className="loader my-4" /> : "Login"}
          </button>
        </form>

        <span className="text-sm mt-4">
          Don't have an account yet?{" "}
          <Link
            to={"/sign-up"}
            className="text-blue-400 hover:underline transition-all duration-100 ease-in-out"
          >
            Sign Up here
          </Link>
        </span>
      </div>
    </div>
  );
}
