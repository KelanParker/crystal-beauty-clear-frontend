import { Route, Routes } from "react-router-dom";
import Header from "../assets/components/header";
import ProductsPage from "./client/productsPage";
import ProductOverview from "./client/productOverview";
import CartPage from "./client/cart";
import OrderConfirmation from "./client/orderConfirmation";
export default function HomePage(){
    return(
        <div className="w-full h-screen max-h-screen ">
            <Header />
            <div className="w-full h-screen-70px max-h-screen-70px overflow-y-auto">
                <Routes>
                    <Route path="/" element={<h1>HomePage</h1>}></Route>
                    <Route path="/products" element={<ProductsPage />}></Route>
                    <Route path="/overview/:id" element={<ProductOverview />}></Route>
                    <Route path="/cart" element={<CartPage />}></Route>
                    <Route path="/order-confirmation" element={<OrderConfirmation />}></Route>
                    <Route path="/*" element={<h1>404 NotFound</h1>}></Route>
                </Routes>
            </div>
        </div>
    )
}