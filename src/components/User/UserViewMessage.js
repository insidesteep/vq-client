import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getMyMessageById } from "../../store/actions/message";
import Spinner from "../layouts/Spinner";
import moment from "moment";

const UserViewMessage = () => {
  const { error, loading, message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getMyMessageById(id));
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  return message ? (
    <div className="read-content">
      <div className="media pt-5">
        <div className="media-body">
          <h5 className="m-b-3">{message.owner?.name}</h5>
          <small className="text-muted">{message.owner?.email}</small>
        </div>
      </div>
      <hr />
      <div className="media mb-4 mt-1">
        <div className="media-body">
          <h4 className="m-0 text-primary">{message.statement?.theme}</h4>
          <small className="text-muted">
            {moment(message.createdAt).format("DD-MM-YYYY hh:mm")}
          </small>
        </div>
      </div>
      <p>{message.message}</p>
      <hr />
    </div>
  ) : (
    <h3>Нет данных</h3>
  );
};

export default UserViewMessage;
