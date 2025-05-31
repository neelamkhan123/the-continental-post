import React from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router";
import { useState } from "react";

export default function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const isFormValid = form.name && form.email && form.password;

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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: form.name,
      });

      navigate("/user/" + user.uid);
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setErrors("This email account already belongs to an active account");
      }
      if (error.code === "auth/weak-password") {
        setErrors("The password should be a minimum of 6 characters");
      }
      console.error("Error signing up:", error.code, error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-[90vh]">
      <div className="flex flex-col justify-center items-center bg-white p-4 shadow-lg rounded-lg w-1/3">
        <h1 className="text-xl font-bold text-center my-6">
          Join Us to Keep Posted
        </h1>

        <div className="w-10 h-[1px] bg-gray-200 mb-6"></div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center w-full"
        >
          <div className="flex flex-col space-y-2 w-full mb-6">
            <label htmlFor="name" className="text-sm">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="shadow-sm p-2 text-sm rounded-lg"
            />
          </div>
          <div className="flex flex-col space-y-2 w-full mb-6">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="shadow-sm p-2 text-sm rounded-lg"
            />
          </div>
          <div className="flex flex-col space-y-2 w-full mb-6">
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

          <span className="text-red-600 text-xs font-bold">{errors}</span>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`py-2 rounded-lg shadow-sm transition duration-300 ease-in-out font-medium ${
              isFormValid
                ? "bg-blue-600 text-white hover:bg-blue-500"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {loading ? <div className="loader my-4"></div> : "Sign Up"}
          </button>
        </form>

        <span className="text-sm mt-4">
          Already go an account?{" "}
          <Link
            to={"/login"}
            className="text-blue-400 hover:underline transition-all duration-100 ease-in-out"
          >
            Login here
          </Link>
        </span>
      </div>
    </div>
  );
}
