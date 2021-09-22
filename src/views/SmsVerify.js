import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { sendSmsCode } from "../store/actions/auth";
import { useState, useEffect } from "react";
import moment from "moment";
import Alert from "../components/Alert";

const SMSVerify = () => {
  const [smsCode, setSmsCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [diff, setDiff] = useState("");
  const { smsVerify, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (smsVerify.smsToken) {
      const decoded = JSON.parse(atob(smsVerify.smsToken.split(".")[1]));

      setInterval(() => {
        const diff = decoded.exp * 1000 - Date.now();
        setDiff(diff);
      }, 1000);
    }
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (smsCode.length < 5) {
      setErrorMessage("Код должен состоять только из 5-цифр");
    } else {
      dispatch(sendSmsCode(smsCode, smsVerify.smsToken));
      setErrorMessage("");
    }
  };

  if (!smsVerify.smsToken) {
    return <Redirect to="/" />;
  }

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, "");

    if (value.length < 5) {
      setErrorMessage("Код должен состоять только из 5-цифр");
    } else {
      setErrorMessage("");
    }

    setSmsCode(value);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="container row d-flex flex-column align-items-center">
        {error && <Alert type="danger" text={error} />}
        <div className="card p-5">
          <div className="card-body">
            <div className="row">
              <div className="col d-flex flex-column align-items-center mb-3">
                <h3 className="title mb-5">Для продолжения подтвердите код</h3>
                <p>Мы отправили СМС на номер +{smsVerify.recipient}</p>
              </div>
            </div>
            <form className="form-valide" onSubmit={onSubmitHandler}>
              <div className="row">
                <div className="col d-flex flex-column align-items-center">
                  <div className="form-group row is-invalid d-flex flex-column align-items-center">
                    <input
                      className="form-control px-2"
                      style={{
                        fontSize: "20px",
                        letterSpacing: "8px",
                        width: "115px",
                      }}
                      type="tel"
                      id="name"
                      name="smsCode"
                      minLength="5"
                      maxLength="5"
                      onChange={handleChange}
                      value={smsCode}
                    />
                    <div
                      style={{ display: "block" }}
                      className={
                        errorMessage
                          ? "invalid-feedback animated fadeInDown"
                          : ""
                      }
                    >
                      {errorMessage}
                    </div>
                  </div>
                  {diff && (
                    <p>
                      Вы можете отправить код повторно через{" "}
                      {moment(diff).format("mm:ss")}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMSVerify;
