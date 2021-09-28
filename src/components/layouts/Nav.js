import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav-header d-flex align-items-center justify-content-center">
      <div className="brand-logo">
        <Link to="/">
          <b className="logo-abbr">
            <img src="/images/bsmilogo.png" alt="" />
          </b>
          <span className="logo-compact">
            <img src="/images/bsmilogo.png" alt="" />
          </span>
          <div className="brand-title">
            <img src="/images/bsmilogo.png" alt="" style={{ width: "50px" }} />
            <span className="text-white ml-2">BuxDTI VQ</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
