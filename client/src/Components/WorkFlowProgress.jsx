import React from 'react';
import { CheckCircle, Clock, Circle } from 'lucide-react';

const WorkflowProgress = ({ steps }) => {
  const getStepIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      default:
        return <Circle className="w-6 h-6 text-gray-300" />;
    }
  };

  const getConnectorColor = (currentIndex) => {
    if (currentIndex === steps.length - 1) return '';
    return steps[currentIndex].status === 'completed' ? 'bg-green-500' : 'bg-gray-300';
  };

//   const completedSteps = steps.filter((step) => step.status === 'completed').length;
//   const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">Workflow Progress</h3>
          <span className="text-sm text-gray-500">
             completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            // style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="relative">
          <div  className="flex items-start">
            <div className="flex flex-col items-center">
              <div className="flex-shrink-0"></div>
                <div className="w-px h-12 mt-2" />
            </div>
            <div className="ml-4 pb-8 flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4
                    className="text-sm font-medium text-gray-900">
                    
                  </h4>
                  <p className="text-sm text-gray-500 mt-1"></p>
                    <p className="text-xs text-green-600 mt-1">
                      Completed: 
                    </p>
                  
                </div>
                <span
                  className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                      
                
                >
                </span>
              </div>
            </div>
          </div>
    
      </div>
    </div>
  );
};

export default WorkflowProgress;
