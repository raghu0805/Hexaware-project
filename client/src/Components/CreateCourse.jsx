import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateCourse() {
  const [courseName, setCourseName] = useState("");
  const [courseUrl, setCourseUrl] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (courseDuration > 0) {
      const today = new Date();
      const end = new Date(today);
      end.setDate(today.getDate() + courseDuration * 7);
      setStartDate(today.toISOString().split("T")[0]);
      setEndDate(end.toISOString().split("T")[0]);
    }
  }, [courseDuration]);

  const handleSubmit = async () => {
    const courseData = {
      course_name: courseName,
      course_url: courseUrl,
      duration_weeks: courseDuration,
      start_date: startDate,
      end_date: endDate,
    };

    try {
      const res = await fetch("http://localhost:5000/create-course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Course created successfully!");
        navigate("/adminpage");
      } else {
        alert("❌ Failed to create course: " + data.error);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Something went wrong!");
    }
  };

  const isCreateDisabled = !courseName || !courseUrl || !courseDuration;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create New Course</h1>
        <p className="text-gray-600">Add a training course for consultants or new employees.</p>
      </div>

      <div className="bg-white shadow-sm rounded-xl border p-6 space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Course Name</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Course URL</label>
          <input
            type="url"
            value={courseUrl}
            onChange={(e) => setCourseUrl(e.target.value)}
            placeholder="https://www.udemy.com/course/..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Course Duration (in weeks)</label>
          <input
            type="number"
            min="1"
            max="52"
            value={courseDuration}
            onChange={(e) => setCourseDuration(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isCreateDisabled}
          className={`px-6 py-2 rounded-lg text-white transition ${
            isCreateDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Create Course
        </button>
      </div>
    </div>
  );
}
