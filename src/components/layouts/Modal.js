import { useState } from "react";
import Alert from "../Alert";
import Spinner from "./Spinner";

const Modal = ({
  title = "Title",
  children,
  onSuccess,
  loading,
  errorText,
  validate,
}) => {
  const [isShow, setIsShow] = useState(false);

  const handleSuccess = (data) => {
    onSuccess(data);
    setIsShow(false);
  };

  const handleOpen = () => {
    setIsShow(true);
  };

  const handleClose = () => {
    setIsShow(false);
  };

  return (
    <>
      <button type="button" className="btn btn-light" onClick={handleOpen}>
        <i className="fa fa-check"></i>
      </button>
      <div
        className="sweet-overlay"
        style={{ display: isShow ? "block" : "none", opacity: isShow ? 1 : 0 }}
      ></div>
      <div
        className={`sweet-alert ${
          isShow ? "showSweetAlert visible" : "hideSweetAlert"
        }`}
        style={{ display: isShow ? "block" : "none", opacity: isShow ? 1 : 0 }}
      >
        <form
          className="form-valide login-input"
          onSubmit={validate.handleSubmit(handleSuccess)}
        >
          <div className="row">
            <div className="col-12">
              <p>{title}</p>
            </div>
            <div className="col-12">
              {loading && <Spinner />}
              {errorText && <Alert type="danger" text={errorText} />}

              {children}
            </div>
            <div className="col-12 mt-2">
              <button
                className="btn btn-primary mr-2"
                disabled={loading}
                type="submit"
              >
                Оправить
              </button>
              <button
                className="btn btn-default"
                onClick={handleClose}
                disabled={loading}
              >
                Закрыть
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Modal;
