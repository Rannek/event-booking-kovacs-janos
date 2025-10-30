import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import ToastContext from './contexts/ToastContext';
import Layout from './components/Layout';
import Toast from './components/Toast';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookingsPage from './pages/BookingsPage';
import ProfilePage from './pages/ProfilePage';

const ToastContainer = () => {
    const { toasts, removeToast } = useContext(ToastContext);

    return (
        <div className="fixed bottom-5 right-5 z-50 w-full max-w-sm space-y-2">
            {toasts.map(toast => (
                <Toast 
                    key={toast.id} 
                    message={toast.message} 
                    type={toast.type} 
                    onDismiss={() => removeToast(toast.id)} 
                />
            ))}
        </div>
    );
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="foglalasaim" element={<BookingsPage />} />
            <Route path="profil" element={<ProfilePage />} />
          </Route>
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
