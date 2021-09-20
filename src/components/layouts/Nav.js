import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav-header">
      <div className="brand-logo">
        <Link to="/">
          <b className="logo-abbr">
            <img src="/images/logo.png" alt="" />{" "}
          </b>
          <span className="logo-compact">
            <img src="./images/logo-compact.png" alt="" />
          </span>
          <span className="brand-title">
            <img src="/images/logo-text.png" alt="" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
