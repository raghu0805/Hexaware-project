import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AssignCourse() {
// const id = JSON.parse(sessionStorage.getItem("courseid"))?.index;
const id = sessionStorage.getItem("courseid");

console.log(id); // ✅ Output: 0
  const [course, setCourse] = useState(null);
  const [consultants, setConsultants] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(id);
  const navigate=useNavigate();
useEffect(() => {
  const fetchData = async () => {
    try {
      const courseRes = await fetch(`http://localhost:5000/course?id=${id}`);
      const courseData = await courseRes.json();
      setCourse(courseData.results);
      console.log(courseData.results)

      const consultantsRes = await fetch("http://localhost:5000/onbench");
      const consultantsData = await consultantsRes.json();
      console.log(consultantsData.results);
      setConsultants(consultantsData.results);
    } catch (err) {
      console.error("Error loading data:", err);
    } finally {
      setLoading(false); // ✅ Now loading will stop
    }
  };

  fetchData();
}, [id]);


  const handleToggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleAssign = async () => {
    try {
      const res = await fetch("http://localhost:5000/assign-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        
        body: JSON.stringify({ course_id: id, consultant_ids: selected }),
      });

      if (res.ok) {
        alert("✅ Consultants assigned successfully!");
        setSelected([]);
        navigate("/adminpage")
        
      } else {
        alert("❌ Assignment failed.");
      }
    } catch (error) {
      console.error("Error assigning:", error);
      alert("❌ Something went wrong.");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Assign Consultants to Course</h2>
        {course && (
          <div className="text-gray-600 space-y-1">
            <p><span className="font-semibold">Course Name:</span> {course[0].course_name}</p>
            <p>
              <span className="font-semibold">Course URL:</span>{" "}
              <a href={course[0].course_url} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                {course[0].course_url}
              </a>
            </p>
            <p><span className="font-semibold">Duration:</span> {course[0].duration_weeks} weeks</p>
          </div>
        )}
      </div>

      <div className="bg-white border rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold mb-4">Select Consultants</h3>
        {consultants.length === 0 ? (
          <p className="text-gray-500">No consultants available. Every people is under the work</p>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {consultants.map((consultant) => (
              <label key={consultant.user_id} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selected.includes(consultant.user_id)}
                  onChange={() => handleToggle(consultant.user_id)}
                  className="h-4 w-4"
                />
                <span>{consultant.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleAssign}
        disabled={selected.length === 0}
        className={`mt-6 w-full py-2 rounded-lg text-white font-semibold transition ${
          selected.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Assign Selected Consultants
      </button>
    </div>
  );
}
