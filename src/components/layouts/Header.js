import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { toggleSidebar } from "../../store/actions/sidebar";
import { lockProfile, logout } from "../../store/actions/auth";

const Header = () => {
  const { notificationData } = useSelector((state) => state.statement);
  const { msgNotificationData } = useSelector((state) => state.message);
  const { user, isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleMenu = () => {
    dispatch(toggleSidebar());
  };

  const handleLock = () => {
    dispatch(lockProfile());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="header">
      <div className="header-content clearfix">
        {isAuth && user.role === "leader" && pathname !== "/" && (
          <div className="nav-control">
            <div className="hamburger" onClick={handleMenu}>
              <span className="toggle-icon">
                <i className="icon-menu"></i>
              </span>
            </div>
          </div>
        )}
        {/* <div className="header-left">
          <div className="input-group icons">
            <div className="input-group-prepend">
              <span
                className="input-group-text bg-transparent border-0 pr-2 pr-sm-3"
                id="basic-addon1"
              >
                <i className="mdi mdi-magnify"></i>
              </span>
            </div>
            <input
              type="search"
              className="form-control"
              placeholder="Поиск..."
              aria-label="Search Dashboard"
            />
            <div className="drop-down animated flipInX d-md-none">
              <form action="#">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
              </form>
            </div>
          </div>
        </div> */}
        <div className="header-right">
          <ul className="clearfix">
            {isAuth && (
              <li className="icons dropdown">
                {user.role === "leader" ? (
                  <>
                    <a href="#!" data-toggle="dropdown" className="log-user">
                      <i className={`mdi mdi-bell-outline`}></i>
                      {notificationData.length > 0 && (
                        <span className="badge badge-pill gradient-2">
                          {notificationData.length}
                        </span>
                      )}
                    </a>
                    <div className="drop-down animated fadeIn dropdown-menu">
                      <div className="dropdown-content-heading d-flex justify-content-between">
                        {notificationData.length === 0 ? (
                          <span className="">Нет новых заявлений</span>
                        ) : (
                          <>
                            <span className="">Новые заявления</span>
                            <a href="#!" className="d-inline-block">
                              <span className="badge badge-pill gradient-2">
                                {notificationData.length}
                              </span>
                            </a>
                          </>
                        )}
                      </div>
                      <div className="dropdown-content-body">
                        <ul>
                          {notificationData.map(
                            ({ _id, name, theme, message, owner }) => (
                              <li className="notification-unread" key={_id}>
                                <Link to={`/statements/${_id}`}>
                                  <div className="notification-content">
                                    <div className="notification-heading">
                                      {owner && owner.name}
                                    </div>
                                    <div className="notification-timestamp">
                                      {theme}
                                    </div>
                                    <div className="notification-text">
                                      {message}
                                    </div>
                                  </div>
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    <a href="#!" data-toggle="dropdown" className="log-user">
                      <i className={`mdi mdi-email-outline`}></i>
                      {msgNotificationData.length > 0 && (
                        <span className="badge badge-pill gradient-2">
                          {msgNotificationData.length}
                        </span>
                      )}
                    </a>
                    <div className="drop-down animated fadeIn dropdown-menu">
                      <div className="dropdown-content-heading d-flex justify-content-between">
                        {msgNotificationData.length === 0 ? (
                          <span className="">Нет новых сообщений</span>
                        ) : (
                          <>
                            <span className="">Новые сообщения</span>
                            <a href="#!" className="d-inline-block">
                              <span className="badge badge-pill gradient-2">
                                {msgNotificationData.length}
                              </span>
                            </a>
                          </>
                        )}
                      </div>
                      <div className="dropdown-content-body">
                        <ul>
                          {msgNotificationData.map(
                            ({ _id, statement, message, owner }) => (
                              <li className="notification-unread" key={_id}>
                                <Link to={`/profile/inbox/${_id}`}>
                                  <div className="notification-content">
                                    <div className="notification-heading">
                                      {owner && owner.name}
                                    </div>
                                    <div className="notification-timestamp">
                                      {statement && statement.theme}
                                    </div>
                                    <div className="notification-text">
                                      {message && message.slice(0, 100)}
                                    </div>
                                  </div>
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </li>
            )}
            <li className="icons dropdown d-md-flex">
              <a
                href="#!"
                className="log-user icon-none"
                data-toggle="dropdown"
              >
                <i className="mdi mdi-earth"></i>
                <span>Русский</span>
                <i className="fa fa-angle-down f-s-14" aria-hidden="true"></i>
              </a>
              <div className="drop-down dropdown-language animated fadeIn  dropdown-menu">
                <div className="dropdown-content-body">
                  <ul>
                    <li>
                      <a href="#!">O'zbekcha</a>
                    </li>
                    <li>
                      <a href="#!">Русский</a>
                    </li>
                    <li>
                      <a href="#!">English</a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li className="icons dropdown">
              {isAuth ? (
                <>
                  <a
                    href="#!"
                    className="log-user icon-none"
                    data-toggle="dropdown"
                  >
                    <i className="mdi mdi-account"></i>
                    <span className="mr-1">{user.name}</span>
                    <i
                      className="fa fa-angle-down f-s-14"
                      aria-hidden="true"
                    ></i>
                  </a>
                  <div className="drop-down dropdown-profile animated fadeIn dropdown-menu">
                    <div className="dropdown-content-body">
                      <ul>
                        <li>
                          <Link
                            to={`${
                              user.role === "user" ? "/profile" : "/dashboard"
                            }`}
                          >
                            <i className="icon-user"></i> <span>Профиль</span>
                          </Link>
                        </li>
                        {user.role === "leader" && (
                          <li onClick={handleLock}>
                            <i className="icon-lock"></i>{" "}
                            <span>Заблокировать</span>
                          </li>
                        )}
                        <li onClick={handleLogout}>
                          <i className="icon-key"></i> <span>Выход</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  to="/login"
                  className="log-user icon-none"
                  data-toggle="dropdown"
                  href="#!"
                >
                  <i className="mdi mdi-login"></i>
                  <span className="mr-1">Войти</span>
                  {/* <i className="fa fa-angle-down f-s-14" aria-hidden="true"></i> */}
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
