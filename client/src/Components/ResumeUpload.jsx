import React, { useRef, useState } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { useUser } from './UseContext';

const ResumeUpload = ({ isDragActive }) => {
  const fileInputRef = useRef(null);
  const [uploadStatus, setUploadStatus] = useState(null); // "loading", "success", "error"
    const { userDetail } = useUser();
  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadStatus("loading");

    const formData = new FormData();
    formData.append('resume', file, file.name);


    try {
      const response = await fetch(`http://localhost:5000/upload?userId=${userDetail.user_id}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Embedding response:", data);
        setUploadStatus("success");
      } else {
        console.error("Upload failed");
        setUploadStatus("error");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("error");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <div
        onClick={handleDivClick}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx"
        />

        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-2">Drag & drop your resume here, or click to select</p>
        <p className="text-sm text-gray-500">Supported formats: PDF, DOC, DOCX</p>
      </div>

      {/* Status Messages */}
      {uploadStatus === "loading" && (
        <div className="text-center py-8 space-y-2">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
          <p className="text-gray-700 text-lg font-semibold">Processing your resume...</p>
          <p className="text-sm text-gray-500">
            Our AI is analyzing and converting your resume into an embedding.
          </p>
        </div>
      )}

      {uploadStatus === "success" && (
        <div className="text-center py-8 space-y-2">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
          <p className="text-gray-900 text-lg font-medium">Resume uploaded and embedded successfully!</p>
        </div>
      )}

      {uploadStatus === "error" && (
        <div className="text-center py-8 space-y-2">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <p className="text-red-700 text-lg font-medium">Failed to process the resume.</p>
          <p className="text-sm text-gray-500">Please try again or use a different file.</p>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
