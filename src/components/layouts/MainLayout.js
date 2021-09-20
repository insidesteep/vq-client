import { useSelector } from "react-redux";

const MainLayout = ({ children }) => {
  const { isShow } = useSelector((state) => state.sidebar);

  return (
    <div id="main-wrapper" className={`show ${!isShow ? "menu-toggle" : ""}`}>
      {children}
    </div>
  );
};

export default MainLayout;
