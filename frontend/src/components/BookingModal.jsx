import { useState } from 'react';

const BookingModal = ({ event, isOpen, onClose, onConfirmBooking }) => {
    const [seatCount, setSeatCount] = useState(1);
    const maxSeats = Math.min(10, event?.elerheto_helyek || 10);

    if (!isOpen || !event) return null;

    const handleSeatChange = (e) => {
        let value = parseInt(e.target.value, 10);
        if (isNaN(value) || value < 1) {
            value = 1;
        }
        if (value > maxSeats) {
            value = maxSeats;
        }
        setSeatCount(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirmBooking(event.id, seatCount);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-xl z-50 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Foglalás</h2>
                <p className="mb-6">Esemény: <span className="font-semibold">{event.cim}</span></p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="seatCount" className="block text-gray-700 mb-2">Helyek száma (Max: {maxSeats})</label>
                        <input
                            type="number"
                            id="seatCount"
                            value={seatCount}
                            onChange={handleSeatChange}
                            min="1"
                            max={maxSeats}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">
                            Mégse
                        </button>
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                            Foglalás megerősítése
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;
