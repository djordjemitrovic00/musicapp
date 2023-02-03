import { toast } from "react-toastify";

const defaultOptions = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  pauseOnFocusLoss: false,
  draggable: true,
};

export const makeToastMessage = (message, options = defaultOptions) => toast(message, options);
export const makeErrorToastMessage = (message, options = defaultOptions) => toast.error(message, options);