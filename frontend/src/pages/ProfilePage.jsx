import useAuth from '../hooks/useAuth';

const ProfilePage = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="text-center mt-8">Profil adatok betöltése...</div>;
    }

    if (!user) {
        return <div className="text-center mt-8">A profil megtekintéséhez be kell jelentkezned.</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Profilom</h1>
            <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Név</h3>
                        <p className="mt-1 text-lg text-gray-900">{user.nev}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Email cím</h3>
                        <p className="mt-1 text-lg text-gray-900">{user.email}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Szerepkör</h3>
                        <p className="mt-1 text-lg text-gray-900 capitalize">{user.szerepkor}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Regisztráció dátuma</h3>
                        <p className="mt-1 text-lg text-gray-900">{new Date(user.created_at).toLocaleDateString('hu-HU')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
