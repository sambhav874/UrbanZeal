import { useState } from 'react';
import toast from 'react-hot-toast';

export default function EditableImage({ links, setLinks }) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  async function handleFileChange(ev) {
    const files = ev.target.files;

    if (files?.length > 0) {
      const newSelectedFiles = Array.from(files);
      setSelectedFiles(newSelectedFiles);
    }
  }

  async function handleUpload() {
    const uploadPromises = selectedFiles.map(async (file) => {
      const data = new FormData();
      data.set("file", file);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: data,
        });
        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`);
        }
        const responseData = await response.json();
        const imageURL =
          responseData.url ||
          responseData.path ||
          responseData.imageUrl ||
          responseData.link;
        if (!imageURL) {
          throw new Error("Missing image URL in response");
        }
        return imageURL;
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Upload failed. Please try again.");
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    const filteredImages = uploadedImages.filter((image) => image !== null);
    setLinks([...links, ...filteredImages]);
    setSelectedFiles([]);
  }

  function handleRemove(index) {
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
  }

  return (
    <div>
      {links.map((link, index) => (
        <div key={index} className="relative inline-block">
          <img
            src={link}
            className="w-32 h-32 rounded-lg mb-2 mr-2"
            alt={`Image ${index}`}
          />
          <button
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
            onClick={() => handleRemove(index)}
          >
            X
          </button>
        </div>
      ))}
      <input
        type="file"
        multiple
        
        onChange={handleFileChange}
      ></input>
      <button
        className="block rounded-lg p-2 text-center border-gray-300 cursor-pointer border"
        type="button"
        onClick={handleUpload}
      >
        Add Images
      </button>
    </div>
  );
}
