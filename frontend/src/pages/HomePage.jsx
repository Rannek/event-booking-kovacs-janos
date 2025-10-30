import { useState, useEffect, useCallback } from 'react';
import { getEvents, createBooking } from '../services/apiClient';
import useAuth from '../hooks/useAuth';
import useToast from '../hooks/useToast';
import BookingModal from '../components/BookingModal';

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { user } = useAuth();
  const { addToast } = useToast();

  const fetchEvents = useCallback(async () => {
    try {
      const response = await getEvents();
      setEvents(response.data.data);
    } catch (err) {
      setError('Hiba történt az események betöltése közben.');
      addToast('Nem sikerült betölteni az eseményeket.', 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    setLoading(true);
    fetchEvents();
  }, [fetchEvents]);

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleConfirmBooking = async (eventId, helyekSzama) => {
    try {
        await createBooking(eventId, helyekSzama);
        addToast('Sikeres foglalás!', 'success');
        handleCloseModal();
        fetchEvents();
    } catch (err) {
        addToast(err.response?.data?.uzenet || 'A foglalás sikertelen volt.', 'error');
    }
  };

  if (loading) return <div className="text-center mt-8">Események betöltése...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold mb-6">Közelgő Események</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map(event => (
              <div key={event.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2">{event.cim}</h2>
                  <p className="text-gray-600 mb-2">Helyszín: {event.helyszin}</p>
                  <p className="text-gray-600 mb-4">Időpont: {new Date(event.kezdes).toLocaleString('hu-HU')}</p>
                  <p className="text-gray-700 mb-4">{event.leiras}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-green-600 font-semibold">
                    Szabad helyek: {event.elerheto_helyek} / {event.max_ferohely}
                  </span>
                  {user && (
                     <button
                      onClick={() => handleOpenModal(event)}
                      disabled={event.elerheto_helyek === 0}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
                     >
                       Foglalás
                     </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>Jelenleg nincsenek meghirdetett események.</p>
          )}
        </div>
      </div>
      <BookingModal 
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirmBooking={handleConfirmBooking}
      />
    </>
  );
};

export default HomePage;
