import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Treatment } from '../types';
import apiClient from '../services/apiClient';
import toast from 'react-hot-toast';
import { Plus, Calendar } from 'lucide-react';
import { ToothHealthy } from '../components/DentalIllustration';
import TreatmentModal from '../components/TreatmentModal';
import { format } from 'date-fns';

const Treatments = () => {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | undefined>(undefined);

  useEffect(() => {
    fetchTreatments();
  }, []);

  const fetchTreatments = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('/treatments');
      setTreatments(response.data.content || []);
    } catch (error) {
      toast.error('Failed to fetch treatments');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddClick = () => {
    setSelectedTreatment(undefined);
    setIsAddModalOpen(true);
  };

  const handleEditClick = (treatment: Treatment) => {
    setSelectedTreatment(treatment);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async (treatmentId: number) => {
    if (!confirm('Are you sure you want to delete this treatment record?')) {
      return;
    }

    try {
      await apiClient.delete(`/treatments/${treatmentId}`);
      toast.success('Treatment deleted successfully');
      fetchTreatments();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete treatment');
    }
  };

  const handleSuccess = () => {
    fetchTreatments();
  };

  return (
    <Layout>
      <div>
        <div className="sm:flex sm:items-center sm:justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Treatments
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Manage patient treatment records and history
            </p>
          </div>
          <button
            onClick={handleAddClick}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Treatment
          </button>
        </div>

        <div className="bg-white shadow rounded-lg">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            </div>
          ) : treatments.length === 0 ? (
            <div className="p-12 text-center">
              <ToothHealthy className="w-48 h-48 mx-auto mb-4 opacity-50" />
              <p className="text-gray-500 text-lg font-medium">No treatments found</p>
              <p className="text-gray-400 text-sm mt-2">Add your first treatment record to get started</p>
              <button
                onClick={handleAddClick}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Treatment
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Treatment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cost
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performed By
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {treatments.map((treatment) => (
                    <tr key={treatment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {treatment.patientName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="font-medium">{treatment.treatmentName}</div>
                        {treatment.description && (
                          <div className="text-gray-500 text-xs mt-1 max-w-xs truncate">
                            {treatment.description}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          {format(new Date(treatment.treatmentDate), 'PP')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {treatment.cost ? `$${treatment.cost.toFixed(2)}` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {treatment.performedByName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditClick(treatment)}
                          className="text-primary-600 hover:text-primary-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(treatment.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <TreatmentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleSuccess}
      />

      <TreatmentModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        treatment={selectedTreatment}
        onSuccess={handleSuccess}
      />
    </Layout>
  );
};

export default Treatments;
