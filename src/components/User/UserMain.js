const UserName = ({user}) => {
  return (
    <>
      <div className="media align-items-center mb-4">
        <div className="media-body">
          <h3 className="mb-0">{user.name}</h3>
          <p className="text-muted mb-0">Canada</p>
        </div>
      </div>

      <div className="row mb-1">
        <div className="col">
          <div className="card card-profile text-center">
            <span className="mb-1 text-primary">
              <i className="icon-note"></i>
            </span>
            <h3 className="mb-0">{user.statusQuantity.all}</h3>
            <p className="text-muted px-4">Заявления</p>
          </div>
        </div>
        <div className="col">
          <div className="card card-profile text-center">
            <span className="mb-1 text-warning">
              <i className="icon-clock"></i>
            </span>
            <h3 className="mb-0">{user.statusQuantity.pending}</h3>
            <p className="text-muted">В ожидании</p>
          </div>
        </div>
        <div className="col">
          <div className="card card-profile text-center">
            <span className="mb-1 text-success">
              <i className="icon-energy"></i>
            </span>
            <h3 className="mb-0">{user.statusQuantity.completed}</h3>
            <p className="text-muted">Завершённые</p>
          </div>
        </div>
      </div>
      <ul className="card-profile__info">
        <li className="mb-1">
          <strong className="text-dark mr-4">Mobile</strong>{" "}
          <span>{`+${user.phone}`}</span>
        </li>
        <li>
          <strong className="text-dark mr-4">Email</strong>{" "}
          <span>{user.email}</span>
        </li>
      </ul>
    </>
  );
};

export default UserName;
