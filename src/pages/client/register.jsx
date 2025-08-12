import { useState } from "react";
import axios from "../../../utils/axiosInstance"
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "user", // restrict users from setting admin role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
  e.preventDefault();

  // ✅ Use confirmPassword for validation
  if (formData.password !== formData.confirmPassword) {
    toast.error("Passwords do not match.");
    return;
  }

  // ✅ Only extract what's needed (clean fix for ESLint)
  const { firstName, lastName, email, password, phone, role } = formData;
  const userData = { firstName, lastName, email, password, phone, role };

  try {
    console.log('Sending registration request to:', import.meta.env.VITE_BACKEND_URL + '/api/users');
    console.log('Registration data:', userData);
    
    await axios.post('/api/users', userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    toast.success("Registration successful!");
    navigate("/login");
  } catch (error) {
    console.error("Registration failed:", error);
    const errorMsg =
      error?.response?.data?.message || "Registration failed. Please try again.";
    toast.error(errorMsg);
  }
};






  return (
    <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
      <div className="w-[50%] h-full"></div>
      <div className="w-[50%] h-full flex justify-center items-center">
        <form
          onSubmit={handleRegister}
          className="w-[450px] h-auto py-8 backdrop-blur-lg shadow-lg rounded-2xl flex flex-col justify-center items-center gap-2"
        >
          <input
            onChange={handleChange}
            value={formData.firstName}
            name="firstName"
            type="text"
            placeholder="First Name"
            required
            className="w-[400px] h-[50px] border border-white rounded-2xl text-center"
          />
          <input
            onChange={handleChange}
            value={formData.lastName}
            name="lastName"
            type="text"
            placeholder="Last Name"
            required
            className="w-[400px] h-[50px] border border-white rounded-2xl text-center"
          />
          <input
            onChange={handleChange}
            value={formData.email}
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-[400px] h-[50px] border border-white rounded-2xl text-center"
          />
          <input
            onChange={handleChange}
            value={formData.password}
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-[400px] h-[50px] border border-white rounded-2xl text-center"
          />
          <input
            onChange={handleChange}
            value={formData.confirmPassword}
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            required
            className="w-[400px] h-[50px] border border-white rounded-2xl text-center"
          />
          <input
            onChange={handleChange}
            value={formData.phone}
            name="phone"
            type="text"
            placeholder="Phone"
            required
            className="w-[400px] h-[50px] border border-white rounded-2xl text-center"
          />
          <button
            type="submit"
            className="w-[400px] h-[50px] bg-green-400 text-white flex justify-center items-center rounded-2xl hover:bg-green-500 transition duration-300 cursor-pointer"
          >
            Register
          </button>
          <p className="mt-2 text-gray-600">
            Already have an account?&nbsp;
            <span className="text-green-400 cursor-pointer hover:text-green-600">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
