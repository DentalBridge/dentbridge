import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Modal from './Modal';
import { Treatment, Patient } from '../types';
import toast from 'react-hot-toast';
import apiClient from '../services/apiClient';

const treatmentSchema = z.object({
  patientId: z.number().min(1, 'Please select a patient'),
  treatmentName: z.string().min(2, 'Treatment name must be at least 2 characters'),
  description: z.string().optional(),
  cost: z.number().min(0, 'Cost must be 0 or greater').optional().or(z.string().transform(Number).optional()),
  treatmentDate: z.string().min(1, 'Treatment date is required'),
  appointmentId: z.number().optional().or(z.string().transform(Number).optional()),
});

type TreatmentFormData = z.infer<typeof treatmentSchema>;

interface TreatmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  treatment?: Treatment;
  onSuccess: () => void;
}

const TreatmentModal = ({ isOpen, onClose, treatment, onSuccess }: TreatmentModalProps) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loadingPatients, setLoadingPatients] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TreatmentFormData>({
    resolver: zodResolver(treatmentSchema),
    defaultValues: treatment || {},
  });

  useEffect(() => {
    if (isOpen) {
      fetchPatients();
    }
  }, [isOpen]);

  useEffect(() => {
    if (treatment) {
      reset({
        ...treatment,
        treatmentDate: treatment.treatmentDate.split('T')[0], // Format for date input
      });
    } else {
      const today = new Date().toISOString().split('T')[0];
      reset({
        patientId: 0,
        treatmentName: '',
        description: '',
        cost: undefined,
        treatmentDate: today,
        appointmentId: undefined,
      });
    }
  }, [treatment, reset]);

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

  const onSubmit = async (data: TreatmentFormData) => {
    try {
      if (treatment) {
        await apiClient.put(`/treatments/${treatment.id}`, data);
        toast.success('Treatment updated successfully');
      } else {
        await apiClient.post('/treatments', data);
        toast.success('Treatment added successfully');
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save treatment');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={treatment ? 'Edit Treatment' : 'Add New Treatment'}
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
              Treatment Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('treatmentName')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Root Canal, Cleaning, Filling, etc."
            />
            {errors.treatmentName && (
              <p className="mt-1 text-sm text-red-600">{errors.treatmentName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Treatment Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register('treatmentDate')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
            {errors.treatmentDate && (
              <p className="mt-1 text-sm text-red-600">{errors.treatmentDate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cost
            </label>
            <input
              type="number"
              step="0.01"
              {...register('cost')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder="0.00"
              min="0"
            />
            {errors.cost && (
              <p className="mt-1 text-sm text-red-600">{errors.cost.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Appointment ID (Optional)
            </label>
            <input
              type="number"
              {...register('appointmentId')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Link to appointment"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register('description')}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Detailed description of the treatment, procedures performed, materials used, etc."
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
            {isSubmitting ? 'Saving...' : treatment ? 'Update Treatment' : 'Add Treatment'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TreatmentModal;
