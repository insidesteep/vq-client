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
import Table from "../components/layouts/Table";

import { getAllStatements } from "../store/actions/statement";

const Statements = () => {
  const params = new URLSearchParams(window.location.search);

  const [page, setPage] = useState({
    limit: params.get("limit") || 6,
    order: params.get("order") || "desc",
    sortBy: params.get("sortBy") || "createdAt",
    currentPage: params.get("page") || 1,
    filter: params.get("filter") || "all",
    pageCount: 0,
  });

  const dispatch = useDispatch();
  const { data, size, loading } = useSelector((state) => state.statement);

  console.log("STATEMENTS", data);

  useEffect(() => {
    console.log("YYYYYYYYYYY", page);

    const pageCount = Math.ceil(
      size / (params.get("limit") || page.limit || 10)
    );
    setPage({ ...page, pageCount });
  }, [size]);

  // useEffect(() => {

  //   setPage({...page, maxPage: size})
  //   console.log("EFFECT_SIZE")
  // }, [size])

  useEffect(() => {
    console.log("UUUUUUUUUU", page);
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
      getAllStatements({
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
      `/dashboard/statements?${params.toString()}`
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
                <div className="col-12 mb-2">
                  <FilterStatus
                    setFilter={(filter) =>
                      setPage({ ...page, currentPage: 1, filter })
                    }
                  />
                </div>
                <div className="col-12">
                  <Card
                    title="Все заявления"
                    body={() => (
                      <Table
                        skip={(page.currentPage - 1) * page.limit}
                        data={data.slice(0, page.limit)}
                        setSortBy={(sortBy) =>
                          setPage({ ...page, sortBy, currentPage: 1 })
                        }
                      />
                    )}
                  />
                </div>
                <div class="col-12">
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

export default Statements;
