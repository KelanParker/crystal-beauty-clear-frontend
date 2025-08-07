import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminPage from './pages/adminPage';
import LoginPage from './pages/loginPage';
import EnhancedLoginPage from './pages/client/enhancedLogin';
import UserSettings from './pages/client/userSettings';
import DeveloperPanel from './pages/developer/developerPanel';
import { Toaster } from 'react-hot-toast';
import RegisterPage from './pages/client/register';
import HomePage from './pages/homePage';
import CheckoutPage from './pages/client/checkout';

function App() {
  return (
    <BrowserRouter>
      <Toaster 
        position="top-center" 
        toastOptions={{
          duration: 4000,
          style: {
            background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
          },
        }}
      />
      <Routes>
        <Route path="/login" element={<EnhancedLoginPage/>}/>
        <Route path="/login-old" element={<LoginPage/>}/>
        <Route path="/settings" element={<UserSettings/>}/>
        <Route path="/developer" element={<DeveloperPanel/>}/>
        <Route path="/admin/*" element={<AdminPage/>}/>
        <Route path="/*" element={<HomePage />}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/checkout" element={<CheckoutPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
