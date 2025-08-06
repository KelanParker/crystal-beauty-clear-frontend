import { useState } from "react";
import axios from "../../utils/axiosInstance"
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form reload on submit

    try {
      
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/api/users/login',
        { email, password }
      );

      console.log("Login successful:", response.data);
      toast.success("Login successful!");

      // ✅ Save token to localStorage
      localStorage.setItem('token', response.data.token);

      // Navigate based on role
      const user = response.data.user;
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }

    } catch (error) {
      console.error("Login failed:", error);
      const errorMsg = error?.response?.data?.message || "Login failed. Please check your credentials.";
      toast.error(errorMsg);
    }
  };

  return (
    <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
      <div className="w-[50%] h-full"></div>
      <div className="w-[50%] h-full flex justify-center items-center">
        <form
          onSubmit={handleLogin}
          className="w-[450px] h-[600px] backdrop-blur-lg shadow-lg rounded-2xl flex flex-col justify-center items-center"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="w-[400px] h-[50px] border border-white rounded-2xl text-center m-[5px]"
            type="email"
            placeholder="Email"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="w-[400px] h-[50px] border border-white rounded-2xl text-center"
            type="password"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="w-[400px] h-[50px] bg-green-400 text-white flex justify-center items-center rounded-2xl m-[5px] hover:bg-green-500 transition duration-300 cursor-pointer"
          >
            Login
          </button>
          <p classname= "text-gray-600">
            Don't have an account yet?
            &nbsp;
            <span className = "text-green-400 cursor-pointer hover:text-green-600 ">
              <Link to="/register">Resiter Now</Link>
              
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
