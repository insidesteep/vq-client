import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="nk-sidebar">
      <div className="nk-nav-scroll">
        <ul className="metismenu" id="menu">
          <li className="nav-label">Панель управления</li>
          <li>
            <NavLink to="/dashboard" exact>
              <i className="icon-speedometer menu-icon"></i>
              <span className="nav-text">Dashboard</span>
            </NavLink>
          </li>
          <li className="mega-menu mega-menu-sm">
            <NavLink to="/dashboard/statements">
              <i className="icon-globe-alt menu-icon"></i>
              <span className="nav-text">Заявления</span>
            </NavLink>
          </li>
          <li className="mega-menu mega-menu-sm">
            <NavLink to="/dashboard/users">
              <i className="icon-people menu-icon"></i>
              <span className="nav-text">Пользователи</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
