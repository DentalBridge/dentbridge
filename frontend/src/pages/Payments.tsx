import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Payment, PaymentStats } from '../types';
import apiClient from '../services/apiClient';
import toast from 'react-hot-toast';
import { Plus, DollarSign } from 'lucide-react';
import PaymentModal from '../components/PaymentModal';

const Payments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState<PaymentStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [paymentsRes, statsRes] = await Promise.all([
          apiClient.get('/payments'),
          apiClient.get('/payments/stats'),
        ]);
        setPayments(paymentsRes.data.content || []);
        setStats(statsRes.data);
      } catch (error) {
        toast.error('Failed to fetch payments');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  const handleSuccess = () => {
    const fetchData = async () => {
      try {
        const [paymentsRes, statsRes] = await Promise.all([
          apiClient.get('/payments'),
          apiClient.get('/payments/stats'),
        ]);
        setPayments(paymentsRes.data.content || []);
        setStats(statsRes.data);
      } catch (error) {
        toast.error('Failed to fetch payments');
      }
    };
    fetchData();
  };

  return (
    <Layout>
      <div>
        <div className="sm:flex sm:items-center sm:justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Payments
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Track and manage patient payments
            </p>
          </div>
          <button
            onClick={handleAddClick}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Record Payment
          </button>
        </div>

        {stats && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">Total Paid</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      ${stats.totalPaid?.toFixed(2) || '0.00'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">Total Pending</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      ${stats.totalPending?.toFixed(2) || '0.00'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-gray-500">Total Payments</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stats.totalPayments}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white shadow rounded-lg">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            </div>
          ) : payments.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No payments recorded yet. Add your first payment to get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Payment Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payment.patientName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${payment.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(payment.paymentDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.paymentMethod}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            payment.status === 'PAID'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <PaymentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </Layout>
  );
};

export default Payments;
