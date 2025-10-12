import { toast } from "react-toastify";

const ShowConfirmToast = (message, onConfirm) => {
  toast(
    ({ closeToast }) => (
      <div>
        <p>{message}</p>
        <div className="flex gap-3 mt-2">
          <button
            onClick={() => {
              closeToast(); 
              onConfirm();
            }}
            className="px-3 py-1 bg-green-500 text-white rounded"
          >
            Yes
          </button>
          <button
            onClick={closeToast}
            className="px-3 py-1 bg-gray-300 text-black rounded"
          >
            No
          </button>
        </div>
      </div>
    ),
    {
      position: "top-center",
      autoClose: false, 
      closeOnClick: false,
      closeButton: false,
    }
  );
};

export default ShowConfirmToast