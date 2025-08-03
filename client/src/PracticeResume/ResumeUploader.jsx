// ResumeUploader.jsx
import React, { useState } from 'react';

function ResumeUploader() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('resume', file);

    const res = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    console.log(data); // { text, embedding }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload Resume</button>
    </div>
  );
}

export default ResumeUploader;
