import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { createStatement } from "../store/actions/statement";
import { smsVerifySchema } from "../utils/validationSchema";
import { useState, useEffect } from "react";
import moment from "moment";
import Alert from "../components/Alert";

const SMSVerify = () => {
  const [smsCode, setSmsCode] = useState("");
  const [diff, setDiff] = useState("");
  const {
    smsVerify: { smsToken, recipient },
    error,
  } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (smsToken) {
      const decoded = JSON.parse(atob(smsToken.split(".")[1]));

      setInterval(() => {
        const diff = decoded.exp * 1000 - Date.now();
        setDiff(diff);
      }, 1000);
    }
  }, []);
  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit,
  //   reset,
  // } = useForm({
  //   mode: "onChange",
  //   resolver: yupResolver(smsVerifySchema),
  // });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(createStatement(smsCode));
  };

  if (!smsToken) {
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
        {error && <Alert type="danger" text={error} />}
        <div className="card p-5">
          <div className="card-body">
            <div className="row">
              <div className="col d-flex flex-column align-items-center mb-3">
                <h3 className="title mb-5">Для продолжения подтвердите код</h3>
                <p>Мы отправили СМС на номер +{recipient}</p>
              </div>
            </div>
            <form className="form-valide" onSubmit={onSubmitHandler}>
              <div className="row">
                <div className="col d-flex flex-column align-items-center">
                  <div className="form-group row is-invalid d-flex flex-column align-items-center">
                    <input
                      style={{
                        fontSize: "20px",
                        letterSpacing: "8px",
                        width: "115px",
                      }}
                      type="tel"
                      id="name"
                      className="form-control px-2"
                      name="name"
                      value={smsCode}
                      onChange={(e) => setSmsCode(e.target.value)}
                    />
                    <div className="invalid-feedback animated fadeInDown"></div>
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
