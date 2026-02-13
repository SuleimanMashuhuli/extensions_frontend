import React, { useState } from 'react';
import { EmployeeForm } from '../Form/Form';

export const EmployeeModal = ({ employee, onClose, onSave }) => {

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-30 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative bg-white max-w-md w-full mx-4">
          
        <div className="flex justify-between items-center p-6 border-black">
          <h3 className="text-xl font-semibold text-gray-900">
            {employee ? 'Edit Extension' : 'Add Extension'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <EmployeeForm 
           employee={employee}
          onSave={onSave}
          onClose={onClose}
        />
        
      </div>
    </div>
  );
};