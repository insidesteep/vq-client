import { useHistory } from "react-router-dom";
import moment from "moment";

const UsersTable = ({ data, setSortBy, skip }) => {
  console.log(data);
  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/dashboard/users/${id}`);
  };

  const handleSort = (value) => {
    setSortBy(value);
  };

  const dataDisplay = () => {
    return data.map(({ _id, createdAt, name, statements, phone }, idx) => (
      <tr key={_id} onClick={() => handleClick(_id)}>
        <th>{idx + 1 + skip}</th>
        <th>{moment(createdAt).format("DD-MM-YYYY hh:mm")}</th>
        <td>{name}</td>
        <td>{`+${phone}`}</td>
        <td>{statements.length}</td>
      </tr>
    ));
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th onClick={() => handleSort("createdAt")}>Дата регистрации</th>
            <th onClick={() => handleSort("name")}>Ф.И.О</th>
            <th onClick={() => handleSort("status")}>Телефон</th>
            <th onClick={() => handleSort("theme")}>Заявлений</th>
          </tr>
        </thead>
        <tbody>{dataDisplay()}</tbody>
      </table>
    </div>
  );
};

export default UsersTable;
