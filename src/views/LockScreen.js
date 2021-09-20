import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { unlockProfile } from "../store/actions/auth";

const LockScreen = () => {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleChange = (e) => setPassword(e.target.value);

  const handleUnlock = (e) => {
    e.preventDefault();

    if (password) {
      dispatch(unlockProfile(password));
    }
  };

  return (
    <>
      <div style={{ height: "100vh" }}>
        <div className="login-form-bg h-100">
          <div className="container h-100">
            <div className="row justify-content-center h-100">
              <div className="col-xl-6">
                <div className="form-input-content">
                  <div className="card login-form mb-0">
                    <div className="card-body pt-5">
                      <h1 className="text-center">
                        <i className="fa fa-lock"></i>
                      </h1>
                      <h6 className="text-center">
                        Введите пароль для разблокировки
                      </h6>
                      <form
                        className="mt-5 mb-3 login-input"
                        method="POST"
                        onSubmit={handleUnlock}
                      >
                        <div className="form-group">
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Пароль"
                            required
                            value={password}
                            onChange={handleChange}
                          />
                        </div>
                        <button className="btn login-form__btn submit w-100">
                          Разблокировать
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!user.isLockProfile && <Redirect to="/" />}
    </>
  );
};

export default LockScreen;
