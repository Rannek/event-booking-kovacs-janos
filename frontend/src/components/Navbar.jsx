import { NavLink, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-3">
                <div className="flex justify-between items-center">
                    <div className="text-xl font-semibold text-gray-700">
                        <Link to="/" className="text-gray-800 hover:text-blue-600">Eseménykezelő</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600">Eseménykezelő</Link>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-700">Üdv, {user.nev}!</span>
              <NavLink to="/profil" className={({isActive}) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500"}>Profilom</NavLink>
              <NavLink to="/foglalasaim" className={({isActive}) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500"}>Foglalásaim</NavLink>
              <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Kijelentkezés</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({isActive}) => isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-500"}>Bejelentkezés</NavLink>
              <NavLink to="/register" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Regisztráció</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
