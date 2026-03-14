import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Modal from './Modal';
import { Appointment, Patient } from '../types';
import toast from 'react-hot-toast';
import apiClient from '../services/apiClient';

const appointmentSchema = z.object({
  patientId: z.number().min(1, 'Please select a patient'),
  appointmentDateTime: z.string().min(1, 'Appointment date and time is required'),
  durationMinutes: z.number().min(15, 'Duration must be at least 15 minutes').or(z.string().transform(Number)),
  status: z.enum(['SCHEDULED', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW']),
  treatmentType: z.string().optional(),
  notes: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment?: Appointment;
  onSuccess: () => void;
  prefilledDateTime?: string;
}

const AppointmentModal = ({ isOpen, onClose, appointment, onSuccess, prefilledDateTime }: AppointmentModalProps) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loadingPatients, setLoadingPatients] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: appointment || {
      durationMinutes: 30,
      status: 'SCHEDULED',
    },
  });

  useEffect(() => {
    if (isOpen) {
      fetchPatients();
    }
  }, [isOpen]);

  useEffect(() => {
    if (appointment) {
      reset({
        ...appointment,
        appointmentDateTime: appointment.appointmentDateTime.slice(0, 16), // Format for datetime-local input
      });
    } else {
      reset({
        patientId: 0,
        appointmentDateTime: prefilledDateTime || '',
        durationMinutes: 30,
        status: 'SCHEDULED',
        treatmentType: '',
        notes: '',
      });
    }
  }, [appointment, prefilledDateTime, reset]);

  const fetchPatients = async () => {
    try {
      setLoadingPatients(true);
      const response = await apiClient.get('/patients');
      setPatients(response.data.content || []);
    } catch (error) {
      toast.error('Failed to fetch patients');
    } finally {
      setLoadingPatients(false);
    }
  };

  const onSubmit = async (data: AppointmentFormData) => {
    try {
      const payload = {
        ...data,
        appointmentDateTime: new Date(data.appointmentDateTime).toISOString(),
      };

      if (appointment) {
        await apiClient.put(`/appointments/${appointment.id}`, payload);
        toast.success('Appointment updated successfully');
      } else {
        await apiClient.post('/appointments', payload);
        toast.success('Appointment scheduled successfully');
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save appointment');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={appointment ? 'Edit Appointment' : 'Schedule New Appointment'}
      size="xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient <span className="text-red-500">*</span>
            </label>
            <select
              {...register('patientId', { valueAsNumber: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              disabled={loadingPatients}
            >
              <option value={0}>Select a patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
            {errors.patientId && (
              <p className="mt-1 text-sm text-red-600">{errors.patientId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              {...register('status')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="SCHEDULED">Scheduled</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="NO_SHOW">No Show</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date & Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              {...register('appointmentDateTime')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
            {errors.appointmentDateTime && (
              <p className="mt-1 text-sm text-red-600">{errors.appointmentDateTime.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (minutes) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('durationMinutes')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder="30"
              min="15"
              step="15"
            />
            {errors.durationMinutes && (
              <p className="mt-1 text-sm text-red-600">{errors.durationMinutes.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Treatment Type
            </label>
            <input
              type="text"
              {...register('treatmentType')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Checkup, Cleaning, Root Canal, etc."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            {...register('notes')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Any special notes or instructions..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : appointment ? 'Update Appointment' : 'Schedule Appointment'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AppointmentModal;
