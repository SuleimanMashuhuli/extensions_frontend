import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import ExtTable from './Table/ExtTable';
import { EmployeeModal } from './Modal/EmpModal';
import EXT_ENDPOINTS from '../api';

export default function EmployeePage () {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, [searchQuery]);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = searchQuery 
        ? `${EXT_ENDPOINTS.GET_ALL_EXT}?search=${encodeURIComponent(searchQuery)}`
        : EXT_ENDPOINTS.GET_ALL_EXT;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleAddItem = () => {
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const handleEdit = (employeeId) => {
    const employeeToEdit = Array.isArray(employees) 
      ? employees.find(emp => emp?.id === employeeId)
      : null;
    setSelectedEmployee(employeeToEdit);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleSaveEmployee = async (employeeData) => {
    setLoading(true);
    setError(null);
    
    try {
      if (selectedEmployee) {
        const response = await fetch(EXT_ENDPOINTS.UPDATE_EXT(selectedEmployee.id), {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(employeeData),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else {
        const response = await fetch(EXT_ENDPOINTS.CREATE_EXT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(employeeData),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
      await fetchEmployees();
      handleCloseModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredEmployees = Array.isArray(employees) && employees.length > 0
    ? employees.filter(emp => 
        emp?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp?.department?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const employeeCount = Array.isArray(employees) ? employees.length : 0;
  const filteredCount = filteredEmployees.length;

  return (
    <div className="min-h-screen">
      <Header onSearch={handleSearch} onAdd={handleAddItem} />
      
      <main className="container mx-auto px-8 py-6">
        <div className="bg-white overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading employees...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-600">
              <p className="font-semibold">Error loading employees</p>
              <p className="text-sm mt-1">{error}</p>
              <button 
                onClick={fetchEmployees}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          ) : (
            <ExtTable
              employees={employees}
              onEdit={handleEdit}
            />
          )}
        </div>

        {isModalOpen && (
          <EmployeeModal
            employee={selectedEmployee}
            onClose={handleCloseModal}
            onSave={handleSaveEmployee}
          />
        )}

        {!loading && !error && (
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredCount} of {employeeCount} employees
          </div>
        )}
      </main>
    </div>
  );
}