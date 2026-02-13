import React from "react";

export default function ExtTable ({employees, onEdit}) { 
    return(
         <table className="min-w-full border-collapse border-2 border-black">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-base font-semibold text-gray-900 uppercase tracking-wider border-2 border-black bg-gray-100">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-base font-semibold text-gray-900 uppercase tracking-wider border-2 border-black bg-gray-100">
                  Department
                </th>
                <th scope="col" className="px-6 py-3 text-left text-base font-semibold text-gray-900 uppercase tracking-wider border-2 border-black bg-gray-100">
                  Extension
                </th>
                <th scope="col" className="px-6 py-3 text-left text-base font-semibold text-gray-900 uppercase tracking-wider  bg-gray-100">
                  Mobile Number
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50 transition-colors duration-150 text-base font-medium text-balck border-2 border-black">
                    <td className="px-6 py-4 border-2 border-black">
                      {employee.name}
                    </td>
                    <td className="px-6 py-4 border-2 border-black">
                      {employee.department}
                    </td>
                    <td className="px-6 py-4 border-2 border-black">
                      {employee.extension}
                    </td>
                    <td className="px-6 py-4 border-2 border-black">
                      <div className="flex items-center justify-between">
                        <span>{employee.mobile}</span>
                        <button
                          onClick={() => onEdit(employee.id)}
                          className="text-red-600 hover:text-blue-800 font-medium transition-colors duration-150 whitespace-nowrap"
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500 border-2 border-black">
                    No employees found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
    );
};