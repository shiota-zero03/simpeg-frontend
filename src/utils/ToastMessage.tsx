import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify";

interface Props {
  title?: string;
  text?: string;
}

export const ErrorToast = ({ title, text }: Props) => {
  const message = (
    <div>
      {title && <strong className="block">{title}</strong>}
      {text && <span className="text-sm">{text}</span>}
    </div>
  );

  toast.error(message, {
    icon: <FaTimesCircle />,
    autoClose: 3000,
    position: "top-right",
    className: "px-2 bg-danger text-white",
  });
};

export const SuccessToast = ({ title, text }: Props) => {
  const message = (
    <div>
      {title && <strong className="block">{title}</strong>}
      {text && <span>{text}</span>}
    </div>
  );

  toast.success(message, {
    icon: <FaCheckCircle />,
    autoClose: 3000,
    position: "top-right",
    className: "px-2 bg-primary text-white",
  });
};
