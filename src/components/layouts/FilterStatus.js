const FilterStatus = ({ setFilter }) => {
  const filter = new URLSearchParams(window.location.search).get('filter');

  const handleFilter = (filter) => {
    setFilter(filter);
  };

  return (
    <div className="button-group">
      <div className="btn-group btn-group-sm">
        <button
          type="button"
          className={`btn btn-primary ${filter == "all" && "active"}`}
          onClick={() => handleFilter("all")}
        >
          Все
        </button>
        <button
          type="button"
          className={`btn btn-primary ${filter == "new" && "active"}`}
          onClick={() => handleFilter("new")}
        >
          Новая
        </button>
        <button
          type="button"
          className={`btn btn-primary ${filter == "pending" && "active"}`}
          onClick={() => handleFilter("pending")}
        >
          В ожидании
        </button>
        <button
          type="button"
          className={`btn btn-primary ${filter == "completed" && "active"}`}
          onClick={() => handleFilter("completed")}
        >
          Завершена
        </button>
      </div>
    </div>
  );
};

export default FilterStatus;
