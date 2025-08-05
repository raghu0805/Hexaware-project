import React, { useState, useEffect } from "react";

export default function CreateProject() {
  const [projectType, setProjectType] = useState("");
  const [teamSize, setTeamSize] = useState(0);
  const [roles, setRoles] = useState([]);
  const [duration, setDuration] = useState("");
  const [selectedMembers, setSelectedMembers] = useState({});
  const [allConsultants, setAllConsultants] = useState([]);

  const roleSuggestions = {
    fullstack: ["Frontend Developer", "Backend Developer", "Designer", "Researcher"],
    ai: ["Data Scientist", "ML Engineer", "Annotator", "Research Analyst"],
    ml: ["ML Engineer", "Data Engineer", "Analyst", "Trainer"]
  };

  // Example: simulate fetching consultants from backend
  useEffect(() => {
    setAllConsultants([
      { user_id: "uuid-1", name: "Alice" },
      { user_id: "uuid-2", name: "Bob" },
      { user_id: "uuid-3", name: "Charlie" },
      { user_id: "uuid-4", name: "Diana" },
      { user_id: "uuid-5", name: "Ethan" },
    ]);
  }, []);

  // When project type changes, auto-set team size and roles
  useEffect(() => {
    if (projectType && roleSuggestions[projectType]) {
      const newRoles = roleSuggestions[projectType];
      setRoles(newRoles);
      setTeamSize(newRoles.length);
      setSelectedMembers({}); // reset selected members
    }
  }, [projectType]);

  const handleMemberSelect = (role, userId) => {
    setSelectedMembers((prev) => ({
      ...prev,
      [role]: userId,
    }));
  };

  const handleSubmit = () => {
    const projectData = {
      projectType,
      teamSize,
      duration,
      team: roles.map((role) => ({
        role,
        user_id: selectedMembers[role] || null,
      })),
    };

    console.log("Project Created:", projectData);
    // send to backend here
  };

  return (
    <div className="p-6  ">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New Project</h1>
        <p className="text-gray-600">Define your project and assign required team members.</p>
      </div>

      <div className="bg-white shadow-sm rounded-xl border p-6 space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Project Type</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
          >
            <option value="">Select Project Type</option>
            <option value="fullstack">Full Stack</option>
            <option value="ai">AI</option>
            <option value="ml">ML</option>
          </select>
        </div>

        {projectType && (
          <div>
            <p className="text-gray-700 font-medium mb-2">Assign Members to Roles (Team Size: {teamSize})</p>
            <div className="space-y-4">
              {roles.map((role, index) => (
                <div key={index}>
                  <label className="block text-sm text-gray-600 mb-1">{role}</label>
                  <select
                    value={selectedMembers[role] || ""}
                    onChange={(e) => handleMemberSelect(role, e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  >
                    <option value="">Select Member</option>
                    {allConsultants.map((consultant) => (
                      <option key={consultant.user_id} value={consultant.user_id}>
                        {consultant.name}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-gray-700 font-medium mb-1">Project Duration (in weeks)</label>
          <input
            type="number"
            min="1"
            max="52"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Create Project
        </button>
      </div>
    </div>
  );
}
