import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { getMessages } from "../../store/actions/message";
import Pagination from "../layouts/Pagination";
import Spinner from "../layouts/Spinner";

const UserInbox = () => {
  const [paginationParams, setPaginationParams] = useState({
    page: 1,
    limit: 5,
    skip: 0,
    pageCount: 0,
  });

  const { loading, data } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const history = useHistory();

  const handlePage = (pageNum) =>
    setPaginationParams({
      ...paginationParams,
      page: pageNum,
      skip: (pageNum - 1) * paginationParams.limit,
    });

  // const handleLink = (id) => {
  //   history.push(`/profile/inbox/${id}`);
  // };

  useEffect(() => {
    dispatch(getMessages());
  }, []);

  useEffect(() => {
    setPaginationParams({
      ...paginationParams,
      pageCount: Math.ceil(data.length / paginationParams.limit),
    });
  }, [data]);

  return (
    <>
      <div className="email-list m-t-15">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <h4>Сообщения</h4>
            <div className="mb-4">
              {data
                .slice(
                  paginationParams.skip,
                  paginationParams.page * paginationParams.limit
                )
                .map((msg, idx) => (
                  <div className="message" key={msg._id}>
                    <Link to={`/profile/inbox/${msg._id}`}>
                      <div className="col-mail col-mail-1">
                        <div className="date">
                          <span className="mr-2">
                            {idx + 1 + paginationParams.skip}.
                          </span>
                          <b>{msg.owner?.name}</b>
                        </div>
                      </div>
                      <div className="col-mail col-mail-2">
                        <div className="subject">
                          <b>{msg.statement?.theme}</b> - {msg.message}
                        </div>
                        <div className="date">
                          {moment(msg.createdAt).format("DD/MM/YY hh:mm")}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
            {data.length > 0 && (
              <Pagination
                pageCount={paginationParams.pageCount}
                page={paginationParams.page}
                setPageNum={handlePage}
                mode="mode-2"
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default UserInbox;
