import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Users, 
  Target, 
  Award, 
  Calendar,
  FileText,
  TrendingUp,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  BarChart3
} from 'lucide-react';

const Layout= () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Resume Analysis',
      description: 'Automatically extract skills and generate personalized training recommendations using advanced AI'
    },
    {
      icon: Users,
      title: 'Smart Consultant Matching',
      description: 'Intelligent opportunity matching based on skills, experience, and availability'
    },
    {
      icon: Calendar,
      title: 'Automated Attendance Tracking',
      description: 'Real-time attendance monitoring with Teams integration and productivity scoring'
    },
    {
      icon: Award,
      title: 'Training & Certification Management',
      description: 'Track progress, validate certificates, and recommend courses from top platforms'
    },
    {
      icon: Target,
      title: 'Opportunity Management',
      description: 'Create, assign, and track opportunities with automated notifications'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive reporting and insights for better resource utilization'
    }
  ];

  const agents = [
    {
      name: 'Resume Agent',
      description: 'Processes resumes, extracts skills, and updates consultant profiles autonomously',
      capabilities: ['PDF/DOCX parsing', 'AI skill extraction', 'Profile suggestions', 'Quality scoring']
    },
    {
      name: 'Attendance Agent',
      description: 'Tracks attendance from multiple sources and generates comprehensive reports',
      capabilities: ['Teams integration', 'Calendar sync', 'Auto-absence detection', 'Productivity scoring']
    },
    {
      name: 'Training Agent',
      description: 'Manages training recommendations and validates certifications automatically',
      capabilities: ['AI course recommendations', 'Certificate validation', 'Progress tracking', 'Skill gap analysis']
    },
    {
      name: 'Opportunity Agent',
      description: 'Matches consultants to opportunities and handles notifications seamlessly',
      capabilities: ['AI matching', 'Auto-assignment', 'Outlook integration', 'Fit analysis']
    }
  ];

  const stats = [
    { number: '98.5%', label: 'System Uptime' },
    { number: '45ms', label: 'Avg Response Time' },
    { number: '500+', label: 'Consultants Managed' },
    { number: '24/7', label: 'Autonomous Operation' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" w-full flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Brain className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Hexaware</h1>
                <p className="text-xs text-gray-500"> Consultant Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/role"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Hexaware
              <span className="text-blue-600"> Management System</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
Enhance consultant management by deploying autonomous AI agents that perform real-time resume analysis, attendance tracking, training recommendations, and opportunity matching.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/register"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <span>Start for Free</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              {/* <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors">
                Watch Demo
              </button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Consultant Lifecycle Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From resume analysis to opportunity matching, our AI-powered platform handles every aspect 
              of consultant management with minimal human intervention.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Agentic AI Framework Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Autonomous AI Agent Framework
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Four specialized AI agents work together autonomously to manage your consultant pool 
              with minimal human intervention and maximum efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {agents.map((agent, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{agent.name}</h3>
                </div>
                <p className="text-gray-700 mb-4">{agent.description}</p>
                <div className="space-y-2">
                  {agent.capabilities.map((capability, capIndex) => (
                    <div key={capIndex} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-600">{capability}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose Our Platform?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Autonomous Operation</h3>
                    <p className="text-gray-600">AI agents work 24/7 without human intervention, processing resumes, tracking attendance, and matching opportunities automatically.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Improved Utilization</h3>
                    <p className="text-gray-600">Smart matching algorithms ensure consultants are allocated to the right opportunities faster, reducing bench time.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Enterprise Security</h3>
                    <p className="text-gray-600">Role-based access control, JWT authentication, and secure data handling ensure your consultant data is protected.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Real-Time Dashboard</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Resume Processing</span>
                  </div>
                  <span className="text-green-600 font-semibold">98.5% Success</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">Attendance Tracking</span>
                  </div>
                  <span className="text-blue-600 font-semibold">Real-time</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Target className="h-5 w-5 text-purple-500" />
                    <span className="font-medium">Opportunity Matching</span>
                  </div>
                  <span className="text-purple-600 font-semibold">AI-Powered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Consultant Management?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join leading enterprises who trust our AI-powered platform to manage their consultant pools efficiently.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2"
            >
              <span>Get Started Now</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <button className="border border-white text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="h-8 w-8 text-blue-400" />
                <div>
                  <h3 className="text-lg font-bold">Hexaware</h3>
                  <p className="text-sm text-gray-400">Pool Consultant Management</p>
                </div>
              </div>
              <p className="text-gray-400">
                AI-powered consultant management platform for modern enterprises.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Hexaware Technologies Limited. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;