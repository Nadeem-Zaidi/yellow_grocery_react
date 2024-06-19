import Loader from "../components/loader/loader";
import LoadingModal from "../components/modal/loading_modal";

const ErrorMessage = ({ content, onClose }) => {
    return (
        <LoadingModal>
            <div className="flex flex-col items-center p-6">
                <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
                <p className="text-gray-600 mb-6">{content}</p>
                <button
                    type='button'
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </LoadingModal>
    );
}

export default ErrorMessage;
