import { BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="h-[70px] w-full flex justify-center items-center relative">
      <div className="text-2xl font-bold text-pink-500 w-[500px] h-full flex justify-evenly items-center">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/contacts">Contact US</Link>
        <Link to="/reviews">Reviews</Link>
        <Link to="/cart" className="absolute right-[30px] text-3xl"><BsCart4 /></Link>
      </div>
    </header>
  );
}
