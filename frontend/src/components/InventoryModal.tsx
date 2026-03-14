import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Modal from './Modal';
import { InventoryItem } from '../types';
import toast from 'react-hot-toast';
import apiClient from '../services/apiClient';

const inventorySchema = z.object({
  itemName: z.string().min(2, 'Item name must be at least 2 characters'),
  category: z.string().optional(),
  description: z.string().optional(),
  quantity: z.number().min(0, 'Quantity must be 0 or greater').or(z.string().transform(Number)),
  unitPrice: z.number().min(0, 'Price must be 0 or greater').optional().or(z.string().transform(Number).optional()),
  unitOfMeasure: z.string().optional(),
  reorderLevel: z.number().min(0, 'Reorder level must be 0 or greater').optional().or(z.string().transform(Number).optional()),
  supplier: z.string().optional(),
});

type InventoryFormData = z.infer<typeof inventorySchema>;

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: InventoryItem;
  onSuccess: () => void;
}

const InventoryModal = ({ isOpen, onClose, item, onSuccess }: InventoryModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InventoryFormData>({
    resolver: zodResolver(inventorySchema),
    defaultValues: item || {},
  });

  useEffect(() => {
    if (item) {
      reset(item);
    } else {
      reset({
        itemName: '',
        category: '',
        description: '',
        quantity: 0,
        unitPrice: undefined,
        unitOfMeasure: '',
        reorderLevel: undefined,
        supplier: '',
      });
    }
  }, [item, reset]);

  const onSubmit = async (data: InventoryFormData) => {
    try {
      if (item) {
        await apiClient.put(`/inventory/${item.id}`, data);
        toast.success('Inventory item updated successfully');
      } else {
        await apiClient.post('/inventory', data);
        toast.success('Inventory item added successfully');
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save inventory item');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={item ? 'Edit Inventory Item' : 'Add New Inventory Item'}
      size="xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Item Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('itemName')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Dental Mirror"
            />
            {errors.itemName && (
              <p className="mt-1 text-sm text-red-600">{errors.itemName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              {...register('category')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Instruments, Materials, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              {...register('quantity')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder="0"
              min="0"
            />
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit of Measure
            </label>
            <input
              type="text"
              {...register('unitOfMeasure')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder="pieces, boxes, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit Price
            </label>
            <input
              type="number"
              step="0.01"
              {...register('unitPrice')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder="0.00"
              min="0"
            />
            {errors.unitPrice && (
              <p className="mt-1 text-sm text-red-600">{errors.unitPrice.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reorder Level
            </label>
            <input
              type="number"
              {...register('reorderLevel')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Minimum quantity before reorder"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Supplier
            </label>
            <input
              type="text"
              {...register('supplier')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Supplier name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register('description')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Item description, notes, specifications, etc."
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
            {isSubmitting ? 'Saving...' : item ? 'Update Item' : 'Add Item'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default InventoryModal;
