import React from 'react'
import { Users, Briefcase, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Role =() => {
    const navigate = useNavigate();
   const handleRoleSelection = async(role) => {
    const ishr=await localStorage.setItem("Role",role);
    console.log(ishr)
    const userid=await localStorage.getItem("user_id");
    console.log(userid)
    if(ishr=='consultant'){
      if(userid){
        navigate("/login")
      }
      else{
        navigate("/login")
      }
    }
    else{
      navigate("/register");
    }
     };
  return (
     <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-blue-600">Hexaware</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Choose your role to access 
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Consultant Card */}
          <div 
            onClick={() => handleRoleSelection('consultant')}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100"
          >
            <div className="p-8">
              <div className="flex items-center justify-center w-20 h-20 bg-blue-100 rounded-2xl mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                <Briefcase className="w-10 h-10 text-blue-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4">I'm a Consultant</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Access client management tools, project tracking, billing systems, and performance analytics to streamline your consulting business.
              </p>
              
              <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-300">
                <span>I'm Consultant</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
          </div>

          {/* HR Card */}
          <div 
            onClick={() => handleRoleSelection('hr')}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100"
          >
            <div className="p-8">
              <div className="flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-2xl mb-6 group-hover:bg-emerald-200 transition-colors duration-300">
                <Users className="w-10 h-10 text-emerald-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4">I'm in HR</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Manage employee records, recruitment processes, performance reviews, and organizational analytics with comprehensive HR tools.
              </p>
              
              <div className="flex items-center text-emerald-600 font-semibold group-hover:text-emerald-700 transition-colors duration-300">
                <span>I'm HR</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Footer
        <div className="text-center mt-12">
          <p className="text-gray-500">
            Need help choosing? <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Contact Support</a>
          </p>
        </div> */}
      </div>
    </div>
  )
}

export default Role