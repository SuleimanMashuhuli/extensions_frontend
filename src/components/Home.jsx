import React, { useState } from 'react';
import { Header } from './Header';
import ExtTable from './Table/ExtTable';
import { EmployeeModal } from './Modal/EmpModal';

export default function EmployeePage () {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', department: 'Engineering', extension: '1234', mobile: '+1 234-567-8901' },
    { id: 2, name: 'Jane Smith', department: 'Marketing', extension: '5678', mobile: '+1 234-567-8902' },
    { id: 3, name: 'Bob Johnson', department: 'Sales', extension: '9012', mobile: '+1 234-567-8903' },
    { id: 4, name: 'Alice Brown', department: 'HR', extension: '3456', mobile: '+1 234-567-8904' },
    { id: 5, name: 'Charlie Wilson', department: 'Engineering', extension: '7890', mobile: '+1 234-567-8905' },
    { id: 1, name: 'John Doe', department: 'Engineering', extension: '1234', mobile: '+1 234-567-8901' },
    { id: 2, name: 'Jane Smith', department: 'Marketing', extension: '5678', mobile: '+1 234-567-8902' },
    { id: 3, name: 'Bob Johnson', department: 'Sales', extension: '9012', mobile: '+1 234-567-8903' },
    { id: 4, name: 'Alice Brown', department: 'HR', extension: '3456', mobile: '+1 234-567-8904' },
    { id: 5, name: 'Charlie Wilson', department: 'Engineering', extension: '7890', mobile: '+1 234-567-8905' },
     { id: 1, name: 'John Doe', department: 'Engineering', extension: '1234', mobile: '+1 234-567-8901' },
    { id: 2, name: 'Jane Smith', department: 'Marketing', extension: '5678', mobile: '+1 234-567-8902' },
    { id: 3, name: 'Bob Johnson', department: 'Sales', extension: '9012', mobile: '+1 234-567-8903' },
    { id: 4, name: 'Alice Brown', department: 'HR', extension: '3456', mobile: '+1 234-567-8904' },
    { id: 5, name: 'Charlie Wilson', department: 'Engineering', extension: '7890', mobile: '+1 234-567-8905' },
  ]);

const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleAddItem = () => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const handleEdit = (employeeId) => {
    const employeeToEdit = employees.find(emp => emp.id === employeeId);
    setSelectedEmployee(employeeToEdit);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleSaveEmployee = (employeeData) => {
    if (selectedEmployee) {
      setEmployees(employees.map(emp => 
        emp.id === selectedEmployee.id ? { ...emp, ...employeeData } : emp
      ));
    } else {
      const newEmployee = {
        ...employeeData,
        id: employees.length + 1
      };
      setEmployees([...employees, newEmployee]);
    }
    handleCloseModal();
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.extension.includes(searchQuery) ||
    emp.mobile.includes(searchQuery)
  );

  return (
    <div className="min-h-screen ">
      <Header onSearch={handleSearch} onAdd={handleAddItem} />
      
      <main className="container mx-auto px-8 py-6">
        <div className="bg-white overflow-hidden">
            <ExtTable
                employees={filteredEmployees}
                onEdit={handleEdit}
            />
        </div>

        {isModalOpen && (
          <EmployeeModal
            employee={selectedEmployee}
            onClose={handleCloseModal}
            onSave={handleSaveEmployee}
          />
        )}

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredEmployees.length} of {employees.length} employees
        </div>
      </main>
    </div>
  );
};