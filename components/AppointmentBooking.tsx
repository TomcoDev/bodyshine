
import React, { useState } from 'react';
import { Professional, Appointment } from '../types';
import { MOCK_PROFESSIONALS } from '../constants';
import ProfessionalCard from './ProfessionalCard';
import Modal from './Modal';

const AppointmentBooking: React.FC = () => {
  const [professionals] = useState<Professional[]>(MOCK_PROFESSIONALS);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    serviceName: '',
    date: '',
    time: '',
    userName: '',
    userEmail: '',
  });
  const [bookedAppointments, setBookedAppointments] = useState<Appointment[]>([]);

  const handleBookClick = (professional: Professional) => {
    setSelectedProfessional(professional);
    setBookingDetails(prev => ({...prev, serviceName: professional.services[0]?.name || ''})); // Default to first service
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProfessional) return;

    const newAppointment: Appointment = {
      id: `apt_${Date.now()}`,
      professionalId: selectedProfessional.id,
      professionalName: selectedProfessional.name,
      serviceName: bookingDetails.serviceName,
      date: bookingDetails.date,
      time: bookingDetails.time,
      userName: bookingDetails.userName,
      userEmail: bookingDetails.userEmail,
    };
    setBookedAppointments(prev => [...prev, newAppointment]);
    console.log("Cita Reservada:", newAppointment);
    alert(`¡Cita reservada con ${selectedProfessional.name} para ${bookingDetails.serviceName} el ${bookingDetails.date} a las ${bookingDetails.time}!`);
    setIsModalOpen(false);
    setSelectedProfessional(null);
    setBookingDetails({ serviceName: '', date: '', time: '', userName: '', userEmail: '' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-neutral-800 mb-2 font-serif">Reserva tu Cita de Belleza</h1>
      <p className="text-neutral-600 mb-8">Encuentra y reserva con los mejores profesionales cerca de ti.</p>

      {professionals.length > 0 ? (
        <div className="space-y-6">
          {professionals.map(prof => (
            <ProfessionalCard key={prof.id} professional={prof} onBook={handleBookClick} />
          ))}
        </div>
      ) : (
        <p className="text-neutral-600">No hay profesionales disponibles en este momento.</p>
      )}

      {bookedAppointments.length > 0 && (
        <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-neutral-700 mb-4">Tus Citas Reservadas</h2>
            <ul className="space-y-3">
                {bookedAppointments.map(apt => (
                    <li key={apt.id} className="p-3 bg-neutral-100 rounded-md">
                        <p className="font-medium text-primary">{apt.serviceName} con {apt.professionalName}</p>
                        <p className="text-sm text-neutral-600">Fecha: {apt.date} a las {apt.time}</p>
                        <p className="text-sm text-neutral-500">Cliente: {apt.userName}</p>
                    </li>
                ))}
            </ul>
        </div>
      )}

      {selectedProfessional && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Reservar con ${selectedProfessional.name}`}>
          <form onSubmit={handleSubmitBooking} className="space-y-4">
            <div>
              <label htmlFor="serviceName" className="block text-sm font-medium text-neutral-700">Servicio</label>
              <select 
                id="serviceName" 
                name="serviceName" 
                value={bookingDetails.serviceName} 
                onChange={handleInputChange}
                required
                className="mt-1 block w-full p-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              >
                {selectedProfessional.services.map(service => (
                  <option key={service.name} value={service.name}>
                    {service.name} (${service.price} - {service.duration} min)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-neutral-700">Fecha</label>
              <input 
                type="date" 
                id="date" 
                name="date" 
                value={bookingDetails.date} 
                onChange={handleInputChange}
                required 
                className="mt-1 block w-full p-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-neutral-700">Hora</label>
              <input 
                type="time" 
                id="time" 
                name="time" 
                value={bookingDetails.time} 
                onChange={handleInputChange}
                required 
                className="mt-1 block w-full p-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-neutral-700">Tu Nombre</label>
              <input 
                type="text" 
                id="userName" 
                name="userName" 
                value={bookingDetails.userName} 
                onChange={handleInputChange}
                required 
                placeholder="Nombre Completo"
                className="mt-1 block w-full p-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="userEmail" className="block text-sm font-medium text-neutral-700">Tu Email</label>
              <input 
                type="email" 
                id="userEmail" 
                name="userEmail" 
                value={bookingDetails.userEmail} 
                onChange={handleInputChange}
                required 
                placeholder="correo@ejemplo.com"
                className="mt-1 block w-full p-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-150 font-semibold"
            >
              Confirmar Reserva
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AppointmentBooking;
