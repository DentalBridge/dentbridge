import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Users, Calendar, CreditCard, AlertTriangle } from 'lucide-react';
import apiClient from '../services/apiClient';
import { DentalClinic, DentalChair } from '../components/DentalIllustration';
import toast from 'react-hot-toast';

interface DashboardStats {
  totalPatients: number;
  appointmentsToday: number;
  pendingPayments: number;
  lowStockItems: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalPatients: 0,
    appointmentsToday: 0,
    pendingPayments: 0,
    lowStockItems: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch stats from different endpoints
        const [patientsRes, appointmentsRes, paymentsRes, inventoryRes] = await Promise.all([
          apiClient.get('/patients?page=0&size=1'),
          apiClient.get('/appointments?page=0&size=1'),
          apiClient.get('/payments/stats'),
          apiClient.get('/inventory/low-stock'),
        ]);

        setStats({
          totalPatients: patientsRes.data.totalElements || 0,
          appointmentsToday: appointmentsRes.data.totalElements || 0,
          pendingPayments: paymentsRes.data.totalPending || 0,
          lowStockItems: inventoryRes.data.length || 0,
        });
      } catch (error) {
        toast.error('Failed to fetch dashboard stats');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      name: 'Total Patients',
      value: stats.totalPatients,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      name: 'Appointments Today',
      value: stats.appointmentsToday,
      icon: Calendar,
      color: 'bg-green-500',
    },
    {
      name: 'Pending Payments',
      value: `$${stats.pendingPayments}`,
      icon: CreditCard,
      color: 'bg-yellow-500',
    },
    {
      name: 'Low Stock Items',
      value: stats.lowStockItems,
      icon: AlertTriangle,
      color: 'bg-red-500',
    },
  ];

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        {/* Welcome Banner with Dental Clinic Image */}
        <div className="mb-8 bg-gradient-to-r from-primary-500 to-blue-500 rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-8 flex flex-col justify-center">
              <h1 className="text-3xl font-bold text-white mb-2">Welcome to DentBridge</h1>
              <p className="text-primary-100 text-lg">Your Complete Dental Healthcare Management System</p>
              <p className="text-primary-50 mt-4">Manage patients, appointments, and clinic operations all in one place.</p>
            </div>
            <div className="hidden md:flex items-center justify-center p-4">
              <DentalChair className="w-48 h-48" />
            </div>
          </div>
        </div>

        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-6">
          Overview
        </h3>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="p-5">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 rounded-md p-3 ${stat.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          {stat.name}
                        </dt>
                        <dd className="text-2xl font-semibold text-gray-900">
                          {stat.value}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="bg-white shadow rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <span className="text-primary-600 mr-2">📋</span>
              Quick Start Guide
            </h4>
            <p className="text-gray-600 mb-4">
              Your comprehensive patient management system for dental practices.
              Navigate using the sidebar to manage patients, appointments, payments,
              inventory, and treatment records.
            </p>
            <div className="mt-4 flex justify-center">
              <DentalClinic className="w-full h-40" />
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <span className="text-primary-600 mr-2">⚡</span>
              Key Features
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="text-primary-500 mr-2">✓</span>
                <span>Manage patient records with medical history</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-2">✓</span>
                <span>Schedule appointments with Google Calendar sync</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-2">✓</span>
                <span>Track payments and generate financial reports</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-2">✓</span>
                <span>Monitor inventory with automatic low-stock alerts</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-2">✓</span>
                <span>Maintain detailed treatment histories</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
