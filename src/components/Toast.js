import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearMessageNotification } from "../store/actions/message";
import { clearStatementNotification } from "../store/actions/statement";

const Toast = ({
  title = "Title",
  message = "Toast message",
  type = "info",
  position = "top-center",
}) => {
  const [progress, setProgress] = useState(100);
  const [show, setShow] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (show && progress > 0) {
      setTimeout(() => {
        setProgress(progress - 5);
        console.log(2);
      }, 200);
    } else {
      dispatch(clearMessageNotification());
      dispatch(clearStatementNotification());
    }
  }, [progress]);

  const handleClose = () => setShow(false);

  return (
    show && (
      <div id="toast-container" className={`toast-${position}`}>
        <div
          className={`toast toast-${type}`}
          aria-live="polite"
          style={{ opacity: progress / 10 }}
        >
          <div
            className="toast-progress"
            style={{ width: `${progress}%` }}
          ></div>
          <button
            type="button"
            className="toast-close-button"
            role="button"
            onClick={handleClose}
          >
            ×
          </button>
          <div className="toast-title">{title}</div>
          <div className="toast-message">{message}</div>
        </div>
      </div>
    )
  );
};

export default Toast;
