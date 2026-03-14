import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Modal from './Modal';
import { Payment, Patient } from '../types';
import toast from 'react-hot-toast';
import apiClient from '../services/apiClient';

const paymentSchema = z.object({
  patientId: z.number().min(1, 'Please select a patient'),
  amount: z.number().min(0.01, 'Amount must be greater than 0').or(z.string().transform(Number)),
  paymentDate: z.string().min(1, 'Payment date is required'),
  paymentMethod: z.enum(['CASH', 'CARD', 'INSURANCE', 'BANK_TRANSFER', 'OTHER']),
  status: z.enum(['PAID', 'PENDING', 'REFUNDED']),
  notes: z.string().optional(),
  appointmentId: z.number().optional().or(z.string().transform(Number).optional()),
});

type PaymentFormData = z.infer<typeof paymentSchema>;

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment?: Payment;
  onSuccess: () => void;
}

const PaymentModal = ({ isOpen, onClose, payment, onSuccess }: PaymentModalProps) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loadingPatients, setLoadingPatients] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: payment || {
      paymentMethod: 'CASH',
      status: 'PAID',
    },
  });

  useEffect(() => {
    if (isOpen) {
      fetchPatients();
    }
  }, [isOpen]);

  useEffect(() => {
    if (payment) {
      reset({
        ...payment,
        paymentDate: payment.paymentDate.split('T')[0], // Format for date input
      });
    } else {
      const today = new Date().toISOString().split('T')[0];
      reset({
        patientId: 0,
        amount: 0,
        paymentDate: today,
        paymentMethod: 'CASH',
        status: 'PAID',
        notes: '',
        appointmentId: undefined,
      });
    }
  }, [payment, reset]);

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

  const onSubmit = async (data: PaymentFormData) => {
    try {
      if (payment) {
        await apiClient.put(`/payments/${payment.id}`, data);
        toast.success('Payment updated successfully');
      } else {
        await apiClient.post('/payments', data);
        toast.success('Payment recorded successfully');
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save payment');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={payment ? 'Edit Payment' : 'Record New Payment'}
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
              Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              {...register('amount')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder="0.00"
              min="0"
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register('paymentDate')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
            {errors.paymentDate && (
              <p className="mt-1 text-sm text-red-600">{errors.paymentDate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method <span className="text-red-500">*</span>
            </label>
            <select
              {...register('paymentMethod')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="CASH">Cash</option>
              <option value="CARD">Card</option>
              <option value="INSURANCE">Insurance</option>
              <option value="BANK_TRANSFER">Bank Transfer</option>
              <option value="OTHER">Other</option>
            </select>
            {errors.paymentMethod && (
              <p className="mt-1 text-sm text-red-600">{errors.paymentMethod.message}</p>
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
              <option value="PAID">Paid</option>
              <option value="PENDING">Pending</option>
              <option value="REFUNDED">Refunded</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
            )}
          </div>

          <div>
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
            Notes
          </label>
          <textarea
            {...register('notes')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Any additional notes about this payment..."
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
            {isSubmitting ? 'Saving...' : payment ? 'Update Payment' : 'Record Payment'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PaymentModal;
