import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getMyStatementById } from "../../store/actions/statement";
import Spinner from "../layouts/Spinner";
import File from "../File";
import moment from "moment";

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

const SentDetail = () => {
  const { error, loading, statement } = useSelector((state) => state.statement);
  const dispatch = useDispatch();
  const { id } = useParams();

  console.log(statement);

  useEffect(() => {
    dispatch(getMyStatementById(id));
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return statement ? (
    <div className="read-content">
      <div className="media pt-5">
        <div className="media-body">
          <h4 className="mb-3">Моё заявление</h4>
          <h5 className="m-b-3">{statement.owner.name}</h5>
          <small className="text-muted">
            Кому: {statement.responsiblePerson?.email} |{" "}
            {statement.responsiblePerson?.name}
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
          <h4 className="m-0 text-primary">{statement.theme}</h4>
          <small className="text-muted">
            {moment(statement.createdAt).format("DD-MM-YYYY hh:mm")}
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
  ) : (
    <h3>Нет данных</h3>
  );
};

export default SentDetail;
