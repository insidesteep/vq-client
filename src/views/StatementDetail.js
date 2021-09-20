import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import moment from "moment";

import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import Main from "../components/layouts/Main";
import Nav from "../components/layouts/Nav";
import Sidebar from "../components/layouts/Sidebar";
import { changeStatement, getStatementById } from "../store/actions/statement";
import MainLayout from "../components/layouts/MainLayout";
import Spinner from "../components/layouts/Spinner";
import Modal from "../components/layouts/Modal";
import File from "../components/File";
import { sendMessage } from "../store/actions/message";
import { messageSendSchema } from "../utils/validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const STATUS = {
  new: {
    value: "новая",
    color: "info",
  },
  completed: {
    value: "завершена",
    color: "success",
  },
  pending: {
    value: "в ожидании",
    color: "warning",
  },
};

const StatementDetail = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(messageSendSchema),
  });

  const { statement, loading } = useSelector((state) => state.statement);
  const messageState = useSelector((state) => state.message);

  const dispatch = useDispatch();
  const { id } = useParams();

  const handleSendMessage = (data) => {
    dispatch(
      sendMessage({
        to: statement.owner._id,
        statementId: statement._id,
        message: data.message,
      })
    );

    dispatch(changeStatement());
  };

  useEffect(() => {
    dispatch(getStatementById(id));
  }, [id]);

  return (
    <MainLayout>
      <Nav />
      <Header />
      <Sidebar />
      <Main>
        <div className="container-fluid mt-3">
          {!statement || loading ? (
            <Spinner />
          ) : (
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <div className="toolbar" role="toolbar">
                      <div className="btn-group m-b-20">
                        <button
                          type="button"
                          className="btn btn-light"
                          disabled={statement.status !== "completed"}
                        >
                          <i className="fa fa-archive"></i>
                        </button>

                        {statement.status !== "completed" && (
                          <Modal
                            title="Ответить на заявление"
                            onSuccess={handleSendMessage}
                            loading={messageState.loading}
                            errorText={messageState.error}
                            validate={{ handleSubmit }}
                          >
                            <input
                              className="form-control"
                              readOnly
                              value={`Кому: ${statement.owner.name}`}
                            />
                            <input
                              className="form-control"
                              readOnly
                              value={`Тема: ${statement.theme}`}
                            />
                            <p className="text-warning">
                              Примечание: После отправки сообщения статус
                              заявление перейдёт в{" "}
                              <span class="badge badge-success">Завершена</span>
                            </p>
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
                                  name="message"
                                  className="form-control"
                                  placeholder="Текс..."
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
                          </Modal>
                        )}
                      </div>
                    </div>
                    <div className="read-content">
                      <div className="media pt-5">
                        <div className="media-body">
                          <Link to={`/users/${statement.owner._id}`}>
                            <h5 className="m-b-3">{statement.owner.name}</h5>
                          </Link>
                          <small className="text-muted">
                            {statement.owner.email}
                          </small>
                        </div>
                      </div>
                      <hr />
                      <div className="media mb-4 mt-1">
                        <div className="media-body">
                          <span
                            className={`float-right badge badge-${
                              STATUS[statement.status].color
                            }`}
                          >
                            {STATUS[statement.status].value}
                          </span>
                          <h4 className="m-0 text-primary">
                            {statement.theme}
                          </h4>
                          <small className="text-muted">
                            {moment(statement.createdAt).format(
                              "DD-MM-YYYY hh:mm"
                            )}
                          </small>
                        </div>
                      </div>
                      <p>{statement.message}</p>
                      <hr />
                      <h6 className="p-t-15">
                        <i className="fa fa-download mb-2"></i> Файлы
                        <span>({statement.files.length})</span>
                      </h6>
                      <div className="row m-b-30">
                        {statement.files.map((file) => (
                          <File key={file._id} file={file} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Main>
      <Footer />
    </MainLayout>
  );
};

export default StatementDetail;
