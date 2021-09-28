import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, Redirect } from "react-router-dom";

import { login } from "../store/actions/auth";
import { loginSchema } from "../utils/validationSchema";
import Alert from "../components/Alert";
import Spinner from "../components/layouts/Spinner";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const [userRefferer, setUserRefferer] = useState(false);
  const [leaderRefferer, setLeaderRefferer] = useState(false);

  const { isAuth, user, token, error, loading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuth && user.role === "leader") {
      console.log("vcc");
      setLeaderRefferer(true);
    }

    if (isAuth && user.role === "user") {
      console.log("acc");
      setUserRefferer(true);
    }
  }, [isAuth, user]);

  const onSubmitHandler = ({ email, password }) => {
    if (email && password) {
      dispatch(login(email, password));
    }

    reset();
  };

  console.log("loading", loading);

  if (leaderRefferer) {
    return <Redirect to="/dashboard" />;
  }

  if (userRefferer) {
    return <Redirect to="/profile" />;
  }

  console.log(leaderRefferer, userRefferer);

  return (
    <>
      {loading && <Spinner />}
      <div style={{ height: "100vh" }}>
        <div className="login-form-bg h-100">
          <div className="container h-100">
            <div className="row justify-content-center h-100">
              <div className="col-xl-6">
                <div className="form-input-content">
                  <div className="card login-form mb-0">
                    <Link
                      to="/"
                      style={{
                        width: "80px",
                        margin: "0 auto",
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: "-48px",
                      }}
                    >
                      <img
                        src="/images/bsmilogo.png"
                        style={{ height: "100%", width: "100%" }}
                      />
                    </Link>
                    <div className="card-body pt-5">
                      {error && <Alert type="danger" text={error} />}
                      <h4 className="text-center">Вход в систему</h4>

                      <form
                        className="mt-5 mb-5 login-input"
                        onSubmit={handleSubmit(onSubmitHandler)}
                      >
                        <div className="form-group">
                          <input
                            {...register("email")}
                            disabled={loading}
                            className="form-control"
                            placeholder="Электронная почта"
                          />
                          <div
                            style={{ display: "block" }}
                            className={
                              errors.email
                                ? "invalid-feedback animated fadeInDown"
                                : ""
                            }
                          >
                            {errors.email?.message}
                          </div>
                        </div>
                        <div className="form-group">
                          <input
                            {...register("password")}
                            disabled={loading}
                            type="password"
                            className="form-control"
                            placeholder="Пароль"
                          />
                          <div
                            style={{ display: "block" }}
                            className={
                              errors.password
                                ? "invalid-feedback animated fadeInDown"
                                : ""
                            }
                          >
                            {errors.password?.message}
                          </div>
                        </div>
                        <button
                          className="btn login-form__btn submit w-100"
                          disabled={loading}
                        >
                          Войти
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
    </>
  );
};

export default Login;
