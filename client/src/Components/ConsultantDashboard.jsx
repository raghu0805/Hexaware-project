import React, { useEffect, useState } from 'react';
import { User, Calendar, Briefcase, GraduationCap, CheckCircle, Clock, XCircle } from 'lucide-react';
import StatusCard from './StatusCard';
import WorkflowProgress from './WorkFlowProgress';
import ResumeUpload from './ResumeUpload';
// import { mockConsultants, mockWorkflowSteps, mockOpportunities, mockAttendanceRecords } from '../../data/mockData';
// import WorkflowProgress from './WorkflowProgress';


const ConsultantDashboard= () => {
  // Using first consultant as current user for demo
//   const currentConsultant = mockConsultants[0];
//   const recentOpportunities = mockOpportunities.filter(opp => opp.consultantId === currentConsultant.id);
//   const recentAttendance = mockAttendanceRecords.filter(att => att.consultantId === currentConsultant.id);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/user")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched user data:", data);
        setUser(data);
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  // Don't use hooks below this point
  if (!user || user.length === 0) {
    return <p>Loading user data...</p>;
  }

  const { user_id, name, email } = user[0]




  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <XCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'in-progress':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="px-4 sm:px-0">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold">{name}</h2>
              <p className="text-blue-100">IT • {user_id}</p>
              <div className="flex items-center mt-2">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-100">
                  {/* {currentConsultant.status.charAt(0).toUpperCase() + currentConsultant.status.slice(1)} */}
                  RaghuStatus
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ResumeUpload/>
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-3">
        <StatusCard
          title="Resume Status"
          value="Updated"
          description="Last updated Jan 15, 2024"
          icon={<User className="w-6 h-6" />}
          status="success"
        />
        <StatusCard
          title="Attendance Rate"
        //   value={`${currentConsultant.attendanceRate}%`}
          description="This month"
          icon={<Calendar className="w-6 h-6" />}
          status="success"
        />
        <StatusCard
          title="Opportunities"
        //   value={currentConsultant.opportunitiesProvided.toString()}
          description="Total provided"
          icon={<Briefcase className="w-6 h-6" />}
          status="info"
        />
        <StatusCard
          title="Training Progress"
        //   value={`${currentConsultant.trainingProgress}%`}
          description="Current sessions"
          icon={<GraduationCap className="w-6 h-6" />}
          status="warning"
        />
      </div>

      {/* Workflow Progress */}
      <div className="mb-8">
        <WorkflowProgress  />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Opportunities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Opportunities</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {/* {recentOpportunities.map((opportunity) => ( */}
                <div  className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full mt-2  bg-red-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{}</p>
                    <p className="text-sm text-gray-500 truncate">{}</p>
                    <div className="mt-1 flex items-center space-x-2">
                      <span className="text-xs text-gray-400">{}</span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium">
                        {}
                      </span>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>

        {/* Recent Attendance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Attendance</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
                <div  className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{}</p>
                      <p className="text-sm text-gray-500">{}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-1 rounded-full text-xs font-medium  bg-green-100 text-green-800">
                      {}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">{} min</p>
                  </div>
                </div>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultantDashboard;