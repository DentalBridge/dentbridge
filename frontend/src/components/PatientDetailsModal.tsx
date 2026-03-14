import Modal from './Modal';
import { Patient } from '../types';
import { format } from 'date-fns';

interface PatientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
  onEdit: () => void;
}

const PatientDetailsModal = ({ isOpen, onClose, patient, onEdit }: PatientDetailsModalProps) => {
  if (!patient) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Patient Details" size="xl">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
            <p className="text-base text-gray-900">{patient.name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Gender</label>
            <p className="text-base text-gray-900">{patient.gender}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
            <p className="text-base text-gray-900">{patient.email || '-'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
            <p className="text-base text-gray-900">{patient.phone || '-'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Date of Birth</label>
            <p className="text-base text-gray-900">
              {patient.dateOfBirth ? format(new Date(patient.dateOfBirth), 'PPP') : '-'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Registered</label>
            <p className="text-base text-gray-900">
              {format(new Date(patient.createdAt), 'PPP')}
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
            <p className="text-base text-gray-900">{patient.address || '-'}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Medical History</label>
          <p className="text-base text-gray-900 whitespace-pre-wrap">
            {patient.medicalHistory || 'No medical history recorded'}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">Allergies</label>
          <p className="text-base text-gray-900 whitespace-pre-wrap">
            {patient.allergies || 'No allergies recorded'}
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Close
          </button>
          <button
            onClick={onEdit}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
          >
            Edit Patient
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PatientDetailsModal;
