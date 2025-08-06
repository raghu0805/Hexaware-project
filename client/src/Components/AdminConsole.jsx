import React, { useState, useEffect } from "react";
import { Search, Filter, Download, Users, Activity, AlertTriangle, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminConsole = () => {
  const [activeTab, setActiveTab] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [Projects,setAllProject]=useState([])
  const [allConsultants, setAllConsultants] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [activeConsultants, setActiveConsultants] = useState([]);

  const [onBenchCount, setOnBenchCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
const fetchAllConsultants = async () => {
  try {
    const res = await fetch("http://localhost:5000/consultants");
    const data = await res.json();
    setAllConsultants(data.results || []);
    setConsultants(data.results || []); // 👈 This makes sure the table is populated
  } catch (err) {
    console.error("Failed to fetch all consultants:", err);
    setAllConsultants([]);
    setConsultants([]);
  }
};
useEffect(() => {
  fetchAllConsultants(); // 👈 Called automatically when the page loads
}, []);


  // ✅ Fetch All Consultants
  useEffect(() => {
    async function fetchAll() {
      try {
        const res = await fetch("http://localhost:5000/consultants");
        const data = await res.json();
        setAllConsultants(data.results || []);
      } catch (err) {
        console.error("Failed to fetch all consultants:", err);
      }
      try {
        const res = await fetch("http://localhost:5000/projects");
        const data = await res.json();
        setAllProject(data.results || []);
      } catch (err) {
        console.error("Failed to fetch all consultants:", err);
      }
    }
    fetchAll();
  }, []);

  // ✅ Fetch On-Bench Consultants
  const fetchOnBenchConsultants = async () => {
    try {
      const res = await fetch("http://localhost:5000/onbench");
      const data = await res.json();
      setConsultants(data.results || []);
      setOnBenchCount(data.results.length);
    } catch (err) {
      console.error("Failed to fetch on-bench consultants:", err);
      setConsultants([]);
    }
  };

  // ✅ Fetch Active Consultants
  const fetchActiveConsultants = async () => {
    try {
      const res = await fetch("http://localhost:5000/active");
      const data = await res.json();
      setActiveConsultants(data.results || []);
      setConsultants(data.results || []);
    } catch (err) {
      console.error("Failed to fetch active consultants:", err);
      setActiveConsultants([]);
      setConsultants([]);
    }
  };

  // ✅ Handle Search Input
  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // ✅ Handle Search Button
  const handleSearch = async () => {
    const query = searchTerm.trim();
    if (!query) return;

    try {
      const res = await fetch("http://localhost:5000/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      if (Array.isArray(data.results)) {
        setConsultants(data.results);
      } else {
        setConsultants([]);
      }
    } catch (err) {
      console.error("Search failed:", err.message);
      setConsultants([]);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Console</h1>
        <p className="text-gray-600">Manage consultants and monitor AI agent performance</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-6 cursor-pointer">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Consultants</p>
              <p className="text-2xl font-bold text-gray-900">{allConsultants.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6 cursor-pointer" onClick={fetchActiveConsultants}>
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">{activeConsultants.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6 cursor-pointer" onClick={fetchOnBenchConsultants}>
          <div className="flex items-center">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">On Bench</p>
              <p className="text-2xl font-bold text-gray-900">{onBenchCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">In Training</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Create Project Button */}
      <div className="w-full flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">My Project</h1>
          <p className="text-gray-600">Create and manage your internal projects</p>
        </div>
        <button
          onClick={() => navigate("/createproject")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Create Project
        </button>
        
      </div>
      {Projects.length > 0 && (
        <div className="mt-6 overflow-auto">
          <table className="min-w-full bg-white border rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-left">
              <tr>
                <th className="px-4 py-2">S.No</th>
                <th className="px-4 py-2">Project ID</th>
                <th className="px-4 py-2">Project Type</th>
                <th className="px-4 py-2">Project Name</th>
                <th className="px-4 py-2">Duration</th>
                <th className="px-4 py-2">Start date</th>
                <th className="px-4 py-2">End date</th>
              </tr>
            </thead>
            <tbody>
              {Projects.map((proj, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{proj.project_id}</td>
                  <td className="px-4 py-2">{proj.project_name}</td>
                  <td className="px-4 py-2">{proj.project_type}</td>
                  <td className="px-4 py-2">{proj.duration_weeks}</td>
                  <td className="px-4 py-2">{proj.start_date.slice(0,10)}</td>
                  <td className="px-4 py-2">{proj.end_date.slice(0,10)}</td>
            
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      )}
<br></br>
<br></br>
      {/* Search Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by skill, name, or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Departments</option>
            <option value="uiux">UI/UX</option>
            <option value="react">React</option>
            <option value="dm">Digital Marketing</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="onbench">On Bench</option>
          </select>
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {/* Consultants Table */}
      {consultants.length > 0 && (
        <div className="mt-6 overflow-auto">
          <table className="min-w-full bg-white border rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-left">
              <tr>
                <th className="px-4 py-2">S.No</th>
                <th className="px-4 py-2">Consultant ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Skills</th>
              </tr>
            </thead>
            <tbody>
              {consultants.map((user, index) => (
                <tr key={user.user_id} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{user.user_id}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    {user.skills
                      ? user.skills.replace(/[{}"]/g, "").split(",").map(s => s.trim()).join(", ")
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminConsole;
