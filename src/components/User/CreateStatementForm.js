import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createStatement } from "../../store/actions/statement";
import { getLeaders } from "../../store/actions/user";
import { createStatementFormSchema } from "../../utils/validationSchema";
import Spinner from "../layouts/Spinner";
import Toast from "../Toast";

const CreateStatementForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(createStatementFormSchema),
  });

  const { leaders } = useSelector((state) => state.user);
  const { loading, success } = useSelector((state) => state.statement);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLeaders());
  }, []);

  const onSubmitHandler = (data) => {
    console.log("ggggg", data);
    dispatch(
      createStatement({
        leader: data.leader,
        theme: data.theme,
        message: data.message,
        files: data.files,
      })
    );

    reset();
  };

  console.log("error", errors);

  return (
    <>
      <div className="compose-content mt-4">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <h4>Новоё заявление</h4>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="form-group">
                <label htmlFor="leader" className="col-12 col-form-label">
                  Руководство
                  <span className="text-danger">*</span>
                </label>
                <select
                  {...register("leader")}
                  id="leader"
                  className="form-control form-control-sm"
                  placeholder="Кому"
                  disables={loading}
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
                    errors.leader ? "invalid-feedback animated fadeInDown" : ""
                  }
                >
                  {errors.leader?.message}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="theme" className="col-12 col-form-label">
                  Тема
                  <span className="text-danger">*</span>
                </label>
                <input
                  {...register("theme")}
                  id="text"
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Перевод учёбы"
                  disables={loading}
                />
                <div
                  style={{ display: "block" }}
                  className={
                    errors.theme ? "invalid-feedback animated fadeInDown" : ""
                  }
                >
                  {errors.theme?.message}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message" className="col-12 col-form-label">
                  Сообщение
                  <span className="text-danger">*</span>
                </label>
                <textarea
                  {...register("message")}
                  id="message"
                  className="textarea_editor form-control bg-light form-control-sm"
                  rows="15"
                  placeholder="Напишите сообщение ..."
                  disables={loading}
                ></textarea>
                <div
                  style={{ display: "block" }}
                  className={
                    errors.message ? "invalid-feedback animated fadeInDown" : ""
                  }
                >
                  {errors.message?.message}
                </div>
              </div>
              <div className="form-group">
                <div className="fallback">
                  <label htmlFor="files" className="col-12 col-form-label">
                    <i className="fa fa-paperclip m-r-5 f-s-18"></i> Файл
                  </label>
                  <input
                    {...register("files")}
                    className="l-border-1 form-control-sm"
                    id="files"
                    type="file"
                    multiple="multiple"
                    disables={loading}
                  />
                  <div
                    style={{ display: "block" }}
                    className={
                      errors.files ? "invalid-feedback animated fadeInDown" : ""
                    }
                  >
                    {errors.files?.message}
                  </div>
                </div>
              </div>
              <div className="text-left m-t-15">
                <button
                  className="btn btn-primary mr-1 btn-sm"
                  type="submit"
                  disables={loading}
                >
                  <i className="fa fa-paper-plane m-r-5"></i> Отправить
                </button>
                <button
                  className="btn btn-dark btn-sm"
                  type="button"
                  onClick={() => reset()}
                  disables={loading}
                >
                  <i className="ti-close m-r-5 f-s-12"></i> Очистить
                </button>
              </div>
            </form>
          </>
        )}
      </div>
      {!loading && success && (
        <Toast
          type="success"
          title="Создание заявления"
          message="Заявление успешно отправлено"
        />
      )}
    </>
  );
};

export default CreateStatementForm;
