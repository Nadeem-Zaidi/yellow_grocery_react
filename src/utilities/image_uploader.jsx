import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const ImageUploader = ({
  images,
  setImages,
  existingImages,
  setExistingImages,
  handleImageChange,
}) => {
  return (
    <>
      <div className="flex flex-wrap mt-2 space-x-2">
        <div className="w-48 h-48 mb-4">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              multiple
              onChange={(e) => handleImageChange(e)}
            />
          </label>
        </div>

        <div className="flex flex-wrap space-x-2">
          {existingImages?.map((image, index) => (
            <div key={index} className="relative w-48 h-48 mb-4">
              <img
                src={image}
                alt={`Uploaded ${index}`}
                className="w-full h-full object-cover border border-gray-400 rounded-md"
              />
              <button
                onClick={() =>
                  setExistingImages(
                    existingImages.filter((_, i) => i !== index)
                  )
                }
                className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}

          {images?.map((image, index) => (
            <div key={index} className="relative w-48 h-48 mb-4">
              <img
                src={URL.createObjectURL(image)}
                alt={`Uploaded ${index}`}
                className="w-full h-full object-cover border border-gray-400 rounded-md"
              />
              <button
                onClick={() => setImages(images.filter((_, i) => i !== index))}
                className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
