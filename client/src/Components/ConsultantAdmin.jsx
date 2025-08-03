import React from 'react';
import { Users, Bell } from 'lucide-react';
import AdminConsole from './AdminConsole';
import ConsultantDashboard from './ConsultantDashboard';

const ConsultantAdmin = () => {
  const storedRole = localStorage.getItem("Role");
  console.log(storedRole)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="ml-4">
                <h1 className="text-xl font-semibold text-gray-900">
                  Hexaware Consultant Management System
                </h1>
                <p className="text-sm text-gray-500">
                  Powered by AI Multi-Agent Framework
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {storedRole == 'hr' ? <AdminConsole /> : <ConsultantDashboard />}
      </main>
    </div>
  );
};

export default ConsultantAdmin;
