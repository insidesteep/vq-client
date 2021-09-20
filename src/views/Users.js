import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../components/layouts/Card";
import FilterStatus from "../components/layouts/FilterStatus";
import Footer from "../components/layouts/Footer";
import Header from "../components/layouts/Header";
import Main from "../components/layouts/Main";
import MainLayout from "../components/layouts/MainLayout";
import Nav from "../components/layouts/Nav";
import Pagination from "../components/layouts/Pagination";
import Sidebar from "../components/layouts/Sidebar";
import Spinner from "../components/layouts/Spinner";
import UsersTable from "../components/layouts/UsersTable";

import { getAllUsers } from "../store/actions/user";

const Users = () => {
  const params = new URLSearchParams(window.location.search);

  const [page, setPage] = useState({
    limit: params.get("limit") || 10,
    order: params.get("order") || "desc",
    sortBy: params.get("sortBy") || "createdAt",
    currentPage: params.get("page") || 1,
    filter: params.get("filter") || "all",
  });

  const dispatch = useDispatch();
  const { data, size, loading } = useSelector((state) => state.user);
  console.log("USERS", data);

  useEffect(() => {
    const pageCount = Math.ceil(
      size / (params.get("limit") || page.limit || 10)
    );
    setPage({ ...page, pageCount });
    console.log("EFFECT_START", params.get("page"));
  }, [size]);

  // useEffect(() => {

  //   setPage({...page, maxPage: size})
  //   console.log("EFFECT_SIZE")
  // }, [size])

  useEffect(() => {
    console.log(page);
    const params = new URLSearchParams(window.location.search);
    console.log("BBB", page.currentPage);

    const oldPageNum = params.get("page");
    console.log(oldPageNum, page.currentPage);

    params.set("limit", page.limit);
    params.set("order", page.order);
    params.set("sortBy", page.sortBy);
    params.set("page", page.currentPage);
    params.set("filter", page.filter);

    console.log("AAAAAAAAAAAAA");
    dispatch(
      getAllUsers({
        limit: page.limit,
        order: page.order,
        sortBy: page.sortBy,
        filter: page.filter,
        currentPage: page.currentPage,
        pageCount: Math.ceil(size / page.limit),
        maxPage: size,
      })
    );

    window.history.pushState(
      null,
      null,
      `/dashboard/users?${params.toString()}`
    );

    console.log("EFFECT_FETCH");
  }, [page.currentPage, page.limit, page.sortBy, page.order, page.filter]);

  return (
    <MainLayout>
      <Nav />
      <Header />
      <Sidebar />
      <Main>
        <div className="container-fluid mt-3">
          <div className="row">
            {loading ? (
              <Spinner />
            ) : (
              <>
                <div className="col-12">
                  <Card
                    title="Все пользователи"
                    body={() => (
                      <UsersTable
                        skip={(page.currentPage - 1) * page.limit}
                        data={data}
                        setSortBy={(sortBy) =>
                          setPage({ ...page, sortBy, currentPage: 1 })
                        }
                      />
                    )}
                  />
                </div>
                <div className="col-12">
                  {data.length > 0 && (
                    <Pagination
                      pageCount={page.pageCount}
                      page={page.currentPage}
                      setPageNum={(pageNum) => {
                        console.log(pageNum);
                        setPage({ ...page, currentPage: pageNum });
                      }}
                    />
                  )}
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

export default Users;
