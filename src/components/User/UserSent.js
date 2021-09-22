import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getMyStatements } from "../../store/actions/statement";
import Pagination from "../layouts/Pagination";
import Spinner from "../layouts/Spinner";

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

const UserSent = () => {
  const [paginationParams, setPaginationParams] = useState({
    page: 1,
    limit: 5,
    skip: 0,
    pageCount: 0,
  });

  const { data, loading } = useSelector((state) => state.statement);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyStatements());
  }, []);

  useEffect(() => {
    setPaginationParams({
      ...paginationParams,
      pageCount: Math.ceil(data.length / paginationParams.limit),
    });
  }, [data]);

  const history = useHistory();

  const handlePage = (pageNum) =>
    setPaginationParams({
      ...paginationParams,
      page: pageNum,
      skip: (pageNum - 1) * paginationParams.limit,
    });

  const handleLink = (id) => {
    history.push(`/profile/${id}`);
  };

  return (
    <>
      <div className="table-responsive mb-4">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <h4>Мои заявления</h4>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Дата заявки</th>
                  <th>Статус</th>
                  <th>Тема</th>
                  <th>Сообщение</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .slice(
                    paginationParams.skip,
                    paginationParams.page * paginationParams.limit
                  )
                  .map((st, idx) => (
                    <tr key={st._id} onClick={() => handleLink(st._id)}>
                      <th>{idx + 1 + paginationParams.skip}</th>
                      <td>{moment(st.createdAt).format("DD-MM-YYYY hh:mm")}</td>
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
                      <td className="color-primary">{st.message}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Pagination
              pageCount={paginationParams.pageCount}
              page={paginationParams.page}
              setPageNum={handlePage}
            />
          </>
        )}
      </div>
    </>
  );
};

export default UserSent;
