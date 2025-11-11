import { toast } from "react-toastify";
import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";

const ShowConfirmToast = (message, onConfirm) => {
  toast(
    ({ closeToast }) => (
      <div role="alert" className="flex items-start gap-3">
        <FaInfoCircle className="text-blue-500 mt-1 text-lg" />
        <div className="flex-1">
          <p className="text-gray-900 text-sm font-medium">{message}</p>
          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => {
                closeToast();
                onConfirm();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <FaCheck />
              Yes
            </button>
            <button
              onClick={closeToast}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-semibold rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <FaTimes />
              No
            </button>
          </div>
        </div>
      </div>
    ),
    {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
      pauseOnHover: true,
    }
  );
};

export default ShowConfirmToast;
