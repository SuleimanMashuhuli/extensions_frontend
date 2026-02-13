import React, { useState } from 'react';
import Input from '../Input/Input';

export const EmployeeForm = ({employee, onClose, onSave}) => {
    const [formData, setFormData] = useState({
    name: employee?.name || '',
    department: employee?.department || '',
    extension: employee?.extension || '',
    mobile: employee?.mobile || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

    return(
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />

            <Input
              label="Extension"
              name="extension"
              value={formData.extension}
              onChange={handleChange}
              required
            />

            <Input
              label="Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-black">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              {employee ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
    );
};