import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useToast from '../hooks/useToast';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nev: '',
    email: '',
    jelszo: '',
    jelszo_confirmation: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();
  const { addToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.jelszo !== formData.jelszo_confirmation) {
      setError({ jelszo_confirmation: ["A két jelszó nem egyezik."] });
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await register(formData);
      addToast('Sikeres regisztráció! Most már bejelentkezhetsz.', 'success');
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setError(err.response.data.errors);
      } else {
        addToast('Ismeretlen hiba történt a regisztráció során.', 'error');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Regisztráció</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="nev">Név</label>
          <input
            type="text"
            name="nev"
            id="nev"
            value={formData.nev}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
          {error?.nev && <p className="text-red-500 text-sm mt-1">{error.nev[0]}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email cím</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
          {error?.email && <p className="text-red-500 text-sm mt-1">{error.email[0]}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="jelszo">Jelszó</label>
          <input
            type="password"
            name="jelszo"
            id="jelszo"
            value={formData.jelszo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
          {error?.jelszo && <p className="text-red-500 text-sm mt-1">{error.jelszo[0]}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="jelszo_confirmation">Jelszó megerősítése</label>
          <input
            type="password"
            name="jelszo_confirmation"
            id="jelszo_confirmation"
            value={formData.jelszo_confirmation}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
          {error?.jelszo_confirmation && <p className="text-red-500 text-sm mt-1">{error.jelszo_confirmation[0]}</p>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Folyamatban...' : 'Regisztráció'}
        </button>
      </form>
      <p className="text-center mt-4">
        Már van fiókod? <Link to="/login" className="text-blue-500 hover:underline">Jelentkezz be!</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
