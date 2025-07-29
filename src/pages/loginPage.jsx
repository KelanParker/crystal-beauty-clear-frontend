export default function LoginPage() {
  return (
    <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
        <div className= " w-[50%] h-full">

        </div>
        <div className= " w-[50%] h-full flex justify-center items-center">
            <div className= "w-[450px] h-[600px] backdrop-blur-lg shadow-lg rounded-2xl flex flex-col justify-center items-center">
                <input className="w-[400px] h-[50px] border border-white rounded-2xl text-center m-[5px]" type="email" placeholder="Email" />
                <input className="w-[400px] h-[50px] border border-white rounded-2xl text-center " type="password" placeholder="Password" />
                <button>
                    <div className="w-[400px] h-[50px] bg-green-400 text-white flex justify-center items-center rounded-2xl m-[5px] hover:bg-green-500 transition duration-300 cursor-pointer">
                        Login
                    </div>
                </button>

            </div>

        </div>
    </div>
  );
}
