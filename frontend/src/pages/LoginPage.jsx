import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', jelszo: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(credentials);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.uzenet || 'Hiba történt a bejelentkezés során.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Bejelentkezés</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email cím</label>
          <input
            type="email"
            name="email"
            id="email"
            value={credentials.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="jelszo">Jelszó</label>
          <input
            type="password"
            name="jelszo"
            id="jelszo"
            value={credentials.jelszo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Bejelentkezés...' : 'Bejelentkezés'}
        </button>
        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
      </form>
      <p className="text-center mt-4">
        Nincs még fiókod? <Link to="/register" className="text-blue-500 hover:underline">Regisztrálj!</Link>
      </p>
    </div>
  );
};

export default LoginPage;
