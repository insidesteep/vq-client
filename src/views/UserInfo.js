import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";

import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import Main from "../components/layouts/Main";
import Nav from "../components/layouts/Nav";
import Sidebar from "../components/layouts/Sidebar";
import Pagination from "../components/layouts/Pagination";
import { getUserById } from "../store/actions/user";
import MainLayout from "../components/layouts/MainLayout";
import Spinner from "../components/layouts/Spinner";

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

const UserInfo = () => {
  const { user, loading } = useSelector((state) => state.user);

  const [page, setPage] = useState({
    limit: 5,
    pageNum: 1,
    pageCount: 0,
    skip: 0,
  });

  console.log(page);

  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  console.log("PAGESTATE", page);

  const handleClick = (id) => {
    history.push(`/dashboard/statements/${id}`);
  };

  useEffect(() => {
    dispatch(getUserById(id));
  }, []);

  useEffect(() => {
    const size = user && user.statements.length;

    setPage({
      ...page,
      pageCount: Math.ceil(size / page.limit),
    });
  }, [user]);

  const handlePage = (pageNum) =>
    setPage({
      ...page,
      pageNum,
      skip: (pageNum - 1) * page.limit,
    });

  console.log("USER", user);
  return (
    <MainLayout>
      <Nav />
      <Header />
      <Sidebar />
      <Main>
        <div className="container-fluid mt-3">
          <div className="row">
            {!user || loading ? (
              <Spinner />
            ) : (
              <>
                <div className="col-lg-4 col-xl-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="media align-items-center mb-4">
                        <div className="media-body">
                          <h3 className="mb-0">{user.name}</h3>
                          <p className="text-muted mb-0">
                            Зарегистрирован:{" "}
                            {moment(user.createdAt).format("DD-MM-YYYY")}
                          </p>
                        </div>
                      </div>

                      <div className="row mb-2">
                        <div className="col">
                          <div className="card card-profile text-center">
                            <span className="mb-1 text-primary">
                              <i className="icon-note"></i>
                            </span>
                            <h3 className="mb-0">{user.statusQuantity.all}</h3>
                            <p className="text-muted px-4">Заявления</p>
                          </div>
                        </div>
                        <div className="col">
                          <div className="card card-profile text-center">
                            <span className="mb-1 text-warning">
                              <i className="icon-clock"></i>
                            </span>
                            <h3 className="mb-0">
                              {user.statusQuantity.pending}
                            </h3>
                            <p className="text-muted">В ожидании</p>
                          </div>
                        </div>
                        <div className="col">
                          <div className="card card-profile text-center">
                            <span className="mb-1 text-success">
                              <i className="icon-energy"></i>
                            </span>
                            <h3 className="mb-0">
                              {user.statusQuantity.completed}
                            </h3>
                            <p className="text-muted">Завершённые</p>
                          </div>
                        </div>
                      </div>
                      <ul className="card-profile__info">
                        <li className="mb-1">
                          <strong className="text-dark mr-4">Телефон</strong>
                          <span>
                            <a href="">+{user.phone}</a>
                          </span>
                        </li>
                        <li>
                          <strong className="text-dark mr-4">Эл-почта</strong>
                          <span>
                            <a href="">{user.email}</a>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-xl-9">
                  <div className="card">
                    <div className="card-body">
                      <div className="card-title">
                        <h4>Заявления пользователя</h4>
                      </div>
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Дата</th>
                              <th>Статус</th>
                              <th>Тема</th>
                              <th>Сообщение</th>
                            </tr>
                          </thead>
                          <tbody>
                            {user.statements
                              .slice(page.skip, page.pageNum * page.limit)
                              .map((st, idx) => (
                                <tr
                                  key={st._id}
                                  onClick={() => handleClick(st._id)}
                                >
                                  <th>{idx + 1 + page.skip}</th>
                                  <td>
                                    {moment(st.createdAt).format(
                                      "DD-MM-YYYY hh:mm"
                                    )}
                                  </td>
                                  <td>
                                    <span
                                      className={`badge badge-${
                                        STATUS[st.status].color
                                      } px-2`}
                                    >
                                      {STATUS[st.status].value}
                                    </span>
                                  </td>
                                  <td>{st.theme}</td>
                                  <td className="color-primary">
                                    {st.message && st.message.length > 30
                                      ? st.message.slice(0, 30)
                                      : st.message}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <Pagination
                    pageCount={page.pageCount}
                    page={page.pageNum}
                    setPageNum={handlePage}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </Main>
      <Footer />
    </MainLayout>
  );
};

export default UserInfo;
