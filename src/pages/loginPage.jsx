import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    function handleLogin() {
        console.log("Email:", email);
        console.log("Password:", password);

        axios.post(import.meta.env.VITE_BACKEND_URL + '/api/users/login', { email, password }).then((response) => {
            console.log("Login successful:", response.data);
            toast.success("Login successful!");
            localStorage.setItem('token', response.data.token);

            const user = response.data.user;
            if (user.role === 'admin') {
                navigate('/admin');
            }
            else {
                navigate('/');
            }

        }).catch((error) => {
            console.error("Login failed:", error);
            toast.error(<error className="response data message">{error.response.data.message}</error> || "Login failed. Please check your credentials.");
            // Handle login failure, e.g., show error message
        });
    }

    return (
        <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
            <div className="w-[50%] h-full">
            </div>
            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[450px] h-[600px] backdrop-blur-lg shadow-lg rounded-2xl flex flex-col justify-center items-center">
                    <input onChange = {(e) => setEmail(e.target.value)}
                        className="w-[400px] h-[50px] border border-white rounded-2xl text-center m-[5px]" 
                        type="email" 
                        placeholder="Email" 
                    />
                    <input onChange = {(e) => setPassword(e.target.value)}
                        className="w-[400px] h-[50px] border border-white rounded-2xl text-center" 
                        type="password" 
                        placeholder="Password" 
                    />
                    <button onClick={handleLogin} className="w-[400px] h-[50px] bg-green-400 text-white flex justify-center items-center rounded-2xl m-[5px] hover:bg-green-500 transition duration-300 cursor-pointer">
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}
