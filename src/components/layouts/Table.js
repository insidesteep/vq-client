import { useHistory } from "react-router-dom";
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

const Table = ({ data, setSortBy, skip }) => {
  console.log(data);
  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/dashboard/statements/${id}`);
  };

  const handleSort = (value) => {
    setSortBy(value);
  };

  const dataDisplay = () => {
    return data.map(
      ({ _id, owner, status, theme, message, createdAt }, idx) => (
        <tr key={_id} onClick={() => handleClick(_id)}>
          <th>{idx + 1 + skip}</th>
          <th>{moment(createdAt).format("DD-MM-YYYY hh:mm")}</th>
          <td>{owner.name}</td>
          <td>
            <span className={`badge badge-${STATUS[status].color} px-2 mr-1`}>
              {STATUS[status].value}
            </span>
            {/* <span className="badge badge-primary px-2">New</span> */}
          </td>
          <td>{theme}</td>
          <td className="color-primary">
            {message && message.length > 50
              ? message.slice(0, 50) + "..."
              : message}
          </td>
        </tr>
      )
    );
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th onClick={() => handleSort("createdAt")}>Дата заявки</th>
            <th onClick={() => handleSort("name")}>Ф.И.О</th>
            <th onClick={() => handleSort("status")}>Статус</th>
            <th onClick={() => handleSort("theme")}>Тема</th>
            <th onClick={() => handleSort("message")}>Сообщение</th>
          </tr>
        </thead>
        <tbody>{dataDisplay()}</tbody>
      </table>
    </div>
  );
};

export default Table;
