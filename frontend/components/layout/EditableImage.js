import Image from "next/image";
import toast from 'react-hot-toast'

export default function EditableImage({ link, setLink }) {
  async function handleFileChange(ev) {
    const files = ev.target.files;

    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const loadingToastId = toast.promise(
        new Promise((resolve, reject) => {
          fetch("/api/upload", {
            method: "POST",
            body: data,
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Upload failed: ${response.statusText}`);
              }
              return response.json();
            })
            .then((responseData) => {
              const imageURL =
                responseData.url ||
                responseData.path ||
                responseData.imageUrl ||
                responseData.link;
              if (!imageURL) {
                throw new Error("Missing image URL in response");
              }
              resolve(imageURL);
            })
            .catch((error) => {
              reject(error);
            });
        }),
        {
          loading: "Uploading...",
          success: "Profile image uploaded!",
          error: "Upload failed. Please try again.",
        }
      );

      try {
        const imageURL = await loadingToastId;
        setLink(imageURL);
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Upload failed. Please try again.");
      }
    }
  }

  return (
    <>
      {link && (
        <Image
          src={`${link}`}
          className="w-full h-full rounded-lg mb-2"
          width={250}
          height={250}
          alt="User Avatar"
        />
      )}
      {!link && (
        <div className="bg-gray-200 p-4 text-gray-500 rounded-lg mb-1 text-center">
            No image
        </div>
      )}
      <label>
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
        ></input>
        <span
          className="block rounded-lg p-2 text-center border-gray-300 cursor-pointer border"
          type="button"
        >
          Change Avatar
        </span>
      </label>
    </>
  );
}
