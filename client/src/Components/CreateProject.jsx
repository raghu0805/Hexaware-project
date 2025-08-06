import React, { useState, useEffect } from "react";

export default function CreateProject() {
  const [projectType, setProjectType] = useState("");
  const [teamSize, setTeamSize] = useState(0);
  const [roles, setRoles] = useState([]);
  const [duration, setDuration] = useState("");
  const [selectedMembers, setSelectedMembers] = useState({});
  const [onBenchConsultants, setOnBenchConsultants] = useState([]);

  const roleSuggestions = {
    fullstack: ["Frontend Developer", "Backend Developer", "Designer", "Researcher"],
    ai: ["Data Scientist", "ML Engineer", "Annotator", "Research Analyst"],
    ml: ["ML Engineer", "Data Engineer", "Analyst", "Trainer"],
  };

  const roleToSkillsMap = {
    "Frontend Developer": ["React", "HTML", "CSS", "JavaScript"],
    "Backend Developer": ["Node.js", "Express", "PostgreSQL", "Django","Database"],
    "Designer": ["UI/UX", "Figma", "Adobe","Web Design"],
    "Researcher": ["Research", "Documentation","Ux Research"],

    "Data Scientist": ["Python", "Pandas", "Statistics"],
    "ML Engineer": ["Machine Learning", "Scikit-learn", "TensorFlow", "ML"],
    "Annotator": ["Labeling", "Annotation"],
    "Research Analyst": ["SQL", "Excel", "Market Research"],

    "Data Engineer": ["SQL", "ETL", "Data Pipeline"],
    "Analyst": ["Analytics", "Reporting", "Visualization"],
    "Trainer": ["Teaching", "Presentation"],
  };

  useEffect(() => {
    fetch("http://localhost:5000/onbench")
      .then((res) => res.json())
      .then((data) => setOnBenchConsultants(data.results || []))
      .catch((err) => console.error("Failed to fetch on-bench consultants:", err));
  }, []);

  useEffect(() => {
    if (projectType && roleSuggestions[projectType]) {
      const newRoles = roleSuggestions[projectType];
      setRoles(newRoles);
      setTeamSize(newRoles.length);
      setSelectedMembers({});
    }
  }, [projectType]);

  const handleMemberSelect = (role, userId) => {
    if (Object.values(selectedMembers).includes(userId)) return;
    setSelectedMembers((prev) => ({ ...prev, [role]: userId }));
  };

  const isMemberSelectedElsewhere = (userId, currentRole) => {
    return Object.entries(selectedMembers).some(
      ([role, uid]) => uid === userId && role !== currentRole
    );
  };

  const isQualifiedForRole = (consultant, role) => {
    const requiredSkills = (roleToSkillsMap[role] || []).map((skill) =>
      skill.toLowerCase()
    );

    const normalizedSkills = consultant.skills
      ?.replace(/[{}"]/g, "")
      .split(",")
      .map((s) => s.trim().toLowerCase());

    return requiredSkills.some((skill) => normalizedSkills?.includes(skill));
  };

const handleSubmit = async () => {
  const projectData = {
    projectType,
    duration,
    team: roles.map((role) => ({
      role,
      user_id: selectedMembers[role] || null,
    })),
  };
  console.log("Project Data:",projectData )
  try {
    const res = await fetch("http://localhost:5000/create-project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData),
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Project created successfully!");
    } else {
      alert("❌ Failed to create project: " + data.error);
    }
  } catch (err) {
    console.error("Error:", err);
    alert("❌ Something went wrong!");
  }
};


  const isCreateDisabled =
    Object.keys(selectedMembers).length !== roles.length ||
    onBenchConsultants.length < roles.length ||
    !duration;

  return (
    <div className="p-6">
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
            <p className="text-gray-700 font-medium mb-2">
              Assign Members to Roles (Team Size: {teamSize})
            </p>
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
                    {onBenchConsultants.map((consultant) => {
                      const isQualified = isQualifiedForRole(consultant, role);
                      const isUsed = isMemberSelectedElsewhere(
                        consultant.user_id,
                        role
                      );
                      return (
                        <option
                          key={consultant.user_id}
                          value={consultant.user_id}
                          disabled={isUsed || !isQualified}
                        >
                          {consultant.name}
                          {!isQualified ? " (Not qualified)" : ""}
                        </option>
                      );
                    })}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Project Duration (in weeks)
          </label>
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
          disabled={isCreateDisabled}
          className={`px-6 py-2 rounded-lg text-white transition ${
            isCreateDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          Create Project
        </button>
      </div>
    </div>
  );
}
