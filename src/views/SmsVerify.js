import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { sendSmsCode, clearSmsToken } from "../store/actions/auth";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import moment from "moment";
import Alert from "../components/Alert";
import Spinner from "../components/layouts/Spinner";

const SMSVerify = () => {
  const [smsCode, setSmsCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [diff, setDiff] = useState("");
  const { smsVerify, smsCodeError, smsLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (smsVerify.smsToken) {
      console.log("VERIFY", smsVerify);
      const decoded = jwtDecode(smsVerify.smsToken);

      const interval = setInterval(() => {
        const diff = decoded.exp * 1000 - Date.now();

        if (diff <= 0) {
          setDiff("");
        } else {
          setDiff(diff);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  const submit = (smsCode) => {
    dispatch(sendSmsCode(smsCode, smsVerify.smsToken));
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, "");

    if (value.length < 5) {
      setErrorMessage("Код должен состоять только из 5-цифр");
    } else {
      setErrorMessage("");
      submit(value);
    }

    setSmsCode(value);
  };

  const back = () => {
    dispatch(clearSmsToken());
  };

  console.log(smsVerify.smsToken);
  if (!smsVerify.smsToken) {
    return <Redirect to="/" />;
  }

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
        {smsCodeError && <Alert type="danger" text={smsCodeError} />}
        <div className="card p-2">
          <div className="card-body">
            {smsLoading && <Spinner />}
            <div className="row">
              <div className="col d-flex flex-column align-items-center mb-3">
                <h4 className="title text-center mb-3">
                  Для продолжения подтвердите код
                </h4>
                <p className="text-center">
                  Мы отправили СМС на номер +{smsVerify.recipient}
                </p>
              </div>
            </div>
            <form className="form-valide">
              <div className="row">
                <div className="col d-flex flex-column align-items-center">
                  <div className="form-group row is-invalid d-flex flex-column align-items-center">
                    <input
                      className="form-control rounded px-2"
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
                      disabled={smsLoading || !diff}
                      value={smsCode}
                      onChange={handleChange}
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
                  {diff ? (
                    <p>Код устареет через {moment(diff).format("mm:ss")}</p>
                  ) : (
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={back}
                    >
                      Назад
                    </button>
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
