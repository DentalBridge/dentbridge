import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { InventoryItem } from '../types';
import apiClient from '../services/apiClient';
import toast from 'react-hot-toast';
import { Plus, AlertTriangle } from 'lucide-react';
import { DentalTools } from '../components/DentalIllustration';
import InventoryModal from '../components/InventoryModal';

const Inventory = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | undefined>(undefined);

  const fetchItems = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get('/inventory');
      setItems(response.data);
    } catch (error) {
      toast.error('Failed to fetch inventory');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddClick = () => {
    setSelectedItem(undefined);
    setIsAddModalOpen(true);
  };

  const handleEditClick = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const handleSuccess = () => {
    fetchItems();
  };

  return (
    <Layout>
      <div>
        <div className="sm:flex sm:items-center sm:justify-between mb-6">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Inventory
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Manage medical supplies and equipment
            </p>
          </div>
          <button
            onClick={handleAddClick}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </button>
        </div>

        <div className="bg-white shadow rounded-lg">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            </div>
          ) : items.length === 0 ? (
            <div className="p-12 text-center">
              <DentalTools className="w-48 h-48 mx-auto mb-4 opacity-50" />
              <p className="text-gray-500 text-lg font-medium">No inventory items found</p>
              <p className="text-gray-400 text-sm mt-2">Add your first item to start tracking dental supplies with DentBridge</p>
              <button
                onClick={handleAddClick}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Item
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Item Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Unit Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.itemName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.category || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.quantity} {item.unitOfMeasure || ''}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.unitPrice ? `$${item.unitPrice}` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.isLowStock ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Low Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            In Stock
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditClick(item)}
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

      <InventoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleSuccess}
      />

      <InventoryModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        item={selectedItem}
        onSuccess={handleSuccess}
      />
    </Layout>
  );
};

export default Inventory;
