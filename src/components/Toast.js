import { useEffect, useState } from "react";

const Toast = ({
  title = "Title",
  message = "Toast message",
  type = "info",
  position = "top-center",
}) => {
  const [progress, setProgress] = useState(100);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (show && progress > 0) {
      setTimeout(() => {
        setProgress(progress - 5);
        console.log(2);
      }, 200);
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
