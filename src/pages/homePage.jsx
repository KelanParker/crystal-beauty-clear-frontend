import { Route, Routes } from "react-router-dom";
import Header from "../assets/components/header";
import Footer from "../assets/components/footer";
import ProductsPage from "./client/productsPage";
import ProductOverview from "./client/productOverview";
import CartPage from "./client/cart";
import OrderConfirmation from "./client/orderConfirmation";
import MainHomePage from "./client/mainHomePage";
import AboutPage from "./client/aboutPage";
import ContactPage from "./client/contactPage";
import FAQPage from "./client/faqPage";
import PrivacyPage from "./client/privacyPage";
import TermsPage from "./client/termsPage";
export default function HomePage(){
    return(
        <div className="w-full min-h-screen flex flex-col">
            <Header />
            <div className="pt-[70px] flex-1">
                <Routes>
                    <Route path="/" element={<MainHomePage />}></Route>
                    <Route path="/products" element={<ProductsPage />}></Route>
                    <Route path="/overview/:id" element={<ProductOverview />}></Route>
                    <Route path="/cart" element={<CartPage />}></Route>
                    <Route path="/order-confirmation" element={<OrderConfirmation />}></Route>
                    <Route path="/about" element={<AboutPage />}></Route>
                    <Route path="/contact" element={<ContactPage />}></Route>
                    <Route path="/faq" element={<FAQPage />}></Route>
                    <Route path="/privacy" element={<PrivacyPage />}></Route>
                    <Route path="/terms" element={<TermsPage />}></Route>
                    <Route path="/*" element={<h1>404 NotFound</h1>}></Route>
                </Routes>
            </div>
            <Footer />
        </div>
    )
}