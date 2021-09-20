import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import Main from "../components/layouts/Main";
import MainLayout from "../components/layouts/MainLayout";
import Nav from "../components/layouts/Nav";
import Sidebar from "../components/layouts/Sidebar";
import Spinner from "../components/layouts/Spinner";
import { getStatementsInfo } from "../store/actions/dashboard";

const Dashboard = () => {
  const { statementsInfo, loading, user } = useSelector((state) => state.dashboard);
  console.log(loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatementsInfo());
  }, []);

  console.log(statementsInfo, loading);




  return (
    <MainLayout>
      <Nav />
      <Header />
      <Sidebar />
      <Main>
        <div className="container-fluid mt-3">
          <div className="row">
            {!statementsInfo ? (
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <h4 className="text-center">Нет данных</h4>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="col-lg-3 col-sm-6">
                  <div className="card gradient-1">
                    <div className="card-body">
                      <h3 className="card-title text-white">Всего обращений</h3>
                      <div className="d-inline-block">
                        <h2 className="text-white">{statementsInfo.all}</h2>
                        <p className="text-white mb-0">Jan - March 2019</p>
                      </div>
                      <span className="float-right display-5 opacity-5">
                        <i className="fa fa-file-text-o"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                  <div className="card gradient-2">
                    <div className="card-body">
                      <h3 className="card-title text-white">Рассматривается</h3>
                      <div className="d-inline-block">
                        <h2 className="text-white">{statementsInfo.pending}</h2>
                        <p className="text-white mb-0">Jan - March 2019</p>
                      </div>
                      <span className="float-right display-5 opacity-5">
                        <i className="fa fa-clock-o"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                  <div className="card gradient-3">
                    <div className="card-body">
                      <h3 className="card-title text-white">Новые</h3>
                      <div className="d-inline-block">
                        <h2 className="text-white">{statementsInfo.new}</h2>
                        <p className="text-white mb-0">Jan - March 2019</p>
                      </div>
                      <span className="float-right display-5 opacity-5">
                        <i className="fa fa-plus"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                  <div className="card gradient-4">
                    <div className="card-body">
                      <h3 className="card-title text-white">Завершённые</h3>
                      <div className="d-inline-block">
                        <h2 className="text-white">
                          {statementsInfo.completed}
                        </h2>
                        <p className="text-white mb-0">Jan - March 2019</p>
                      </div>
                      <span className="float-right display-5 opacity-5">
                        <i className="fa fa-flag-checkered"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Main>
      <Footer />
    </MainLayout>
  );
};

export default Dashboard;
