import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import Alert from "../components/Alert";
import Header from "../components/layouts/Header";
import MainLayout from "../components/layouts/MainLayout";
import Main from "../components/layouts/Main";
import Nav from "../components/layouts/Nav";
import Spinner from "../components/layouts/Spinner";
import { auth, verifySMS } from "../store/actions/auth";
import { createStatement } from "../store/actions/statement";
import { getLeaders } from "../store/actions/user";
import {
  createStatementSchema,
  createStatementFormSchema,
} from "../utils/validationSchema";
import Footer from "../components/layouts/Footer";

const MainPage = () => {
  const notAuthUserForm = useForm({
    mode: "onChange",
    resolver: yupResolver(createStatementSchema),
  });

  const authUserForm = useForm({
    mode: "onChange",
    resolver: yupResolver(createStatementFormSchema),
  });

  const { leaders } = useSelector((state) => state.user);
  const { smsVerify, isAuth, error, loading } = useSelector(
    (state) => state.auth
  );
  const statementState = useSelector((state) => state.statement);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeaders());
  }, []);

  // const handleChange = (e) => {
  //   if (e.target.files) {
  //     const objsURL = Array.from(e.target.files).map((file) =>
  //       URL.createObjectURL(file)
  //     );
  //     return setFields({
  //       ...fields,
  //       files: { ...fields.files, value: objsURL, error: "" },
  //     });
  //   }

  //   setFields({
  //     ...fields,
  //     [e.target.name]: {
  //       ...fields[e.target.name],
  //       value: e.target.value,
  //       error: "",
  //     },
  //   });
  // };

  const onSubmitHandlerForNotAuth = async (data) => {
    dispatch(verifySMS(data));
    // reset();
    // history.push("/sms-verify");
  };

  const onSubmitHandlerForAuth = async (data) => {
    dispatch(createStatement(data));
    // reset();
    // history.push("/sms-verify");
  };

  if (smsVerify?.smsToken) {
    return <Redirect to="/sms-verify" />;
  }

  return (
    <MainLayout>
      <Nav />
      <Header />
      <Main>
        <div className="container">
          <div className="card">
            <div className="card-body">
              {statementState.loading || loading ? (
                <Spinner />
              ) : (
                <>
                  <div className="row">
                    <div className="col">
                      {error && <Alert type="danger" text={error} />}
                      {statementState.error && (
                        <Alert type="danger" text={statementState.error} />
                      )}
                      <h4 className="text-center">Заполните онлайн-заявку</h4>
                    </div>
                  </div>

                  {isAuth ? (
                    <form
                      className="form-valide login-input mt-5"
                      onSubmit={authUserForm.handleSubmit(
                        onSubmitHandlerForAuth
                      )}
                    >
                      <div className="row">
                        <div className="col">
                          <div className="form-group row is-invalid">
                            <label
                              htmlFor="leader"
                              className="col-12 col-form-label"
                            >
                              Руководство
                              <span className="text-danger">*</span>
                            </label>
                            <div className="col-12">
                              <select
                                {...authUserForm.register("leader")}
                                id="leader"
                                name="leader"
                                className="form-control valid"
                              >
                                {leaders.map((leader) => (
                                  <option key={leader._id} value={leader._id}>
                                    {leader.name}
                                  </option>
                                ))}
                              </select>
                              <div
                                style={{ display: "block" }}
                                className={
                                  authUserForm.formState.errors.leader
                                    ? "invalid-feedback animated fadeInDown"
                                    : ""
                                }
                              >
                                {authUserForm.formState.errors.leader?.message}
                              </div>
                            </div>
                          </div>
                          <div className="form-group row is-invalid">
                            <label
                              htmlFor="theme"
                              className="col-12 col-form-label"
                            >
                              Тема
                              <span className="text-danger">*</span>
                            </label>
                            <div className="col-12">
                              <input
                                {...authUserForm.register("theme")}
                                id="theme"
                                className="form-control"
                                name="theme"
                                placeholder="Перевод учебы"
                              />
                              <div
                                style={{ display: "block" }}
                                className={
                                  authUserForm.formState.errors.theme
                                    ? "invalid-feedback animated fadeInDown"
                                    : ""
                                }
                              >
                                {authUserForm.formState.errors.theme?.message}
                              </div>
                            </div>
                          </div>
                          <div className="form-group row is-invalid">
                            <label
                              htmlFor="message"
                              className="col-12 col-form-label"
                            >
                              Сообщение
                              <span className="text-danger">*</span>
                            </label>
                            <div className="col-12">
                              <textarea
                                {...authUserForm.register("message")}
                                id="message"
                                className="form-control"
                                name="message"
                                rows="5"
                                placeholder="Текст..."
                              ></textarea>
                              <div
                                style={{ display: "block" }}
                                className={
                                  authUserForm.formState.errors.message
                                    ? "invalid-feedback animated fadeInDown"
                                    : ""
                                }
                              >
                                {authUserForm.formState.errors.message?.message}
                              </div>
                            </div>
                          </div>
                          <div className="form-group row is-invalid">
                            <label
                              htmlFor="files"
                              className="col-12 col-form-label"
                            >
                              Файл
                            </label>
                            <div className="col-12">
                              <input
                                {...authUserForm.register("files")}
                                type="file"
                                id="files"
                                className="form-control"
                                placeholder="Перевод учебы"
                                multiple
                              />
                              <div
                                style={{ display: "block" }}
                                className={
                                  authUserForm.formState.errors.files
                                    ? "invalid-feedback animated fadeInDown"
                                    : ""
                                }
                              >
                                {authUserForm.formState.errors.files?.message}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <button className="btn btn-primary" type="submit">
                            Далее
                          </button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <form
                      className="form-valide login-input mt-5"
                      onSubmit={notAuthUserForm.handleSubmit(
                        onSubmitHandlerForNotAuth
                      )}
                    >
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div className="form-group row is-invalid">
                            <label
                              htmlFor="name"
                              className="col-12 col-form-label"
                            >
                              Ф.И.О
                              <span className="text-danger">*</span>
                            </label>
                            <div className="col-12">
                              <input
                                {...notAuthUserForm.register("name")}
                                id="name"
                                className="form-control"
                                placeholder="Тешаев Шухрат Жумаевич"
                              />
                              <div
                                style={{ display: "block" }}
                                className={
                                  notAuthUserForm.formState.errors.name
                                    ? "invalid-feedback animated fadeInDown"
                                    : ""
                                }
                              >
                                {notAuthUserForm.formState.errors.name?.message}
                              </div>
                            </div>
                          </div>
                          <div className="form-group row is-invalid">
                            <label
                              htmlFor="recipient"
                              className="col-12 col-form-label"
                            >
                              Номер телефона
                              <span className="text-danger">*</span>
                            </label>
                            <div className="col-12">
                              <input
                                {...notAuthUserForm.register("recipient")}
                                id="recipient"
                                className="form-control"
                                name="recipient"
                                placeholder="+998 (xx) xxx xxxx"
                              />
                              <div
                                style={{ display: "block" }}
                                className={
                                  notAuthUserForm.formState.errors.recipient
                                    ? "invalid-feedback animated fadeInDown"
                                    : ""
                                }
                              >
                                {
                                  notAuthUserForm.formState.errors.recipient
                                    ?.message
                                }
                              </div>
                            </div>
                          </div>
                          <div className="form-group row is-invalid">
                            <label
                              htmlFor="email"
                              className="col-12 col-form-label"
                            >
                              Электронная почта
                              <span className="text-danger">*</span>
                            </label>
                            <div className="col-12">
                              <input
                                {...notAuthUserForm.register("email")}
                                type="email"
                                id="email"
                                className="form-control"
                                name="email"
                                placeholder="example-bsmi@ya.uz"
                              />
                              <div
                                style={{ display: "block" }}
                                className={
                                  notAuthUserForm.formState.errors.email
                                    ? "invalid-feedback animated fadeInDown"
                                    : ""
                                }
                              >
                                {
                                  notAuthUserForm.formState.errors.email
                                    ?.message
                                }
                              </div>
                            </div>
                          </div>

                          <div className="form-group row is-invalid">
                            <label
                              htmlFor="address"
                              className="col-12 col-form-label"
                            >
                              Адрес
                              <span className="text-danger">*</span>
                            </label>
                            <div className="col-12">
                              <input
                                {...notAuthUserForm.register("address")}
                                type="text"
                                id="address"
                                className="form-control"
                                name="address"
                                placeholder=" город Бухара, улица Навоий шох, 1"
                              />
                              <div
                                style={{ display: "block" }}
                                className={
                                  notAuthUserForm.formState.errors.address
                                    ? "invalid-feedback animated fadeInDown"
                                    : ""
                                }
                              >
                                {
                                  notAuthUserForm.formState.errors.address
                                    ?.message
                                }
                              </div>
                            </div>
                          </div>

                          <div className="form-group row is-invalid">
                            <label
                              htmlFor="leader"
                              className="col-12 col-form-label"
                            >
                              Руководство
                              <span className="text-danger">*</span>
                            </label>
                            <div className="col-12">
                              <select
                                {...notAuthUserForm.register("leader")}
                                id="leader"
                                name="leader"
                                className="form-control valid"
                              >
                                {leaders.map((leader) => (
                                  <option key={leader._id} value={leader._id}>
                                    {leader.name}
                                  </option>
                                ))}
                              </select>
                              <div
                                style={{ display: "block" }}
                                className={
                                  notAuthUserForm.formState.errors.leader
                                    ? "invalid-feedback animated fadeInDown"
                                    : ""
                                }
                              >
                                {
                                  notAuthUserForm.formState.errors.leader
                                    ?.message
                                }
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12 col-md-6">
                          <div className="form-group row is-invalid">
                            <label
                              htmlFor="theme"
                              className="col-12 col-form-label"
                            >
                              Тема
                              <span className="text-danger">*</span>
                            </label>
                            <div className="col-12">
                              <input
                                {...notAuthUserForm.register("theme")}
                                id="theme"
                                className="form-control"
                                name="theme"
                                placeholder="Перевод учебы"
                              />
                              <div
                                style={{ display: "block" }}
                                className={
                                  notAuthUserForm.formState.errors.theme
                                    ? "invalid-feedback animated fadeInDown"
                                    : ""
                                }
                              >
                                {
                                  notAuthUserForm.formState.errors.theme
                                    ?.message
                                }
                              </div>
                            </div>
                          </div>
                          <div className="form-group row is-invalid">
                            <label
                              htmlFor="message"
                              className="col-12 col-form-label"
                            >
                              Сообщение
                              <span className="text-danger">*</span>
                            </label>
                            <div className="col-12">
                              <textarea
                                {...notAuthUserForm.register("message")}
                                id="message"
                                className="form-control"
                                name="message"
                                rows="5"
                                placeholder="Текст..."
                              ></textarea>
                              <div
                                style={{ display: "block" }}
                                className={
                                  notAuthUserForm.formState.errors.message
                                    ? "invalid-feedback animated fadeInDown"
                                    : ""
                                }
                              >
                                {
                                  notAuthUserForm.formState.errors.message
                                    ?.message
                                }
                              </div>
                            </div>
                          </div>
                          <div className="form-group row is-invalid">
                            <label
                              htmlFor="files"
                              className="col-12 col-form-label"
                            >
                              Файл
                            </label>
                            <div className="col-12">
                              <input
                                {...notAuthUserForm.register("files")}
                                type="file"
                                id="files"
                                className="form-control"
                                placeholder="Перевод учебы"
                                multiple
                              />
                              <div
                                style={{ display: "block" }}
                                className={
                                  notAuthUserForm.formState.errors.files
                                    ? "invalid-feedback animated fadeInDown"
                                    : ""
                                }
                              >
                                {
                                  notAuthUserForm.formState.errors.files
                                    ?.message
                                }
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-12">
                          <button className="btn btn-primary" type="submit">
                            Далее
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Main>
      <Footer />
    </MainLayout>
  );
};

export default MainPage;
