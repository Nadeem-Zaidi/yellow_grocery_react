import Loader from "../components/loader/loader";
import LoadingModal from "../components/modal/loading_modal";

const ErrorMessage = ({ content, onClose, boxType }) => {
  const header = (headerText) => (
    <h2 className="text-xl font-semibold text-red-600 mb-4 text-center shadow-sm">
      {headerText}
    </h2>
  );

  return (
    <LoadingModal onClose={onClose}>
      <div className="flex flex-col py-1 bg-white rounded-md">
        {boxType === "info" && header("Information")}
        {boxType === "error" && header("Error")}
        {boxType === "warning" && header("Warning")}
        <p className="text-gray-600 mb-6 px-2">{content}</p>

        <div className="flex flex-row justify-end px-1">
          <button
            type="button"
            className="px-2 py-1 border-none bg-primary text-white rounded-md"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </LoadingModal>
  );
};

export default ErrorMessage;
