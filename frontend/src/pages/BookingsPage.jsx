import { useState, useEffect, useCallback } from 'react';
import { getMyBookings, deleteBooking } from '../services/apiClient';
import useToast from '../hooks/useToast';
import ConfirmModal from '../components/ConfirmModal';

const BookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingToCancelId, setBookingToCancelId] = useState(null);
    const { addToast } = useToast();

    const fetchBookings = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getMyBookings();
            setBookings(response.data.data);
        } catch (err) {
            setError('Hiba történt a foglalások betöltése közben.');
            addToast('Nem sikerült betölteni a foglalásokat.', 'error');
        } finally {
            setLoading(false);
        }
    }, [addToast]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    const handleOpenCancelModal = (bookingId) => {
        setBookingToCancelId(bookingId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setBookingToCancelId(null);
    };

    const handleConfirmCancel = async () => {
        if (!bookingToCancelId) return;

        try {
            await deleteBooking(bookingToCancelId);
            addToast('Foglalás sikeresen lemondva!', 'success');
            fetchBookings();
        } catch (err) {
            addToast(err.response?.data?.uzenet || 'A foglalást nem sikerült lemondani.', 'error');
        } finally {
            handleCloseModal();
        }
    };
    
    if (loading) return <div className="text-center mt-8">Foglalások betöltése...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

    return (
        <>
            <div>
                <h1 className="text-3xl font-bold mb-6">Foglalásaim</h1>
                {bookings.length > 0 ? (
                    <div className="space-y-4">
                        {bookings.map(booking => (
                            <div key={booking.foglalas_id} className="bg-white p-6 rounded-lg shadow-md flex flex-col sm:flex-row justify-between sm:items-center">
                                <div className="mb-4 sm:mb-0">
                                    <h2 className="text-xl font-bold">{booking.esemeny.cim}</h2>
                                    <p className="text-gray-600">Időpont: {new Date(booking.esemeny.kezdes).toLocaleString('hu-HU')}</p>
                                    <p className="text-gray-800 font-semibold mt-2">Lefoglalt helyek: {booking.lefoglalt_helyek}</p>
                                </div>
                                <button
                                    onClick={() => handleOpenCancelModal(booking.foglalas_id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 self-start sm:self-center"
                                >
                                    Lemondás
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600 mt-8">Még nincsenek foglalásaid.</p>
                )}
            </div>
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmCancel}
                title="Foglalás lemondása"
                message="Biztosan le szeretnéd mondani ezt a foglalást? Ez a művelet nem vonható vissza."
            />
        </>
    );
};

export default BookingsPage;
