import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Patient } from '../types';
import apiClient from '../services/apiClient';
import toast from 'react-hot-toast';
import { Plus, Search } from 'lucide-react';
import { PatientRecord } from '../components/DentalIllustration';
import PatientModal from '../components/PatientModal';
import PatientDetailsModal from '../components/PatientDetailsModal';

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>(undefined);

  const fetchPatients = async () => {
    try {
      setIsLoading(true);
      const url = search
        ? `/patients?search=${encodeURIComponent(search)}`
        : '/patients';
      const response = await apiClient.get(url);
      setPatients(response.data.content || []);
    } catch (error) {
      toast.error('Failed to fetch patients');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPatients();
  };

  const handleAddClick = () => {
    setSelectedPatient(undefined);
    setIsAddModalOpen(true);
  };

  const handleViewClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDetailsModalOpen(true);
  };

  const handleEditClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  };

  const handleEditFromDetails = () => {
    setIsDetailsModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleSuccess = () => {
    fetchPatients();
  };

  return (
    <Layout>
      <div>
        <div className="sm:flex sm:items-center sm:justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Patients
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Manage patient records and information
            </p>
          </div>
          <button
            onClick={handleAddClick}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Patient
          </button>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="p-4 border-b border-gray-200">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Search patients..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                Search
              </button>
            </form>
          </div>

          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            </div>
          ) : patients.length === 0 ? (
            <div className="p-12 text-center">
              <PatientRecord className="w-48 h-48 mx-auto mb-4 opacity-50" />
              <p className="text-gray-500 text-lg font-medium">No patients found</p>
              <p className="text-gray-400 text-sm mt-2">Add your first patient to get started with DentBridge</p>
              <button
                onClick={handleAddClick}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Patient
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gender
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {patients.map((patient) => (
                    <tr key={patient.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {patient.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {patient.email || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {patient.phone || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {patient.gender}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleViewClick(patient)}
                          className="text-primary-600 hover:text-primary-900 mr-4"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEditClick(patient)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          Edit
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

      <PatientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleSuccess}
      />

      <PatientModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        patient={selectedPatient}
        onSuccess={handleSuccess}
      />

      <PatientDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        patient={selectedPatient || null}
        onEdit={handleEditFromDetails}
      />
    </Layout>
  );
};

export default Patients;
