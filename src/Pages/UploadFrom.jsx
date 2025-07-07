
import React, { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/social/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Upload successful! File ID: " + data.file_id);
      } else {
        setMessage("Upload failed: " + data.detail);
      }
    } catch (error) {
      setMessage("Error uploading file.");
    }
  };

  return (
    <div>
      <h2>Upload Image to My Drive</h2>
      <input type="file" accept="image/*" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
    </div>
  );
}
