import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminPage from './pages/adminPage';
import LoginPage from './pages/loginPage';
import { Toaster } from 'react-hot-toast';
import RegisterPage from './pages/client/register';
import HomePage from './pages/homePage';
import CheckoutPage from './pages/client/checkout';


function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/admin/*" element={<AdminPage/>}/>
        <Route path="/*" element={<HomePage />}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/checkout" element={<CheckoutPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
