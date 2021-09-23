import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Alert from "../components/Alert";

import { unlockProfile } from "../store/actions/auth";
import { unlockSchema } from "../utils/validationSchema";

const LockScreen = () => {
  const { handleSubmit, formState, register } = useForm({
    mode: "onChange",
    resolver: yupResolver(unlockSchema),
  });

  const { user, error } = useSelector((state) => state.auth);
  console.log(error);
  const dispatch = useDispatch();

  const handleUnlock = (data) => {
    dispatch(unlockProfile(data.password));
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
                    <div className="card-body pt-4">
                      {error && <Alert type="danger" text={error} />}
                      <h1 className="text-center">
                        <i className="fa fa-lock"></i>
                      </h1>
                      <h6 className="text-center">
                        Введите пароль для разблокировки
                      </h6>
                      <form
                        className="mt-5 mb-3 login-input"
                        method="POST"
                        onSubmit={handleSubmit(handleUnlock)}
                      >
                        <div className="form-group">
                          <input
                            {...register("password")}
                            type="password"
                            className="form-control"
                            placeholder="Пароль"
                            required
                          />
                        </div>
                        <div
                          style={{ display: "block" }}
                          className={
                            formState.errors.password
                              ? "invalid-feedback animated fadeInDown"
                              : ""
                          }
                        >
                          {formState.errors.password?.message}
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
