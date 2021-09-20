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
import { getLeaders } from "../store/actions/user";
import { createStatementSchema } from "../utils/validationSchema";
import Footer from "../components/layouts/Footer";

const ABC = ({ setToken }) => {
  const {
    register,
    formState: { errors, touchedFields },
    handleSubmit,
    setValue,
    getValues,
    control,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(createStatementSchema),
  });

  const { leaders } = useSelector((state) => state.user);
  const { error, loading } = useSelector((state) => state.auth);
  const {
    smsVerify: { smsToken },
  } = useSelector((state) => state.auth);
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

  const onSubmitHandler = async (data) => {
    dispatch(verifySMS(data));
    // reset();
    // history.push("/sms-verify");
  };

  console.log("SMS", smsToken);

  if (smsToken) {
    return <Redirect to="/main/sms-verify" />;
  }

  return (
    <MainLayout>
      <Nav />
      <Header />
      <Main>
        <div className="container">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  {error && <Alert type="danger" text={error} />}
                  <h4 className="text-center">Заполните онлайн-заявку</h4>
                </div>
              </div>

              <form
                className="form-valide login-input mt-5"
                onSubmit={handleSubmit(onSubmitHandler)}
              >
                <div className="row">
                  <div className="col-12 col-md-6">
                    <div className="form-group row is-invalid">
                      <label htmlFor="name" className="col-12 col-form-label">
                        Ф.И.О
                        <span className="text-danger">*</span>
                      </label>
                      <div className="col-12">
                        <input
                          {...register("name")}
                          id="name"
                          className="form-control"
                          placeholder="Ахмедов Алишер Астанович"
                        />
                        <div
                          style={{ display: "block" }}
                          className={
                            errors.name
                              ? "invalid-feedback animated fadeInDown"
                              : ""
                          }
                        >
                          {errors.name?.message}
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
                          {...register("recipient")}
                          id="recipient"
                          className="form-control"
                          name="recipient"
                          placeholder="+998 (xx) xxx xxxx"
                        />
                        <div
                          style={{ display: "block" }}
                          className={
                            errors.recipient
                              ? "invalid-feedback animated fadeInDown"
                              : ""
                          }
                        >
                          {errors.recipient?.message}
                        </div>
                      </div>
                    </div>
                    <div className="form-group row is-invalid">
                      <label htmlFor="email" className="col-12 col-form-label">
                        Электронная почта
                        <span className="text-danger">*</span>
                      </label>
                      <div className="col-12">
                        <input
                          {...register("email")}
                          type="email"
                          id="email"
                          className="form-control"
                          name="email"
                          placeholder="bsmi@ya.uz"
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
                          {...register("address")}
                          type="text"
                          id="address"
                          className="form-control"
                          name="address"
                          placeholder="г. Самарканд, ул. Амира Темура, 18"
                        />
                        <div
                          style={{ display: "block" }}
                          className={
                            errors.address
                              ? "invalid-feedback animated fadeInDown"
                              : ""
                          }
                        >
                          {errors.address?.message}
                        </div>
                      </div>
                    </div>

                    <div className="form-group row is-invalid">
                      <label htmlFor="leader" className="col-12 col-form-label">
                        Руководство
                        <span className="text-danger">*</span>
                      </label>
                      <div className="col-12">
                        <select
                          {...register("leader")}
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
                            errors.leader
                              ? "invalid-feedback animated fadeInDown"
                              : ""
                          }
                        >
                          {errors.leader?.message}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="form-group row is-invalid">
                      <label htmlFor="theme" className="col-12 col-form-label">
                        Тема
                        <span className="text-danger">*</span>
                      </label>
                      <div className="col-12">
                        <input
                          {...register("theme")}
                          id="theme"
                          className="form-control"
                          name="theme"
                          placeholder="Перевод учебы"
                        />
                        <div
                          style={{ display: "block" }}
                          className={
                            errors.theme
                              ? "invalid-feedback animated fadeInDown"
                              : ""
                          }
                        >
                          {errors.theme?.message}
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
                          {...register("message")}
                          id="message"
                          className="form-control"
                          name="message"
                          rows="5"
                          placeholder="Перевод учебы"
                        ></textarea>
                        <div
                          style={{ display: "block" }}
                          className={
                            errors.message
                              ? "invalid-feedback animated fadeInDown"
                              : ""
                          }
                        >
                          {errors.message?.message}
                        </div>
                      </div>
                    </div>
                    <div className="form-group row is-invalid">
                      <label htmlFor="files" className="col-12 col-form-label">
                        Файл
                      </label>
                      <div className="col-12">
                        <input
                          {...register("files")}
                          type="file"
                          id="files"
                          className="form-control"
                          placeholder="Перевод учебы"
                          multiple
                        />
                        <div
                          style={{ display: "block" }}
                          className={
                            errors.files
                              ? "invalid-feedback animated fadeInDown"
                              : ""
                          }
                        >
                          {errors.files?.message}
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
                {/* <div className="col">
          <FormField
            name="name"
            label="Ф.И.О:"
            placeholder="Ахмедов Алишер Астанович"
            onChange={handleChange}
            field={fields.name}
          />
          <FormField
            name="recipient"
            label="Номер телефона:"
            placeholder="+998 (xx) xxx xxxx"
            onChange={handleChange}
            field={fields.recipient}
          />
          <FormField
            name="email"
            type="email"
            label="Электронная почта:"
            placeholder="sammi@sammi.uz"
            onChange={handleChange}
            field={fields.email}
          />
          <FormField
            name="address"
            label="Адрес:"
            placeholder="г. Самарканд, ул. Амира Темура, 18"
            onChange={handleChange}
            field={fields.address}
          />
          <FormField
            name="leader"
            type="select"
            label="Руководство:"
            options={["AAA", "BBBB", "CCCC"]}
            onChange={handleChange}
            field={fields.leader}
          />
        </div> */}
                {/* <div className="col">
          <FormField
            name="theme"
            label="Тема:"
            placeholder="Перевод учебы"
            onChange={handleChange}
            field={fields.theme}
          />
          <FormField
            name="message"
            type="textarea"
            label="Сообщение:"
            onChange={handleChange}
            field={fields.message}
          />
          <FormField
            name="files"
            type="file"
            label="Файл:"
            onChange={handleChange}
            images={fields.files.value}
            field={fields.files}
          />
        </div> */}
              </form>
            </div>
          </div>
        </div>
      </Main>
      <Footer />
    </MainLayout>
  );
};

export default ABC;
