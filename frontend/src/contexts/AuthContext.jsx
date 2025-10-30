import { createContext, useState, useEffect } from 'react';
import apiClient, { getProfile } from '../services/apiClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await getProfile();
          setUser(response.data);
        } catch (error) {
          console.error("Profil lekérdezése sikertelen", error);
          localStorage.removeItem('authToken');
          setToken(null);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [token]);

  const login = async (credentials) => {
    const response = await apiClient.post('/bejelentkezes', credentials);
    const { token } = response.data;
    localStorage.setItem('authToken', token);
    setToken(token);
    
    const profileResponse = await getProfile();
    setUser(profileResponse.data);
  };

  const register = async (userData) => {
    await apiClient.post('/regisztracio', userData);
  };

  const logout = async () => {
    try {
      await apiClient.post('/kijelentkezes');
    } catch (error) {
        console.error("Kijelentkezési hiba", error);
    } finally {
      localStorage.removeItem('authToken');
      setUser(null);
      setToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
