import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const UserNav = () => {
  const {msgNotificationData} = useSelector((state) => state.message);

  return (
    <div className="email-left-box">
      <NavLink
        to="/profile/new-statement"
        className="btn btn-primary btn-block"
      >
        Написать заявление
      </NavLink>
      <div className="mail-list mt-4">
        <NavLink to="/profile/inbox" className="list-group-item border-0 p-r-0">
          <i className="fa fa-inbox font-18 align-middle mr-2"></i>
          Входящие
          {msgNotificationData.length > 0 && (
            <span className="badge badge-warning badge-sm float-right m-t-5 text-white">
              {msgNotificationData.length}
            </span>
          )}
        </NavLink>
        <NavLink exact to="/profile" className="list-group-item border-0 p-r-0">
          <i className="fa fa-paper-plane font-18 align-middle mr-2"></i>
          Отправленные
        </NavLink>
      </div>
    </div>
  );
};

export default UserNav;
