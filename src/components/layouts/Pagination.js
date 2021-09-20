const Pagination = ({ pageCount, setPageNum, page, mode = "mode-1" }) => {
  const _arr = [];

  for (let i = 1; i <= pageCount; i++) {
    _arr.push(i);
  }

  console.log("____________________________________________", pageCount);

  if (mode === "mode-2") {
    return (
      <div className="row">
        <div className="col">
          <div className="btn-group float-right">
            <button
              className={`btn ${page <= 1 ? "btn-gradient" : "btn-dark"}`}
              type="button"
              onClick={() => {
                if (page <= 1) return;
                setPageNum(page - 1);
              }}
            >
              <i className="fa fa-angle-left"></i>
            </button>
            <button
              className={`btn ${
                page >= pageCount ? "btn-gradient" : "btn-dark"
              }`}
              type="button"
              onClick={() => {
                if (page >= pageCount) return;
                setPageNum(page + 1);
              }}
            >
              <i className="fa fa-angle-right"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bootstrap-pagination">
      <nav>
        <ul className="pagination justify-content-center">
          <li
            className={`page-item ${page <= 1 ? "disabled" : ""}`}
            onClick={() => {
              if (page <= 1) return;
              setPageNum(page - 1);
            }}
          >
            <a className="page-link">Предыдущий</a>
          </li>

          {_arr &&
            _arr.map((item) => (
              <li
                className={`page-item ${page == item && "active"}`}
                key={item}
                onClick={() => setPageNum(item)}
              >
                <button className="page-link">{item}</button>
              </li>
            ))}

          <li
            className={`page-item ${page >= pageCount ? "disabled" : ""}`}
            onClick={() => {
              if (page >= pageCount) return;
              setPageNum(page + 1);
            }}
          >
            <a className="page-link">Следующий</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
