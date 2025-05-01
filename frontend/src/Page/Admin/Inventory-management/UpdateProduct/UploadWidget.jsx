import React, { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

const UploadWidget = ({ files, setFiles, onRemoveImage }) => {
  const [previewItems, setPreviewItems] = useState([]);

  // Build the preview array whenever `files` changes
  useEffect(() => {
    const newPreviewItems = files.map((item) => {
      if (typeof item === "string") {
        // Existing image URL
        return {
          src: item,
          isFile: false,
        };
      } else {
        // New uploaded File
        return {
          src: URL.createObjectURL(item),
          isFile: true,
        };
      }
    });
    setPreviewItems(newPreviewItems);
  }, [files]);

  // Handler for when the user selects new image files
  const addImages = (event) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const fileArray = Array.from(selectedFiles);
    // Add new files without affecting existing ones
    setFiles((prevFiles) => [...prevFiles, ...fileArray]);

    event.target.value = ""; // Reset file input
  };

  // Updated handler for removing an image
  const removeImage = (index) => {
    // Get the image that is being removed
    const fileToRemove = files[index];

    // If it's an existing image (a URL), call the parent's remove callback
    if (typeof fileToRemove === "string" && onRemoveImage) {
      onRemoveImage(fileToRemove);
    }

    // Remove the image from the files array
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full">
      {/* Upload Box */}
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer hover:border-blue-500 transition">
        <AiOutlineCloudUpload size={50} className="text-blue-500 mb-2" />
        <span className="text-gray-600 font-medium">
          Click to upload up to 5 images
        </span>
        <input
          type="file"
          multiple
          accept="image/png, image/jpeg, image/webp"
          onChange={addImages}
          className="hidden"
        />
      </label>

      {/* Image Preview Section */}
      {previewItems.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Image Preview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {previewItems.map((item, index) => (
              <div key={index} className="relative">
                <img
                  src={item.src}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-lg shadow-sm"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition"
                >
                  <BsTrash size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadWidget;
